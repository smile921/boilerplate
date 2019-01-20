---
title: GraphQL 核心概念
pageTitle: GraphQL 核心概念
description: "了解基本的 GraphQL 语言概念，如查询，变更，订阅和 GraphQL 模式与 SDL。在自己的沙盒里试试看。"
question: "GraphQL 订阅功能是用来干啥的？"
answers: ["基于事件的实时功能", "基于模式的实时功能", "可以使用它来订阅 GraphQL Weekly 资讯", "通过组合使用查询和变更来读取和更改数据"]
correctAnswer: 0
videoId: NeQfq0U5LnI
duration: 15
---

在本章中，您将了解 GraphQL 的一些基本语言结构。包括 _类型_ 的语法定义规则以及关于 _查询_ 和 _变更_的语法定义和发送有基本的了解。还可以在 [graphql-up](https://github.com/graphcool/graphql-up) 沙盒环境中练习所学到的内容。

### 模式定义语言（SDL）

GraphQL 拥有自己的类型系统，用于定义 API 的 _模式_。编写模式的语法称为[模式定义语言](https://www.graph.cool/docs/faq/graphql-sdl-schema-definition-language-kr84dktnp0/) (SDL)。

下面是一个使用SDL定义一个简单的类型 `Person` 例子:

```graphql(nocopy)
type Person {
  name: String!
  age: Int!
}
```

该类型由两个 *字段* 组成，类型为 `String` 的 `name` 和类型为 `Int` 的 `age`。`!` 表示该 *字段* 为 *必选*。

也可以在类型之间声明关联。如博客应用中，`Person` 类型可与类型 `Post` 声明关联:

```graphql(nocopy)
type Post {
  title: String!
  author: Person!
}
```

相反，也需要在 `Person` 类型中声明关联:

```graphql(nocopy)
type Person {
  name: String!
  age: Int!
  posts: [Post!]!
}
```

实际上我们刚才在 `Person` 和 `Post` 声明了 *一对多* 的关联，而且 `Person` 类型中的 `posts`字段实际是 *数组* 类型。

### 使用查询获取数据

使用 REST API 时，会从特定端点获取数据。每个端点都返回一个定义明确数据结构。这意味着客户端访问 _编码过_ 的有效 URL 来获取数据。

GraphQL 却采用截然不同的方式。 GraphQL API 通常只会暴露 *单个端点* 而不是返回固定数据结构的多个端点。这是因为返回的数据结构不是固定的。相反，它是完全灵活的，让客户端决定实际需要什么数据。

这意味着客户端需要向服务器发送更多的 *信息* 来表达其数据需求 - 这个信息称为 *查询*。

#### 基本的查询

首先看看客户端可以发送给服务器的示例查询：

<Playground height="200">

```graphql(nocopy)
{
  allPersons {
    name
  }
}
```

</Playground>

这条查询中的 `allPersons` 字段称为查询的 _根字段_。 根字段之后的所有内容都称为查询的 _有效载荷_。在该查询中指定的唯一字段是 `name`。

这条查询将返回数据库中所有的用户列表：

```js(nocopy)
{
  "allPersons": [
    { "name": "Johnny" },
    { "name": "Sarah" },
    { "name": "Alice" }
  ]
}
```

注意每个用户只包含了 `name`，而没有返回 `age` 信息。正是因为查询中只声明了 `name` 字段。
如果客户端需要用户的 `age`，只需要在查询中添加这个字段：

<Playground>

```graphql
{
  allPersons {
    name
    age
  }
}
```

</Playground>

GraphQL 的主要优点之一是允许自然查询 *嵌套的* 信息。例如，如果要加载 `Person` 所有的 `posts` 信息，可以简单地按照类型的结构来请求获取此信息:

<Playground>

```graphql
{
  allPersons {
    name
    age
    posts {
      title
    }
  }
}
```

</Playground>

#### 带参数的查询

在 GraphQL中，每个 *字段* 都可以在 *模式* 中定义零个或多个参数。例如，`allPersons` 查询可以有一个 `last` 参数，只能返回一定数量的人。以下是相应的查询：

<Playground>

```graphql(nocopy)
{
  allPersons(last: 2) {
    name
  }
}
```

</Playground>

### 使用变更来更改数据

不仅仅只是需要获取数据，大多数应用程序还需要一些更改当前存储在数据库中数据的方法。使用 GraphQL，这些更改是通过所谓的 *突变* 来进行的。一般有三种突变：

* 创建新的数据
* 更新已经存在的数据
* 删除已经存在的数据

突变和查询使用相同的语法结构，但突变都以 `mutation` 关键字开始。下面是创建新的 `Person` 的例子：

<Playground>

```graphql(nocopy)
mutation {
  createPerson(name: "Bob", age: 36) {
    name
    age
  }
}
```

</Playground>

请注意，和查询一样，变更也有一个 _根字段_ - 在这种情况下，它被称为 `createPerson`。在这种情况下，`createPerson` 字段有两个参数：`name` 和 `age`。

像查询一样，我们还可以为变更指定一个有效载荷，可以在获取新的 `Person` 对象的不同属性。在我们的例子中，我们需要 `name` 和 `age` 字段。这在我们的例子中并不是非常有用的，因为我们显然已经知道它们，因为我们将它们转化为突变。然而，当发送突变时也能够查询信息是一个非常强大的工具，它允许您在单个往返中从服务器获取新创建数据的内容！

对于上面的变更请求服务器将返回：

```js(nocopy)
"createPerson": {
  "name": "Bob",
  "age": "36",
}
```

服务器在创建新的 GraphQL 类型对象时会生成一个唯一的 *ID*。可以在 `Person` 类型中添加 `id` 字段：

```graphql(nocopy)
type Person {
  id: ID!
  name: String!
  age: Int!
}
```

现在，当创建一个新的 `Person` 时，可以直接在变量的有效载荷中请求 `id`，因为这是事先不能在客户端上使用的信息：

<Playground>

```graphql(nocopy)
mutation {
  createPerson(name: "Alice", age: 36) {
    id
  }
}
```

</Playground>

### 通过订阅来实时更新

今天许多应用程序的另一个重要要求是与服务器进行 *实时* 连接，以便了解重要事件的实时更新。对于这种用例，GraphQL 提供 *订阅* 的概念。

当客户端 *订阅* 事件时，它将启动并保持与服务器的稳定连接。无论何时实际发生特定事件，服务器将相应的数据推送到客户端。与典型的 “*request-response*-cycle”中的查询和突变不同，订阅表示发送到客户端的数据的 *流*。

订阅使用与查询和突变相同的语法编写。这里有一个例子，我们订阅 `Person` 类型上发生的事件：

<Playground>

```graphql(nocopy)
subscription {
  newPerson {
    name
    age
  }
}
```

</Playground>

客户端将此订阅发送到服务器后，将在它们之间建立连接。然后，每当执行一个创建新的 `Person` 的新突变时，服务器将有关此人的信息推送到客户端：

```graphql(nocopy)
{
  "newPerson": {
    "name": "Jane",
    "age": 23
  }
}
```

### 模式的定义

目前，您已经对什么是查询，突变和订阅有一个基本的了解，让我们将它们放在一起，并学习如何编写一个模式。

在 GraphQL 中 *模式* 是最重要的概念之一。它指定了 API 的功能，并定义了客户端如何获取数据。它通常被视为服务器和客户端之间的 *合同*。

通常，模式只是 GraphQL 类型的集合。但是，当编写 API 的模式时，有一些特殊的 *根* 类型：

```graphql(nocopy)
type Query { ... }
type Mutation { ... }
type Subscription { ... }
```

`Query`，`Mutation` 和 `Subscription` 类型是客户端发送的请求的 *入口点*。为了启用之前的 `allPersons` 查询，`Query` 类型必须写成如下：

```graphql(nocopy)
type Query {
  allPersons: [Person!]!
}
```

`allPersons` 被称为 API 的 *根字段*。而之前的 `allPersons` 字段中添加 `last` 参数的例子，我们必须按照下面的语法格式编写`Query`：

```graphql(nocopy)
type Query {
  allPersons(last: Int): [Person!]!
}
```

类似地，对于 `createPerson` -突变， 则需要在 `Mutation` 类型中添加一个根字段：

```graphql(nocopy)
type Mutation {
  createPerson(name: String!, age: Int!): Person!
}
```

请注意，此根字段还有两个参数，新的 `Person` 的 `name` 和 `age`。

最后，对于订阅，我们必须添加 `newPerson` 根字段：

```graphql(nocopy)
type Subscription {
  newPerson: Person!
}
```

这是你在本章中看到的所有查询和突变的模式：

```graphql(nocopy)
type Query {
  allPersons(last: Int): [Person!]!
}

type Mutation {
  createPerson(name: String!, age: Int!): Person!
}

type Subscription {
  newPerson: Person!
}

type Person {
  name: String!
  age: Int!
  posts: [Post!]!
}

type Post {
  title: String!
  author: Person!
}
```
