---
title: react-apollo 入门介绍
pageTitle: "GraphQL 全栈营之 React 和 Apollo"
description: "学习使用 GraphQL， React 和 Apollo 客户端来构建一个 HackNews 克隆应用，前端使用 create-react-app 后端使用 Graphcool 服务。"
videoId: lQDrREfapow
duration: 5
videoAuthor: "Abhi Aiyer"
question: 使用GrapQL客户端库最大的好处是啥？
answers: ["它使您可以轻松地在应用程序中使用动画效果", "GraphQL 客户端主要用来提高安全性", "避免了自己实现基础设施代码和网络缓存", "GraphQL 客户端没有提供什么，但使用第三方库总是好的"]
correctAnswer: 2
---


### 概要

通过之前的教程，您已经了解了 GraphQL 的主要概念和优点。现在是时候小试牛刀开始做一个项目了！

您将构建一个简单的 [Hackernews](https://news.ycombinator.com/) 应用。下面是应用的功能：

- 显示链接列表
- 搜索链接
- 用户登录
- 登录用户可以创建链接
- 经过身份验证的用户可以点赞链接（每个链接和用户一次）
- 当其他用户点赞链接或创建一个新的链接时，实时更新

下面是构建应用将使用的技术:

- 前端:
    - [React](https://facebook.github.io/react/): 用于构建用户界面的前端框架
    - [Apollo Client](https://github.com/apollographql/apollo-client): 功能齐全的GraphQL客户端
- 后端:
    - [Graphcool](https://www.graph.cool/): 灵活的后端平台组合 GraphQL + Serverless

将使用 [`create-react-app`](https://github.com/facebookincubator/create-react-app) 创建项目。

### 为什么需要GraphQL客户端？

在之前的[客户端](/advanced/0-clients/)部分，我们已经在介绍了GraphQL客户端的作用，现在我们将更具体的了解到它。

简而言之，GraphQL 客户端可以处理在构建应用中那些重复和不可预知的任务。比如说，发送查询或者突变，而不需要担心较低级别的网络细节或维护本地缓存。在任何与 GraphQL 服务端通讯的客户端应用中都是需要这些功能的。如果有优秀的 GraphQL 客户端可以使用 - 为什么不？

有几个 GraphQL 客户端库可以选择。对于非常简单的用例（例如编写脚本），[`graphql-request`](https://github.com/graphcool/graphql-request) 就可以足够满足您的需要。然而，对于编写一个更大的应用程序，则需要从缓存，乐观UI更新等多方面考虑。在这些情况下，您几乎可以选择 [Apollo Client](https://github.com/apollographql/apollo-client) 或者 [Relay](https://facebook.github.io/relay/)。

### Apollo vs Relay

对刚开始在前端使用 GraphQL 时，经常被提及的问题是该选择哪个 GraphQL 客户端。我们将给您提供些意见，以帮助您做出选择！

[Relay](https://facebook.github.io/relay/) 是由 Facebook 开发的 GraphQL客户端，并在2015年与 GraphQL 一起开源。它实际上是 Facebook 自2012年开始使用 GraphQL 之后通过积累而衍生出来的工具。Relay 对性能进行了大量优化，并尽可能降低网络流量。一个有趣事情是，Relay 刚开始知识一个 _路由_ 框架，最终结合数据加载责任。因此，它发展成为一种功能强大的数据管理解决方案，可用于 Javascript 应用程序与 GraphQL API 接口。

Relay 的性能优势是以显著的学习曲线为代价。Relay 是一个非常复杂的框架，完全理解它都需要耗费一段时间。随着1.0版本 [Relay Modern](https://facebook.github.io/relay/docs/relay-modern.html) 的发布，这方面的整体情况有所改善，但如果您是刚开始使用 GraphQL 的话，Relay 可能不是一个好的选择。

[Apollo 客户端](https://github.com/apollographql/apollo-client)是一个社区驱动的杰作，旨在构建一个易于理解，灵活且功能强大的 GraphQL 客户端。旨在构建一个跨越平台的第三方库。现在有一个 Javascript 客户端，适用于各种流行框架，如 [React](https://github.com/apollographql/react-apollo)，[Angular](https://github.com/apollographql/apollo-angular) 或 [Vue](https://github.com/Akryum/vue-apollo) 以及早期版本的 [iOS](https://github.com/apollographql/apollo-ios) 和 [Android](https： //github.com/apollographql/apollo-android) 客户端。Apollo 开箱即用，拥有缓存，乐观 UI，订阅支持等诸多功能。
