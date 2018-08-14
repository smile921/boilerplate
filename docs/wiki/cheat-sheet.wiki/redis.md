## Redis 文档
- [Redis 英文文档](http://redis.io/documentation)
- [Redis 中文文档](http://www.redis.cn/documentation.html)
- [Redis 命令速记](http://www.redis.cn/commands.html)
- [Redis 命令参考](http://redisdoc.com/)
- [Redis学习手册](http://www.cnblogs.com/stephen-liu74/archive/2012/02/27/2370212.html)
- [ Redis的部署使用文档 ](http://elain.blog.51cto.com/3339379/705846/)

## Redis Client
目前支持的Java客户端列表 [http://www.redis.cn/clients.html#java](http://www.redis.cn/clients.html#java)

- [Jedis](https://github.com/xetorthio/jedis)，最常用的Redis客户端
- [Lettuce](https://github.com/lettuce-io/lettuce-core)，一个线程安全的Redis客户端,因为在SpringBoot2中取代Jedis而名声大噪，内部使用Netty来实现。
- [Redisson](https://github.com/redisson/redisson)，是架设在Redis基础上的一个Java驻内存数据网格（In-Memory Data Grid）。这里是阿里云对作者的专访: [构建开源企业级Redis客户端之路](https://yq.aliyun.com/articles/603575)

## Redis中间件
- [Redis Cluster](http://www.redis.cn/topics/cluster-tutorial.html)，官方集群方案
- [x-pipe](https://github.com/ctripcorp/x-pipe) 
       > X-Pipe是由携程框架部门研发的Redis多数据中心复制管理系统。基于Redis的Master-Slave复制协议，实现低延时、高可用的Redis多数据中心复制，并且提供一键机房切换，复制监控、异常报警等功能。
- [Feeyo-RedisProxy](https://github.com/variflight/feeyo-redisproxy)
       > 一个分布式 Redis 解决方案, 上层应用可以像使用单机的 Redis 一样使用, RedisProxy 底层会处理请求的分发，一切对你无感 ～
       > 内部的服务能力，当前单节点RedisProxy，日处理查询量50亿+， QPS维持在( 50K～80K )
- [Twemproxy](https://github.com/twitter/twemproxy/) ,Twemproxy是一种代理分片机制,由Twitter开源。Twemproxy作为代理,可接受来自多个程序的访问,按照路由规则,转发给后台的各个Redis服务器,再原路返回。
- [Codis](https://github.com/CodisLabs/codis) 是一个分布式 Redis 解决方案, 对于上层的应用来说, 连接到 Codis Proxy 和连接原生的 Redis Server 没有明显的区别 (不支持的命令列表), 上层应用可以像使用单机的 Redis 一样使用, Codis 底层会处理请求的转发, 不停机的数据迁移等工作, 所有后边的一切事情, 对于前面的客户端来说是透明的, 可以简单的认为后边连接的是一个内存无限大的 Redis 服务.

## Redis监控&分析

### redis-faina
redis-faina 是通过Redis的MONITOR命令来实现的，通过对在Redis上执行的query进行监控，统计出一段时间的query特性。
详细介绍[Redis的query分析小工具 redis-faina](http://www.open-open.com/lib/view/open1337300359760.html)

## Redis 其他

## 支持Redis协议的缓存

- [ssdb](http://ssdb.io/zh_cn/)，[project](https://github.com/ideawu/ssdb),一个高性能的支持丰富数据结构的 NoSQL 数据库, 用于替代 Redis.八卦，作者目前是懒投资联合创始人。
- [LedisDB](https://github.com/siddontang/ledisdb)，是一个参考ssdb，采用Go实现，底层基于leveldb，类似Redis的高性能nosql数据库，提供了kv，list，hash以及zset数据结构的支持。 [官方介绍](http://blog.csdn.net/siddontang/article/details/25490903)


## 他山之石
- [Redis 如何分布式，来看京东金融的设计与实践](https://mp.weixin.qq.com/s/3iN8ZozP6lhPnz_KAmgc-w?)
- [一线码农 -- 15天玩转redis](http://www.cnblogs.com/huangxincheng/category/755864.html)

## 参考
- [Redis监控方法 Redis监控技巧](http://www.redisfans.com/?p=55),收集整理了很多监控和分析工具。
- [Redis Masterclass - Part 1, Configuration](http://snmaynard.com/2013/01/14/redis-masterclass-part-one-configuring-redis/)
- [Redis Masterclass - Part 2, Monitoring](http://snmaynard.com/2013/01/22/redis-masterclass-part-two-monitoring-redis/)