---
title: 客户端
pageTitle: "GraphQL 客户端概览教程"
description: "了解更多关于 GraphQL 客户端的信息，譬如 Relay 和 Apollo Client，以及它们提供的特性，如缓存、schema 验证以及查询/视图共址。"
question: GraphQL 客户端在缓存查询结果之前会做些什么？
answers: ["根据 schema 验证查询结果", "正规化数据", "调用解析器函数", "使数据对 React 组件可用"]
correctAnswer: 1
draft: false
---


前端上使用 GraphQL API 有助于开发新的抽象层以实现客户端侧的共享功能。我们首先考虑一些你应用中可能用到的“基础设施”特性：

- 不构建 HTTP 请求而直接发送查询和变更
- 视图层集成
- 缓存
- 基于 schema 的验证和查询优化

当然，你依然可以使用原生 HTTP 获取数据，然后自行转换每一个数据位，直到你 UI 得到正确的数据。但是 GraphQL 也提供了抽象能力，使得摆脱以前需要手动处理的过程，而专注于你应用中真正重要的部分。下文中我们就要讨论这些。

> 目前有两款主流的 GraphQL 客户端 。 第一个是 [Apollo Client](http://dev.apollodata.com/)，这是一个社区驱动共同努力构建的一个面向所有主流平台的强大又具有弹性的 GraphQL 客户端。第二款是 [Relay](https://facebook.github.io/relay/)，它是 Facebook 自家的 GraphQL 客户端，也是网络上唯一一个为性能而重度优化的客户端。

### 直接发送查询和变更

GraphQL 的一大好处就是可以用**声明式**的方式来获取和更新数据。换句话说，我可以在 API 抽象载入器之上更进一步，不必自行处理底层的网络任务。

之前你使用原生 HTTP 来从 API 载入数据（像是 Javascript 中的 `fetch` 和 iOS 中的 `NSURLSession`），现在用 GraphQL 之后你所需要做的只是声明你的数据需求，然后系统就会帮你发送请求、处理回调。


### 视图层集成 & UI 更新

一旦 GraphQL 客户端收到服务器响应并被处理，你所请求的数据最终就会传递到你的 UI 中去。取决于你的开发平台和框架，常规的 UI 更新有各自的不同方法。

以 React 为例，GraphQL 使用了 [高阶组件](https://facebook.github.io/react/docs/higher-order-components.html) 的概念来获取数据，然后让数据在你组件的 `props` 中可用。通常而言，GraphQL 声明式的天性特别和 [函数式响应编程](https://en.wikipedia.org/wiki/Functional_reactive_programming) 技巧相契合。这两者都能组成强大组合，视图简单声明数据需求，UI 和你选择的 FRP 层绑定。


### 查询结果缓存：概念和策略

在主流应用中，你会想要维持已从服务器获取数据的缓存，将数据缓存于本地无疑会提升流畅的用户体验，也能降低数据请求规划负担。

通常缓存数据的时候，直觉上是将从远端获取的信息放到本地的 **store** 内，之后再从中获取。而 GraphQL 的话，原始的方式是将查询结果放进 store，然后遇到相同查询的时候就把数据取出来。当然结果就是这种方法对于大多数应用场景都效率低下。 

更有有效的一个方法是提前将数据**正规化**。这意味着将查询结果（可能有嵌套）扁平化，然后 store 只存取能够通过全局唯一 ID 引用的对象。你可以通过这篇 [Apollo 博客](http://dev.apollodata.com/core/how-it-works.html) 了解，文章记有对这类主题的详细解析。


### 编译时 Schema 验证和优化

由于 schema 包含客户端和 GraphQL API 交互所需的**所有**信息，因此能够在编译时验证、甚至优化客户端的查询。

当编译环境处理 schema 时，必要情况下它可以解析项目中的所有 GraphQL 代码，并和 schema 中的信息相比较，这样就能在应用抵达最终用户前捕捉到书写错误和其他错误，以避免灾难性的连锁错误。


### 视图和数据依赖的共址

GraphQL的一个强大概念就是让你能够将 UI 代码和数据需求放在一起。视图和数据的强耦合能提升开发体验（译者注：又称DX）。这避免了对数据如何正确渲染到视图这个流程的费神思考。

共址能运转得多好取决于你开发所在的平台。例如 Javascript 应用中，能够将数据需求和 UI 代码放进一个文件。同样，Xcode 中，_Assistant Editor_ 也能让视图控制器和 GraphQL 代码同时工作。

