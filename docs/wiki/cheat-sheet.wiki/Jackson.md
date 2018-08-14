
## Jackson 概述

Jackson 是一个基于Java的Json处理框架，可以方便的处理Java对象和Json字符串之间的序列化和反序列化。
Jackson有1.x系列和2.x系列，在不同的包下面，如果项目同时引用了这两个系列，需要注意注解只针对同一系列有效。
- 1.x :org.codehaus.jackson.xx
- 2.x :com.fasterxml.jackson.xx

Jackson2.3 及之前版本的官方wiki [http://wiki.fasterxml.com/JacksonHome](http://wiki.fasterxml.com/JacksonHome)，最后维护时间为2014年。

Jackson2.x 基于Github官方文档合集 [https://github.com/FasterXML/jackson-docs](https://github.com/FasterXML/jackson-docs)

各个组件的文档
https://github.com/FasterXML/jackson-core/wiki
https://github.com/FasterXML/jackson-docs/wiki/JacksonAnnotations
https://github.com/FasterXML/jackson-databind/wiki/Databind-Annotations

## 2.x 组件及分工

### Jackson-Core 核心包
[Jackson-Core project](https://github.com/FasterXML/jackson-core) contains streaming parser, generator

[Jackson Core: Streaming wiki](https://github.com/FasterXML/jackson-core/wiki)


### Jackson Annotations 注解
[Jackson Annotations project](https://github.com/FasterXML/jackson-annotations) for annotation-based configuration (used by data-bind)

[Annotatons wiki](https://github.com/FasterXML/jackson-annotations/wiki/Jackson-Annotations)


### Jackson Databind 数据绑定
[Jackson databind project](https://github.com/FasterXML/jackson-databind) for data binding, tree model (builds on streaming core)

[Databind Wiki](https://github.com/FasterXML/jackson-databind/wiki)

### 快速入门
Jackson Databind的Readme 文件可以看作一个快速入门 [https://github.com/FasterXML/jackson-databind/](https://github.com/FasterXML/jackson-databind/)

## 使用场景