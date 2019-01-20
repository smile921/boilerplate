---
title: 快速上手
pageTitle: "GraphQL，Javascript 和 Node.js 教程入门"
description: "
了解如何使用 Javascript，Node.js 以及 Express 来设置 GraphQL 服务器以及定义 GraphQL模式的最佳实践。"
question: 以下哪个包允许将 GraphQL 定义语言中的字符串转换为模式对象？
answers: ["body-parser", "graphql-tools", "apollo-server-express", "express"]
correctAnswer: 1
---

### 模式的定义

我们将从定义模式开始。将使用在前面的章节中提到过的 [GraphQL 模式定义语言](https://www.graph.cool/docs/faq/graphql-sdl-schema-definition-language-kr84dktnp0/)
来定义模式。通常，这比自己手动构建模式对象更简单和灵活（如果想要手动构建也可以）！

在这章节我们将构建一个 [Hackernews](https://news.ycombinator.com/) 克隆应用后端服务，首先得从最重要的数据开始：`Link` 类型。

```graphql
type Link {
  id: ID!
  url: String!
}
```

> **注意:** 如果您完成了之前的前端的教程，您可能会注意到， 现在咱们得手动置顶 `id` 字段了，因为 Graphcool 不会自动生成。而且也不能使用 `@relation` 和 `@isUnique`，因为那也是 Graphcool 特别的处理方式。现在就只是纯粹的 GraphQL 方式。


> **福利**: 超级有用的 [](https://raw.githubusercontent.com/sogko/graphql-shorthand-notation-cheat-sheet/master/graphql-shorthand-notation-cheat-sheet.png)[GraphQL 速查表](https://github.com/sogko/graphql-schema-language-cheat-sheet)。

### 安装依赖

通过下面几个步骤来创建项目。

<Instruction>

**步骤一**：首先，需要在您的计算机上安装 Node.js。如果还没有，请务必[现在](https://nodejs.org/en/)。请注意，这里的代码示例假定了最新版本的 Node.js，支持 ES6。

</Instruction>

<Instruction>

**步骤二**： 在您选择的目录下通过命令行输入 `npm init -y` 来初始化 **package.json** 文件。

</Instruction>

<Instruction>

**步骤三**： 安装下面的依赖包：

```bash(path=".../hackernews-graphql-js")
npm install --save express body-parser apollo-server-express graphql-tools graphql
```

</Instruction>

如果您不熟悉这些软件包，不必担心我们将在后面会解释它们分别有什么用处。

### 服务器设置

<Instruction>

首先，在创建文件 `src/schema/index.js` 并如下面的代码来定义模式：

```js(path=".../hackernews-graphql-js/src/schema/index.js")
const {makeExecutableSchema} = require('graphql-tools');

// 在这里定义所有的类型
const typeDefs = `
  type Link {
    id: ID!
    url: String!
    description: String!
  }
`;

// 根据所有类型来生成模式对象
module.exports = makeExecutableSchema({typeDefs});
```

</Instruction>

工具包 [graphql-tools](http://npmjs.com/package/graphql-tools) 为了帮助构建 GraphQL 服务器而提供了许多有用的工具，我们用到的 `makeExecutableSchema,` 就是将模式定义语言的字符串作为参数用来生成服务器需要的完整的 `GraphQLSchema` 对象的其中一个工具。

<Instruction>

Now create the main server file at `src/index.js`, with the following content:

现在创建服务器主要入口文件 `src/index.js`，内容如下：

```js(path=".../hackernews-graphql-js/src/index.js")
const express = require('express');

// bodyParser 包用来自动解析请求中的 JSON 数据。
const bodyParser = require('body-parser');

// apollo-server-express 包将根据模式来处理 GraphQL 服务器的请求并返回响应。
const {graphqlExpress} = require('apollo-server-express');

const schema = require('./schema');

var app = express();
app.use('/graphql', bodyParser.json(), graphqlExpress({schema}));

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Hackernews GraphQL server running on port ${PORT}.`)
});
```

</Instruction>

<Instruction>

通过下面的命令来运行服务器:

```bash(path=".../hackernews-graphql-js")
node ./src/index.js
```

</Instruction>

如果你这样做，你会得到一个错误：`Must provide schema definition with query type or a type named Query`。这是因为我们子啊模式中定义里类型，但是还没有使用到查询。