## 游戏服务器数据存储策略和宕机保护



### 背景

1. 数据库在实时交互性较强的在线游戏中，主要起的是一个数据备份容灾的作用
2. 理论上 如果内存足够大且服务器永远不宕机 则数据库无必要
3. 早期做法
   + 活跃用户在内存
     + 上线加载 + 离线落地
     + 写文件
   + 定期存盘 + 关键数据即时保存

### 回档

1. 主动回档
   + 如策划刷错表或者游戏漏洞造成刷资源，进而破坏游戏平衡
   + 运营发起 主动回档
   + 数据库备份策略
     + 如停服备份 否则会出现停服后版本更新 出现重大事故 需要回档到开服前
     + 最好云自动备份/恢复
2. 被动回档
   + 进程宕机
   + 物理宕机
3. 解决回档的基本思路
   + 优先考虑进程宕机 其实是物理宕机 最后是数据库宕机
   + 避免单一进程持久化内存数据 无论是异步增量更新或者定时全量更新

### 共享内存

1. 进程间通讯的一种方式
2. 端游传统解决方案(C++)
   + 多进程共享内存数据 无需通过消息(socket)
   + 进程宕机直接共享内存恢复
3. 内存文件映射-Java

### DB的瓶颈

1. Five-minute rule
2. 登录创建角色、大量玩家下线、大量玩家上线 瓶颈在db
3. DB操作异步、回调、顺序、克隆(copy on write)
4. DBProxy、逻辑和数据分开(解耦)、降低逻辑进程压力
5. 降低DB频率、区分重要数据(不频繁的数据价值越高/回写时间可能不同)、回写合并
6. DB压测、多个区服共用
7. 内存、文件、redis、mongo的速度
8. 游戏类型-是否即时

### 目标

1. 低延迟、高吞吐量
2. 关键数据不回档

### base实现方案
1. 逻辑进程Auto Save + 全量更新
2. 逻辑进程即时异步 + 增量更新

### 设计思路

1. 共享内存 + 定时回写DB + 关键数据操作日志 + 工具回档关键数据
2. 进程内存 + redis缓存(容灾) + mongo

### 扩展

1. Redis借助了fork命令的copy on write机制在生成快照时，将当前进程fork出一个子进程，然后在子进程中循环所有的数据，将数据写成为RDB文件
2. 那落地时我们是否也可以fork一份内存快照?然后慢慢去落地
   - fork多线程程序会有一定的问题
   - 所以redis是单线程的
   - [云风-极不和谐的 fork 多线程程序](https://blog.codingnow.com/2011/01/fork_multi_thread.html)