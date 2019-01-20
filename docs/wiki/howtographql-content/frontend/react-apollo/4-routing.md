---
title: 路由
pageTitle: "React & Apollo 教程之 React Router"
description: "了解如何使用 react-router 4 与 GraphQL 和 Apollo 客户端一起在 React 应用程序中实现导航。每个路由将代表一个 `Link`。
videoId: W-MJHNOdUOI
duration: 4
videoAuthor: "Abhi Aiyer"
question: 在本章中添加的 Link 组件的作用是什么？
answers: ["它代表了用户发布的链接", "它将渲染用户创建新链接的输入表单。", "它允许你导航到另外一个 URL 地址。", "它将根组件和它的字组件连接起来。"]
correctAnswer: 2
---

在本章节中，我们将使用 [`react-router`](https://github.com/ReactTraining/react-router) 库和 Apollo 来实现导航功能。

### 安装依赖

首先添加依赖关系到应用程序。打开终端，导航到项目目录，然后键入：

<Instruction>

```bash(path=".../hackernews-react-apollo")
yarn add react-router-dom
```

</Instruction>

### 创建应用头部组件

在开始为应用程序配置不同路由之前，需要创建一个 `Header` 组件，用户可以在应用的不同部分之间进行导航。

<Instruction>

在 `src/components` 文件夹下创建一个新的 `Header.js` 文件，然后添加下面代码：

```js(path=".../hackernews-react-apollo/src/components/Header.js")
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

class Header extends Component {

  render() {
    return (
      <div className='flex pa1 justify-between nowrap orange'>
        <div className='flex flex-fixed black'>
          <div className='fw7 mr1'>Hacker News</div>
          <Link to='/' className='ml1 no-underline black'>new</Link>
          <div className='ml1'>|</div>
          <Link to='/create' className='ml1 no-underline black'>submit</Link>
        </div>
      </div>
    )
  }

}

export default withRouter(Header)
```

</Instruction>

这个组件只是简单的渲染两个 `Link`，用户可以在 `LinkList` 和 `CreateLink` 组件之间导航。

> 不要被这里使用的 `其他` 链接组件困惑。我们在 `Header` 中使用的那个与之前写过的 `Link` 组件没有任何关系，他们只是恰好有相同的名称而已。这个 [`Link`](https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/api/Link.md) 是 `react-router-dom` 包的它允许在应用程序之间的路由之间导航。

### 设置路由

我们将在应用的根组件 `App` 中定义应用的路由。

<Instruction>

在 `App.js` 文件中更新 `render` 方法中的内容和 `LinkList` 和 `createLink` 相应的路由：

```js(path=".../hackernews-react-apollo/src/components/App.js")
render() {
  return (
    <div className='center w85'>
      <Header />
      <div className='ph3 pv1 background-gray'>
        <Switch>
          <Route exact path='/' component={LinkList}/>
          <Route exact path='/create' component={CreateLink}/>
         </Switch>
      </div>
    </div>
  )
}
```

</Instruction>

为了使上面的代码能正常工作，我们需要导入 `react-router-dom`。

<Instruction>

并将以下代码添加到文件的顶部：

```js(path=".../hackernews-react-apollo/src/components/App.js")
import Header from './Header'
import { Switch, Route, Redirect } from 'react-router-dom'
```

</Instruction>

现在，我们需要用 `BrowserRouter` 包装 `App`，这样 `App` 的所有子组件就可以访问路由的功能。

<Instruction>

在 `index.js` 文件中导入 `BrowserRouter`：

```js(path=".../hackernews-react-apollo/src/index.js")
import { BrowserRouter } from 'react-router-dom'
```

</Instruction>

<Instruction>

现在更新 `ReactDOM.render` 并用 `BrowserRouter` 包装整个应用程序：

```js(path=".../hackernews-react-apollo/src/index.js")
ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>
  , document.getElementById('root')
)
```

</Instruction>

就是这样子。再次运行 `yarn start`，我们将可以访问两个 URL 地址。
`http://localhost:3000/` 将渲染 `LinkList` 组件而 `http://localhost:3000/create` 将渲染 `CreateLink` 组件。

![](http://imgur.com/I16JzwW.png)

### 导航实现

要包装此部分，我们需要在执行变更后实现从 `CreateLink` 到 `LinkList` 的自动重定向。

<Instruction>

在 `CreateLink.js` 文件中用下面的内容更新 `_createLink`：

```js(path=".../hackernews-react-apollo/src/components/CreateLink.js")
_createLink = async () => {
  const { description, url } = this.state
  await this.props.createLinkMutation({
    variables: {
      description,
      url
    }
  })
  this.props.history.push(`/`)
}
```

</Instruction>

变更执行后，`react-router-dom` 将返回到根路径上：`/`。