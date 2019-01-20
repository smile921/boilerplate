---
title: 查询
pageTitle: "使用 Javascript 构建 GraphQL服务器之查询解析"
description: "了解如何使用 graphql-js 定义 GraphQL模式，使用 Javascript 和 Node.js实现查询解析函数，并在 GraphiQL Playground 中测试查询。"
question: 测试 GraphQL api 的最快方法是什么？
answers: ["使用 CURL 构建 GraphQL 请求", "使用像 GraphiQL 这样的 playground", "
使用 Postman 或类似的应用程序发送 HTTP 请求", "构建发送请求的前端客户端应用"]
correctAnswer: 1
---

### 链接的查询字段

<Instruction>

首先，在 `src/schema/index.js` 中 添加 `allLinks` 查询模式里面。

```js(path=".../hackernews-graphql-js/src/schema/index.js")
const typeDefs = `
  type Link {
    id: ID!
    url: String!
    description: String!
  }

  type Query {
    allLinks: [Link!]!
  }
`;
```

</Instruction>

目前还不需要添加任何参数，当我们开始处理过滤和分页时再添加相应的参数。

### 查询解析函数

现在查询已经定义好了，但服务器仍然不知道如何处理它。要做到这一点，需要编写第一个 **解析函数**。解析函数只是用来解析相应 GraphQL 字段和行为。

<Instruction>

首先来创建一个返回本地数组的固定内容的简单解析函数。将解析函数放在单独的文件 `src/schema/resolvers.js` 中，因为它们会随着添加更多字段而增长：

```js(path=".../hackernews-graphql-js/src/schema/resolvers.js")
const links = [
  {
    id: 1,
    url: 'http://graphql.org/',
    description: 'The Best Query Language'
  },
  {
    id: 2,
    url: 'http://dev.apollodata.com',
    description: 'Awesome GraphQL Client'
  },
];

module.exports = {
  Query: {
    allLinks: () => links,
  },
};
```

</Instruction>

<Instruction>

现在，只需将这些解析函数传递给 `makeExecutableSchema` 用来构建模式对象：

```js(path=".../hackernews-graphql-js/src/schema/index.js")
const {makeExecutableSchema} = require('graphql-tools');
const resolvers = require('./resolvers');

// ...

module.exports = makeExecutableSchema({typeDefs, resolvers});
```

</Instruction>

### 用 playground 进行测试

是时候测试目前的功能了！就像之前说到的一样我们将用到 [GraphiQL](https://github.com/graphql/graphiql)。

这非常容易设置。只需要使用 `apollo-server-express` 包中的 `graphqlExpress` 和`graphiqlExpress`。

<Instruction>

在 `src/index.js` 文件中添加下面的内容:

```js(path=".../hackernews-graphql-js/src/index.js")
const {graphqlExpress, graphiqlExpress} = require('apollo-server-express');

// ...

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));
```

</Instruction>

<Instruction>

就是这样！现在在终端用 `node ./src/index.js` 命令重新启动服务器，用浏览器打开 [localhost：3000/graphiql](http://localhost:3000/graphiql)。你会看到一个很友好的 IDE，看起来像这样：

![](http://i.imgur.com/0s8NcWR.png)

</Instruction>

<Instruction>

点击右上角的 **文档** 链接，查看生成的模式文档。你会看到那里的 `Query` 类型，点击它会显示新的 `allLinks` 字段，就像你定义的那样。

![](http://i.imgur.com/xTTcAZl.png)

</Instruction>

<Instruction>

试试看！在最左侧的文本框中，键入一个简单的查询，列出所有链接，然后点击 **播放** 按钮。这是你会看到的下面的内容：

![](http://i.imgur.com/LuALGY6.png)

</Instruction>

您可以使用此工具尽可能多地测试现有功能。它使 GraphQL API 的测试变得很有趣和容易。
