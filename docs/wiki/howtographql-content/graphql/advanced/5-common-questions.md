---
title: 常见问题
pageTitle: "常见 GraphQL 问题"
description: "常见 GraphQL 问题，如服务端缓存、授权、认证、错误处理、离线使用等的回答。"
question: GraphQL 服务器如何处理失败？
answers: ["GraphQL 服务器从不失败", "它使用 HTTP 状态码来表示出错的事项", "它会在服务端响应中返回一个详细的错误对象", "它会躲在床下哭泣"]
correctAnswer: 2
---


### GraphQL 是一种数据库技术吗？

不，GraphQL 经常被误解成一种数据库技术，但是它事实上是一种用于 API 而不是数据库的**查询语言**。也就是说，它是数据库无差别的，可以配合任何一种数据库使用，甚至也可以无数据库。

### GraphQL 只是面向 React / Javascript 开发者的吗？

不，GraphQL 是一种 API 技术，只要用到了 API 的场景，它就能用。

在**后端**，GraphQL 服务器可以用任何开发 Web 服务器的编程语言实现。除了 Javascript，还有使用 Ruby、Python、Scala、Java、Clojure、Go 和 .Net 实现的版本。

因为 GraphQL API 通常通过 HTTP 操作，所以任何使用 HTTP 的客户端都能从 GraphQL 服务器查询数据。

> 注意：GraphQL 其实是传输层无差别的，所以你也可以选择 HTTP 之外的其他协议来实现你的服务器。

### 服务端缓存怎么做？

针对 GraphQL 的一个常见考量是保持服务端缓存的难度，特别是相比较 REST 而言的时候。使用 REST 的时候，为每个入口端点保持缓存十分容易，因为毫无疑问它们数据的**结构**不会变化。

但是对于 GraphQL，就是另一个中情景，你根本不知道客户端下一次会请求什么数据，所以在 API 后面放一个缓存层意义不大。

GraphQL 服务端缓存依然是个挑战，关于缓存的更多信息可以在 [GraphQL网站](http://graphql.org/learn/caching/) 查看，另附 [中文页](http://graphql.cn/learn/caching/)。

### 如何做认证和授权？

认证和授权通常被混淆。**认证**通常指声明**身份**的过程。例如你登录一个服务的时候，你会输入你的用户名和密码，然后就成功的认证了你自己。而另一面，**授权**则描述了**权限规则**，亦即指明某个用户或者用户组是否可以接入系统中的某部分。

GraphQL 中的认证可以使用常规的模式实现，譬如 [OAuth](https://oauth.net/)。

如果要实现授权，[建议](http://graphql.org/learn/authorization/) 委托数据接入逻辑给业务逻辑层，而不是直接由 GraphQL 处理。如果你想获取一些实现授权逻辑的灵感，你可以看看  [Graphcool's permission queries](https://www.graph.cool/blog/2017-04-25-graphql-permission-queries-oolooch8oh/)。

### 如何做错误处理？

一个成功的 GraphQL 查询被认为会返回一个 JSON 对象，其有一个 `"data"` 根字段。如果请求失败或者部分失败（譬如用户并没有请求数据的部分权限），那么响应中就会出现第二个根字段 `"errors"`：

```js(nocopy)
{
  "data": { ... },
  "errors": [ ... ]
}
```

关于更多细节，你可以查看 [GraphQL 规范](http://facebook.github.io/graphql/#sec-Errors)。

### GraphQL 支持离线数据吗？

GraphQL 是一个 API 查询语言，也就是说从定义上来看只能在线使用。然而客户端的离线支持也是一个可行的考量。Relay 和 Apollo 的缓存机制已经足够用于某些离线场合，但是目前并没有一个持久化数据的通行解决方案。你可以从 GitHub 的 issue 页面  [Relay](https://github.com/facebook/relay/issues/676) 和  [Apollo](https://github.com/apollographql/apollo-client/issues/424) 获得关于离线支持更深入的探讨。

> 另外 [这](http://www.east5th.co/blog/2017/07/24/offline-graphql-queries-with-redux-offline-and-apollo/) 还有一个有趣的离线使用和持久化方法。


