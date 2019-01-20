---
title: 入门
pageTitle: "使用 GraphQL、 React 和 Relay 的全栈教程"
description: 学习如何使用 GraphQL、React 和 Relay 构建生产级的 Hackernews 克隆。前端上你需要使用 create-react-app，后端上使用 Graphcool。
question: 使用 GraphQL 客户端库的最大优点是什么？
answers: ["更方便地在应用内使用动画", "使你免于编写用于网络传输和缓存的基础设施代码", "GraphQL 客户端主要用于提升安全性", "GraphQL 客户端并没有啥实际上的优势，但是使用第三方库总是好的"]
correctAnswer: 1
videoId: 9_pIJAnpJQM
duration: 4
---


### 概览

通过之前的章节，你学到了 GraphQL 的主要概念和优点。现在是时候撸起袖子做一个实际的项目了！

你要做的是一个 [Hackernews](https://news.ycombinator.com/) 的克隆。下面是这个应用的功能特性：

- 展示一个链接列表
- 用户可以认证
- 认证用户可以创建链接
- 认证用户可以点击赞成链接（每用户每个链接只能一个赞成）
- 其他用户创建链接或者赞成链接的时候实时更新

这个过程中，你会使用下面技术来构建应用：

- 前端：
    - [React](https://facebook.github.io/react/)：构建用户界面的前端框架
    - [Relay](https://facebook.github.io/relay/): Facebook 开发的强大 GraphQL 客户端，为性能作了高度优化
- 后端：
    - [Graphcool](https://www.graph.cool/)：结合 GraphQL 和 Serverless 的弹性后端平台

你将 [`create-react-app`](https://github.com/facebookincubator/create-react-app) 使用创建一个 React 项目，它是一个流行的命令行工具，能给一个所有配置都调整好的空项目。


### 为什么要使用 GraphQL 客户端？

在 GraphQL 部分的 [客户端]() 章节，我们已经从高层级上阐述 GraphQL 了客户端的职责，现在我们来讨论点更为具体的。

简而言之，你应该使用 GraphQL 客户端来完成重复性和应用无关的任务。譬如能够发送查询和变更而不用关心低层级的网络状态或者维护一个本地缓存。这是任何与 GraphQL 服务器通信的应用都需要的前端功能 —— 如果有现成的优秀客户端可以，为何要自己再造一个轮子呢？

目前有不少 GraphQL 客户端库。对于非常简单使用场景（譬如编写脚本），[`graphql-request`](https://github.com/graphcool/graphql-request) 或许已经满足你的需求。然而依然有可能你会需要编写一个大型应用，这时候你就需要使用到缓存、乐观 UI 刷新等特性的优点。这时候你就更可能在 [Apollo Client](https://github.com/apollographql/apollo-client) 和 [Relay](https://facebook.github.io/relay/) 之间进行选择。


### Apollo vs Relay

从开始在前端使用 GraphQL 的人们口中听到的最常见的问题就是他们该使用哪一个 GraphQL 客户端。我们会给你一些提示你该在下个项目使用哪一个客户端！

[Relay](https://facebook.github.io/relay/) 是 Facebook 自家造的 GraphQL 客户端，于 2015 年和 GraphQL 一并开源。它集合了 Facebook 自 2012 年开发 GraphQL 开始的所有知识。Relay 为性能做了高度优化，它尽量减少了网络流量。一个有趣的边注是，Relay 一开始是作为**路由**框架而开发的，最终并入了数据载入的职责。这样最终进化成了一个强大的数据管理解决方案，能用于和 GraphQL API 交互的 JavaScript 应用中。

Relay 的性能优点也带来了学习曲线陡峭的代价。Relay 是一个复杂的框架，理解它所有的细节需要花些时间钻研进去。它的全面化提升于 1.0 版本一起发布，称作 [Relay Modern](https://facebook.github.io/relay/docs/relay-modern.html)，但是如果你是找一个作为**起步**的 GraphQL 客户端，Relay 可能并不是正确选择。

[Apollo Client](https://github.com/apollographql/apollo-client) 是一个社区驱动，共同努力开发的易于理解的、弹性的强大 GraphQL 客户端。Apollo 致力于开发一个用于所有主流平台的库，以便人们用以开发网站和移动客户端。目前有 JavaScript 客户用于绑定流行框架，譬如 [React](https://github.com/apollographql/react-apollo)、[Angular](https://github.com/apollographql/apollo-angular) 和 [Vue](https://github.com/Akryum/vue-apollo)，也有用于 [iOS](https://github.com/apollographql/apollo-ios) 和 [Android](https://github.com/apollographql/apollo-android) 的早期客户端。Apollo 是一个生产级的库，拥有很多称手的功能特性，譬如缓存、乐观 UI、订阅支持等等。
