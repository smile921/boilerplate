Welcome to the mylink wiki!


[Github资源汇集](http://www.cnblogs.com/onewarden/p/4254096.html)

## 语言
- [Java](https://github.com/upan/cheat-sheet/wiki/Java-Project) Java及JVM 相关
- [Python](https://github.com/upan/cheat-sheet/wiki/Python-Project)
- [JavaScript](https://github.com/upan/cheat-sheet/wiki/Javascript-Project)
- [Shell](https://github.com/upan/cheat-sheet/wiki/Linux-Shell)

## 工具

- [Git](https://github.com/upan/cheat-sheet/wiki/Git) 
    - [git-scm.com](https://git-scm.com/)
    - [Pro Git v2](https://git-scm.com/book/zh/v2)
- [Maven](https://github.com/upan/cheat-sheet/wiki/maven)
    - [Apache Maven](http://maven.apache.org/)
    - [Lifecycle 生命周期介绍](http://maven.apache.org/guides/introduction/introduction-to-the-lifecycle.html)
    - [Run 运行](http://maven.apache.org/run.html)
- [Gradle](https://gradle.org/),从移动应用到微型服务，从小型初创企业到大企业，Gradle帮助团队更快地构建、自动化和交付更好的软件。
- [Jenkins](https://jenkins.io/),Build great things at any scale,CI工具
- [Nexus](https://www.sonatype.com/download-nexus-repository-trial)，用于创建Maven私服
- [Gitlab](https://about.gitlab.com/)


## 服务器

- [Nginx](http://nginx.org/)
    - [官方文档](http://nginx.org/en/docs/)
    - [从一份配置清单详解 Nginx 服务器配置](https://www.v2ex.com/t/465840)
- [Tengine](http://tengine.taobao.org/), Tengine是由淘宝网发起的Web服务器项目。它在Nginx的基础上，针对大访问量网站的需求，添加了很多高级功能和特性。
- [Tomcat](https://tomcat.apache.org/), is an open source implementation of the Java Servlet, JavaServer Pages, Java Expression Language and Java WebSocket technologies. The Java Servlet, JavaServer Pages, Java Expression Language and Java WebSocket specifications are developed under the Java Community Process.
- [Jetty](http://www.eclipse.org/jetty/), Eclipse Jetty provides a Web server and javax.servlet container, plus support for HTTP/2, WebSocket, OSGi, JMX, JNDI, JAAS and many other integrations. These components are open source and available for commercial use and distribution.

## 中间件

- 缓存服务器
    - [Redis](http://redis.io/),
       [Commands](http://redis.io/commands),[Documentation](http://redis.io/documentation)
       Java客户端[jedis](https://github.com/xetorthio/jedis)
          - [Redis 命令参考](http://doc.redisfans.com/)
          - [Redis 命令手册](http://www.redis.net.cn/order/)
          - [UPAN Redis总结](https://github.com/upan/cheat-sheet/wiki/redis)
    - [Caffeine](https://github.com/ben-manes/caffeine) - A high performance caching library for Java 8
    - [EhCache](http://www.ehcache.org/) - Distributed general purpose cache.

- 缓存中间件
    - [x-pipe](https://github.com/ctripcorp/x-pipe) 
       > X-Pipe是由携程框架部门研发的Redis多数据中心复制管理系统。基于Redis的Master-Slave复制协议，实现低延时、高可用的Redis多数据中心复制，并且提供一键机房切换，复制监控、异常报警等功能。
    - [Feeyo-RedisProxy](https://github.com/variflight/feeyo-redisproxy)
       > 一个分布式 Redis 解决方案, 上层应用可以像使用单机的 Redis 一样使用, RedisProxy 底层会处理请求的分发，一切对你无感 ～
       > 内部的服务能力，当前单节点RedisProxy，日处理查询量50亿+， QPS维持在( 50K～80K )

- 消息队列
    - Kafka [code](https://github.com/apache/kafka)
    - Jafka [code](https://github.com/adyliu/jafka),一个快速的分布式消息系统，Kafka的Java版本
    - MetaQ [code](https://github.com/walletma/metaq) 淘宝开源的类Kafka项目
    - RabbitMQ [site](http://www.rabbitmq.com/)
    - Apache ActiveMQ - 实现JMS规范的消息队列 
    - [RocketMQ](https://github.com/alibaba/RocketMQ) - 阿里开源分布式消息队列
    - [Disruptor](https://github.com/LMAX-Exchange/disruptor) 
      是英国外汇交易公司LMAX开发的一个高性能队列，研发的初衷是解决内存队列的延迟问题

- 数据库中间件
    - MyBatis [code](https://github.com/mybatis/mybatis-3) [Mybatis-3 文档](http://www.mybatis.org/mybatis-3/)
    - Cobar [code](https://github.com/alibaba/cobar),阿里基于MySQL的分布式数据库服务中间件
    - Mycat [site](http://www.mycat.org.cn/),分布式数据库中间件,基于Cobar 
    - TDDL（Taobao Distributed Data Layer) [code](https://github.com/alibaba/tb_tddl),
主要解决了分库分表对应用的透明化以及异构数据库之间的数据复制，它是一个基于集中式配置的jdbc datasource实现，具有主备，读写分离，动态数据库配置等功能。
    - MTDDL（Meituan Distributed Data Layer）暂未开源 [简介](http://tech.meituan.com/mtddl.html)
    - [Atlas](https://github.com/Qihoo360/Atlas) 是由 Qihoo 360公司Web平台部基础架构团队开发维护的一个基于MySQL协议的数据中间层项目。
    - [DBProxy](https://github.com/Meituan-Dianping/DBProxy)是由美团点评公司技术工程部DBA团队（北京）开发维护的一个基于MySQL协议的数据中间层。基于360的Atlas。
    - sharding-jdbc[site](https://github.com/dangdangdotcom/sharding-jdbc) ,是当当开发的一个轻量级的关系型数据库中间件，提供分库分表、读写分离和柔性事务等功能。

## 服务化

- RPC & 服务治理 
    - [Spring Cloud](http://projects.spring.io/spring-cloud/) ,Spring Cloud 为开发者提供了在分布式系统（如配置管理、服务发现、断路器、智能路由、微代理、控制总线、一次性 Token、全局锁、决策竞选、分布式会话和集群状态）操作的开发工具。使用 Spring Cloud 开发者可以快速实现上述这些模式。
    - Dubbo [code](https://github.com/alibaba/dubbo) 阿里巴巴开源的分布式服务框架
    - DubboX [code](https://github.com/dangdangdotcom/dubbox)，当当在dubbo基础上提供的增强版本
    - Motan [code](https://github.com/weibocom/motan) 新浪微博的分布式服务框架
    - Finagle [site](http://twitter.github.io/finagle/) [code](https://github.com/twitter/finagle)，
                    是Twitter基于Netty开发的支持容错的、协议无关的RPC框架
    - Hystrix [code](https://github.com/Netflix/Hystrix),
                       是Netflix 公司开发用来处理依赖隔离的框架,同时也是可以帮我们做依赖服务的治理和监控.  
                       [介绍](http://hot66hot.iteye.com/blog/2155036)
    - [Pigeon](https://github.com/dianping/pigeon)Pigeon是一个分布式服务通信框架（RPC），在大众点评内部广泛使用，是大众点评最基础的底层框架之一。
    - [Tars](https://github.com/Tencent/Tars),Tars腾讯开源的基于名字服务使用Tars协议的高性能RPC开发框架，配套一体化的运营管理平台，并通过伸缩调度，实现运维半托管服务。
    - [sofa-rpc](https://github.com/alipay/sofa-rpc),SOFARPC 是一个高可扩展性、高性能、生产级的 Java RPC 框架。在蚂蚁金服 SOFARPC 已经经历了十多年及五代版本的发展。SOFARPC 致力于简化应用之间的 RPC 调用，为应用提供方便透明、稳定高效的点对点远程服务调用方案。为了用户和开发者方便的进行功能扩展，SOFARPC 提供了丰富的模型抽象和可扩展接口，包括过滤器、路由、负载均衡等等。同时围绕 SOFARPC 框架及其周边组件提供丰富的微服务治理方案。SOFARPC 最早源于阿里内部的 HSF。

- 服务发现

    - Zookeeper [source](https://github.com/apache/zookeeper)  [总结](https://github.com/upan/cheat-sheet/wiki/ZooKeeper)
    - [Consul](https://github.com/hashicorp/consul)，Motan在使用,据说官方自己都没大量使用。
    - [etcd](https://github.com/coreos/etcd/) 是一个应用在分布式环境下的 key/value 存储服务。

## 服务配套工程

###  配置管理 zk,console

    - [Ctrip Apollo](https://github.com/ctripcorp/apollo)是携程框架部门研发的配置管理平台，能够集中化管理应用不同环境、不同集群的          配置，配置修改后能够实时推送到应用端，并且具备规范的权限、流程治理等特性。
    - [Disconf](https://github.com/knightliao/disconf),前百度员工开发的分布式配置管理平台

### 计划任务

    - Quartz Scheduler [code](https://github.com/quartz-scheduler/quartz)
        - [TBSchedule](https://github.com/taobao/TBSchedule)淘宝开源的一个简洁的分布式任务调度引擎，开源较早现在貌似已经无人维护
    - [Elastic-Job](https://github.com/elasticjob/elastic-job-lite),是一个基于 **Quartz** 和 **Zookeeper** 分布式调度解决方案,之前为当当开源，后开发人员跳槽京东后变更为独立项目
    - [Saturn](https://github.com/vipshop/Saturn),唯品会开源的一个分布式作业调度平台,[文档](https://vipshop.github.io/Saturn/)
       >Saturn (任务调度系统)是唯品会开源的一个分布式任务调度平台，取代传统的Linux Cron/Spring Batch Job的方式，做到全域统一配置，
       >统一监控，任务高可用以及分片并发处理。
       >Saturn是在当当开源的Elastic Job基础上，结合各方需求和我们的实践见解改良而成。

### 分布式发号器

   - http://www.importnew.com/22211.html
   - http://www.cnblogs.com/flystar32/p/uuid.html
   - [服务化框架－分布式Unique ID的生成方法一览](http://calvin1978.blogcn.com/articles/uuid.html)
   - [业务系统需要什么样的ID生成器](http://ericliang.info/what-kind-of-id-generator-we-need-in-business-systems/)
   - 小米 [chronos](https://github.com/XiaoMi/chronos)高可用、高性能、提供全局唯一而且严格单调递增timestamp 服务的服务

### 链路跟踪

   - 阿里鹰眼
   - Google的Drapper
   - 大众点评 CAT
   - 京东 Hydra
   - Twitter -OpenZipkin

### 数据同步
    - [canal](https://github.com/alibaba/canal),阿里巴巴mysql数据库binlog的增量订阅&消费组件 。
    - [otter](https://github.com/alibaba/otter),阿里巴巴分布式数据库同步系统(解决中美异地机房)

## 工具与组件

### 异步通讯
    - Netty [site](http://netty.io/) [code](https://github.com/netty/netty),
            [User guide for 4.x](http://netty.io/wiki/user-guide-for-4.x.html)
            Netty提供异步的、事件驱动的网络应用程序框架和工具，用以快速开发高性能、高可靠性的网络服务器和客户端程序。

###  序列化
    - FastJson [code](https://github.com/alibaba/fastjson)
    - Jackson [site](https://github.com/FasterXML/jackson),文档值得一读
    - Xstream
    - protobuf
    - thrift



### 数据库连接池
    - Druid [code](https://github.com/alibaba/druid) ,为监控而生的数据库连接池！
    - C3P0 ,是一个开源的JDBC连接池，它实现了数据源和JNDI绑定，支持JDBC3规范和JDBC2的标准扩展。目前使用它的开源项目有Hibernate，Spring等。

### Web Framwork
- Spring MVC
- SpringBoot
- Jersey [https://jersey.java.net/](https://jersey.java.net/)

### 模版引擎
    - FreeMarker

### 日志
    - SLF4J
    - Apache Log4j
    - Apache Log4j 2 [source](https://github.com/apache/logging-log4j2)，升级版本
    - Logback

### 测试
    - 测试工具
        - Junit
    - Mock工具

### 工具类
- 通用
    - [Apache Commons](http://commons.apache.org/),包含很多常用的 [组件](http://commons.apache.org/components.html)
        - [Commons Lang](http://commons.apache.org/proper/commons-lang/) 语言层面的增强,当前的稳定版本为3.7，[github源码](https://github.com/apache/commons-lang)
        ```
        <dependency>
           <groupId>org.apache.commons</groupId>
           <artifactId>commons-lang3</artifactId>
           <version>3.7</version>
       </dependency>
        ```
    - Google guava [source](https://github.com/google/guava)，该项目是 Google 的一个开源项目，包含许多 Google 核心的 Java 常用库
    - [VJTools](https://github.com/vipshop/vjtools),唯品会关于Java的一些小家底
    - [Jodd](https://github.com/oblac/jodd),一组小巧实用的工具集

- HTTP
    - Apache HttpComponents Client 
      [source](https://github.com/apache/httpclient) 
      [site](http://hc.apache.org/),强大的Http请求组件，
      [v4.5.2文档](http://hc.apache.org/httpcomponents-client-ga/tutorial/html/)
    - [OkHttp](https://github.com/square/okhttp),An HTTP & HTTP/2 client for Android and Java applications.
    - [Jodd HTTP](https://jodd.org/http/)
      > HTTP is tiny, raw HTTP client - and yet simple and convenient. It offers a simple way to send requests and read 
      > responses - so to please developers.
    
- Office
    - [Apache POI](http://poi.apache.org/) - Office文件解析利器 
               Supports OOXML (XLSX, DOCX, PPTX) as well as OLE2 (XLS, DOC or PPT)
- 其他
    - Dozer 对象映射利器

### 文件系统
    - TFS

### 黑话系列
    - [架构黑话](https://github.com/upan/cheat-sheet/wiki/architecture-slang)
