---
title: 更多关于变更和更新 Store
pageTitle: "React & Apollo 教程之 GraphQL 变更和缓存"
description: "了解如何在 GraphQL 变更后使用 Apollo 的命令式存储 API 来更新缓存。更新将自动结束在 React 组件中。"
question: "`graphcool push` 命令能做什么？"
answers: ["它将本地模式的更改上传到远程 Graphcool 项目", "它将 git 存储库推送到 Graphcool，以便您可以一起管理项目和代码。", "它告诉服务器将其远程方案更改推送到本地项目文件中", "根本就没有 `graphcool push` 命令"]
correctAnswer: 0
videoId: o0w0HS5vG5s
duration: 8
videoAuthor: "Abhi Aiyer"
---

接下来我们将实现投票功能！经过身份验证的用户可以提交链接投票。最多投票数的链接将显示在单独的路由！

### 准备 React 组件

再一次我们将为需要的功能准备一个新的组件。

</Instruction>

在 `Link.js` 文件中更新 `render` 函数：

```js(path=".../hackernews-react-apollo/src/components/Link.js")
render() {
  const userId = localStorage.getItem(GC_USER_ID)
  return (
    <div className='flex mt2 items-start'>
      <div className='flex items-center'>
        <span className='gray'>{this.props.index + 1}.</span>
        {userId && <div className='ml1 gray f11' onClick={() => this._voteForLink()}>▲</div>}
      </div>
      <div className='ml1'>
        <div>{this.props.link.description} ({this.props.link.url})</div>
        <div className='f6 lh-copy gray'>{this.props.link.votes.length} votes | by {this.props.link.postedBy ? this.props.link.postedBy.name : 'Unknown'} {timeDifferenceForDate(this.props.link.createdAt)}</div>
      </div>
    </div>
  )
}
```

</Instruction>

我们已经准备了 `Link` 组件来渲染每个链接的投票数以及发布它的用户的名称。此外，如果用户当前登录，将会显示 upvote 按钮。如果 `Link` 与 `User` 不相关联，则用户的名称将被显示为 `Unknown`。

请注意，我们还使用一个名为 `timeDifferenceForDate` 的函数，它会传递每个链接的 `createdAt`信息。该函数将采用时间戳并将其转换为更加用户友好的字符串，例如 `“3小时前”`。

创建 `timeDifferenceForDate` 函数，以便可以在 `Link` 组件中导入和使用它。

<Instruction>

在 `/src` 文件夹下创建 `utils.js` 文件并添加下面的代码：

```js(path=".../hackernews-react-apollo/src/utils.js")
function timeDifference(current, previous) {

  const milliSecondsPerMinute = 60 * 1000
  const milliSecondsPerHour = milliSecondsPerMinute * 60
  const milliSecondsPerDay = milliSecondsPerHour * 24
  const milliSecondsPerMonth = milliSecondsPerDay * 30
  const milliSecondsPerYear = milliSecondsPerDay * 365

  const elapsed = current - previous

  if (elapsed < milliSecondsPerMinute / 3) {
    return 'just now'
  }

  if (elapsed < milliSecondsPerMinute) {
    return 'less than 1 min ago'
  }

  else if (elapsed < milliSecondsPerHour) {
    return Math.round(elapsed/milliSecondsPerMinute) + ' min ago'
  }

  else if (elapsed < milliSecondsPerDay ) {
    return Math.round(elapsed/milliSecondsPerHour ) + ' h ago'
  }

  else if (elapsed < milliSecondsPerMonth) {
    return Math.round(elapsed/milliSecondsPerDay) + ' days ago'
  }

  else if (elapsed < milliSecondsPerYear) {
    return Math.round(elapsed/milliSecondsPerMonth) + ' mo ago'
  }

  else {
    return Math.round(elapsed/milliSecondsPerYear ) + ' years ago'
  }
}

export function timeDifferenceForDate(date) {
  const now = new Date().getTime()
  const updated = new Date(date).getTime()
  return timeDifference(now, updated)
}
```

</Instruction>

<Instruction>

再在 `Link.js` 文件中 导入 `GC_USER_ID` 和 `timeDifferenceForDate`：

```js(path=".../hackernews-react-apollo/src/components/Link.js")
import { GC_USER_ID } from '../constants'
import { timeDifferenceForDate } from '../utils'
```

</Instruction>

最后，每个 `Link` 元素也将在列表中显示它的位置，所以你必须从 `LinkList` 组件传递一个 `index`。

<Instruction>

在 `LinkList.js` 文件中的 render 函数中添加下面代码：

```js(path=".../hackernews-react-apollo/src/components/LinkList.js")
{linksToRender.map((link, index) => (
  <Link key={link.id} index={index} link={link}/>
))}
```

</Instruction>

请注意，由于 `votes` 尚未包含在查询中，因此该应用程序将不会运行。在后面我们将实现！

### 更新模式

对于这个新功能，还需要重新更新模式，因为链接上的投票将使用自定义的 `Vote` 类型。

<Instruction>

在 `project.graphcool` 文件中添加下面的类型:

```graphql(path=".../hackernews-react-apollo/project.graphcool")
type Vote {
  user: User! @relation(name: "UsersVotes")
  link: Link! @relation(name: "VotesOnLink")
}
```

</Instruction>

每个 `Vote` 将与创建它的 `User` 以及它所属的 `Link` 相关联。我们还得在另一端声明关联。

<Instruction>

在 `project.graphcool` 文件中的 `User` 类型中添加下面字段：

```graphql(path=".../hackernews-react-apollo/project.graphcool")
votes: [Vote!]! @relation(name: "UsersVotes")
```

</Instruction>

<Instruction>

在 `Link` 类型中添加下面字段：

```graphql(path=".../hackernews-react-apollo/project.graphcool")
votes: [Vote!]! @relation(name: "VotesOnLink")
```

</Instruction>

<Instruction>

接下在 `project.graphcool` 所在的目录下。然后在终端输入以下命令应用模式更改：

```bash(path=".../hackernews-react-apollo")
graphcool push
```

</Instruction>

下面是终端的输出结果:

```(nocopy)
$ gc push
 ✔ Your schema was successfully updated. Here are the changes: 

  | (+)  A new type with the name `Vote` is created.
  |
  | (+)  The relation `UsersVotes` is created. It connects the type `User` with the type `Vote`.
  |
  | (+)  The relation `VotesOnLink` is created. It connects the type `Link` with the type `Vote`.

Your project file project.graphcool was updated. Reload it in your editor if needed.
```

真棒！现在更新了模式，我们可以修复之前的问题以正常运行应用程序。可以通过在 `LinkList` 中定义的`allLinks` 查询中包含有关链接投票的信息。

<Instruction>

在 `LinkList.js` 文件中更新 `ALL_LINKS_QUERY` 的定义:

```js(path=".../hackernews-react-apollo/src/components/LinkList.js")
const ALL_LINKS_QUERY = gql`
  query AllLinksQuery {
    allLinks {
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
  }
`
```

</Instruction>

我们所做的事情包括有关发布链接的用户的信息以及有关链接在查询的有效载荷中的投票的信息。现在可以再次运行应用程序，链接将被正确显示。

![](http://imgur.com/eHaPg3L.png)

我们现在继续实现 upvote 变更！

### 调用变更

<Instruction>

在 `Link.js` 文件中添加下面的代码并替换当前的 `export Link` 语句：

```js(path=".../hackernews-react-apollo/src/components/Link.js")
const CREATE_VOTE_MUTATION = gql`
  mutation CreateVoteMutation($userId: ID!, $linkId: ID!) {
    createVote(userId: $userId, linkId: $linkId) {
      id
      link {
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
`

export default graphql(CREATE_VOTE_MUTATION, {
  name: 'createVoteMutation'
})(Link)
```

</Instruction>

现在这一步应该很熟悉。通过包裹 `Link` 组件和 `CREATE_VOTE_MUTATION` 可以使组件调用 `createVoteMutation`。

<Instruction>

与之前一样，还需要在 `Link.js` 文件的顶部导入 `gql` 和 `graphql` 函数：

```js(path=".../hackernews-react-apollo/src/components/Link.js")
import { gql, graphql } from 'react-apollo'
```

</Instruction>

<Instruction>

最后还得实现 `_voteForLink`：

```js(path=".../hackernews-react-apollo/src/components/Link.js")
_voteForLink = async () => {
  const userId = localStorage.getItem(GC_USER_ID)
  const voterIds = this.props.link.votes.map(vote => vote.user.id)
  if (voterIds.includes(userId)) {
    console.log(`User (${userId}) already voted for this link.`)
    return
  }

  const linkId = this.props.link.id
  await this.props.createVoteMutation({
    variables: {
      userId,
      linkId
    }
  })
}
```

</Instruction>

请注意，在该方法的第一部分中，将检查当前用户是否已经为该链接投票。如果是这种情况，就不是实际执行变更。

我们现在可以去测试实现了！运行 `yarn start` 并点击链接上的 upvote 按钮。如果还没有获得任何 UI 反馈，刷新页面后，将看到添加的投票。

应用程序仍然存在缺陷。由于 `链接` 上的 `投票` 不会立即更新，所以 `用户` 目前可以提交无限期投票，直到页面刷新。只有这样，保护机制才会适用，而不是u pvote，点击投票按钮将简单地导致控制台中的以下日志记录语句：_User（cj42qfzwnugfo01955uasit8l）already voted for this link。

但至少你知道这个变更是有效的。在下一节中，我们将解决问题，并确保每次变更后缓存都会被更新！

### 更新缓存

关于 Apollo 的一件很酷的事情是可以手动控制缓存的内容。这是非常方便的，特别是在执行变更之后，因为这样可以准确地控制希望更新缓存的方式。在这里，我们将使用它来确保 UI 在执行 `createVote` 变更之后显示正确的投票数。

我们可以通过使用 Apollo 的 [命令式存储 API](https://dev-blog.apollodata.com/apollo-clients-new-imperative-store-api-6cb69318a1e3) 来实现此功能。

<Instruction>

在 `Link` 文件中更新 `_voteForLink` 方法内的 `createVoteMutation` 方法调用：

```js(path=".../hackernews-react-apollo/src/components/Link.js")
const linkId = this.props.link.id
await this.props.createVoteMutation({
  variables: {
    userId,
    linkId
  },
  update: (store, { data: { createVote } }) => {
    this.props.updateStoreAfterVote(store, createVote, linkId)
  }
})
```

</Instruction>

当服务器返回响应时，将会调用作为参数添加到变量调用中的 `update` 函数。它接收到变量的有效负载（`data`）和当前的缓存（`store`）作为参数。然后，可以使用此输入来确定缓存的新状态。

请注意，我们已经 _解构_ 服务器响应并从中检索 `createVote` 字段。

好的，所以现在你知道这个 `update` 函数是什么，但实际的实现将在 `Link` 的父组件 `LinkList` 中完成。

<Instruction>

在 `LinkList.js` 文件中的 `LinkList` 组件中添加下面代码：

```js(path=".../hackernews-react-apollo/src/components/LinkList.js")
_updateCacheAfterVote = (store, createVote, linkId) => {
  // 1
  const data = store.readQuery({ query: ALL_LINKS_QUERY })
  
  // 2
  const votedLink = data.allLinks.find(link => link.id === linkId)
  votedLink.votes = createVote.link.votes
  
  // 3
  store.writeQuery({ query: ALL_LINKS_QUERY, data })
}
```

</Instruction>

这里发生了什么？

1. 我们从当前状态的`store` 读取 `ALL_LINKS_QUERY` 的缓存数据。
2. 然后检索用户刚刚从该列表中投票的链接。还通过将其 `投票` 重置为服务器刚刚返回的 `投票` 来操纵该链接。
3. 最后，将修改后的数据写入 store。

接下来，需要将此函数传递给 `Link`，以便调用。

<Instruction>

在 `LinkList.js` 文件中更新 `Link` 组件的渲染方式：

```js(path=".../hackernews-react-apollo/src/components/LinkList.js")
<Link key={link.id} updateStoreAfterVote={this._updateCacheAfterVote}  index={index} link={link}/>
```

</Instruction>

就是这样！ `updater` 函数现在将被执行，并确保在执行变更之后存储已正确更新。store
更新将触发组件的重新渲染，从而使用正确的信息更新UI！

在我们这样做的时候，我们还实现 `update` 添加新的链接！

<Instruction>

在 `CreateLink.js` 文件中更新 `createLinkMutation`：

```js(path=".../hackernews-react-apollo/src/components/CreateLink.js")
await this.props.createLinkMutation({
  variables: {
    description,
    url,
    postedById
  },
  update: (store, { data: { createLink } }) => {
    const data = store.readQuery({ query: ALL_LINKS_QUERY })
    data.allLinks.splice(0,0,createLink)
    store.writeQuery({
      query: ALL_LINKS_QUERY,
      data
    })
  }
})
```

</Instruction>

`update` 函数的工作原理与以前类似。首先读取 `ALL_LINKS_QUERY` 的结果的当前状态。然后将最新的链接插入顶部，并将查询结果写回 store。

<Instruction>

我们需要做的最后一件事导入 `ALL_LINKS_QUERY` 到该文件中：

```js(path=".../hackernews-react-apollo/src/components/CreateLink.js")
import { ALL_LINKS_QUERY } from './LinkList'
```

</Instruction>

相反，它也需要从定义的位置导出。

<Instruction>

在 `LinkList.js` 文件中并通过在其中添加 `export` 关键字来调整 `ALL_LINKS_QUERY` 的定义：

```js(path=".../hackernews-react-apollo/src/components/LinkList.js")
export const ALL_LINKS_QUERY = ...
```

</Instruction>

很好，现在随着新的链接添加，store 也会更新正确的信息。🤓
