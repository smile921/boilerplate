---
title: 更多 GraphQL 概念
pageTitle" "高级 GraphQL 语言概念教程"
description: "学习 GraphQL 语言的高级概念，譬如片段、查询参数、别名、接口以及其他 SDL 特性" 
question: 下列那句话是错的？
answers: ["别名可在多个查询中为结果对象命名", "片段有助于你 GraphQL 代码的结构和重用", "GraphQL 类型中的每个字段都能关联零个或多个参数", "GraphQL 具有内置 Date 类型"]
correctAnswer: 3
---


### 使用片段增强重用性

**片段**在提升 GraphQL 代码重用性上是一件称手的工具。片段是特定类型上的字段集合：

假设我们有以下类型：

```graphql(nocopy)
type User {
  name: String!
  age: Int!
  email: String!
  street: String!
  zipcode: String!
  city: String!
}
```

接着我们把表示一个用户物理地址的信息放进一个片段中：

```graphql(nocopy)
fragment addressDetails on User {
  name
  street
  zipcode
  city
}
```

然后，当编写请求用户地址信息的查询时，我们就能使用下面的句式来引用这个片段，而不必把每个片段都拼写出来：

```graphql(nocopy)
{
  allUsers {
    ... addressDetails
  }
}
```

这个查询等价于这个写法：

```graphql(nocopy)
{
  allUsers {
    name
    street
    zipcode
    city
  }
}
```

### 字段与参数

在 GraphQL 类型定义中，每个字段都能有零个或者多个**参数**。跟有类型语言中传给函数的参数一样，每个参数都需要**名字**和**类型**。GraphQL 中也能指定参数**默认值**。

拿我们前文中看到的 schema 的一部分举例：

```graphql(nocopy)
type Query {
  allUsers: [User!]!
}

type User {
  name: String!
  age: Int!
}
```

我们给 `allUsers` 字段添加一个参数，用于传递过滤用户的参数，从而只保留特定年龄以上的用户。我们也给这个参数设置默认值，这样默认情况下返回所有用户：

```graphql(nocopy)
type Query {
  allUsers(olderThan: Int = -1): [User!]!
}
```

通过下面的句式向查询传入 `olderThan` 参数：

```graphql(nocopy)
{
  allUsers(olderThan: 30) {
    name
    age
  }
}
```

### 使用别名为查询结果命名

GraphQL 的一大主要优势是可以一次请求中发送多个查询。然而，由于响应数据是根据请求的字段结构来构建的，所以当发送多个查询请求相同字段的时候，你可能会面临命名问题：

```graphql(nocopy)
{
  User(id: "1") {
    name
  }
  User(id: "2") {
    name
  }
}
```

事实上这个查询会使 GraphQL 服务器报错，因为使用不同参数查询了相同字段。唯一可以发送类似查询的方式就是使用别名，亦即，给查询结果指定名字：

```graphql(nocopy)
{
  first: User(id: "1") {
    name
  }
  second: User(id: "2") {
    name
  }
}
```

在结果中，服务器会给各个 `User` 对象赋予指定的别名：

```graphql(nocopy)
{
  "first": {
    "name": "Alice"
  },
  "second": {
    "name": "Sarah"
  }
}
```

### 高级 SDL

SDL 将提供两个之前章节尚未讨论的语言特性。下文中我们将以实际案例为例来讨论这些特性。

#### 对象 & 标量类型

在 GraphQL 中，有两种类型：

- **标量**类型表示具体数据。GraphQL 规范有五个预定义的标量：`String`、`Int`、`Float`、`Boolean` 和 `ID`。
- **对象**类型拥有**字段**用来表示这个类型的属性和可组装性。上文中的 `User` 和 `Post` 即是典型的对象类型案例。

在 GraphQL schema 中，你可以定义自己的标量和对象类型。一个经常被说起的自定义标量类型是 `Date` 类型，自定义标量类型需要定义类型验证、序列化和反序列化。

#### 枚举型

GraphQL 可以定义**枚举**类型，一种语言特性，表示一个类型可能是一个固定集合的中的值。我们可以像下面这样定义一个枚举类型 `Weekday`，表示一周的每一天：

```graphql(nocopy)
enum Weekday {
  MONDAY
  TUESDAY
  WEDNESDAY
  THURSDAY
  FRIDAY
  SATURDAY
  SUNDAY
}
```

需要注意的是，枚举型在技术上而言是一种特殊的标量类型。

#### 接口

**接口**可以抽象地描述一种类型。它要求你指定一系列的字段，用于具体类型去**实现**这个接口。在很多 GraphQL schema 中，每个类型都要求有一个 `id`。如果使用接口，这个需求可以如下示例来确定所有的自定义类型都实现了它：

```graphql(nocopy)
interface Node {
  id: ID!
}

type User implements Node {
  id: ID!
  name: String!
  age: Int!
}
```

#### 联合类型

**联合类型**用于表示一个类型将会是一个类型集合的中**某一个**。通过示例最好理解，我们考虑如下类型：

```graphql(nocopy)
type Adult {
  name: String!
  work: String!
}

type Child {
  name: String!
  school: String!
}
```  

然后我们定义一个 `Person` 类型，为 `Adult` 和 `Child` 的联合：

```graphql(nocopy)
union Person = Adult | Child
```

这带来一个不同的问题：GraphQL 查询请求的是 `Child` 但是我们只有一个 `Person` 的字段可用，我们该如何获取该字段呢？

其答案是**条件片段**：

```graphql(nocopy)
{
  allPersons {
    name # works for `Adult` and `Child`
    ... on Child {
      school
    }
    ... on Adult {
       work
    }
  }
}
``` 

