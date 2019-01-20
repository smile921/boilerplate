---
title: 过滤
pageTitle: "使用 Javascript 构建 GraphQL服务器之数据过滤"
description: "了解 Node.js 和 Express GraphQL 服务器的GraphQL API 中使用查询参数实现过滤器的最佳实践。"
question: 如何在GraphQL服务器中实现过滤器？
answers: ["需要定义一个特殊的过滤器根类型", "简单地使用字段参数
", "需要使用 `graphql-tools` 的特殊功能", "目前不可能"]
correctAnswer: 1
---

另一个重要的 Hackernews 功能就是搜索链接。我们已经知道可以通过参数将输入数据传递给突变。现在，也将使用相同的概念将可选过滤器应用于现有的 `allLinks` 查询。

<Instruction>

因此，首先在此查询的模式定义中添加一个新参数：

```graphql(path=".../hackernews-graphql-js/src/schema/index.js")
type Query {
  allLinks(filter: LinkFilter): [Link!]!
}

input LinkFilter {
  OR: [LinkFilter!]
  description_contains: String
  url_contains: String
}
```

</Instruction>


虽然可以使用任何想要的格式的过滤器。在这里，我们将再次遵循前端教程中使用的相同模式。通过使用 `description` 和 `url` 参数来搜索链接。

<Instruction>

现在返回到 `allLinks` 的解析器，并使用 MongoDB 查询来支持此过滤功能，如下所示:

```js(path=".../hackernews-graphql-js/src/schema/resolvers.js")
// ...

function buildFilters({OR = [], description_contains, url_contains}) {
  const filter = (description_contains || url_contains) ? {} : null;
  if (description_contains) {
    filter.description = {$regex: `.*${description_contains}.*`};
  }
  if (url_contains) {
    filter.url = {$regex: `.*${url_contains}.*`};
  }

  let filters = filter ? [filter] : [];
  for (let i = 0; i < OR.length; i++) {
    filters = filters.concat(buildFilters(OR[i]));
  }
  return filters;
}

module.exports = {
  Query: {
    allLinks: async (root, {filter}, {mongo: {Links, Users}}) => {
      let query = filter ? {$or: buildFilters(filter)} : {};
      return await Links.find(query).toArray();
    },
  },

  //...
};
```

</Instruction>

<Instruction>

重新启动服务器，然后尝试新的过滤器。
![](https://i.imgur.com/lrsChh9.png)

</Instruction>