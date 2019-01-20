---
title: 分页
pageTitle: "React & Apollo 教程之 GraphQL 分页"
description: "了解如何使用 GraphQL 和 Apollo 客户端在 React 应用程序中实现限制偏移分页。 Graphcool API 公开了列表所需的参数。"
question: "ApolloClient 中的 `query` 和 `readQuery` 有什么不同？"
answers: ["`readQuery` 总是通过网络获取数据，而 `query` 可以从缓存或远程检索数据", "`readQuery` 只能用于读取数据，而 `query` 也可以用于写入数据", "'readQuery' 以前称为 'query'，两者的功能相同", "`readQuery` 总是从本地缓存中读取数据，而 `query` 可能从缓存或远程检索数据"]
correctAnswer: 3
videoId: iLVHY1kql7k
videoAuthor: "Abhi Ayer"
duration: 6
---

在本章节中分页将是最后一个我们要学习的。我们将实现一个简单的分页功能以便用户能每次浏览部分数据而不是浏览整个 `Link` 列表数据。

## 准备 React 组件

再一次我们需要为新功能先编写 React 组件。其实我们稍稍调整当前的路由设置。 可以考虑 `LinkList` 组件用于两种不同的用例（和路由）。第一个是显示10个最高投票的链接。其第二个用例是将列表中的新链接显示为用户可以浏览的多个页面。

<Instruction>

在 `App.js` 文件中更新 render 函数：

```js{4,8,9}(path=".../hackernews-react-apollo/src/components/App.js")
render() {
    return (
      <div className='center w85'>
        <Header />
        <div className='ph3 pv1 background-gray'>
          <Switch>
            <Route exact path='/' render={() => <Redirect to='/new/1' />} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/create' component={CreateLink} />
            <Route exact path='/search' component={Search} />
            <Route exact path='/top' component={LinkList} />
            <Route exact path='/new/:page' component={LinkList} />
          </Switch>
        </div>
      </div>
    )
  }
```

</Instruction>

确保导入 Redirect 组件。

<Instruction>

在 `App.js` 文件中更新：

```js(path=".../hackernews-react-apollo/src/components/App.js")
import { Switch, Route, Redirect } from 'react-router-dom'
```

</Instruction>

我们现在添加了两条新的路由：`/top` 和 `/new/:page`。第二个从 url 读取 `page` 的值，以便这个信息在渲染的组件中可用，这里是 `LinkList`。

跟路由 `/` 现在将重定向到最新的链接路由。

我们需要为 `LinkList` 组件添加类似的逻辑，以说明现在拥有的两个不同的职责

<Instruction>


在 `LinkList.js` 文件中，为 `AllLinksQuery` 添加三个参数, 并用下面的代码来替代 `ALL_LINKS_QUERY` 的定义：

```js(path=".../hackernews-react-apollo/src/components/LinkList.js")
export const ALL_LINKS_QUERY = gql`
  query AllLinksQuery($first: Int, $skip: Int, $orderBy: LinkOrderBy) {
    allLinks(first: $first, skip: $skip, orderBy: $orderBy) {
      id
      createdAt
      url
      description
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
    _allLinksMeta {
      count
    }
  }
`
```

</Instruction>

该查询现在接受我们将用于实现分页和排序的参数。 `skip` 定义查询的 _偏移量_。如果传递如 `10` 作为参数，这意味着列表的前10个不会被包含在响应中。`first` 定义了查询的 _限制_。如果传递如 `5` 作为参数，这意味着列表将包含前5个元素。

但是，当使用 `graphql`容器时，我们该如何传递变量？答案就是需要在包含查询的组件的位置。

<Instruction>

在 `LinkList.js` 文件中, 用下面的代码替代 `export` 的声明：

```js(path=".../hackernews-react-apollo/src/components/LinkList.js")
export default graphql(ALL_LINKS_QUERY, {
  name: 'allLinksQuery',
  options: (ownProps) => {
    const page = parseInt(ownProps.match.params.page, 10)
    const isNewPage = ownProps.location.pathname.includes('new')
    const skip = isNewPage ? (page - 1) * LINKS_PER_PAGE : 0
    const first = isNewPage ? LINKS_PER_PAGE : 100
    const orderBy = isNewPage ? 'createdAt_DESC' : null
    return {
      variables: { first, skip, orderBy }
    }
  }
}) (LinkList)
```

</Instruction>

在执行查询之前，将一个函数传递给 `graphql`，该函数接收组件的（`ownProps`）。就可以从路由中可以获得当前页面的信息 (`ownProps.match.params.page`) 并用来计算需要的链接数。

同样的我们也将在 `new` 页面包含排序参数 `createdAt_DESC` 以便明确哪些时间点的链接需要显示。而 `/top` 路由页面链接将是通过投票数来计算的。

我们还需要声明 `LINKS_PER_PAGE` 常量然后在 `ListList` 组件中导入。

<Instruction>

在 `src/constants.js` 文件中添加下面的代码:

```js(path=".../hackernews-react-apollo/src/constants.js")
export const LINKS_PER_PAGE = 5
```

</Instruction>

<Instruction>

在 `LinkList.js` 文件中导入相关常量：

```js(path=".../hackernews-react-apollo/src/components/LinkList.js")
import { GC_USER_ID, GC_AUTH_TOKEN, LINKS_PER_PAGE } from '../constants'
```

</Instruction>

### 实现页面跳转

接下来我们将需要实现在不同页面间的跳转。首先需要在 `LinkList` 组件中添加两个 `按钮`。

<Instruction>

在 `LinkList.js` 文件中更新 `render` 函数:

```js(path=".../hackernews-react-apollo/src/components/LinkList.js")
render() {

  if (this.props.allLinksQuery && this.props.allLinksQuery.loading) {
    return <div>Loading</div>
  }

  if (this.props.allLinksQuery && this.props.allLinksQuery.error) {
    return <div>Error</div>
  }

  const isNewPage = this.props.location.pathname.includes('new')
  const linksToRender = this._getLinksToRender(isNewPage)
  const userId = localStorage.getItem(GC_USER_ID)

  return (
    <div>
      {!userId ?
        <button onClick={() => {
          this.props.history.push('/login')
        }}>Login</button> :
        <div>
          <button onClick={() => {
            this.props.history.push('/create')
          }}>New Post</button>
          <button onClick={() => {
            localStorage.removeItem(GC_USER_ID)
            localStorage.removeItem(GC_AUTH_TOKEN)
            this.forceUpdate() // doesn't work as it should :(
          }}>Logout</button>
        </div>
      }
      <div>
        {linksToRender.map((link, index) => (
          <Link key={link.id} updateStoreAfterVote={this._updateCacheAfterVote} link={link} index={index}/>
        ))}
      </div>
      {isNewPage &&
      <div>
        <button onClick={() => this._previousPage()}>Previous</button>
        <button onClick={() => this._nextPage()}>Next</button>
      </div>
      }
    </div>
  )

}
```

</Instruction>

由于安装程序稍微复杂一些，所以我们将以单独的方法计算要呈现的链接列表。

<Instruction>

依然是在 `LinkList.js` 文件中添加下面代码：

```js(path=".../hackernews-react-apollo/src/components/LinkList.js")
_getLinksToRender = (isNewPage) => {
  if (isNewPage) {
    return this.props.allLinksQuery.allLinks
  }
  const rankedLinks = this.props.allLinksQuery.allLinks.slice()
  rankedLinks.sort((l1, l2) => l2.votes.length - l1.votes.length)
  return rankedLinks
}
```

</Instruction>

对于 `newPage`，只需返回查询返回的所有链接。这是合乎逻辑的，因为不需要对要呈现的列表进行任何手动修改。如果用户从 `/top` 路由加载组件，将根据投票数对列表进行排序，并返回前10个链接。

然后我们将实现 _前一页_ 和 _后一页_ 按钮的功能。

<Instruction>

在 `LinkList.js` 文件中添加下面的代码：

```js(path=".../hackernews-react-apollo/src/components/LinkList.js")
_nextPage = () => {
  const page = parseInt(this.props.match.params.page, 10)
  if (page <= this.props.allLinksQuery._allLinksMeta.count / LINKS_PER_PAGE) {
    const nextPage = page + 1
    this.props.history.push(`/new/${nextPage}`)
  }
}

_previousPage = () => {
  const page = parseInt(this.props.match.params.page, 10)
  if (page > 1) {
    const previousPage = page - 1
    this.props.history.push(`/new/${previousPage}`)
  }
}
```

</Instruction>

这些的功能实现并不复杂。我们通过网址检索当前页面，并执行检查，以确保分页分页。然后，只需计算下一页，告诉路由器下一步导航。然后，路由器将重新加载组件，并在 url 中使用一个新的 `page`，用于计算要加载的正确的链接列表。通过在终端中输入 `yarn start` 来运行应用程序，并使用新的按钮在链接列表中分页！

### 最后的调整

通过我们对 `ALL_LINKS_QUERY` 的更改，我们注意到，突变的 `更新` 功能不再起作用。这是因为`readQuery` 现在也希望通过与之前定义的相同的变量。

> **注意**: `readQuery` 的工作原理与用于实现搜索的 `ApolloClient` 上的 `query` 方法基本相同。但是，它不需要调用服务器，而是简单地解析对本地存储的查询！如果使用变量从服务器获取查询，则`readQuery` 也需要知道变量，以确保它能够从缓存中传递正确的信息。

<Instruction>

在 `LinkList.js` 文件中，用下面的代码更新 `_updateCacheAfterVote` 函数：

```js(path=".../hackernews-react-apollo/src/components/LinkList.js")
_updateCacheAfterVote = (store, createVote, linkId) => {
  const isNewPage = this.props.location.pathname.includes('new')
  const page = parseInt(this.props.match.params.page, 10)
  const skip = isNewPage ? (page - 1) * LINKS_PER_PAGE : 0
  const first = isNewPage ? LINKS_PER_PAGE : 100
  const orderBy = isNewPage ? "createdAt_DESC" : null
  const data = store.readQuery({ query: ALL_LINKS_QUERY, variables: { first, skip, orderBy } })

  const votedLink = data.allLinks.find(link => link.id === linkId)
  votedLink.votes = createVote.link.votes
  store.writeQuery({ query: ALL_LINKS_QUERY, data })
}
```

</Instruction>

这里发生的所有事情是根据用户当前是否位于 `/top` 或 `/new` 路由上的变量计算。

最后，当创建新链接时，还需要调整 `update` 的实现。

<Instruction>

在 `CreateLink.js` 文件中，用下面的代码更新 `_createLink` 函数:

```js(path=".../hackernews-react-apollo/src/components/CreateLink.js")
_createLink = async () => {
  const postedById = localStorage.getItem(GC_USER_ID)
  if (!postedById) {
    console.error('No user logged in')
    return
  }
  const { description, url } = this.state
  await this.props.createLinkMutation({
    variables: {
      description,
      url,
      postedById
    },
    update: (store, { data: { createLink } }) => {
      const first = LINKS_PER_PAGE
      const skip = 0
      const orderBy = 'createdAt_DESC'
      const data = store.readQuery({
        query: ALL_LINKS_QUERY,
        variables: { first, skip, orderBy }
      })
      data.allLinks.splice(0,0,createLink)
      data.allLinks.pop()
      store.writeQuery({
        query: ALL_LINKS_QUERY,
        data,
        variables: { first, skip, orderBy }
      })
    }
  })
  this.props.history.push(`/new/1`)
}
```

</Instruction>

<Instruction>

由于尚未在此组件中使用 `LINKS_PER_PAGE` 常量，请确保将其导入文件：

```js(path=".../hackernews-react-apollo/src/components/CreateLink.js")
import { GC_USER_ID, LINKS_PER_PAGE } from '../constants'
```

</Instruction>

我们现在已经在应用程序中添加了一个简单的分页系统，允许用户以小块方式加载链接，而不是将其全部加载到前端。
