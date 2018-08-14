# Java Profiling Practice
> landon  
> 资深网络游戏服务器架构师

---

## 系统性能定义
* Throughput
	- 吞吐量，也就是每秒钟可以处理的请求数，任务数
* Latency
	- 系统延迟，也就是系统在处理一个请求或一个任务时的延迟
* 二者关系
	- Throughput越大，Latency会越差。因为请求量过大，系统太繁忙，所以响应速度自然会低
	- Latency越好，能支持的Throughput就会越高。因为Latency短说明处理速度快，于是就可以处理更多的请求
* 线上玩家直观体验“卡”

---

## 系统性能测试
* 需要定义Latency这个值
* 开发性能测试工具
	+ 用来制造高强度的Throughput
	+ 用来测量Latency
* 开始性能测试
	+ 不断地提升测试的Throughput，然后观察系统的负载情况，如果系统顶得住，那就观察Latency的值
	+ 这样，你就可以找到系统的最大负载，并且你可以知道系统的响应延时是多少
* 测试数据
	+ Latency的分布/Latency抖动
	+ 峰值极限-持续吞吐量一段时间
	+ Long-Run-Test/负载极限

---

## 示意图1
![](https://github.com/landon30/Bulls/blob/master/upload/profiling-sample-1.png)

## 示意图2
![](https://github.com/landon30/Bulls/blob/master/upload/profiling-sample-2.png)


## 性能三部曲
* 性能监控
	+ 系统监控
	+ 应用监控
* 性能分析
	+ 使用工具、经验对系统、应用进行瓶颈分析
	+ 定位到问题原因
* 性能调优
	+ 优化方案
	+ 修改代码

---

## 性能监控
* 系统
	+ CPU、Memory、IO、Network
* 应用
	+ JVM
		- 内存
		- 线程数量、死锁
		- ClassLoader
		- GC
	+ 业务
		- 响应时间、吞吐量
		- 方法耗时(执行时间、执行次数等)、循环方法、同步方法
		- 异常日志(错误、超时等)
		- 关键业务监控指标，如战斗、登录、支付、存储等
		
---

## 性能定位
* 系统资源异常
* Java服务内部异常
* 从外到内 逐步排除

---

## 排除其他程序占用系统资源
![](https://imgur.com/0dScHlg.jpg)

---

## 排除Java服务占用了过多资源
![](https://imgur.com/46TPXjX.jpg)

---

## Java服务内部观察
![](https://imgur.com/Nr1e6u0.jpg)

---

## 细节分析
* CPU异常
	+ 复杂的CPU运算
	+ 死循环
	+ 频繁的fullgc
* 内存异常
	+ 堆内存
	+ metaspace/thread stack
	+ 非堆内存
* IO异常
	+ 流量异常，如频繁的远程数据库I/O
	+ time_wait/close_wait
* 死锁

---

## 工具
* linux工具包
	+ top、free、vmstat、sysstat(iostat/sar)、netstat、iftop、tcpdump
* jvm工具包
	+ jps、jinfo、jmap、jstat、jstack
* jmx
	+ jvisualvm及其相关插件、jmc、jfr
	+ MemoryMXBean
* 其他
	+ mat
	+ google-perftools
	+ btrace(强烈推荐神器)
	+ 封装好的脚本(如show-busy-java-threads)

---

## 值得注意的地方
* Note that the JVM uses more memory than just the heap. For example Java methods, thread stacks and native handles are allocated in memory separate from the heap, as well as JVM internal data structures
* 如果top发现Java进程占用的res(resident memory usage)比最大堆内存大，正常，如果大很多则可能发现堆外内存泄露(res是'当前内存')
* top发现Java进程占用的virt较大，通常不用关心
* 堆外内存很难用jvm工具分析,如JNI,不过Direct buffer相关可通过一些工具查看
* 通常需要知晓业务是CPU密集型还是IO密集型，如果是IO密集型，但是cpu占用过高的话则很有可能出现如死循环
* 生成环境适合jmx吗?
	+ 可以考虑使用jmc、jfr-采用收集
	+ 注意安全、权限

---

## 实际线上案例分析
* 战报缓存过大
	+ 实际线上玩家并不过 但是玩家反应卡
	+ top发现单核cpu仅仅100%
	+ jstat -gc发现fullgc时间达120多s
	+ 原因是频繁的fullgc占用了大量的cpu时间
	+ 业务原因是进程缓存了大量的战报(没有用缓存)
* 改名逻辑
	+ 线上偶尔会出现非常卡的情况 时间飘忽不定
	+ 线上是cpu和数据库io都很大
	+ top -Hp + jstack确认线程堆栈为改名逻辑
	+ 玩家改名每次去数据库查询是否有重名，while条件则写错了 -> 导致没有重名继续do。。。一直没有重名。。一直do..死循环

---

## 网上典型案例分析1
* 日志切割
	+ log4j+tomcat
	+ 每天凌晨左右报java.lang.OutOfMemoryError:unable to create new native thread
	+ free查看可用内存很多,排除内存不足无法创建thread
	+ vmstat查看iowait较高
	+ 凌晨所有业务线程被阻塞在打印日志 jstack
	+ 导致线程池被撑爆到配置的上限,超出系统资源限制(轻量级进程)
	+ 原因-运维凌晨用脚本进行了日志切割
	
---	
	
## 网上典型案例分析2
* Deflater
	+ 线上监控发现java进程的res比最大堆内存要大很多
	+ 怀疑是堆外内存过大，jni动态库可能频繁分配内存
	+ 使用google-perftools定位类名和方法名
	+ 定位到了Java-java_util_zip_Deflater_init
	+ 使用btrace定位代码调用方
	+ 原因-未做流量控制,拿到数据就deflate,而这个过程是需要分配堆外内存

---

## 小建议
* 防御式编程-如业务中比较复杂的循环、死锁检查
* CPU过高有可能是fullgc、使用缓存
* 异步(Throughput提升,牺牲latency)
* 多线程优化
* TCP优化
* 监控先行、测试先行、日志先行

---

## 鸣谢
* 陈皓
* 飒然Hang
* 你假笨
* 江南白衣