Java Project

## 代码规范
>收集大厂的代码规范
1. [Google Java Style Guide](https://google.github.io/styleguide/javaguide.html)
1. [SEI CERT Oracle Coding Standard for Java](https://wiki.sei.cmu.edu/confluence/display/java/SEI+CERT+Oracle+Coding+Standard+for+Java)
1. [阿里巴巴Java开发手册](https://github.com/alibaba/p3c),本手册以 Java 开发者为中心视角，划分为编程规约、异常日志、 单元测试、 安全规约、 MySQL 数据库、 工程结构、 设计规约七个维度，再根据内容特征，细分成若干二级子目录。根据约束力强弱及故障敏感性，规约依次分为强制、推荐、参考三大类。 另外还配备了IDE插件。
1. [唯品会Java开发手册](https://vipshop.github.io/vjtools/#/standard/),项目地址[https://github.com/vipshop/vjtools](https://github.com/vipshop/vjtools)以阿里巴巴Java开发手册为基础，结合唯品会的内部经验，参考《Clean Code》、《Effective Java》等重磅资料，增补了一些条目，同时删减了一些相对不那么通用的规则。另外还贴心的提供了IDE 模版和 Sonar 规则。

## 编译和运行
- javac , [javac使用说明](https://github.com/upan/cheat-sheet/wiki/javac)
- java

## JDK
* JDK7 文档 [http://docs.oracle.com/javase/7/docs/api/](http://docs.oracle.com/javase/7/docs/api/)
* JDK8 文档[http://docs.oracle.com/javase/8/docs/api/](http://docs.oracle.com/javase/8/docs/api/)

## JVM 官方配置详解

### 虚拟机参数设置文档

1. 官方文档
    1. Java1.7 [http://www.oracle.com/technetwork/java/javase/tech/vmoptions-jsp-140102.html](http://www.oracle.com/technetwork/java/javase/tech/vmoptions-jsp-140102.html)
    2. Java1.8 [http://docs.oracle.com/javase/8/docs/technotes/tools/unix/java.html](http://docs.oracle.com/javase/8/docs/technotes/tools/unix/java.html)

2. 非官方文档
    1. http://www.jvmer.com/jvm-xx-%E5%8F%82%E6%95%B0%E4%BB%8B%E7%BB%8D/
    2. http://q-redux.blogspot.com/2011/01/inspecting-hotspot-jvm-options.html

### 垃圾回收(GC)相关官方文档
* [https://blogs.oracle.com/poonam/entry/understanding_cms_gc_logs](https://blogs.oracle.com/poonam/entry/understanding_cms_gc_logs)
* [http://www.oracle.com/technetwork/java/javase/gc-tuning-6-140523.html](http://www.oracle.com/technetwork/java/javase/gc-tuning-6-140523.html)


## 集合
* [Java 集合 UML图](http://www.karambelkar.info/2012/06/java-1.7-collections---uml-class-diagrams/)
   作者绘制的Java Collection APIs ( List, Set, Queue, & Map)类图。点击类图可以查看大图。
   这份列表兼容从JDK 1.0到JDK 7 (1.7)最新版本 
   接口采用" 灰色"表示，抽象类用" 黄色"表示，实现类用" 绿色"表示。接口有列出它的方法和属性。但抽象类和实现类没有画出它们的方法和属性，可以从其实现的接口猜出。 


## Java 8
- [Java8](https://github.com/upan/mylink/wiki/Java8)

## Java Web
- [Servlet](https://java.net/projects/servlet-spec/)
- [Servlet 4](https://jcp.org/en/jsr/detail?id=369)
- [Servlet 3](https://jcp.org/en/jsr/detail?id=315)
- [Servlet 专题](https://github.com/upan/cheat-sheet/wiki/Servlet)
- [web.xml 配置文件元素详解](https://github.com/upan/cheat-sheet/wiki/web-xml-config)

## Web框架
- Spring MVC,目前的事实标准
- [Dropwizard](https://www.dropwizard.io),是一个对开发和运维友好的，高性能的，用于Restful web服务的框架
    -[awesome-dropwizard](https://github.com/stve/awesome-dropwizard)
- [Vert.x](https://vertx.io/),是在JVM平台进行反应式编程的工具箱
    -[使用Vertx构建微服务](https://www.cnblogs.com/luxiaoxun/p/7693640.html)

## Java专题
- [Java 核心技术专题](http://www.ibm.com/developerworks/cn/java/coretech/?ca=j-r#show-hide)
- [Java多线程编程总结 ](http://lavasoft.blog.51cto.com/62575/27069/)
- [Java 多线程与并发编程专题](http://www.ibm.com/developerworks/cn/java/j-concurrent/?ca=j-r)

## Spring
* [Spring 源码 github](https://github.com/spring-projects/spring-framework)
* [Spring javadoc](http://docs.spring.io/spring-framework/docs/current/javadoc-api/)
* [Spring文档](http://docs.spring.io/spring/docs/current/spring-framework-reference/html/index.html)
* [SpringMVC文档](http://docs.spring.io/spring/docs/current/spring-framework-reference/html/mvc.html)

## MyBaits
* [Mybatis 官网](http://mybatis.github.io/)
* [Mybatis 文档](http://mybatis.github.io/mybatis-3/)
* [Mybatis 中文文档](http://mybatis.github.io/mybatis-3/zh/index.html)
* [MyBatis-spring 文档](http://mybatis.github.io/spring/)
* [MyBatis-spring 中文文档](http://mybatis.github.io/spring/zh/)

## View
* [FreeMaker](http://freemarker.org/),[freemarker 官方文档](http://freemarker.org/docs/)
* [FreeMaker中文文档](https://sourceforge.net/projects/freemarker/files/chinese-manual/FreeMarker_Manual_zh_CN.pdf/download)
* [Velocity](http://velocity.apache.org/)

## IOC
* Spring IOC
* [Guice](https://github.com/google/guice)：轻量级注入框架，功能强大。

## Json
* [Jackson](http://jackson.codehaus.org/), Jackson 是一个 Java 用来处理 JSON 格式数据的类库，性能非常好。[在线文档](https://github.com/FasterXML/jackson-docs)。[整理收集](https://github.com/upan/cheat-sheet/wiki/Jackson)
* [fastjson](https://github.com/alibaba/fastjson) 是一个性能很好的 Java 语言实现的 JSON 解析器和生成器，来自阿里巴巴的工程师开发。[在线文档](https://github.com/alibaba/fastjson/wiki/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98)。

## 日志
* [Log4J](http://logging.apache.org/log4j/extras/) ,[Log4J 常用配置](https://github.com/upan/cheat-sheet/wiki/log4j-config)
* [Apache Log4j 2](http://logging.apache.org/log4j/)：对之前版本进行了完全重写。现在的版本具备一个强大的插件和配置架构。
* [SLF4J](http://www.slf4j.org/)：日志抽象层，需要与某个具体日志框架配合使用。
* [Java 日志框架整理](https://github.com/upan/cheat-sheet/wiki/Log)

## 爬虫
* [Nutch](http://nutch.apache.org/)是一个开源Java 实现的搜索引擎。它提供了我们运行自己的搜索引擎所需的全部工具。可用于生产环境的高度可扩展、可伸缩的网络爬虫。
* Crawler4j：简单的轻量级爬虫。
* JSoup ：刮取、解析、操作和清理HTML。

## 压力测试
- [Jmeter](http://jmeter.apache.org/)
- [Jmeter性能测试 入门](http://www.cnblogs.com/TankXiao/p/4045439.html)
- [使用 JMeter 完成常用的压力测试](http://www.ibm.com/developerworks/cn/opensource/os-pressiontest/)

## 分词、检索
* Solr，Solr是一个高性能，采用Java5开发，基于Lucene的全文搜索服务器。用户可以通过http请求，向搜索引擎服务器提交一定格式的XML文件，生成索引；也可以通过Http Get操作提出查找请求，并得到XML格式的返回结果。
* Lucene， Lucene 是一个基于 Java 的全文信息检索工具包，它不是一个完整的搜索应用程序，而是为你的应用程序提供索引和搜索功能。

## 计划任务
* [Quartz](http://www.quartz-scheduler.org/)

## 数据库

## 其他
* https://github.com/akullpp/awesome-java
* 汉化副本[国外程序员整理的Java资源大全](https://github.com/upan/mylink/wiki/%E5%9B%BD%E5%A4%96%E7%A8%8B%E5%BA%8F%E5%91%98%E6%95%B4%E7%90%86%E7%9A%84Java%E8%B5%84%E6%BA%90%E5%A4%A7%E5%85%A8)
* [Java常用库一览](https://github.com/upan/mylink/wiki/%E6%9C%80%E5%B8%B8%E7%94%A8%E7%9A%84Java%E5%BA%93%E4%B8%80%E8%A7%88)
* http://www.iteye.com/blogs/subjects/javalib
* http://news.cnblogs.com/n/513596/