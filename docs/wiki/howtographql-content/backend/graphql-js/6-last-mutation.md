---
title: 更多关于变更
pageTitle: "使用 Javascript 构建 GraphQL服务器之更过关于变更"
description: "了解使用 Javascript，Node.js，Express 和 MongoDB 实现高级 GraphQL 变更的最佳实践。并在 GraphiQL playground 测试。"
question: 当需要添加一个新的 GraphQL 类型或字段时，通常首先要做什么？
answers: ["创建一个新的端点", "更新模式的定义", "添加一个新的解析函数", "创建一个新版本 API 以免发送冲突"]
correctAnswer: 1
---

### 为链接投票

现在只剩下一个需要添加的变更：允许用户投票链接。

<Instruction>

添加下面的类容来更新模式:

```graphql{3-3}(path=".../hackernews-graphql-js/src/schema/index.js")
type Mutation {
  createLink(url: String!, description: String!): Link
  createVote(linkId: ID!): Vote
  createUser(name: String!, authProvider: AuthProviderSignupData!): User
  signinUser(email: AUTH_PROVIDER_EMAIL): SigninPayload!
}
```

</Instruction>

请注意，唯一需要的参数是获得投票的链接的ID。用户投票应为当前已认证的用户，该用户已被包含在请求信息中，因此无需再次传递。

<Instruction>

还需要定义 `Vote` 类型，包含投票用户和投票的链接：

```graphql(path=".../hackernews-graphql-js/src/schema/index.js")
type Vote {
  id: ID!
  user: User!
  link: Link!
}
```

</Instruction>

<Instruction>

不要忘记在连接器文件中添加一个新的 MongoDB 集合：

```js{6-6}(path=".../hackernews-graphql-js/src/mongo-connector.js")
module.exports = async () => {
  const db = await MongoClient.connect(MONGO_URL);
  return {
    Links: db.collection('links'),
    Users: db.collection('users'),
    Votes: db.collection('votes'),
  };
}
```

</Instruction>

<Instruction>

现在为此变更添加解析函数：

```js(path=".../hackernews-graphql-js/src/schema/resolvers.js")
const {ObjectID} = require('mongodb')

module.exports = {
  // ...

  Mutation: {
    // ...

    createVote: async (root, data, {mongo: {Votes}, user}) => {
      const newVote = {
        userId: user && user._id,
        linkId: new ObjectID(data.linkId),
      };
      const response = await Votes.insert(newVote);
      return Object.assign({id: response.insertedIds[0]}, newVote);
    },
  },
}
```

</Instruction>

<Instruction>

最后，添加 相应的 `user` 和 `link` 解析函数 通过 `userId` 和 `linkId` 字段获取完整的用户和链接数据。

```js(path=".../hackernews-graphql-js/src/schema/resolvers.js")
Vote: {
  id: root => root._id || root.id,

  user: async ({userId}, data, {mongo: {Users}}) => {
    return await Users.findOne({_id: userId});
  },

  link: async ({linkId}, data, {mongo: {Links}}) => {
    return await Links.findOne({_id: linkId});
  },
},
```

</Instruction>

<Instruction>

和往常一样，重新启动服务器并通过 GraphiQL 测试新的变更。
As always, restart the server to test the new mutation via GraphiQL.
![](http://i.imgur.com/hRusO4K.png)

</Instruction>

### 链接和投票建立关联

我们已经可以创建投票了，但目前还没有办法获取它们！常见的用例是使用现有的 `allLinks` 查询来获取每个链接的投票。只需要更改 `链接` 类型来引用其投票。

<Instruction>

最后的模式中链接类型应该是这样的：

```graphql(path=".../hackernews-graphql-js/src/schema/index.js")
type Link {
  id: ID!
  url: String!
  description: String!
  postedBy: User
  votes: [Vote!]!
}
```

</Instruction>

<Instruction>

你能猜到下一步是什么吗？当然是为这个新的字段添加解析函数！

```js(path=".../hackernews-graphql-js/src/schema/resolvers.js")
Link: {
  // ...

  votes: async ({_id}, data, {mongo: {Votes}}) => {
    return await Votes.find({linkId: _id}).toArray();
  },
},
```

</Instruction>

如果重新启动服务器并再次运行 `allLinks`，那么应该能够访问每个链接的投票数据了：
![](https://i.imgur.com/vnXA6ws.png)

### 建立用户和投票的关联

按照相同的步骤，还可以添加一个新的字段，以便更容易地查找同一用户所做的所有投票。

<Instruction>

同样从模式定义开始:

```graphql(path=".../hackernews-graphql-js/src/schema/index.js")
type User {
  id: ID!
  name: String!
  email: String
  password: String
  votes: [Vote!]!
}
```

</Instruction>

<Instruction>

然后再在为新的字段添加解析函数：

```js(path=".../hackernews-graphql-js/src/schema/resolvers.js")
User: {
  // ...

  votes: async ({_id}, data, {mongo: {Votes}}) => {
    return await Votes.find({userId: _id}).toArray();
  },
},
```

</Instruction>

就是这样了！可以通过 GraphiQL 在测试下:
![](https://i.imgur.com/0H2t8zH.png)