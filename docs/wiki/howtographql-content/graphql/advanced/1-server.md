---
title: 服务器
pageTitle: "GraphQL 服务器概览教程"
description: "学习有关 GraphQL 服务器的主要概念，他如何通过解析函数执行 GraphQL 查询以及多个请求的批处理。"
question: 关于 GraphQL 服务器，哪一句是对的？
answers: ["对于给定查询，一个记录不会被获取一次以上。", "查询字段根据深度优先来解析", "解析器可以定义在字段级粒度", "不使用 DataLoader 的 GraphQL 服务器不算一个 GraphQL 服务器"]
correctAnswer: 2
---

GraphQL 通常被描述成专注于前端的 API 技术，因为相比以前，它使客户端可以更漂亮地获取数据。但是这个 API 本身，毫无疑问是在服务端实现的，在服务端实现也具有很多益处，因为 GraphQL 让服务端开发者专注于描述可用数据，而非实现和优化特定入口端点。

## GraphQL 执行

GraphQL 并不只是指定了描述 schema 和从 schema 获取数据的查询语言，还有如何将查询转化成结果的执行算法。这些算法其核心想当简单：查询被逐字段遍历，并执行其解析器。假设我们又下列 schema：

```graphql(nocopy)
type Query {
  author(id: ID!): [Author]
}

type Author {
  posts: [Post]
}

type Post {
  title: String
  content: String
}
```

这是我们将能向服务器这个 schema 发送的查询：

```graphql(nocopy)
query {
  author(id: "abc") {
    posts {
      title
      content
    }
  }
}
```

首先要看的是查询中的每个字段都能关联一个类型：


```graphql(nocopy)
query: Query {
  author(id: "abc"): Author {
    posts: [Post] {
      title: String
      content: String
    }
  }
}
```

这样我发就能快速找到我们服务器中每个字段的解析函数了。执行从查询类型裤长，然后以深度优先遍历。亦即，`Query.author` 的解析器先行执行，然后其解析结果会被传递至其子字段，`Author.posts`。在另一级别，其结果是列表，这时候执行算法就是一次执行一个元素，所以执行的流程就像这样：

```(nocopy)
Query.author(root, { id: 'abc' }, context) -> author
Author.posts(author, null, context) -> posts
对于 posts 中的每一个 post
  Post.title(post, null, context) -> title
  Post.content(post, null, context) -> content
```

最后，执行算法将所有的细节组合起来形成正确结构的结果，然后返回这个结果。

有件需要注意的事，大多数 GraphQL 服务器实现都会提供一个“默认解析器” —— 所以你并不需要为每一个字段都指定解析器。以 GraphQL.js 为例，在解析器的父对象包含对应的字段的时候，就不必这个字段的指定解析器。 

你可以在 Apollo 的博客上的  ["GraphQL Explained" post](https://dev-blog.apollodata.com/graphql-explained-5844742f195e) 进一步了解 GraphQL 执行。

## 批量解析

你可能注意到上述的执行策略似乎有点天真。譬如，你的解析器需要从后端 API 或者数据库取数据，而这个后端可能在查询执行期间被调用多次。假设我们要获取数篇文章的作者：

```grapqhl(nocopy)
query {
  posts {
    title
    author {
      name
      avatar
    }
  }
}
```

如果这是在博客上的文章，那么很可能多篇文章是同一个作者。因此我们需要发出 API 请求获得每个文章的作者，我们可能不经意地对同一作者发起多个请求：

```javascript(nocopy)
fetch('/authors/1')
fetch('/authors/2')
fetch('/authors/1')
fetch('/authors/2')
fetch('/authors/1')
fetch('/authors/2')
```

我们该如何解决这种情况呢？把我们的获取操作变得更智能点。我们将获取操作封装在一个工具里面，其会等待所有解析器运行，并保证每个元素只获取一次：

```javascript(nocopy)
authorLoader = new AuthorLoader()

// 将一大把获取操作放进队列
authorLoader.load(1);
authorLoader.load(2);
authorLoader.load(1);
authorLoader.load(2);

// 然后在载入器只执行最小量的工作
fetch('/authors/1');
fetch('/authors/2');
```

我们能做得更好吗？当然，如我们的 API 支持批量请求，我们可以只向后端请求一次，像这样：

```javascript(nocopy)
fetch('/authors?ids=1,2')
```

这个操作也能封装在上面的载入器内。

在 JavaScript 中，这个策略可以封装在一个叫作 [DataLoader](https://github.com/facebook/dataloader) 的工具内，其他语言中也有类似的工具。