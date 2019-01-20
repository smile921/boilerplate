---
title: 入门介绍
pageTitle: "使用 Javascript 构建 GraphQL 服务器"
description: "学习使用 graphql-js，Node.JS， Express 和 MongoDB 来创建 GraphQL 服务器并且了解关于认证，分页，过滤以及订阅的最佳实践。"
question: 哪些是 GraphQl 服务器的要求？
answers: ["运行在 NodeJS", "通过订阅功能实现实时更新", "校验 GraphQL 请求", "通过模式中定义的类型自动生成查询和变更。"]
correctAnswer: 2
description: Read about what you'll learn in the graphql.js tutorial
---

### 动机

目前，无服务器后端正越来越流行。如 [Graphcool](https://www.graph.cool/) 让开发人员更加关注到应用的业务逻辑，而不需要编写其他层面的代码。

但是，有时候你还是需要编写一些服务器端的代码。如：产品需要开发一些其他的功能，或者需要完全掌控服务器端，不管是何种原因，如果你想了解如何自己构建 GraphQL 服务器，拿着一章节就是为您而准备的！

在这章节中您将学习如何通过使用下面的技术来构建自己的 GraphQL 服务器：

* 服务器

    * [Node.js](https://nodejs.org/en/): Javascript 服务器运行环境。
    * [Express](https://expressjs.com/): 目前最流行的 Node.js web 框架。您也可以使用 [Koa](http://koajs.com/)， [Hapi](https://hapijs.com/) 或者其他框架。
* 测试
    * [GraphiQL](https://github.com/graphql/graphiql): 非常有用的工具，用于快速测试GraphQL API。没有必要构建一个完整的前端应用程序来测试用例，但是也可以使用 [Postman](https://www.getpostman.com/) 或其他类似工具手动构建和发送 GraphQL 请求。相比于其他工具，GraphiQL 还提供了：
        * 为所有的查询和变更生产文档。
        * 提供一个编辑器用来编写您的请求包括语法高亮和自动补全。
        * 显示服务器的响应。
        * 容易配置！

### 什么是 GraphQL 服务器？

GraphQL 服务器应该具备以下功能:

* 接受 GraphQL 格式的请求。例如：

```json
{ "query": "query { allLinks { url } }" }
```

* 连接到数据库或者其他的服务来存储或者获取数据。
* 返回一个 GraphQL 响应对象。例如:

```json
{ "data": { "allLinks": { "url": "http://graphql.org/" } } }
```

* 按照模式中的类型定义来校验接受的请求。比如当查询包含为定义的字段，那么返回的对象应该是这样：

```json
{
  "errors": [{
    "message": "Cannot query field \"unknown\" on type \"Link\"."
  }]
}
```

以上就是 GraphQL 服务器的基本功能，当然您也可以根据需要实现更多的功能。您可以在 [官方规范](https://facebook.github.io/graphql/) 中了解更多。

### 模式驱动开发

关于构建 GraphQL 服务器的一个重要的事情就是主要的开发过程将围绕模式定义。本章将会看到，我们将遵循的主要步骤如下：

1. 定义类型然后为类型定义查询和变更。
2. 编写 **解析函数** 来处理类型和它们的字段。
3. 当有新的需求时，重复上面的步骤。

模式就相当于前端开发人员和后端开发人员之间签署的 *合同*。这使得并行化工作变得更加容易，因为前端可以从一开始就充分了解 API，使用简单的模拟数据服务（甚至完整的后台，如 Graphcool），当后端服务可用时就可以轻松切换。
