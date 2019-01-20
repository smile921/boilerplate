---
title: 变更
pageTitle: "使用 Javascript 构建 GraphQL服务器之变更"
description: "了解使用 graphql-js，Javascript，Node.js 和 Express 构建 GraphQL 服务器的突变的最佳实践。并且使用 GraphiQL playground 来测试。"
question: 对于 GraphQL 字段参数，哪些不正确的？
answers: ["它们定义来客户端将数据传递到服务器的方式", "它们必须包含在字段模式定义中", "它们可以在解析函数内访问", "只有突变字段才能由"]
correctAnswer: 3
---

### 创建链接的变更

设置突变与查询一样简单，遵循相同的过程。

<Instruction>

首先在 `src/schema/index.js` 文件中的 `typeDefs` 变量中添加 `createLink` 变更：

```graphql(path=".../hackernews-graphql-js/src/schema/index.js")
type Mutation {
  createLink(url: String!, description: String!): Link
}
```

</Instruction>

### 带参数的解析函数

<Instruction>

然后在 `src/schema/resolvers.js` 文件中为 `createLink` 变更添加一个解析函数：

```js{5-11}(path=".../hackernews-graphql-js/src/schema/resolvers.js")
module.exports = {
  Query: {
    allLinks: () => links,
  },
  Mutation: {
    createLink: (_, data) => {
      const newLink = Object.assign({id: links.length + 1}, data);
      links.push(newLink);
      return newLink;
    }
  },
};
```

</Instruction>

请注意，在这种情况下，需要访问通过突变传递的参数。第二个解析函数参数正是我们所需要的，不仅用于突变，而且对于希望任何其他时间都能访问此数据（例如，在后面需要构建的具有参数的查询）。

由于现在只使用本地数组，当使用数据库连接时只需要添加一些生成的 ID，并将其作为响应返回。

### 用 playground 来测试

只需重新启动服务器，再使用 GraphiQL 来测试新的突变：
![](http://i.imgur.com/4pKJ9ji.png)