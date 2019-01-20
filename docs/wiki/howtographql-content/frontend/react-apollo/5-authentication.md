---
title: 认证
pageTitle: "React 和 Apollo 教程之 GraphQL 认证"
description: "了解使用 GraphQL 和 Apollo 客户端进行身份验证的最佳实践，以便在具有 Graphcool 的 React 应用程序中提供基于邮箱和密码的登录。"
question: "在启用邮件加密码认证后，Graphcool 项目中添加的两个变更的名称是什么？"
answers: ["用户登录和用户注销", "用户注册和创建用户", "创建用户和用户登录", "用户注册和用户注销"]
correctAnswer: 1
videoId: MiNDIWK7Q1I
duration: 12
videoAuthor: "Abhi Aiyer"
---

在本章节内容中，我们将学习如何使用 Apollo 和 Graphcool 实现用户认证功能。

### 准备 React 组件

我们将从编写 `Login` 组件开始。

<Instruction>

首先在 `src/components` 文件夹下创建 `Login.js` 文件。并添加下面的代码：

```js(path=".../hackernews-react-apollo/src/components/Login.js")
import React, { Component } from 'react'
import { GC_USER_ID, GC_AUTH_TOKEN } from '../constants'

class Login extends Component {

  state = {
    login: true, // switch between Login and SignUp
    email: '',
    password: '',
    name: ''
  }

  render() {

    return (
      <div>
        <h4 className='mv3'>{this.state.login ? 'Login' : 'Sign Up'}</h4>
        <div className='flex flex-column'>
          {!this.state.login &&
          <input
            value={this.state.name}
            onChange={(e) => this.setState({ name: e.target.value })}
            type='text'
            placeholder='Your name'
          />}
          <input
            value={this.state.email}
            onChange={(e) => this.setState({ email: e.target.value })}
            type='text'
            placeholder='Your email address'
          />
          <input
            value={this.state.password}
            onChange={(e) => this.setState({ password: e.target.value })}
            type='password'
            placeholder='Choose a safe password'
          />
        </div>
        <div className='flex mt3'>
          <div
            className='pointer mr2 button'
            onClick={() => this._confirm()}
          >
            {this.state.login ? 'login' : 'create account' }
          </div>
          <div
            className='pointer button'
            onClick={() => this.setState({ login: !this.state.login })}
          >
            {this.state.login ? 'need to create an account?' : 'already have an account?'}
          </div>
        </div>
      </div>
    )
  }

  _confirm = async () => {
    // ... you'll implement this in a bit
  }

  _saveUserData = (id, token) => {
    localStorage.setItem(GC_USER_ID, id)
    localStorage.setItem(GC_AUTH_TOKEN, token)
  }

}

export default Login
```

</Instruction>

让我们快速了解这个新组件的结构，它有两个主要的状态。

第一个状态是为已经存在的用户来登录使用的。在这种情况下组件只渲染两个 `input` 让用户输入 `email` 和 `password`。这时 `state.login` 的值是 `true`。

另外一种状态是为了用户注册使用的。组件需要渲染三个 `input` 让用户输入 `email`，`password` 和 `name`。这时 `state.login` 的值是 `false`。

接下来，我们还需要提供 `constants.js` 文件，用于为浏览器的 `localStorage` 中存储的凭据的键。

<Instruction>

在 `src` 文件夹下创建 `constants.js` 文件并添加下面的内容：

```js(path=".../hackernews-react-apollo/src/constants.js")
export const GC_USER_ID = 'graphcool-user-id'
export const GC_AUTH_TOKEN = 'graphcool-auth-token'
```

</Instruction>

然后我们需要添加一个新的路由。

<Instruction>

在 `App.js` 文件中的 `render` 函数中添加新的路由:

```js{7}(path=".../hackernews-react-apollo/src/components/App.js")
render() {
  return (
    <div className='center w85'>
      <Header />
      <div className='ph3 pv1 background-gray'>
        <Switch>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/create' component={CreateLink}/>
          <Route exact path='/' component={LinkList}/>
        </Switch>
      </div>
    </div>
  )
}
```

</Instruction>

<Instruction>

还需要导入 `Login` 组件：

```js(path=".../hackernews-react-apollo/src/components/App.js")
import Login from './Login'
```

</Instruction>

最后，继续添加 `Link` 到 `Header`，让用户可以浏览到 `Login` 页面。

<Instruction>

在 `Header.js` 文件中更新 `render` 函数:

```js{2,8,13,15-25}(path=".../hackernews-react-apollo/src/components/Header.js")
render() {
  const userId = localStorage.getItem(GC_USER_ID)
  return (
    <div className='flex pa1 justify-between nowrap orange'>
      <div className='flex flex-fixed black'>
        <div className='fw7 mr1'>Hacker News</div>
        <Link to='/' className='ml1 no-underline black'>new</Link>
        {userId &&
        <div className='flex'>
          <div className='ml1'>|</div>
          <Link to='/create' className='ml1 no-underline black'>submit</Link>
        </div>
        }
      </div>
      <div className='flex flex-fixed'>
        {userId ?
          <div className='ml1 pointer black' onClick={() => {
            localStorage.removeItem(GC_USER_ID)
            localStorage.removeItem(GC_AUTH_TOKEN)
            this.props.history.push(`/new/1`)
          }}>logout</div>
          :
          <Link to='/login' className='ml1 no-underline black'>login</Link>
        }
      </div>
    </div>
  )
}
```

</Instruction>

首先从本地存储中检索 `userId`。如果 `userId` 不可用，则 _提交按钮_ 将不再被渲染。这样，您确保只有经过身份验证的用户才能创建新的链接。

还在 `Header` 组件中右侧添加了第二个按钮，用户可以使用它来登录和注销。

<Instruction>

最后在 `Header.js` 文件头部导入 `constants.js` 文件：

```js(path=".../hackernews-react-apollo/src/components/Header.js")
import { GC_USER_ID, GC_AUTH_TOKEN } from '../constants'
```

</Instruction>

下面是 `Login` 组件渲染后的页面：

![](http://imgur.com/tBxMVtb.png)

在 `Login.js` 中实现身份验证功能之前，需要准备 Graphcool 项目并在服务器端启用身份验证。

### 启用邮件-密码认证以及更新模式

<Instruction>

在包含 `project.graphcool` 文件的目录下，输入下面命令行命令：

```bash(path="../hackernews-react-apollo")
graphcool console
```

</Instruction>

这条命令将打开一个网页，我们将通过这个页面来配置我们的 Graphcool 项目。

<Instruction>

选择 _Integrations_ 面板然后点击 _Email-Password-Auth_-integration.

</Instruction>

![](http://imgur.com/FkyzuuM.png)

这将打开弹出窗口，允许我们启用 Graphcool 基于电子邮件的身份验证机制。

<Instruction>

在窗口中点击 _Enable_。

</Instruction>

![](http://imgur.com/HNdmas3.png)

通过开启 `邮件-密码` 认证机制我们可以在项目中添加两个变更。

```graphql(nocopy)
# 1. 创建用户
createUser(authProvider: { email: { email, password } }): User

# 2. 登录
signinUser(email: { email, password }): SignInUserPayload

# SignInUserPayload bundles information about the `user` and `token`
type SignInUserPayload {
  user: User
  token: String
}
```

接下来，必须确保身份验证提供程序引入的更改反映在本地项目文件中。可以使用 `graphcool pull` 来更新本地模式文件。

<Instruction>

打开一个终端窗口并导航到 `project.graphcool` 所在的目录。然后运行以下命令：

```bash(path="../hackernews-react-apollo")
graphcool pull
```

</Instruction>

> 注意：在获取远程模式之前，系统将要求确认要覆盖当前的项目文件。可以输入 `y` 来确认。

这将使模式 `version` 变为 `2` 并更新 `User` 类型，现在还包括 `email` 和 `password` 字段：

```{3,5}graphql(nocopy)
type User implements Node {
  createdAt: DateTime!
  email: String @isUnique
  id: ID! @isUnique
  password: String
  updatedAt: DateTime!
}
```

接下来，需要对模式进行一次修改。通常，两种更新 Graphcool 项目的模式的方法：

1. 使用基于 Web 的 [Graphcool Console](https://console.graph.cool) 来直接更改模式。
2. 使用本地的 Graphcool 项目文件和 CLI。

<Instruction>

打开项目文件 `project.graphcool`，并更新 `User` 和 `Link` 类型，如下所示：

```{7,17}graphql
type Link implements Node {
  createdAt: DateTime!
  description: String!
  id: ID! @isUnique
  updatedAt: DateTime!
  url: String!
  postedBy: User @relation(name: "UsersLinks")
}

type User implements Node {
  createdAt: DateTime!
  id: ID! @isUnique
  email: String @isUnique
  updatedAt: DateTime!
  name: String!
  password: String
  links: [Link!]! @relation(name: "UsersLinks")
}
```

</Instruction>

我们在模式中添加了两个东西:

- 在 `User` 类型中添加了一个新的字段 `name`。
- 在 `User` 类型和 `Link` 类型中申明了关联。 用户有许多链接而链接是由用户创建的。

<Instruction>

保存文件并在终端中执行以下命令：

```bash(path="../hackernews-react-apollo")
graphcool push
```

</Instruction>

这是终端输出结果：

```sh(nocopy)
$ graphcool push
 ✔ Your schema was successfully updated. Here are the changes: 

  | (*)  The type `User` is updated.
  ├── (+)  A new field with the name `name` and type `String!` is created.
  |
  | (+)  The relation `UsersLinks` is created. It connects the type `Link` with the type `User`.

Your project file project.graphcool was updated. Reload it in your editor if needed.
```

> **注意**: 在使用 `graphcool push` 命令将本地的模式更新推送到 graphcool 后，我们也可以使用 `graphcool status` 命令来查看当前模式的状态。

完美，我们已经在应用程序中实现身份验证功能。

### 实现登录变更

`createUser` 和 `signinUser` 是两个常规的 GraphQL 变更，我们可以使用与以前使用的 `createLink` 变更相同的方式。

<Instruction>

在 `Login.js` 文件尾部定义两个常量并更改当前的 `export Loign` 语句：

```js(path=".../hackernews-react-apollo/src/components/Login.js")
const CREATE_USER_MUTATION = gql`
  mutation CreateUserMutation($name: String!, $email: String!, $password: String!) {
    createUser(
      name: $name,
      authProvider: {
        email: {
          email: $email,
          password: $password
        }
      }
    ) {
      id
    }

    signinUser(email: {
      email: $email,
      password: $password
    }) {
      token
      user {
        id
      }
    }
  }
`

const SIGNIN_USER_MUTATION = gql`
  mutation SigninUserMutation($email: String!, $password: String!) {
    signinUser(email: {
      email: $email,
      password: $password
    }) {
      token
      user {
        id
      }
    }
  }
`

export default compose(
  graphql(CREATE_USER_MUTATION, { name: 'createUserMutation' }),
  graphql(SIGNIN_USER_MUTATION, { name: 'signinUserMutation' })
)(Login)
```

</Instruction>

请注意，这次我们使用 `compose` 作为导出语句，因为我们想要包含多个变量。

在我们仔细观察这两个变更之前，请继续添加所需的导入。

<Instruction>

依然是在 `Login.js` 文件的顶部添加下面的代码：

```js(path=".../hackernews-react-apollo/src/components/Login.js")
import { gql, graphql, compose } from 'react-apollo'
```

</Instruction>

现在，让我们来看一下刚才添加到组件中的两个变更的作用。

`SIGNIN_USER_MUTATION` 变更跟之前的变更很相似。它接收 `email` 和 `password` 作为参数返回有关 `user` 的信息以及后续请求用来验证用户的 `token`。

`CREATE_USER_MUTATION` 有点不一样! 在这里，我们实际定义了两个变更！执行顺序总是 _从上到下_。也就是说 `createUser` 变更将先执行而后在执行 `signinUser` 变更。通过创建两个变更使得在一个请求中注册和登录！

好的，剩下的一切就是调用代码中的两个变更！

<Instruction>

在 `Login.js` 文件中实现 `_confirm` 函数:

```js(path=".../hackernews-react-apollo/src/components/Login.js")
_confirm = async () => {
  const { name, email, password } = this.state
  if (this.state.login) {
    const result = await this.props.signinUserMutation({
      variables: {
        email,
        password
      }
    })
    const id = result.data.signinUser.user.id
    const token = result.data.signinUser.token
    this._saveUserData(id, token)
  } else {
    const result = await this.props.createUserMutation({
      variables: {
        name,
        email,
        password
      }
    })
    const id = result.data.signinUser.user.id
    const token = result.data.signinUser.token
    this._saveUserData(id, token)
  }
  this.props.history.push(`/`)
}
```

</Instruction>

代码很简单。如果用户只想登录，会调用 `signinUserMutation`，并将提供的 `email` 和 `password` 作为参数传递。否则使用 `createUserMutation`，也可以传递用户的 `name`。执行变更后，将 `id` 和 `token` 存储在 `localStorage` 中，并返回到根路径。

现在可以通过提供一个 `名称`，`电子邮件`和 `密码` 来创建一个帐户。一旦这样做，_提交_ 按钮将再次出现：

![](http://imgur.com/WoWLmDJ.png) 

### 更新 `createLink` 变更

既然现在可以验证用户，并且在 `Link` 和 `User` 类型之间添加了新的关系，还可以确保在应用程序中创建的每个新链接都可以存储有关发布用户的信息。这就是 `Link` 上的 `postBy` 字段的作用。

<Instruction>

在 `CreateLink.js` 文件中更新 `CREATE_LINK_MUTATION` 的定义：

```js(path=".../hackernews-react-apollo/src/components/CreateLink.js")
const CREATE_LINK_MUTATION = gql`
  mutation CreateLinkMutation($description: String!, $url: String!, $postedById: ID!) {
    createLink(
      description: $description,
      url: $url,
      postedById: $postedById
    ) {
      id
      createdAt
      url
      description
      postedBy {
        id
        name
      }
    }
  }
`
```

</Instruction>

有两个主要的变化。首先在变更中添加了另一个参数，该变量表示发布链接的用户的 `id`。其次，还将 `postedBy` 信息包含在 _有效载荷_ 中。

现在需要确保在 `_createLink` 中调用变量时包含发布用户的 `id`。

<Instruction>

依然是在 `CreateLink.js` 文件中更新 `_createLink`：

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
    }
  })
  this.props.history.push(`/`)
}
```

</Instruction>

还需要导入 `GC_USER_ID`。

<Instruction>

在 `CreateLink.js` 文件中头部添加下面代码：

```js(path=".../hackernews-react-apollo/src/components/CreateLink.js")
import { GC_USER_ID } from '../constants'
```

</Instruction>

完美！在发送变更之前，我们将从 `localStorage` 中检索相应的用户标识。如果成功，将传递给 `createLinkMutation` 的调用，以便每个新的 `Link` 从现在开始存储有关创建它的 `User` 的信息。

如果以前没有这样做，请继续测试登录功能。运行 `yarn start` 并打开`http//localhost3000/login`。然后单击 _注册_ 按钮，并为要创建的用户提供一些用户数据。最后点击 _创建帐户_ 按钮。如果一切顺利，应用程序将返回到根路径，并创建用户。您可以通过检查 [数据浏览器](https://www.graph.cool/docs/reference/console/data-browser-och3ookaeb/) 或在 playground 中发送 `allUsers` 查询来验证新用户是否存在。

### 配置 Apollo 的认证令牌

现在，用户可以登录并获取一个令牌，它可以根据 Graphcool 后端进行身份验证，实际上需要确保令牌被附加到发送到 API 的所有请求。

由于所有 API 请求实际上都是由应用程序中的 `ApolloClient` 创建和发送的，所以需要确保它知道用户的令牌。幸运的是，Apollo 提供了一种通过使用[中间件](http://dev.apollodata.com/react/auth.html#Header) 验证所有请求的好方法。

<Instruction>

在 `index.js` 文件中在添加下面的代码：

```js(path=".../hackernews-react-apollo/src/index.js")
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
```

</Instruction>

<Instruction>

然后直接从 `localStorage` 检索令牌的文件中导入密钥：

```js(path=".../hackernews-react-apollo/src/index.js")
import { GC_AUTH_TOKEN } from './constants'
```

</Instruction>

就是这样 - 如果 `token` 可用，那现在所有的 API 请求都将被认证。

> 注意：在实际应用程序中，需要配置项目的 [授权规则](https://www.graph.cool/docs/reference/auth/authorization-iegoo0heez/) 以确定哪种操作需要通过身份验证并且应该允许未认证的用户执行。