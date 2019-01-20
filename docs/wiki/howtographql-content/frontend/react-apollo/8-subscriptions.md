---
title: 通过 GraphQL 订阅功能实时更新
pageTitle: "React & Apollo 教程之 GraphQL 订阅实现实时更新"
description: "了解如何使用 Apollo 客户端 和 React 以及 GraphQL 订阅来实现实时功能。 websockets 将由 subscriptions-transport-ws 处理。"
videoId: R-VLZ--sTzI
duration: 6
videoAuthor: "Abhi Ayer"
question: "Apollo 使用什么传输来实施订阅？"
answers: ["WebSockets", "TCP", "UDP", "HTTP 2"]
correctAnswer: 0
---

本章内容是关于如使用 GraphQL 订阅在应用中实现实时功能。

### 什么是 GraphQL 订阅?

当后端特定事件发生时，GraphQL 的订阅功能允许服务器发送数据到客户端。订阅通畅都由 [WebSockets](https://en.wikipedia.org/wiki/WebSocket) 来实现，它用于服务器保持于客户端的的连接。也就是说，我们用于以前与 API 的所有交互的 _请求-响应_ 不再用于订阅。相反，客户端最初通过指定其感兴趣的事件来打开与服务器的稳定连接。每次发生此特定事件时，服务器使用连接将与事件相关的数据推送到客户端。

### 通过 Apollo 订阅

使用 Apollo 时，我们需要使用有关订阅端点的信息配置 `ApolloClient`。可以使用`subscriptions-transport-ws` npm 模块的功能完成。

首先安装依赖。

<Instruction>

在项目目录下通过终端输入下面命令：

```bash(path=".../hackernews-react-apollo")
yarn add subscriptions-transport-ws
```

</Instruction>

下一步，确保 `ApolloClient` 实例知道出来订阅的服务器。

<Instruction>

在 `index.js` 文件中添加下面代码：

```js(path=".../hackernews-react-apollo/src/index.js")
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws'
```

</Instruction>

<Instruction>

然后添加下面配置代码:

```js(path=".../hackernews-react-apollo/src/index.js")
const networkInterface = createNetworkInterface({
  uri: 'https://api.graph.cool/simple/v1/<project-id>'
})

const wsClient = new SubscriptionClient('__SUBSCRIPTION_API_ENDPOINT__', {
  reconnect: true,
  connectionParams: {
     authToken: localStorage.getItem(GC_AUTH_TOKEN),
  }
})

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient
)

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {}
    }
    const token = localStorage.getItem(GC_AUTH_TOKEN)
    req.options.headers.authorization = token ? `Bearer ${token}` : null
    next()
  }
}])

const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions
})
```

</Instruction>

我们实例化了一个 `SubscriptionClient`，它知道订阅 API 的端点。请注意，我们还使用从`localStorage` 获取的用户的 `token` 来验证 websocket连接。

现在，您需要使用订阅 API 的端点替换占位符 `__SUBSCRIPTION_API_ENDPOINT__`。

<Instruction>

要访问此端点，在 `project.graphcool` 文件所在的目录。输入 `graphcool endpoints` 命令。然后复制 `Subscriptions API` 的端点，并用它替换占位符。

</Instruction>

> 注意：订阅 API 的端点通常的形式如下：`wss://subscriptions.graph.cool/v1/<project-id>`

### 订阅链接创建

为了让应用程序在创建新链接时实时更新，您需要订阅 `Link` 类型上发生的事件。通常有三种可以订阅的事件：

- 新的 `Link` 被创建。
- 已存在的 `Link` 被更新。
- 已存在的 `Link` 被删除。

我们将在 `LinkList` 组件中实现订阅。

<Instruction>

在 `LinkList.js` 文件中的 `LinkList` 类中添加下面代码：

```js(path=".../hackernews-react-apollo/src/components/LinkList.js")
_subscribeToNewLinks = () => {
  this.props.allLinksQuery.subscribeToMore({
    document: gql`
      subscription {
        Link(filter: {
          mutation_in: [CREATED]
        }) {
          node {
            id
            url
            description
            createdAt
            postedBy {
              id
              name
            }
            votes {
              id
              user {
                id
              }
            }
          }
        }
      }
    `,
    updateQuery: (previous, { subscriptionData }) => {
      // ... you'll implement this in a bit
    }
  })
}
```

</Instruction>

让我们解释下这里发生了什么。我们使用组件中的属性 `allLinksQuery`（因为我们将组件包裹在 `graphql` 容器中）来调用 [`subscribeToMore`](http://dev.apollodata.com/react/subscriptions.html#subscribe-to-more) 以连接 websocket 连接。

我们传递了两个参数给 `subscribeToMore`：

1. `document`: 这表示订阅本身。在我们的情况下，订阅将在 `Link` 类型上的 `CREATED` 事件触发，即每次创建新链接时。
2. `updateQuery`: 与 `update` 类似，此函数定义了客户端接受了服务器发送的信息后 store 更新存储的方式。

我们接下来将实现 `updateQuery`。这个函数与 `update` 略有不同。事实上，它遵循与 [Redux reducer](http://redux.js.org/docs/basics/Reducers.html) 完全相同的原则：它将先前的状态（`subscribeToMore` 的查询被调用）和服务器发送的订阅数据作为参数。然后，确定如何将订阅数据合并到现有状态并返回更新的版本。

<Instruction>

依然是在 `LinkList.js` 文件中添加 `updateQuery` 函数:

```js(path=".../hackernews-react-apollo/src/components/LinkList.js")
updateQuery: (previous, { subscriptionData }) => {
  const newAllLinks = [
    subscriptionData.data.Link.node,
    ...previous.allLinks
  ]
  const result = {
    ...previous,
    allLinks: newAllLinks
  }
  return result
}
```

</Instruction>

在此处执行的操作都是从订阅数据（`subscriptionData.data.Link.node`）中检索新链接，将其合并到现有链接列表中，并返回此操作的结果。

这里的最后一件事是确保组件通过调用 `subscribeToMore` 来实际订阅事件。

<Instruction>

在 `LinkList.js` 文件中添加下面代码：

```js(path=".../hackernews-react-apollo/src/components/LinkList.js")
componentDidMount() {
  this._subscribeToNewLinks()
}
```

</Instruction>

> **注意**: `componentDidMount` 是属于 React 组件的 [_生命周期_ 函数](https://facebook.github.io/react/docs/react-component.html#the-component-lifecycle) ，它在组件实例化的时候被调用。

真棒，就是这样！通过打开两个浏览器窗口来测试我们的实现。在第一个窗口中，应用程序在 `http//localhost：3000/` 上运行。第二个窗口打开 playground 并发送 `createLink` 变更。当发送变更后，将看到实时的应用更新！ ⚡️

### 订阅新投票

接下来，我们将订阅其他用户发布的新投票，以便在应用程序中始终可以看到最新的投票数。

<Instruction>

在 `LinkList.js` 文件中添加下面代码：

```js(path=".../hackernews-react-apollo/src/components/LinkList.js")
_subscribeToNewVotes = () => {
  this.props.allLinksQuery.subscribeToMore({
    document: gql`
      subscription {
        Vote(filter: {
          mutation_in: [CREATED]
        }) {
          node {
            id
            link {
              id
              url
              description
              createdAt
              postedBy {
                id
                name
              }
              votes {
                id
                user {
                  id
                }
              }
            }
            user {
              id
            }
          }
        }
      }
    `,
    updateQuery: (previous, { subscriptionData }) => {
      const votedLinkIndex = previous.allLinks.findIndex(link => link.id === subscriptionData.data.Vote.node.link.id)
      const link = subscriptionData.data.Vote.node.link
      const newAllLinks = previous.allLinks.slice()
      newAllLinks[votedLinkIndex] = link
      const result = {
        ...previous,
        allLinks: newAllLinks
      }
      return result
    }
  })
}
```

</Instruction>

与以前类似，在 `allLinksQuery` 上调用 `subscribeToMore`。这次通过一个订阅，要求新创建的投票。在 `updateQuery` 中，然后将新的投票信息添加到缓存中，首先查找刚刚投票的 `Link`，然后接收服务器发送的数据来更新 `Vote` 元素的投票数。

<Instruction>

最后在组件的 `componentDidMount` 生命周期函数中调用 `_subscribeToNewVotes`：

```js(path=".../hackernews-react-apollo/src/components/LinkList.js")
componentDidMount() {
  this._subscribeToNewLinks()
  this._subscribeToNewVotes()
}
```

</Instruction>

太棒了！我们的应用程序现在可以实时更新，并且会在其他用户创建时立即更新链接和投票。