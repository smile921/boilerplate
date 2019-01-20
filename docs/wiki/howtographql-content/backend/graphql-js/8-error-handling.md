---
title: 错误处理
pageTitle: "使用 Javascript 构建 GraphQL服务器之使用错误处理"
description: "了解使用 Javascript 验证 GraphQL 中的输入参数和错误处理的最佳实践。"
question: 如何更改发送到 GraphQL 客户端的错误消息的内容？
answers: ["在服务器调用中使用 `formatError` 选项", "从 `graphql-tools` 扩展一个特殊的错误类", "需要自己捕获错误并更改其内容", "没法子"]
correctAnswer: 0
---

### 模式验证错误

任何服务器都应该能够很好地处理错误，否则维护变得越来越难。幸运的是，我们一直在使用的工具也在这方面有所帮助。

实际上，如果现在尝试向服务器发送一个无效的请求，例如一个不存在的字段的请求，那么你将收到一个很好的错误消息。例如：

![](https://i.imgur.com/Br8oZzr.png)

这在构建应用程序时可是非常有用的，因为这种自动模式验证可以轻松帮助开发人员了解他/她的请求有什么问题。

### 应用错误

一些应用程序的错误。例如，假设 `createLink` 以 `url` 字段的形式作为一个字符串来调用，如模式指定的那样，但是它的内容不符合预期的 url 格式。在这种情况下，需要自己抛出错误。

幸运的是，我们需要做的就是检测问题并抛出错误。 `graphql-js` 会自动捕获它，并按照您的 GraphQL 响应的预期方式进行格式化。

<Instruction>

通过将在 `createLink` 解析函数中添加下面代码来尝试：

```js(path=".../hackernews-graphql-js/src/schema/resolvers.js")
const {URL} = require('url');

function assertValidLink ({url}) {
  try {
    new URL(url);
  } catch (error) {
    throw new Error('Link validation error: invalid url.');
  }
}

module.exports = {
  // ...
  Mutation: {
    createLink: async (root, data, {mongo: {Links}, user}) => {
      assertValidLink(data);
      const newLink = Object.assign({postedById: user && user._id}, data)
      const response = await Links.insert(newLink);
      return Object.assign({id: response.insertedIds[0]}, newLink);
    },
  },
}
```

</Instruction>

<Instruction>

重新启动服务器，并尝试创建一个无效 URL 的链接。您应该会收到下面的错误：
![](https://i.imgur.com/9Av5Flx.png)

</Instruction>

### 额外的错误数据

有时只是提供一个错误信息是不够的。提供一些关于错误的结构化数据可是非常有用的。想像一下一个创建链接的表单的 Web 应用程序，想要显示无效字段的错误消息。通过分析消息来做到这一点很难的。

如果使服务器还提供一个对象，指示无效的字段（或字段）的名称那就非常完美了不是吗？

<Instruction>

首先，您需要更改错误对象以了解此数据，因需要在解析函数文件中添加下面内容：

```js(path=".../hackernews-graphql-js/src/schema/resolvers.js")
class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.field = field;
  }
}

function assertValidLink ({url}) {
  try {
    new URL(url);
  } catch (error) {
    throw new ValidationError('Link validation error: invalid url.', 'url');
  }
}
```

</Instruction>

现在只需要在最终错误响应中包含额外数据。

<Instruction>

可以通过在 `graphqlExpress` 设置一个名为 `formatError` 的选项：

```js{1-1,13-13}(path=".../hackernews-graphql-js/src/index.js")
const formatError = require('./formatError');

// ...

const buildOptions = async (req, res) => {
  const user = await authenticate(req, mongo.Users);
  return {
    context: {
      dataloaders: buildDataloaders(mongo),
      mongo,
      user
    },
    formatError,
    schema,
  };
};
```

</Instruction>

<Instruction>

现在创建自己的 `formatError` 函数，如下所示：

```js(path=".../hackernews-graphql-js/src/formatError.js")
const {formatError} = require('graphql');

module.exports = error => {
  const data = formatError(error);
  const {originalError} = error;
  data.field = originalError && originalError.field;
  return data;
};
```

</Instruction>

这只是从 `graphql` 调用默认的 `formatError`，并在原始错误实例中添加 `field` 键。

<Instruction>

重新启动服务器并创建另一个链接与无效的 URL。您现在应该在错误数据中看到 `field` 键：
![](https://i.imgur.com/z19TbWS.png)

</Instruction>