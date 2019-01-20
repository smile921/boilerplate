---
title: dataloader 的使用
pageTitle: "使用 Javascript 构建 GraphQL服务器之使用 dataloader"
description: "了解如何使用 Dataloader 与 GraphQL服务器进行缓存和批处理，以减少对 MongoDB 等服务的请求数量。"
question: 数据加载器的作用是？
answers: ["提高解析函数代码的可读性", "捕捉和处理错误", "减少数据请求的数量", "使数据获取调用一致"]
correctAnswer: 2
---

### 过度获取问题

现在是开始谈论性能的时候了。您可能已经注意到，我们的服务器现在有多个解析函数，可以使用 MongoDB 进行数据获取。如果对10个链接进行查询，包括在每个链接上发布和投票的用户，会发生什么？这些数据将按预期的方式获取，但是由于解析函数工作的分散方式，您可能会发现服务器正在对同一数据执行多个请求！

<Instruction>

我们不妨做一个小测试怎么样？通过 GraphiQL 创建链接，直到有大约10个，全部由同一个用户发布。然后，添加一些临时日志到 MongoDB 连接器，像这样：

```js{1-1,8-13}(path=".../hackernews-graphql-js/src/mongo-connector.js")
const {Logger, MongoClient} = require('mongodb');

const MONGO_URL = 'mongodb://localhost:27017/hackernews';

module.exports = async () => {
  const db = await MongoClient.connect(MONGO_URL);

  let logCount = 0;
  Logger.setCurrentLogger((msg, state) => {
    console.log(`MONGO DB REQUEST ${++logCount}: ${msg}`);
  });
  Logger.setLevel('debug');
  Logger.filter('class', ['Cursor']);

  return {
    Links: db.collection('links'),
    Users: db.collection('users'),
    Votes: db.collection('votes'),
  };
}
```

</Instruction>

此代码将所有请求记录到数据库服务器，并对它们进行编号，以便可以轻松地知道有多少个请求。

<Instruction>

现在重新启动服务器，并运行查询以与发布他们的用户获取链接，如下所示：

```graphql
{
  allLinks {
    url
    postedBy {
      name
    }
  }
}
```

</Instruction>

您应该能够看到运行服务器的终端中的日志。下面的屏幕截图显示了当数据库具有10个链接时，此查询的日志，全部由同一用户发布：
![](https://i.imgur.com/zvrTREp.png)

正如所看到一样，这个简单的查询触发了12个请求到 MongoDB！其中之一是获取链接数据，但所有其他数据都是相同的确切用户！这不是很好，应该能够重用已经获取的数据。这意味着在不同的解析函数调用之间处理缓存的额外逻辑...

幸运的是，对于这种问题，已经有了很好的解决方案，所以真的不需要很多额外的代码来处理这个问题。

### 使用数据加载器

你将要使用来自 Facebook 的工具库叫做 [Dataloader](https://www.npmjs.com/package/dataloader)。这对于避免对 MongoDB 等服务的多次请求是非常有用的。为了实现这一点，它不仅涵盖了缓存，还包括批处理请求，这也是重要的。如果测试不同的用例，那么就有不同用户发布的多个链接，就会看到单独的请求用于获取每个用户。使用 Dataloader 后，它们都将使用单个批处理请求提取给 MongoDB。

<Instruction>

需要做的第一件事是通过以下方式将它安装在项目中：

```bash
npm install --save dataloader
```

</Instruction>

<Instruction>

然后，用此内容创建一个新的 `src / dataloaders.js` 文件：

```js(path=".../hackernews-graphql-js/src/dataloaders.js")
const DataLoader = require('dataloader');

// 1
async function batchUsers (Users, keys) {
  return await Users.find({_id: {$in: keys}}).toArray();
}

// 2
module.exports = ({Users}) =>({
  // 3
  userLoader: new DataLoader(
    keys => batchUsers(Users, keys),
    {cacheKeyFn: key => key.toString()},
  ),
});
```

</Instruction>

我们一步一步地浏览这个代码：

1. 如前所述，Dataloader 也默认处理批处理，为此，当有多个项需要一起获取时被调用时需要为它提供一个批处理函数。这个加载器将被用于用户数据，这些密钥将是用户 ID。所以批处理函数只需要使用所有给定的 id 对 MongoDB 进行一次调用。
2. 一个重要的事情是他不能用于在不同 GraphQL 请求中复用。它的缓存功能也只是短期的，以便在同义词查询中多次获取。可以通过它的[文档](https://github.com/facebook/dataloader#caching-per-request) 来了解更多。因此这个温江将返回一个用于创建数据加载器的函数，以便后来的请求使用。
3. 最后创建用户的数据加载器，传递给批处理函数。在这里我们将使用到一个叫做 `cacheKeyFn` 的选项。这是因为 MongoDB 返回的用户 ids 将被作为键传递给数据加载器，实际上并不是字符串，但即使在ids相等的情况下也可能会失败的对象进行比较检查。此选项允许 *统一化*键，以使其可以正确的用于缓存目的。

<Instruction>

在获取用户时，解析函数需要使用这个新的数据加载器而不是 MongoDB，因此现在将其添加到上下文对象中：

```js{1-1,9-9}(path=".../hackernews-graphql-js/src/index.js")
const buildDataloaders = require('./dataloaders');

const start = async () => {
  // ...
  const buildOptions = async (req, res) => {
    const user = await authenticate(req, mongo.Users);
    return {
      context: {
        dataloaders: buildDataloaders(mongo),
        mongo,
        user
      },
      schema,
    };
  };
  // ...
};
// ...
```

</Instruction>

<Instruction>

最后，更新解析函数以使用数据加载器：

```js(path=".../hackernews-graphql-js/src/schema/resolvers.js")
Link: {
  // ...
  postedBy: async ({postedById}, data, {dataloaders: {userLoader}}) => {
    return await userLoader.load(postedById);
  },
},
Vote: {
  // ...
  user: async ({userId}, data, {dataloaders: {userLoader}}) => {
    return await userLoader.load(userId);
  },
},
```

</Instruction>

如果尝试重新启动服务器并再次运行相同的 `allLinks` 查询，将清楚地看到输出的日志显示的请求数量。使用与以前相同的数据库（同一用户发布的10个链接），新的日志是：

![](https://i.imgur.com/bGxfKgf.png)

请求数下降了75％，从12降到了3！如果认证过程通过 id 而不是电子邮件地址获取用户，则它可能只有2。但是，即使需要使用电子邮件，也可以重用数据。如果好奇的话，请查看 dataloader 中的[prime](https://github.com/facebook/dataloader#loading-by-alternative-keys) 函数，这可以帮助您。

还有其他方面可以从这个服务器中的数据加载器中获益，比如获取投票和链接。对于这些步骤，您已经了解了这些步骤，所以我们不再重复。这是一个很好的机会练习更多，所以如果你愿意，请完成这些练习。
