---
title: 快速开始上手
pageTitle: "开始使用 GraphQL，React 和 Apollo"
description: 开始构建 Hacknews 克隆应用。用 create-react-app 来创建前端应用，后端使用 Graphcool 服务。
videoId: JV0nLsdeMfo
duration: 4
videoAuthor: "Abhi Aiyer"
question: 每个 Graphcool 项目文件中都会有哪两个类型？
answers: ["文件和系统", "查询和变更", "用户和组", "文件和用户"]
correctAnswer: 3
draft: false
---

### 后端

由于这是一个前端教程，所以您不需要花太多时间设置后端。这就是为什么使用 [Graphcool](https://www.graph.cool/)，这种开箱即用的生产就绪的 GraphQL API 的服务。

#### 数据模型

可以使用 [Graphcool CLI](https://www.graph.cool/docs/reference/cli/overview-kie1quohli/) 根据应用程序所需的数据模型生成服务器。说到数据模型，这是它的最终版本 [GraphQL Schema Definition Language](https://www.graph.cool/docs/faq/graphql-sdl-schema-definition-language-kr84dktnp0/) (SDL):

```graphql(nocopy)
type User {
  name: String!
  links: [Link!]! @relation(name: "UsersLinks")
  votes: [Vote!]! @relation(name: "UsersVotes")
}

type Link { 
  url: String!
  postedBy: User! @relation(name: "UsersLinks")
  votes: [Vote!]! @relation(name: "VotesOnLink")
}

type Vote {
  user: User! @relation(name: "UsersVotes")
  link: Link! @relation(name: "VotesOnLink")
}
```

#### 创建 GraphQL 服务器

刚开始的时候，您将不会使用上面看到的完整数据模型。因为数据模型是随着功能的开发而逐渐完善的。

而现在，只需使用到 `Link` 类型。

首先需要使用 npm 安装 Graphcool CLI。

<Instruction>

打开终端输入下面命令：

```bash
npm install -g graphcool
```

</Instruction>

现在可以去创建服务器。

<Instruction>

在终端输入下面命令:

```bash
graphcool init --schema https://graphqlbin.com/hn-starter.graphql --name Hackernews
```

</Instruction>

将执行带有两个参数的 `graphcool init` 命令:

- `--schema`: 这个参数将指定一个以 `.graphql` 结尾的文件作为模式这个文件可以是本地文件或者远程地址文件。在这里我们将用到 [https://graphqlbin.com/hn-starter.graphql](https://graphqlbin.com/hn-starter.graphql) 作为整个应用的模式。
- `--name`: 这个参数将指定应用的名字也就是 `Hackernews`。

此命令将首先打开浏览器窗口，并要求您在Graphcool平台上进行身份验证。

模式样板文件：[https://graphqlbin.com/hn-starter.graphql](https://graphqlbin.com/hn-starter.graphql) 只定义了 `Link` 类型:

```graphql(nocopy)
type Link implements Node {
  description: String!
  url: String!
}
```

当项目创建完成后，将在当前目录下生成一个 (`project.graphcool`) 文件，内容与下面相似：

```graphql(nocopy)
# project: cj4k7j28p7ujs014860czx89p
# version: 1

type File implements Node {
  contentType: String!
  createdAt: DateTime!
  id: ID! @isUnique
  name: String!
  secret: String! @isUnique
  size: Int!
  updatedAt: DateTime!
  url: String! @isUnique
}

type Link implements Node {
  createdAt: DateTime!
  description: String!
  id: ID! @isUnique
  updatedAt: DateTime!
  url: String!
}

type User implements Node {
  createdAt: DateTime!
  id: ID! @isUnique
  updatedAt: DateTime!
}
```

该文件的顶部包含有关项目的一些元数据：_项目 ID_ 和 _模式的版本_。

类型 [`User`](https://www.graph.cool/docs/reference/schema/system-artifacts-uhieg2shio/#user-type) 和 [`File`](https://www.graph.cool/docs/reference/schema/system-artifacts-uhieg2shio/#file-type) 都是由 Graphcool 生成的。`User` 类型用来做用户认证和授权 `File` 类型用来做文件管理。

每一个类型都有三个字段：`id`、`createdAt` 和 `updatedAt`。

#### 数据填充和 GraphQL Playground

在开始前端的工作之前，可以先填充些数据以便在应用渲染时看到。

您可以通过使用 GraphQL [Playground](https://www.graph.cool/docs/reference/console/playground-oe1ier4iej/) 来实现数据填充，Playground 是一个交互式环境，允许您发送查询和突变。这是探索 API 功能的好方法。

<Instruction>

打开终端进入当项目文件目录下，执行下面命令：

```bash
graphcool playground
```

</Instruction>

这行命令将从 project.graphcool 文件中读取 project ID，然后在浏览器中打开一个 GraphQL Playground。

Playground 的左边窗栏是 _编辑器_，您可以使用它来编写查询和突变（甚至订阅）。一旦您点击中间的播放按钮，对请求的响应将显示在右侧的 _结果_ 窗栏中。

<Instruction>

复制下面的代码到 _编辑器_ 窗栏:

```graphql
mutation CreateGraphcoolLink {
  createLink(
    description: "The coolest GraphQL backend 😎",
    url: "https://graph.cool") {
    id
  }
}

mutation CreateApolloLink {
  createLink(
    description: "The best GraphQL client",
    url: "http://dev.apollodata.com/") {
    id
  }
}
```

</Instruction>

由于一次向编辑器添加两个突变，所以需有 _命名_。上面的突变为 `CreateGraphcoolLink` 和`CreateApolloLink`。

<Instruction>

在中间选择要执行的突变然后点击 _Play_ 按钮。

</Instruction>

![](http://imgur.com/ZBgeq22.png)

通过上面的操作，你已经在数据库中创建了一条 `Link` 记录。你可以通过 [data browser](https://www.graph.cool/docs/reference/console/data-browser-och3ookaeb/) (点击左边的_DATA_) 或者通过在 Playground 中发送下面的查询来查看数据库的数据：

```graphql
{
  allLinks {
    id
    description
    url
  }
}
``` 

如果一切都ok的话，将返回下面数据：

```graphql(nocopy)
{
  "data": {
    "allLinks": [
      {
        "id": "cj4jo6xxat8o901420m0yy60i",
        "description": "The coolest GraphQL backend 😎",
        "url": "https://graph.cool"
      },
      {
        "id": "cj4jo6z4it8on0142p7q015hc",
        "description": "The best GraphQL client",
        "url": "http://dev.apollodata.com/"
      }
    ]
  }
```

### 前端

#### 创建应用

接下来，你将使用 `create-react-app` 来创建一个 React 应用。

<Instruction>

确保 ceate-react-app 已经安装，如果没有先安装：

```bash
npm install -g create-react-app
```

</Instruction>

<Instruction>

然后创建应用：

```bash
create-react-app hackernews-react-apollo
```

</Instruction>

进入到项目目录运行项目：

```bash
cd hackernews-react-apollo
yarn start
```

这将打开浏览器，应用已经运行在 `http://localhost:3000`：

![](http://imgur.com/Yujwwi6.png)


<Instruction>

将 `project.graphcool` 移动到 `hackernews-react-apollo` 目录下。

为了改进项目结构，请在 `src` 文件夹中创建两个目录。第一个被称为 `components`，并将保存所有的 React 组件。调用第二个 `styles`，一个用于您将使用的所有 CSS 文件。

然后整理下现有文件。将 `App.js` 移动到 `components` 文件夹下， 将 `App.css` 和 `index.css` 移动到 `styles` 文件夹下。

</Instruction>

项目目录结构将会是这样：

```bash(nocopy)
.
├── README.md
├── node_modules
├── project.graphcool
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── src
│   ├── App.test.js
│   ├── components
│   │   └── App.js
│   ├── index.js
│   ├── logo.svg
│   ├── registerServiceWorker.js
│   └── styles
│       ├── App.css
│       └── index.css
└── yarn.lock
```

#### 准备好样式

本教程介绍了GraphQL的概念，以及如何在React应用程序中使用它，因此我们希望将最少的时间花在样式问题上。所以我们将使用 [Tachyons](http://tachyons.io/) 库，它提供了许多 CSS 类。

<Instruction>

打开 `public/index.html` 并中添加一个 `link` 标签：

```html{3}(path=".../hackernews-react-apollo/public/index.html")
<link rel="manifest" href="%PUBLIC_URL%/manifest.json">
<link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
<link rel="stylesheet" href="https://unpkg.com/tachyons@4.2.1/css/tachyons.min.css"/>
```

</Instruction>

由于我们还希望有更多的自定义样式，所以还需要下面样式文件。

<Instruction>

打开 `index.css` 用下面的代码替代文件的类容:

```css(path=".../hackernews-react-apollo/src/styles/index.css")
body {
  margin: 0;
  padding: 0;
  font-family: Verdana, Geneva, sans-serif;
}

input {
  max-width: 500px;
}

.gray {
  color: #828282;
}

.orange {
  background-color: #ff6600;
}

.background-gray {
  background-color: rgb(246,246,239);
}

.f11 {
  font-size: 11px;
}

.w85 {
  width: 85%;
}

.button {
  font-family: monospace;
  font-size: 10pt;
  color: black;
  background-color: buttonface;
  text-align: center;
  padding: 2px 6px 3px;
  border-width: 2px;
  border-style: outset;
  border-color: buttonface;
  cursor: pointer;
  max-width: 250px;
}
```

</Instruction>



#### 安装 Apollo

<Instruction>

下一步添加 Apollo 客户端：

```bash(path=".../hackernews-react-apollo")
yarn add react-apollo
```

</Instruction>

就是这样，开始写代码吧 🚀

#### 配置 `ApolloClient`

Apollo 已经封装好了底层的网络请求逻辑而且为 GraphQL API 服务器提供了很方便的接口。与使用 REST API 相比，不必构建自己的 HTTP 请求，而只需要编写查询和变更然后通过 `ApolloClient` 来发送请求。

首先需要配置 `ApolloClient`，它需要知道 GraphQL API 的端点以便建立网络连接。

<Instruction>

打开 `src/index.js` 用下面的代码替代其内容:

```js{6-7,9-12,14-17,19-25}(path="src/index.js")
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import './styles/index.css'
// 1
import { ApolloProvider, createNetworkInterface, ApolloClient } from 'react-apollo'

// 2
const networkInterface = createNetworkInterface({
  uri: '__SIMPLE_API_ENDPOINT__'
})

// 3
const client = new ApolloClient({
  networkInterface
})

// 4
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  , document.getElementById('root')
)
registerServiceWorker()
```

</Instruction>

> 注意: `create-react-app` 创建的项目中字符串都使用分号和双引号。而您添加的代码都没有分号和单引号。

让我们回顾下我们目前都做了些啥：

1. 首先导入 `react-apollo`
2. 然后创建 `networkInterface`, 用实际的端点替换 `__SIMPLE_API_ENDPOINT__`
3. 将 `networkInterface` 传递到 `ApolloClient`
4. 最后渲染应用的入口

接下来，您需要将 GraphQL 端点的占位符替换为实际端点。但是如何获取实际断点呢？

有两种方式可以得到您的端点。您可以打开 [Graphcool Console](https://console.graph.cool)，然后点击左下角的 _Endoints_ 按钮。第二个选项是使用 CLI。

<Instruction>

在终端导航到包含 `project.graphcool` 的文件目录下也就是你的项目目录下，然后运行下列命令：

```bash(path=".../hackernews-react-apollo")
graphcool endpoints
```

</Instruction>

<Instruction>

复制上面获取的端点，黏贴到 `src/index.js` 文件中用来替代 `__SIMPLE_API_ENDPOINT__` 占位符。

</Instruction>

就是这样，你已经为你的 react 应用加载了数据！ 😎
