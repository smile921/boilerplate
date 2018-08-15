对于性能需求，需要考虑如下问题
1）用于预期的吞吐量是多少
2）请求和响应之间的延迟预期是多少
3）应用支持多少并发用户或者并发任务
4）当并发用户数或并发任务数量达到最大时，可接受的吞吐量和延迟是多少
5）最差情况下的延迟是多少
6）垃圾收集的频率

*操作系统性能监控*
1）性能监控
2）性能分析
3）性能调优

CPU使用率

Windows Performance tool
1) Performance Monitor
2) typeperf command line

Linux tool to monitor CPU usage:
1)GNOME System Monitor
2)xosview

Command Line to Monitor CPU Usage:
vmstat：
us是用户态CPU使用率，sy是系统态CPU使用率，id是空闲率或者CPU可用率 
mpstat：
以列表方式展示每个虚拟处理器的CPU使用率 － 使用mpstat监控每个虚拟处理器的CPU使用率，有助于发现应用中是一些线程比其他线程消耗了更多的CPU周期，还是应用中的所有线程基本平分CPU周期，如果是后者，则说明 应用的扩展性比较好。
其他命令－ 例如 top命令 包含了CPU使用率也包括进程统计数据和内存使用率

通过追踪，一旦找出具体的java线程，结合附带的栈追踪信息就能进行更彻底的性能分析。

CPU调度程序运行队列：
监控CPU调度程序运行队列对于分辨系统是否满负荷也有重要意义，如果准备运行的轻量级进程数超过系统所能处理的上限，运行队列就会很长，表明系统负载已经饱和，当运行队列长度达到长度达到虚拟处理的4倍活着更多时，系统的响应就非常迟缓了。

解决运行队列长有两种方法
1）增加CPU
2） 改进CPU使用率，减少垃圾收集的频度，使用CPU指令更少的算法

Windows架空CPU调度程序运行队列：
Performance Monitor： Add Counter－System － Processor Queue Length
or typepfer “\System\Processor Queue Length”

Linux 
vmstat 输出的第一列是运行队列的长度

内存使用率
内存相关的属性监控， 例如页面调度或页面交换，加锁，线程迁移中的让步式和抢占式上下文切换。
系统在进行页面交换或使用虚拟内存时，Java应用或JVM会变现出明显的性能问题。 此外 JVM垃圾收集器在系统页面交换时的性能也很差，由于垃圾收集器为了回收不可达对象所占用的空间，需要访问大量的内存。

Windows
\Memory\Pages/Second
\Memory\Available MBytes 
通过以上可以判断系统是否正在页面交换，当 可用内存变少 并有页面调度时，系统可能正在进行页面交换
typeperf -si 5 "\Memory\Available Mbytes" "\Memory\Pages/sec"

Linux
vmstat中的free列监控页面交换，或者top命令  或／proc/meminfo文件来监控  需要监控 vmstat中的si so 分别表示内存页面换入和换出的量 free可以显示可用的空闲内存 当空闲内存很少时，内存页面的换入和换出的速度几乎一样快

**监控锁竞争**

**网络I/O使用率**
分布式Java应用的性能和扩展性受限于网络带宽或网络I/O的性能，如果发送到系统网络接口硬件的消息量超过了它的处理能力，消息就回进入操作系统的缓冲区，会导致应用延迟。

监控网络I/O使用率
nicstat

磁盘I/O使用率
对于磁盘操作的应用来说，应监控磁盘I/O，一些应用的核心功能需要大量使用磁盘，例如数据库。磁盘I/O使用率是理解应用磁盘使用情况最有用的监控数据。
Linux可以使用instate来监控系统的磁盘使用率
Windows上可以使用Performance Monitor的性能对象Logical Disk下的性能计数器用来监控磁盘使用率
