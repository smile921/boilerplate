---
title: 分页
pageTitle: "使用 Javascript 构建 GraphQL服务器之分页"
description: "了解在 Node.js ＆Express GraphQL 服务器中 GraphQL API 通过使用查询参数实现限制-偏移的分页方式的最佳实践。"
question: 如何在 GraphQL 服务器中实现分页？
answers: ["需要定义一个特殊的分页根类型", "简单地使用字段参数
", "需要使用 `graphql-tools` 的特殊功能", "现在不可能"]
correctAnswer: 1
---

Hackernews 的另一个重要功能就是分页。获取曾发布到应用程序的所有链接确实不是一个好的做法。通常的做法的是一次只显示几个，让用户导航到以前的链接。

> 在本教程中，我们将实现一个简单的分页功能，称为限制-偏移分页。这种方法不能用于使用 Relay 的前端，因为 Relay 中使用的是基于游标的分页方式。您可以在 GraphQL [文档](http://graphql.org/learn/pagination/) 中阅读更多有关分页的信息。

<Instruction>

我们需要再次更新 `allLinks` 的结构：

```graphql(path=".../hackernews-graphql-js/src/schema/index.js")
type Query {
  allLinks(filter: LinkFilter, skip: Int, first: Int): [Link!]!
}
```

</Instruction>

如果提供了 `first` 参数的话，GraphQL 将返回指定参数的链接数。 如果提供了 `skip` 参数的话则跳过指定数量的链接数。

<Instruction>

这通过使用游标方法和 MongoDB 来实现非常简单分页功能。

```js(path=".../hackernews-graphql-js/src/schema/resolvers.js")
Query: {
  allLinks: async (root, {filter, first, skip}, {mongo: {Links, Users}}) => {
    let query = filter ? {$or: buildFilters(filter)} : {};
    const cursor = Links.find(query)
    if (first) {
      cursor.limit(first);
    }
    if (skip) {
      cursor.skip(skip);
    }
    return cursor.toArray();
  },
},
```

</Instruction>

这就可以了！现在重新启动服务器并进行测试。

![](https://i.imgur.com/20H6nmg.png)