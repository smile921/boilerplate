---
title: 工具和生态
pageTitle: "GraphQL 工具 & 生态教程"
description: "学习 GraphQL 生态和其炫酷的工具，例如 GraphiQL playgrounds 或者通过内省自我生成文档。"  
question: 大多数工具利用了什么机制来检查服务端类型系统？
answers: ["IDL", "内省", "GraphiQL", "订阅"]
correctAnswer: 1
---

如你所知，GraphQL 生态目前正在以惊人之速成长。其原因之一就是 GraphQL 使得工具开发十分便利。本章节中，我们将看看为何是这样，以及一些生态中已经有的优秀工具。

如果你熟悉 GraphQL 基础，你很可能知道如何通过 GraphQL 类型系统快速定义我们的 API 表现。它使得开发者能够明确地定义 API 能力，并且根据 schema 验证所有查询。

GraphQL 的一个惊人之处就在于，它的类型系统能力不仅仅可以为服务端所知，还能传达给客户端，只要客户端请求 schema 的信息。GraphQL 称这个能力为**内省**。

## 内省

schema 设计者是已经知道 schema 长什么样了，但是客户端该如何知道那些内容可以通过 GraphQL API 查到呢？我们可以通过查询 `__schema` 元字段向 GraphQL 请求这些信息，根据规范，这个字段在每个Query的根类型上可用。

```graphql
query {
  __schema {
    types {
      name
    }
  }
}
```

拿这个 schema 定义为例：

```graphql
type Query {
  author(id: ID!): Author
}

type Author {
  posts: [Post!]!
}

type Post {
  title: String!
}
```

如果我们发送上述的内省查询，将得到如下结果：

```json
{
  "data": {
    "__schema": {
      "types": [
        {
          "name": "Query"
        },
        {
          "name": "Author"
        },
        {
          "name": "Post"
        },
        {
          "name": "ID"
        },
        {
          "name": "String"
        },
        {
          "name": "__Schema"
        },
        {
          "name": "__Type"
        },
        {
          "name": "__TypeKind"
        },
        {
          "name": "__Field"
        },
        {
          "name": "__InputValue"
        },
        {
          "name": "__EnumValue"
        },
        {
          "name": "__Directive"
        },
        {
          "name": "__DirectiveLocation"
        }
      ]
    }
  }
}
```

如你所见，我们查询了 schema 上的所有类型。我们得到了标量类型和自定义的对象类型。我们甚至能通过内省得到内省类型。

内省类型上不只是有 name 而已，如另一个示例：

```graphql
{
  __type(name: "Author") {
    name
    description
  }
}
```

这个示例中，我们使用 `__type` 元字段查询了一个类型，我们请求了它的 name 和 description。下面是这个查询的结果：

```json
{
  "data": {
    "__type": {
      "name": "Author",
      "description": "The author of a post."
    }
  }
}
```

如你所见，内省是 GraphQL 的一个超级强大的特性，而我们也只是说了些皮毛罢了。规范中描述了更多的细节，指明了在内省 schema 上可用的字段和类型。

GraphQL 生态中的大部分工具都利用了内省系统来提供炫酷的特性。想想文档浏览器、自动完成、代码生成这些都成为了可能！一个你经常配合 GraphQL API 使用的工具就重度使用了内省系统，它就是 **GraphiQL**。

## GraphiQL

GraphiQL 是一个浏览器内 IDE，用于编写、验证和测试 GraphQL 查询。它定位为 GraphQL 查询编辑器，具有自动完成和验证功能，同时还是文档阅览器，可以将 schema 结构快速可视化。

它是一个用于开发的强大工具。它让你可以调试、测试查询 GraphQL 服务器，而不用手写原生 GraphQL 查询用于 curl 这种情况。

不妨一试！ http://graphql.org/swapi-graphql/
