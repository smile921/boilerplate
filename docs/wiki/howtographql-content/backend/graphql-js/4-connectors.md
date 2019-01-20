---
title: 连接器
pageTitle: "使用 Javascript 构建 GraphQL服务器之连接器"
description: "了解如何使用 Javascript 编写连接器以使用 graphql-js 和 Node.js 和 Express GraphQL 服务器从 MongoDB 加载数据。"
question: 以下哪项是在解析函数之间共享数据/功能的最佳方法？
answers: ["服务器的上下文对象", "全局变量", "独立的模块文件", "这不可能"]
correctAnswer: 0
---

### 配置 MongoDB

你不能一直使用数组来存储数据。更长远的来说，可能将数据存储在数据库中。在本教程中，我们将使用 [MongoDB](https://www.mongodb.com/)，但是像这里使用的其他技术一样，请记住，可以将其替换为其他数据存储方式。

> 这些在 GraphQL请求中需要用到的一些代码通常被称为 **[连接器](https://github.com/apollographql/graphql-tools/blob/master/designs/connectors.md#what-is-a-connector)**。

首先需要让 MongoDB 开始运行。

<Instruction>

**步骤一**： 安装并运行 MongoDB，如果还没有。你可以在 [这里](https://docs.mongodb.com/master/administration/install-community/) 找到关于如何安装说明。

</Instruction>

<Instruction>

**步骤二**： 通过命令：`npm i --save mongodb` 来安装 MongoDB 的 NodeJS驱动程序。

</Instruction>

### 连接 MongoDB

现在可以在代码中实际连接到 MongoDB 并开始使用它。

<Instruction>

像这样创建一个 `src/mongo-connector.js` 文件:

```js(path=".../hackernews-graphql-js/src/mongo-connector.js")
const {MongoClient} = require('mongodb');

// 1
const MONGO_URL = 'mongodb://localhost:27017/hackernews';

// 2
module.exports = async () => {
  const db = await MongoClient.connect(MONGO_URL);
  return {Links: db.collection('links')};
}
```

</Instruction>

这段代码做了以下事情：

1. 首先，指定连接到所需 MongoDB 实例的 URL。这是通常可用的默认 URL，但如果不同，请随意将其替换为自己的 URL。

2. 然后，导出连接到数据库的函数，并返回解析函数将使用的集合（现在就是 `Links`）。由于连接是异步操作，因此需要使用 `async` 关键字注标注函数。

连接器准备好后，需要将其传递给解析函数。

<Instruction>

像这样在 `src/index.js` 文件中更改之前相应的代码：

```js{6-30}(path=".../hackernews-graphql-js/src/index.js")
const express = require('express');
const bodyParser = require('body-parser');
const {graphqlExpress, graphiqlExpress} = require('apollo-server-express');
const schema = require('./schema');

// 1
const connectMongo = require('./mongo-connector');

// 2
const start = async () => {
  // 3
  const mongo = await connectMongo();
  var app = express();
  app.use('/graphql', bodyParser.json(), graphqlExpress({
    context: {mongo}, // 4
    schema
  }));
  app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
  }));

  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Hackernews GraphQL server running on port ${PORT}.`)
  });
};

// 5
start();
```

</Instruction>

我们一起来看看这里的变化：

1. 导入刚刚创建的函数。
2. 使用异步函数将整个应用程序设置代码包起来。这里只是用到了 **[async/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)** 语法, 对于异步函数你也可用使用 [promise](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise) 语法。
3. 调用 MongoDB 连接韩素，等待连接完成。
4. 将 MongoDB 集合放入 `context` 对象中。这是一个特殊的 GraphQL 对象，它被传递给所有的解析函数，因此它是它们之间共享代码（如连接器）的完美场所。
5. 运行 `start` 函数。

<Instruction>

现在剩下的是使用 MongoDB 提供的 API 替换解析函数中的数组逻辑：

```js(path=".../hackernews-graphql-js/src/schema/resolvers.js")
module.exports = {
  Query: {
    allLinks: async (root, data, {mongo: {Links}}) => { // 1
      return await Links.find({}).toArray(); // 2
    },
  },

  Mutation: {
    createLink: async (root, data, {mongo: {Links}}) => {
      const response = await Links.insert(data); // 3
      return Object.assign({id: response.insertedIds[0]}, data); // 4
    },
  },

  Link: {
    id: root => root._id || root.id, // 5
  },
};
```

</Instruction>

步骤如下：

1. 在 `graphqlExpress` 函数调用中，**context** 对象是第三个指定的参数，每个解析函数都可以访问它。
2. 对于 `allLinks` 查询，需要在 `Links` 集合中调用 MongoDB 的 `find` 函数，然后将结果转换为数组。
3. 对于 `createLink` 变更，可以通过 `Links.insert.` 保存数据。
4. 在 `createLink` 内，仍然要使用MongoDB中的 `insertedIds` 来返回 `Link`对象。
5. MongoDB 会自动生成 ids，这是非常好的！不过，它称之为`_id`，而模式称它们为 `id`。可以将模式更改为使用 `_id`，但这是讨论其他类型的解析函数的绝佳机会。 正如我们所看到的，我们可以在模式中使用任何GraphQL 类型的解析函数，它不一定只适用于 `Query` 和 `Mutation`。在这种情况下， 我们可以在 `Link` 类型中创建自己的 `id` 字段。当服务器接收到请求时，会触发相应的解析函数，我们就可以获取 `_id` 而不是 `id`。 解析函数的第一个参数 (叫做 `root`) 是一个包含当前类型数据的对象。对于 `Query` 和 `Mutation` 它应该为null，但对于其他类型，它将包含其他解析函数为其返回的任何内容。

尝试重新启动服务器，并通过 `createLink` 在 GraphiQL 中添加一些新的链接，然后用 `allLinks` 查询它们。它应该像以前一样工作，除此之外，当您再次重新启动服务器时，数据将仍然存在。
