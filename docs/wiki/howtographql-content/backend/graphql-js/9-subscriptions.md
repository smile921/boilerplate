---
title: 订阅
pageTitle: "使用 Javascript 构建 GraphQL服务器之实时订阅"
description: "了解如何使用 grahpql-js，Node.js，Express 和 MongoDB来实现服务器端的 GraphQL 订阅，以便为应用程序添加实时功能。"
question: 以下内容哪些是对的？
answers: ["应通过定期查询实现实时支持", "目前无法通过 GraphiQL 测试订阅", "订阅可以通过 web socket 来实现", "实现订阅的唯一方法是使用 `subscriptions-transport-ws` 包"]
correctAnswer: 2
---

### 动机

您的服务器现在可以正确处理查询和变更。仍然有一个 GraphQL 操作类型，它被称为 **[订阅](http://facebook.github.io/graphql/#sec-Subscription)**。当另外两个由客户端通过 HTTP 请求发送，订阅是服务器在某个事件发生时将数据本身推送给感兴趣的客户端的一种方式。这就是 GraphQL 处理 **实时** 通信的方式。

### 更新模式

<Instruction>

首先从更新模式开始，通过添加 `Subscription` 特殊类型与一个字段来处理关于链接的事件。

```graphql(path=".../hackernews-graphql-js/src/schema/index.js")
type Subscription {
  Link(filter: LinkSubscriptionFilter): LinkSubscriptionPayload
}

input LinkSubscriptionFilter {
  mutation_in: [_ModelMutationType!]
}

type LinkSubscriptionPayload {
  mutation: _ModelMutationType!
  node: Link
}

enum _ModelMutationType {
  CREATED
  UPDATED
  DELETED
}
```

</Instruction>

订阅其实很简单。在这里我们将遵循 [Graphcool Simple API](https://www.graph.cool/docs/reference/simple-api/overview-heshoov3ai/) 的规范，
再次让您更容易地在前端应用程序中替换它，以便可以快速浏览其他教程。但请记住，这不一定是这样，可以设计自己的订阅，以获得任何您喜欢的格式。

### 发布／订阅事件

在更新模式之后，下一步是实现解析器，就像以前的其他所有情况一样。订阅解析器是特别的，因为它们不应该立即返回响应。相反，它们只是将有效载荷的数据和那些客户端订阅了 *事件* 通知到服务器。

<Instruction>

要处理此订阅和发布的过程，您将使用 [`graphql-subscriptions`](https://github.com/apollographql/graphql-subscriptions)， 因此现在要安装它：

```bash(path=".../hackernews-graphql-js")
npm install --save graphql-subscriptions
```

</Instruction>

需要创建一个 `PubSub` 的实例，这是 `graphql-subscriptions` 提供的一个对象。由于服务器中只会需要有一个实例，因此无需将其传递给上下文。

<Instruction>

也可以为此提供一个文件，所以现在创建 `src/pubsub.js` 文件。

```js(path=".../hackernews-graphql-js/src/pubsub.js")
const {PubSub} = require('graphql-subscriptions');

module.exports = new PubSub();
```

</Instruction>

<Instruction>

确保将其包含在解析器文件的顶部。

```js(path=".../hackernews-graphql-js/src/schema/resolvers.js")
const pubsub = require('../pubsub');
```

</Instruction>

<Instruction>

现在可以为此订阅添加解析器，如下所示：

```js(path=".../hackernews-graphql-js/src/schema/resolvers.js")
Subscription: {
  Link: {
    subscribe: () => pubsub.asyncIterator('Link'),
  },
},
```

</Instruction>

<Instruction>

每当创建新链接时，都将触发订阅，因此发布逻辑将位于 `createLink` 中：

```js(path=".../hackernews-graphql-js/src/schema/resolvers.js")
Mutation: {
  createLink: async (root, data, {mongo: {Links}, user}) => {
    assertValidLink(data);
    const newLink = Object.assign({postedById: user && user._id}, data)
    const response = await Links.insert(newLink);

    newLink.id = response.insertedIds[0]
    pubsub.publish('Link', {Link: {mutation: 'CREATED', node: newLink}});

    return newLink;
  },
},
```

</Instruction>

### 配置 `SubscriptionServer`

剩下要做的就是设置一个新的端点来处理订阅请求。这是必要的，因为这个端点不会是一个简单的 HTTP 处理程序。它将使用 [WebSocket] (https://en.wikipedia.org/wiki/WebSocket)连接，这将在服务器和订阅的客户端之间保持连接。

幸运的是，不必了解 WebSocket 也能使其正常工作。

<Instruction>

只需安装另一个包来处理这个，即 [subscriptions-transport-ws](http://npmjs.com/package/subscriptions-transport-ws)。

```bash(path=".../hackernews-graphql-js")
npm install --save subscriptions-transport-ws
```

</Instruction>

<Instruction>

然后在 `src/index.js` 文件中添加下面的类容：

```js(path=".../hackernews-graphql-js/src/index.js")
const {execute, subscribe} = require('graphql');
const {createServer} = require('http');
const {SubscriptionServer} = require('subscriptions-transport-ws');
```

</Instruction>

<Instruction>

之后，用下面的代码把同样的文件中的 `app.listen` 替换成：

```js(path=".../hackernews-graphql-js/src/index.js")
const PORT = 3000;
const server = createServer(app);
server.listen(PORT, () => {
  SubscriptionServer.create(
    {execute, subscribe, schema},
    {server, path: '/subscriptions'},
  );
  console.log(`Hackernews GraphQL server running on port ${PORT}.`)
});
```

</Instruction>

<Instruction>

最后，在 `graphiqlExpress` 工具中为订阅添加另外一个端点：

```js{4-4}(path=".../hackernews-graphql-js/src/index.js")
app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
  passHeader: `'Authorization': 'bearer token-foo@bar.com'`,
  subscriptionsEndpoint: `ws://localhost:${PORT}/subscriptions`,
}));
```

</Instruction>

### 通过 playground 来测试

<Instruction>

最后测试新订阅功能！重新启动服务器，刷新 GraphiQL 窗口并重试一下。您会看到的不是通常的数据响应，在最右边的文本框将显示一条消息，表示它将在数据到达时被替换。

![](https://i.imgur.com/aUnwc95.png)

</Instruction>

<Instruction>

保持此窗口打开，然后在单独的窗口中打开另一个 GraphiQL。在第二个窗口中，发送一个创建新链接的突变，就像以前做过的一样。一旦完成，再次检查第一个窗口。将看到新创建的链接的数据。

![](https://i.imgur.com/rs8VzN2.png)

</Instruction>

现在添加更多的订阅将是轻而易举的，因为一切都已经设置好了。
