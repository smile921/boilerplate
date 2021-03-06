---
title: "GraphQL 比 REST 更好"
description: "了解为什么 GraphQL 是一个比 REST API 更高效和灵活的选择。它拥有一个强大的类型系统，从而避免了前端过度或者欠缺获取数据的问题。"
question: GraphQL 的模式和强类型系统的好处是什么？
answers: ["它们与 Javascript类型系统挺适合", "一旦定义了模式，前端和后端团队可以独立工作", "它解决了 n + 1 请求问题", "逗我呢: GraphQL 更本就没有类型系统"]
correctAnswer: 1

videoId: T571423fC68
duration: 12
---

在过去的数十年中，[REST](https://en.wikipedia.org/wiki/Representational_state_transfer) 已经成为设计 Web API 的标准（但也是模糊的）。它提供了一些很好的想法，如 *无状态服务器* 和 *结构化资源访问*。然而 REST API 的灵活性却不能跟上需要从它获取数据的客户端的快速变化的需求。

GraphQL 就是为了应对更灵活更高效的需要变化而开发出来的！它解决了与 REST API 交互时开发人员遇到的许多短板和低效率。

为了说明 REST 和 GraphQL 作为 API 返回数据的主要区别，我们来考虑一个简单的示例场景：在博客应用程序中，应用程序需要显示特定用户的帖子的标题。同一屏幕还显示该用户的最后3位追随者的姓名。 那么 REST 和 GraphQL 分别将如何解决这种情况呢？

### REST vs GraphQL 之数据获取

对于REST API ，可以通过访问多个端点来收集数据。在这个例子中，这些可以是 `/users/:id` 端点来获取初始用户数据。其次，可能会有一个 `/users/:id/posts` 端点返回用户的所有帖子。然后，第三个端点将是 `/users/:id/followers` 返回一个用关注了此用户的用户列表。

![](http://imgur.com/VIWd5I5.png)
*使用 REST ，需要向三个不同的端点发送请求以获取所需的数据。但同时也 _过度获取_ 了一些客户端并不需要的数据。*

对于 GraphQL 的话，只需要向 GraphQL 服务器发送单个查询。然后，服务器将返回满足这些要求的 JSON 对象。

![](http://imgur.com/uY50GHz.png)
*使用 GraphQL，客户端可以精确返回 _查询_ 中所需要的数据。请注意，服务器返回的 _结构_ 精确地遵循查询中定义的嵌套结构。*

### 不再过度或者欠缺，而是刚刚好

REST 最常见的问题之一是过度或者欠缺获取。这是因为客户端下载数据的唯一方法是通过请求返回 _组合_ 数据结构的端点。设计能为客户提供确切的数据需求的 API 是非常困难的。

> "应该考虑 graphs，而不是端点。" —— 来自 GraphQL 共同开发者之一的 [Lee Byron](https://twitter.com/leeb) 的博客文章[使用GraphQL4年的经验与教训](http://www.graphql.com/articles/4-years-of-graphql-lee-byron)。

#### 过度获取: 下载多余的数据

*过度获取* 意味着客户端会下载比实际需要的更多信息。想象一下，例如一个屏幕，只需要显示一个用户名称列表。在 REST API 中，应用程序通常会请求 `/users` 端点并获取包含用户数据的 JSON 数组。然而，此响应可能包含了用户的更多其他信息，例如。他们的生日或地址即客户端不需要的信息，因为它只需要显示用户名。

#### 欠缺获取和需要多次获取即 n + 1 请求问题

另一个问题是 *欠缺* 和 *n + 1* 请求问题。也就是说特定的端点不能提供足够的所需信息。客户端将不得不发送额外的请求来获取所需的一切。如客户端需要首先下载元素列表的情况，然后需要为每个元素发送一个附加请求来获取所需的数据。

例如在同一个应用中需要显示每个用户的最后三个关注者。API 提供了附加端点 `/users/:id/followers`。为了能够获取所需的信息应用程序必须先向 `/users` 端点发出一个请求，再通过请求 `/users/:id/followers` 端点获取每个用户的关注者信息。

### 前端快速产品迭代

使用 REST API 常见的模式是根据应用程序中的视图来构造端点，以便客户端通过简单地访问相应的端点来获取特定视图的所有必需信息。

这种方法的主要缺点是它不允许在前端快速迭代。随着对UI的每一个变化，更多（或更少）的数据需求也就意味着更高的风险。因此，需要对后端进行调整以解决新的数据需求。这会导致生产力下降，特别是降低将用户反馈纳入产品的能力。

GraphQL 就很好的解决了这个问题。由于 GraphQL 的灵活性，客户端的更改可以在服务器上进行任何额外的工作。由于客户可以指定其确切的数据要求，因此前端设计和数据需求变化时，后端工程师不需要进行调整。

### 后端数据分析

GraphQL 允许对请求的数据进行细粒度的洞察。由于每个客户端都准确地指定其所需要的数据，因此深入了解可用数据的使用方式就变得可能。这极大帮助 API 的迭代及清楚的知道哪些字段不再被需要。

使用 GraphQL，还可以对服务器所处理的请求进行低级别的性能监视。 GraphQL 使用 *解析器函数* 的概念来收集客户端的请求。通过测量这些解析器函数的性能就整为整个系统的性能评估提供重要依据。

### 模式和类型系统的优点

GraphQL 使用强类型系统来定义 API 的功能。API 中所有类型都需要使用 GraphQL 模式定义语言（SDL）在 *模式* 中定义好。此模式将成为客户端和服务器之间的合同，以确定客户端获取数据的方式。

一旦模式定义好了，前端和后端工作的团队可以在不进行进一步沟通的情况下进行工作，因为他们都已经知道发送请求后获取到数据的确定结构。

前端团队可以通过模拟所需要的数据结构轻松测试其应用程序。一旦服务器准备就绪，便可以立即切换，以便从实际的 API 获取数据。
