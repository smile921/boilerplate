---
title: "变更: 创建链接"
pageTitle: "React & Apollo 教程之 GraphQL 变更"
description: "了解如何在 Apollo 客户端中使用 GraphQL 变更。使用 Apollo 的 `graphql` 高阶组件来定义和发送变更。"
videoId: GFnUSoUfbhw
duration: 4
videoAuthor: "Abhi Aiyer"
question: 下列哪些陈述是正确的？
answers: ["只有查询可以用 `graphql` 高阶组件包装", "'gql' 是来自 react-apollo 包的高阶组件。", "当使用 'graphql' 包装一个具有变更的组件时，Apollo 将一个函数注入到组件的属性。", "
GraphQL 变更从来没有任何参数"]
correctAnswer: 2
---

在本节中，您将学习如何使用 Apollo 发送变更。实际上与发送查询并不一样，遵循前面提到的相同的三个步骤，步骤3中的次要（但逻辑上）有所不同：

1. 使用 `gql` 解析器函数将该变量写为 JS 常量
2. 使用 `graphql` 容器来包装组件与变更
3. 组件可以通过访问自己的属性来调用注入的变更函数

### 准备 React 组件

像以前一样，让我们​​开始编写一个用户添加新的链接的组件。

<Instruction>

在 `src/components` 文件夹下创建一个 `CreateLink.js` 文件，然后添加下面的代码：

```js(path=".../hackernews-react-apollo/src/components/CreateLink.js")
import React, { Component } from 'react'

class CreateLink extends Component {

  state = {
    description: '',
    url: ''
  }

  render() {
    return (
      <div>
        <div className='flex flex-column mt3'>
          <input
            className='mb2'
            value={this.state.description}
            onChange={(e) => this.setState({ description: e.target.value })}
            type='text'
            placeholder='A description for the link'
          />
          <input
            className='mb2'
            value={this.state.url}
            onChange={(e) => this.setState({ url: e.target.value })}
            type='text'
            placeholder='The URL for the link'
          />
        </div>
        <button
          onClick={() => this._createLink()}
        >
          Submit
        </button>
      </div>
    )
  }

  _createLink = async () => {
    // ... you'll implement this in a bit
  }

}

export default CreateLink
```

</Instruction>

这是一个具有两个 `input` 字段的 React 组件，用户可以在提供要创建的 `Link` 的 `url 地址` 和 `描述`。在这些字段中输入的数据将存储在组件的 `状态`，它们将用于当变更发送时 `_createLink`。

### 编写变更

但是现在怎么能实际发送变更呢？让我们按照以前的三个步骤。

首先，需要在 JavaScript 代码中定义变更，并使用 `graphql` 容器包装组件。可以像之前的查询一样做。

<Instruction>

在 `CreateLink.js` 文件中，将以下语句添加到文件的底部（也替换当前的 `export default CreateLink`）：

```js(path=".../hackernews-react-apollo/src/components/CreateLink.js")
// 1
const CREATE_LINK_MUTATION = gql`
  # 2
  mutation CreateLinkMutation($description: String!, $url: String!) {
    createLink(
      description: $description,
      url: $url,
    ) {
      id
      createdAt
      url
      description
    }
  }
`

// 3
export default graphql(CREATE_LINK_MUTATION, { name: 'createLinkMutation' })(CreateLink)
```

</Instruction>

我们再仔细看一下，了解发生了什么：

1. 首先创建存储变更的名为 `CREATE_LINK_MUTATION` 的 JavaScript 常量。
2. 定义了实际的 GraphQL 变更。调用这个变更时需要提供两个参数 `url 地址` 和 `描述`。
3. 最后，使用 `graphql` 容器把 `CreateLink` 组件和 `CREATE_LINK_MUTATION` 组合起来。指定的 `name` 是注入 `CreateLink` 的属性的名称。这一次，一个函数将被注入，称为  `createLinkMutation`，可以调用并传递所需的参数。

<Instruction>

在继续之前，需要导入 Apollo 依赖项。将以下内容添加到 `CreateLink.js` 的顶部：

```js(path=".../hackernews-react-apollo/src/components/CreateLink.js")
import { graphql, gql } from 'react-apollo'
```

</Instruction>

让我们在实际情况中看看变更！

<Instruction>

在 `CreateLink.js`，实现 `_createLink` 变更如下：

```js(path=".../hackernews-react-apollo/src/components/CreateLink.js")
_createLink = async () => {
  const { description, url } = this.state
  await this.props.createLinkMutation({
    variables: {
      description,
      url
    }
  })
}
```

</Instruction>

如所承诺的，我们需要做的就是将 Apollo 注入的功能称为 `CreateLink` ，并传递代表用户输入的变量。

<Instruction>

继续看看变更是否有效。为了能够测试代码，在 `App.js` 文件中将 `render` 改成如下所示：

```js(path=".../hackernews-react-apollo/src/components/App.js")
render() {
  return (
    <CreateLink />
  )
}
```  

</Instruction>

<Instruction>

接下来，通过将以下代码添加到 `App.js` 文件的顶部，导入 `CreateLink` 组件：

```js(path=".../hackernews-react-apollo/src/components/App.js")
import CreateLink from './CreateLink'
```

</Instruction>

现在，运行 `yarn start`，将会看到如下：

![](http://imgur.com/AJNlEfj.png) 

仅仅只有两个输入字段和一个提价按钮 - 不是很漂亮，但功能已实现。

在字段中输入一些数据，例如：

- **描述**: `The best learning resource for GraphQL`
- **URL 地址**: `www.howtographql.cn`

然后点击 _提交_ 按钮。不会在 UI 中获得任何视觉反馈，但是通过检查 playground 中的当前链接列表，我们来看看查询是否真的有效。

在终端输入 `graphcool playground` 并发送下面查询：

```graphql
{
  allLinks {
    description
    url
  }
}
```

将会看到下面的响应：

```js
{
  "data": {
    "allLinks": [
      {
        "description": "The best learning resource for GraphQL",
        "url": "www.howtographql.com"
      },
      // ...
    ]
  }
}
```

干的漂亮！变更起作用了！💪
