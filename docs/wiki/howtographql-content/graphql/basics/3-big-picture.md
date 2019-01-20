---
title: 大趋势 (架构)
pageTitle: "GraphQL 架构 & 大趋势"
description: "了解 GraphQL 在不同架构下的使用情况，以及后端和前端的主要组件，如解析器函数和客户端库"
question: 什么是解析函数?
answers: ["GraphQL 客户端用于在前端解析查询的函数", "一个解决所有问题的函数", "它是无服务器函数的同义词", "GraphQL服务器上负责为单个字段提取数据的函数"]
correctAnswer: 3
videoId: b7tMHnxzK34
duration: 10
---

GraphQL 自发布以来就仅作为一种 *规范*。这意味着GraphQL实际上不只是一个[长长的文档](https://facebook.github.io/graphql/)，而是详细描述了 *GraphQL服务器* 的行为。

如果你想自己使用 GraphQL，你必须自己去构建 GraphQL服务器。您可以使用您选择的任何编程语言（例如，基于[可用参考实现](http://graphql.org/code/) 来自机构建或使用 [Graphcool](http：// www.graph.cool/) 服务，它提供了一个强大的开箱即用的 GraphQL API。

### 用例

在本节中，我们将介绍3种不同类型的 GraphQL 服务器架构：

1. 带有数据库连接的 GraphQL 服务器
2. GraphQL 服务器作为多个第三方或旧系统前面的中间层，并通过单个 GraphQL API 集成
3. 介于两者中间的混合架构

所有这三种架构都代表了 GraphQL 的主要用例，并展示了 GraphQL 的灵活性。

#### 1. 带有数据库连接的 GraphQL 服务器

这个架构是在 *绿地模式* 项目中最常见的。一般都是一台您（Web）GraphQL 服务器。当查询请求到达 GraphQL 服务器时，服务器读取查询的载荷并从数据库中提取所需的信息。这个过程被称为 *解析* 查询。然后，它按[官方规范](https://facebook.github.io/graphql/#sec-Response)中的描述构建响应对象，并将其返回给客户端。

但需要注意的是，GraphQL 实际上是 *传输层不可知*。这意味着它可以潜在地与任何可用的网络协议一起使用。因此，可能会实现基于TCP，WebSockets等的 GraphQL服务器。

GraphQL也不关心数据库或用于存储数据的格式。您可以使用 [AWS Aurora](https://aws.amazon.com/rds/aurora)等 SQL 数据库或 [MongoDB](https://www.mongodb.com/)等 NoSQL 数据库。

![](http://imgur.com/kC0cFk7.png)
*单个 GraphQL 服务器连接单个数据库的架构就叫做绿地架构。*


#### 2. GraphQL 服务器作为多个第三方或旧系统前面的中间层

GraphQL 的另一个主要用例是将多个现有系统集成在单一的 GraphQL API 服务器后面。这对具有遗留基础设施和许多不同 API 的公司尤其引人注目，这些 API 已经成长了多年，现在却造成了很高的维护负担。这些传统系统的一个主要问题是，它们几乎不可能构建需要访问多个系统的创新产品。

在这种情况下，GraphQL 可用于*统一* 这些现有系统，并将其复杂性隐藏在一个 GraphQL API 服务器之后。这样，当需要开发新的客户端应用程序，只需与 GraphQL 服务器通信即可获取所需的数据。然后，GraphQL 服务器负责从现有系统中提取数据，并以 GraphQL 响应格式进行打包。

就像在之前的架构中，GraphQL 服务器不关心正在使用的数据库的类型，这一次它不关心数据源，它需要 *解析* 查询然后返回所需的数据。

![](http://imgur.com/168FvP4.png)
*GraphQL 允许您隐藏现有系统的复杂性，例如单个 GraphQL 接口后面的微服务、传统基础架构或第三方 API*

#### 3. 有连接数据库和现有系统集成的混合架构

最后，介于两者架构中间，也可以是有数据库连接但仍与旧版或第三方系统通信的 GraphQL 服务器。

当服务器接收到查询时，它将解析查询，并从连接的数据库或某些集成的API中检索所需的数据。

![](http://imgur.com/oOVYriG.png)
*这两种架构也可以组合起来，GraphQL 服务器可以从单个数据库以及现有系统获取数据，从而实现完全灵活性，并将所有复杂数据推送到服务器。*

### 解析函数

但是，如何通过 GraphQL 获得这种灵活性？它又是轻松的适用于各种不同的架构的呢？

如上一章所了解，GraphQL 查询（或突变）的载荷是由一组 *字段* 组成。在 GraphQL 服务器中，每个这些字段实际上对应于一个[*resolver*](http://graphql.org/learn/execution/#root-fields-resolvers)的函数。解析函数的唯一目的是获取对应字段的数据。

当服务器收到一个查询时，它将调用查询的有效载荷中指定的字段的所有解析函数。这就是 *解析* 查询的过程，通过这个过程能够检索每个字段的正确数据。一旦所有解析函数执行完，服务器将按照查询描述的格式打包数据，并将其发送回客户端。

![](http://imgur.com/cP2i8Da.png)
*查询中的每个字段都有对应的 [resolver 函数](http://graphql.org/learn/execution/#root-fields-resolvers)。当查询请求到达服务器时，GraphQL 将调用所有对应解析函数。*

### GraphQL 客户端库

GraphQL 对于前端开发人员来说特别友好，因为它完全消除了 REST API 的诸多不便和缺点，例如过度和欠缺。复杂性被推到服务器端，强大的机器可以处理繁重的计算工作。客户端不必知道它获取的数据实际来自哪里，并且可以使用单一，一致和灵活的 API。

让我们看下 GraphQL 是如何引入的重大变化的即从一个命令式数据获取方式转变为一个纯粹的声明性获取方式。从REST API获取数据时，大多数应用程序须执行以下步骤：

1. 构造和发送HTTP请求（例如，在 Javascript 中使用 `fetch`）
2. 接收并解析服务器响应
3. 在本地存储数据（简单地在内存或持久性）
4. 在 UI 中显示数据

使用理想的 *声明数据获取* 方法，客户端只需要执行以下两个步骤：

1. 描述数据要求
2. 在UI中显示数据

所有下级网络任务以及存储数据都应该被抽象出来，数据依赖关系的声明应该是主要的部分。

这正是前面章节中提到的 GraphQL 客户端库如 Relay 或者 Apollo 做的事情。它们提供了您需要关注应用程序重要部分的抽象，而不必处理重复执行基础架构实现。
