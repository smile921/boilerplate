---
title: GraphQL 入门
pageTitle: 通过 GraphQL 全栈营了解 GraphQL基础概念 
description: "了解关于 GraphQL 的一切并知道为何它是一种比 REST 更好的 API 技术。它并不仅仅是只是为 React 和 Javascript 开发者准备的，而是适用于所有 API。"
question: 那些描述是正确的?
answers: ["GraphQL 是一种数据库技术", "GraphQL 只能和 SQL 一起使用", "GraphQL 是由 Facebook 发明的", "GraphQL 是由 Netflix 和 Coursera 开发的"]
correctAnswer: 2
videoId: oCT4HOJsUZQ
duration: 5
---

[GraphQL](http://www.graphql.org/) 是一种新的 API 标准，相较于 REST 而言它提供了一种更为高效，灵活的选择。它由 Facebook 开发并[开源](https://facebook.github.io/react/blog/2015/02/20/introducing-relay-and-graphql.html) 并且由一个来自全世界各大公司和个人组成的强大社区维护。

> API已成为软件基础设施无处不在的组件。简而言之，**API** 定义了 **客户端** 如何从 **服务器** 获取数据的方式。

GraphQL的核心是允许 _声明式的数据获取_ 也就是说客户端可以通过 API 获取到准确的需要的数据。相较于通过多个端点获取复合型数据，GraphQL 仅仅暴露一个端点就能准确的返回客户端需要的数据结构。

### GraphQL - 一个用于 API 的查询语言

现在大部分应用都需要从服务器的数据库获取数据。API 的责任就是为存储的数据提供适合应用程序所需要的接口。

GraphQL 经常被误以为是一种数据库技术。其实它是一种用于 API 的 _查询语言_ 而不是用于数据库的。也就是说它是与数据库无关的可用于任何 API 的上下文中。

### 相较于 REST 而言另一种更为高效的选择

[REST](https://en.wikipedia.org/wiki/Representational_state_transfer) 一直都是非常流行的服务器端传输数据的方式。当REST的概念成型时，客户端应用还相对简单以及开发速度并不像今天这么快速。因此 REST 能很好的适合很多应用。不过去几年来，API的格局发生了快速的变化。尤其有三个因素已经挑战了  API 的设计方式：

##### 1. 高速增长的移动设备访问需要更高效的数据加载方式。

Facebook 开发 GraphQL 的最初原因是因为移动设备使用量增加，低功耗设备和并不理想的网络环境。GraphQL 最大限度地减少了需要通过网络传输的数据量，从而大大提高了在这些条件下应用程序的运行速度。

##### 2. 各种各样的前端框架和平台

运行客户端应用程序的前端框架和平台的差异化环境使得难以构建和维护一个符合所有要求的 API。使用 GraphQL，每个客户端都可以准确的获取所需的数据。

##### 3. 快速的功能开发和迭代

持续部署已经成为许多公司的标准，快速迭代和频繁的产品更新是不可或缺的。使用 REST API，服务器获取数据的方式通常需要经常进行修改，以便在客户端方面考虑特定的需求和设计更改。这阻碍了快速开发实践和产品的迭代。

### 历史, 环境和适用改变的能力

#### GraphQL _不仅仅_ 只是为了 React 开发者

Facebook 在2012年就开始在其原生手机应用程序中使用 GraphQL。有趣的是，GraphQL 主要被运用在 Web 技术的上下文中使用，而在本地移动领域中获得的影响力却很小。

Facebook 第一次公开谈论 GraphQL 是在 [React.js Conf 2015](https://www.youtube.com/watch?v=9sc8Pyc51uU) 并宣布不久后[开源](https://facebook.github.io/react/blog/2015/05/01/graphql-introduction.html)。因为 Facebook 总是在 [React](https://facebook.github.io/react/) 中谈论 GraphQL，对于非 React开发人员来说，需要花一点点时间去了解，但 GraphQL 绝不是一种限于和 React 一起使用的技术。

#### 一个快速发展的社区

事实上，GraphQL 是使用在任何客户端与 API 通信的平台和框架。有趣的是，像 [Netflix](https://medium.com/netflix-techblog) 或 [Coursera](https://building.coursera.org/) 都正在研究类似的技术，使 API 交互更有效率。
Coursera 设想了一种类似的技术，让客户端来指定数据需求，Netflix 甚至开源他们的解决方案 [Falcor](https://github.com/Netflix/falcor)。在 GraphQL 开源后，Coursera 完全取消了自己的努力，并跳上了 GraphQL 火车。

目前已有[许多公司](http://graphql.org/users/)如 GitHub， Twitter， Yelp 和 Shopify 都已将 GraphQL 用于生产环境。

![](http://imgur.com/YZHGCzJ.png)
*尽管是如此新颖的技术，但是 GraphQL 已经被广泛采用。了解在生产中[还有谁](graphql.org/users/)使用 GraphQL。*

关于 GraphQL 会议有 [GraphQL Summit](https://summit.graphql.com/) 以及 [GraphQL Europe](https://graphql-europe.org/) 播客有 [GraphQL Radio](https://graphqlradio.com/) 还有 [GraphQL Weekly](https://graphqlweekly.com/) 订阅资讯。