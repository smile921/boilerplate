---
title: "查询: 获取链接列表"
pageTitle: "React & Apollo 教程之 GraphQL 查询- 数据获取"
description: "了解如何在 Apollo 客户端中使用 GraphQL 查询从服务器获取载数据并将其显示在 React 组件中。"
videoId: YW7F_scpE4w
duration: 6
videoAuthor: "Abhi Aiyer"
question: 用 React 和 Apollo 获取数据的惯用方式是什么？
answers: ["使用名为' graphql' 的高阶组件", "在 Apollo 客户端上使用 `query`方法", "使用 `fetch` 并将查询放在请求的正文中", "使用 XMLHTTPRequest 并将查询放在请求的正文中"]
correctAnswer: 0
---

### 准备 React 组件

我们在应用程序中实现的第一块功能是加载并显示 `Link` 元素的列表。首先从渲染单个链接的组建开始。

<Instruction>

在 `components` 文件夹下创建一个 `Link.js` 文件，添加下面的代码：

```js(path=".../hackernews-react-apollo/src/components/Link.js")
import React, { Component } from 'react'

class Link extends Component {

  render() {
    return (
      <div>
        <div>{this.props.link.description} ({this.props.link.url})</div>
      </div>
    )
  }
  
  _voteForLink = async () => {
    // ... you'll implement this in chapter 6  
  }

}

export default Link
```
</Instruction>

这只是一个从 `属性` 获取一个 `链接` 对象然后渲染链接的 `描述` 和 `url 地址` 的组件。

然后我们将创建一个渲染链接列表的组建。

<Instruction>

再次在 `components` 文件夹下创建一个 `LinkList.js` 的文件并且添加下面的代码：

```js(path=".../hackernews-react-apollo/src/components/LinkList.js")
import React, { Component } from 'react'
import Link from './Link'

class LinkList extends Component {

  render() {

    const linksToRender = [{
      id: '1',
      description: 'The Coolest GraphQL Backend 😎',
      url: 'https://www.graph.cool'
    }, {
      id: '2',
      description: 'The Best GraphQL Client',
      url: 'http://dev.apollodata.com/'
    }]

    return (
      <div>
        {linksToRender.map(link => (
          <Link key={link.id} link={link}/>
        ))}
      </div>
    )
  }

}

export default LinkList
```

</Instruction>

在这里我们暂时用的是模拟的数据以确保组件能正常运行。后面我们将从服务器获取真实的数据。

<Instruction>

最后添加下面的代码来更新 `App.js` 文件：

```js(path=".../hackernews-react-apollo/src/components/App.js")
import React, { Component } from 'react'
import LinkList from './LinkList'

class App extends Component {
  render() {
    return (
      <LinkList />
    )
  }
}

export default App
```

</Instruction>

运行应用开一切是否正常！应该显示两个来自 `linksToRender` 数组的链接：

![](http://imgur.com/FlMveso.png)

### 编写 GraphQL 查询

我们现在将从服务器获取数据。首先要做的就是定义需要发送到 API 的 GraphQL 查询。

它的结构式这样的:

```graphql
query AllLinks {
  allLinks {
    id
    createdAt
    description
    url
  }
}
```

我们可以在 Playground 执行上面的查询并获取结果。但是如何在前端项目中执行查询呢？

### 使用Apollo 客户端发送查询

当使用 Apollo 时，我们有两种方式来发送查询到服务器。

第一种方式是直接调用 `ApolloClient` 的 [`query`] 函数。这是一种 _命令式_ 的获取数据的方式，它允许我们来使用 _promise_ 的方式来处理响应。

实际使用的方式就是这样:

```js(nocopy)
client.query({
  query: gql`
    query AllLinks {
      allLinks {
        id
      }
    }
  `
}).then(response => console.log(response.data.allLinks))
```

另外一种更惯用的方式是使用 Apollo 提供的高阶组件 [`graphql`](http://dev.apollodata.com/react/api-graphql.html) 将我们的 React 组件和查询包裹起来。

使用这种方式，当我们需要获取数据的时候只需要编写 GraphQL 查询调用 `graphql` 高阶组建，它将为组件获取数据，组建可以通过访问自己的属性来访问从服务器获取的数据。

通常来说，这个过程都是类似的：

1. 使用 `gql` 解析函数来声明 JS 查询常量。
2. 使用 `graphql` 容器将组件和查询包裹起来。
3. 组件通过访问自己的属性 `props` 来获取数据。

<Instruction>

在 `LinkList.js` 文件尾部添加查询、替换 `export LinkList` 语句：

```js(path=".../hackernews-react-apollo/src/components/LinkList.js")
// 1
const ALL_LINKS_QUERY = gql`
  # 2
  query AllLinksQuery {
    allLinks {
      id
      createdAt
      url
      description
    }
  }
`

// 3
export default graphql(ALL_LINKS_QUERY, { name: 'allLinksQuery' }) (LinkList)
```

</Instruction>

上面发生了什么？

1. 首先，我们声明了一个 Javasript 常量叫做 `ALL_LINKS_QUERY` 作为查询的结构. `gql` 函数将解析常量成为原生的 GraphQL 代码。
2. 然后定义原生的 GraphQL 查询 `AllLinksQuery`，它将被 Apollo 用来在其内部引用。it will be used by Apollo to refer to this query in its internals.（注意我们用到的 GraphQL 注释语法。）
3. 最后，使用 `graphql` 容器将  `LinkList` 组件与 `ALL_LINKS_QUERY` 组合在一起。请注意，我们还将一个选项传递给函数调用，其中将 `name` 指定为 `allLinksQuery`。这是 Apollo 注入到 `LinkList` 组件的 `属性` 的名称。如果在这里没有指定，注入的属性将被称为 `data`。

<Instruction>

要使此代码工作，还需要导入相应的依赖关系。将以下代码添加到其他导入语句下面的文件的顶部：

```js(path=".../hackernews-react-apollo/src/components/LinkList.js")
import { graphql, gql } from 'react-apollo'
```

</Instruction>

酷，这是所有的数据获取代码，你能相信吗？

现在可以最终删除模拟数据并呈现从服务器获取的实际链接。

<Instruction>

依然是在 `LinkList.js` 文件中更新 `render` 函数：

```js{3-6,8-11,13-14}(path=".../hackernews-react-apollo/src/components/LinkList.js")
render() {

  // 1
  if (this.props.allLinksQuery && this.props.allLinksQuery.loading) {
    return <div>Loading</div>
  }

  // 2
  if (this.props.allLinksQuery && this.props.allLinksQuery.error) {
    return <div>Error</div>
  }

  // 3
  const linksToRender = this.props.allLinksQuery.allLinks

  return (
    <div>
      {linksToRender.map(link => (
        <Link key={link.id} link={link}/>
      ))}
    </div>
  )
}
```

</Instruction>

我们来了解下这段代码做了什么事情。正如预期的那样，Apollo 在组件中注入名为 `allLinksQuery` 的属性。该属性本身有3个字段，用来提供网络请求的 _状态_ 的信息：

1. `loading`: 为 `true` 的时候意味着请求数据中，响应还没有接收到。
2. `error`: 请求失败的话，这个字段中将包含失败的信息
3. `allLinks`: 这是从服务器接收的的具体数据。这里也就是一个 `Link` 元素的数组。

就是这样！使用 `yarn start` 来运行应用。将看到服务器的数据被渲染了。
