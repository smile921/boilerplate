---
title: "过滤: 搜索链接"
pageTitle: "React & Apollo 教程之 GraphQL 数据过滤"
description: "了解如何使用 GraphQL 和 Apollo 客户端使用过滤器。 Graphcool 提供了一个强大的过滤器和排序 API，我们将在此示例中探索。"
question: "`withApollo` 函数有什么用？"
answers: ["可以使用它将查询和变更发送到 GraphQL 服务器", "可以用它包裹组件，它将 `ApolloClient` 实例注入到组件的属性", "必须使用它在任何想使用 Apollo 功能的地方", "它解析 GraphQL 代码"]
correctAnswer: 1
videoId: sycCQujmWzg
duration: 3
videoAuthor: "Abhi Aiyer"
---

在本节中，我们将实现一个搜索功能，并了解 GraphQL API 的过滤功能。

> 注意: 如果对 Graphcool 的所有过滤功能感兴趣，可以查看 [文档](https://www.graph.cool/docs/reference/simple-api/filtering-by-field-xookaexai0/)。

### 准备 React 组件

我们将新建一个搜索路由。

<Instruction>

首先在 `src/components` 文件夹下创建 `Search.js` 文件并添加下面代码：

```js(path=".../hackernews-react-apollo/src/components/Search.js")
import React, { Component } from 'react'
import { gql, withApollo } from 'react-apollo'
import Link from './Link'

class Search extends Component {

  state = {
    links: [],
    searchText: ''
  }

  render() {
    return (
      <div>
        <div>
          Search
          <input
            type='text'
            onChange={(e) => this.setState({ searchText: e.target.value })}
          />
          <button
            onClick={() => this._executeSearch()}
          >
            OK
          </button>
        </div>
        {this.state.links.map((link, index) => <Link key={link.id} link={link} index={index}/>)}
      </div>
    )
  }

  _executeSearch = async () => {
    // ... you'll implement this in a bit
  }

}

export default withApollo(Search)
```

</Instruction>

这是一个非常标准的设置。组件渲染一个 `input` 字段，用户可以在其中键入搜索字符串。

请注意，组件状态中的 `links` 字段将保存所有要渲染的链接，所以这次我们不通过组件道具访问查询结果！我们还会讨论导出组件时使用的 `withApollo` 函数！

<Instruction>

在 `App.js` 文件中添加下面代码：

```js{7}(path=".../hackernews-react-apollo/src/components/App.js")
render() {
  return (
    <div className='center w85'>
      <Header />
      <div className='ph3 pv1 background-gray'>
        <Switch>
          <Route exact path='/search' component={Search}/>
          <Route exact path='/' component={LinkList}/>
          <Route exact path='/create' component={CreateLink}/>
          <Route exact path='/login' component={Login}/>
        </Switch>
      </div>
    </div>
  )
}
```

</Instruction>

<Instruction>

然后导入 `Search` 组件：

```js(path=".../hackernews-react-apollo/src/components/App.js")
import Search from './Search'
```

</Instruction>

为了使用户能够导航到搜索功能，还应该在 `Header` 组件中添加一个新的导航项。

<Instruction>

在 `Header.js` 文件中添加一个新的 `Link` 组件，它导航到搜索路由：

```js{4,5}(path=".../hackernews-react-apollo/src/components/Header.js")
<div className='flex flex-fixed black'>
  <div className='fw7 mr1'>Hacker News</div>
  <Link to='/' className='ml1 no-underline black'>new</Link>
  <div className='ml1'>|</div>
  <Link to='/search' className='ml1 no-underline black'>search</Link>
  {userId &&
  <div className='flex'>
    <div className='ml1'>|</div>
    <Link to='/create' className='ml1 no-underline black'>submit</Link>
  </div>
  }
</div>
```

</Instruction>

现在可以使用 `Header` 中的新按钮导航到搜索功能：

![](http://imgur.com/XxPdUvo.png)

好的，现在回到 `Search` 组件，看看我们如何实现实际的搜索。

### 过滤链接

<Instruction>

在 `Search.js` 文件中添加下面代码：

```js(path=".../hackernews-react-apollo/src/components/Search.js")
const ALL_LINKS_SEARCH_QUERY = gql`
  query AllLinksSearchQuery($searchText: String!) {
    allLinks(filter: {
      OR: [{
        url_contains: $searchText
      }, {
        description_contains: $searchText
      }]
    }) {
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
`
```

</Instruction>

这个查询看起来类似于 `LinkList` 中使用的 `allLinks` 查询。但是，这次它引用一个叫做 `searchText` 的参数，并指定一个 `filter` 对象，用于指定要检索的链接上的条件。

在这种情况下，我们指定了两个过滤器，它们满足以下两个条件：只有当它的 `url` 包含提供的 `searchText` 或者它的 `description` 包含提供的 `searchText` 时，才会返回链接。这两个条件都可以使用 `OR` 运算符进行组合。

完美！但是这次我们实际上想要在每次用户点击 _搜索_ 按钮时加载数据。

这就是使用 [`withApollo`](http://dev.apollodata.com/react/higher-order-components.html#withApollo) 函数的作用。该函数将 `index.js` 中创建的 `ApolloClient` 实例注入 `Search` 组件，作为一个名为`client` 的新属性。

这个 `client` 有一个叫做 `query` 的方法，你可以手动发送一个查询，而不是使用 `graphql` 高阶组件。

<Instruction>

在 `Search.js` 文件中添加下面的代码来实现 `_executeSearch`：

```js(path=".../hackernews-react-apollo/src/components/Search.js")
_executeSearch = async () => {
  const { searchText } = this.state
  const result = await this.props.client.query({
    query: ALL_LINKS_SEARCH_QUERY,
    variables: { searchText }
  })
  const links = result.data.allLinks
  this.setState({ links })
}
```

</Instruction>

我们手动执行 `ALL_LINKS_SEARCH_QUERY`，并从服务器返回的响应中检索 `links`。然后将这些链接放入组件的 `状态` 中，然后渲染。

通过在终端中运行 `yarn start` 并导航到`http//localhost3000/search` 来测试应用程序。然后在文本字段中键入搜索字符串，单击 _搜素_ 按钮并验证返回的链接是否符合过滤条件。
