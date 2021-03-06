---
title: 安全
pageTitle: "安全和 GraphQL 教程"
description: "学习有关 GraphQL 的不同安全策略，譬如超时、最大查询深度、查询复杂度和阈值。"
question: 下面那个用于防御恶意、超大量查询的策略是错误的？
answers: ["计算查询复杂度", "最大查询深度", "增加服务器", "超时"]
correctAnswer: 2
---

GraphQL 给了客户端很大的能力，但是能力越大责任越大 🕷。

由于客户端能够构建非常复杂的查询，我们的服务器必须要对此有所准备。这些查询有可能是来自于恶意客户端的恶意查询，也可能是来自于合法客户端的超大查询。两种情况下，都存在客户端把你 GraphQL 服务器拖垮的可能。

有一些策略可以缓和这些风险，我们将在本章从简单到复杂地描述，并且比较它们的优缺点。

## 超时

第一个也是最简单的策略是使用超时来抵抗超大查询。这个是最简单的策略，因为它并不要求服务器知晓任何关于查询的信息，服务器所知道的只有一个查询最多能执行多久。

例如，服务配置了 5 秒超时，然后就停止执行任何时间超过了 5 秒的查询。

### 超时的优点

  - 易于实现
  - 大多数策略都会使用超时作最终防御

### 超时的缺点

  - 即便超时已经介入，但是也可能已经造成了损害
  - 某些场景下难以实现。譬如一定时间后截断 connection 会导致异常行为。

## 最大查询深度

如之前所说，GraphQL 客户端可以构建任意复杂的查询。由于通常 GraphQL schema 是环式的，所以可能会构建像这样的查询：

```graphql
query IAmEvil {
  author(id: "abc") {
    posts {
      author {
        posts {
          author {
            posts {
              author {
                # 这个查询可以继续深入，只要客户端愿意！
              }
            }
          }
        }
      }
    }
  }
}
```

如果我们可以防御客户端的恶意加深查询深度呢？知道你的 schema 之后就能知道一个合法查询能走多深。这个功能的实现也是可能的，通常被称作**最大查询深度**。

通过分析一个查询文档的 AST（抽象语法树），GraphQL 服务器就能根据它的深度判断是接受还是拒绝这个请求。

举个例，一个服务器配置了最大查询深度为 `3`，然后使用这个下面这个查询文档。所有标红的位置都是深度太深的地方，因此查询无效。

![Query Depth Example](http://i.imgur.com/6RqfhK8.png)

使用 `graphql-ruby`，并设置查询深度，我们得到如下结果：

```json
{
  "errors": [
    {
      "message": "Query has depth of 6, which exceeds max depth of 3"
    }
  ]
}
```

### 最大查询深度的优点

  - 因为文档的 AST 是通过静态分析的，它并没有执行，所以并不会增加你 GraphQL 服务器的负载。

### 最大查询深度的缺点

  - 仅仅深度限制并不能覆盖所有恶意查询。譬如，一个在根节点请求大量数据的查询，它的性能开销会很大，却不像是会被查询深度分析器所阻止。

## 查询复杂度

有时候，一个查询的深度并不足矣判断这个 GraphQL 查询的性能开销有多大。多数情况下，解析 schema 中的某个字段会比其他字段更为复杂。

查询复杂度让你可以定义每个字段对应有多复杂，从而通过最大复杂度限制查询。这个方案是通过数字来给每个字段定义其复杂度。通常的默认方式是每个字段的复杂度都为 `1`。就像下面这个示例：


```graphql
query {
  author(id: "abc") { # 复杂度：1
    posts {           # 复杂度：1
      title           # 复杂度：1
    }
  }
}
```

简单相加就能得到这个查询的复杂度为 `3`。如果我们将最大复杂度设置 `2`，那么这个查询就会失败。

如果 `posts` 字段比 `author` 更为复杂呢？我们能在字段上设置不同的复杂度，我们甚至还能根据参数设置不通的复杂度！我们看看一个类似的查询，其中 `posts` 根据其参数拥有不同的复杂度：


```graphql
query {
  author(id: "abc") {    # 复杂度：1
    posts(first: 5) {    # 复杂度：5
      title              # 复杂度：1
    }
  }
}
```

### 查询复杂度优点

  - 覆盖比简单查询深度检测更大的场景。
  - 通过静态分析，能够在查询执行之前拒绝。

### 查询复杂度缺点

  - 难以完美实现。
  - 如果复杂度是由程序员评估的，那我们该如何使之保持最新？我们怎么先算出性能消耗呢？
  - 变更操作难以评估。如果变更操作拥有副作用，有一个难以估算性能消耗的后台任务该怎么评估？

## 阈值

目前我们看到的方案都能不错地避免你服务器被恶意查询拖垮。而问题是，如果单独使用它们，可能会阻止掉大型查询，却不能阻止客户端发起大量中型查询！

大多数 API 中，都有简单的阈值机制，用以阻止客户端过于频繁的请求资源。GraphQL 略有特殊，因为阻止一定数量的请求并不会太有帮助。就算是少量请求，只要他的查询量很大，也可能造成过大的服务器负载。

事实上我们并不知道接受客户端多少请求为好，因为请求是由客户端定义的。所以我们该怎么样设置阈值呢？

### 基于服务器时间的阈值

衡量一个查询是否开销巨大的一个方法就是通过服务端处理时间。我们可以通过这种方法来启发限制查询的阈值。你足够了解你得系统，那么就能评估一个客户端在一段时间窗口内的最大服务器时间。

我们也能决定服务器时间该如何、每次多少地加在一个客户端上。不妨参考[漏桶算法](https://en.wikipedia.org/wiki/Leaky_bucket)。但是注意，其实还有其他阈值算法，但是超过了本文的范畴。我们在下面案例中讨论漏桶算法。

假设我们服务器的最大时间为（桶容量） `1000ms`，每秒钟客户端得到 `100ms` 的服务器时间（泄露率），那么下面这个变更操作：

```graphql
mutation {
  createPost(input: { title: "GraphQL Security" }) {
    post {
      title
    }
  }
}
```

耗费了 `200ms` 完成。虽然现实中这个时间可能会变化，但是我们示例中假设它总是耗费 `200ms` 才完成。

这意味着客户端 `1` 秒钟内调用服务器 `5` 次就会被阻止，直到更多的服务器时间分配给客户端。

两秒钟之后（每秒增加 `100ms`），我们的客户端就能调用一次 `createPost` 了。

如你所见，基于时间的阈值是一个控制 GraphQL 查询的良好方法，由于复杂查询会消耗更多时间但是并不频繁，而简单的小查询就会频繁地调用而又能快速完成。

如果你的 GraphQL API 是公开的，那么能告知客户端这个阈值限制也是很不错的。因为这种情况下，服务器时间并不总是很容易的传达给客户端，而客户端在未经尝试下，也不能真正的评估它们自己查询会消耗多少时间。

记得前文所说的最大复杂度么？如果我们使用基于它的阈值呢？

### 基于查询复杂度的阈值

基于查询复杂度的阈值用来配合客户端估算 schema 限制十分不错。

我们使用查询复杂度章节相同的复杂度示例：

```graphql
query {
  author(id: "abc") {    # 复杂度： 1
    posts {              # 复杂度： 1
      title              # 复杂度： 1
    }
  }
}
```

基于复杂度，我们知道这个查询有 `3` 的消耗。就像基于时间的阈值一样，我们可以评估一个客户端在一定时间内的最大消耗（桶容量）。

如果最大消耗为 `9`，那么客户端每秒钟能跑这个查询 `3` 次，就会被泄漏率阻止后续查询。

原则上和基于时间的阈值相同，但是和客户端交流这些限制更直接了。客户端无需估算服务器时间也能计算它们的查询消耗了。

GitHub 的公共 API 就是使用了这种策略来限制客户端查询的。看看他们是如何向客户端描述这个限制的吧：https://developer.github.com/v4/guides/resource-limitations/ 。

## 总结

GraphQL 对于客户端而言十分实用，因为它给予客户端更多的能力。但这能力又让客户端能够滥用甚至恶意使用性能消耗巨大的查询，使得 GraphQL 服务器被拖垮。

有很多方法可以让你的 GraphQL 服务器抵御这些查询，但是没有一个是银弹。所以有必要知道可哪些方法，而他们的限制又是啥，以便我们采取最佳的选择。
