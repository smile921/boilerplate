###JVM 监控与优化工具

本文围绕JVM阐述两个方面的内容：监控和优化。监控过程是优化的前提，优化是监控之后采取的措施。JVM的监控主要介绍相关监控工具、定义监控内容；JVM的优化主要包括内存分配和垃圾回收机制设置。

### 一、JVM的监控
1、JVM监控工具
 俗话说，“工欲善其事必先利其器”。要对JVM进行监控，首先要选择一款得心应手的监控工具。下面分别介绍JDK自带的监控工具、系统监控工具和商业化的监控工具，相信总有一款是你喜欢的！

（1）JDK自带工具：jinfo、jmap、jstack、jstat、JConsole、VisualVM
- jinfo
查看该命令使用帮助：jinfo -h。该命令可以获取指定java进程的配置信息，包括Java系统属性和JVM配置参数。如图1

- jmap
查看该命令使用帮助：jmap -h。该命名主要查看指定java进程的内存分配和使用情况。还可以使用jmap -histo pid > a.log，将物理内存使用情况信息导入到文本文件a.log，一段时间后，使用文本工具对比，可以知道GC回收了哪些对象。下面演示简单的查看进程内存分配和使用情况，如下图：

Java进程31449的JVM配置为：
-server -Xmx2048m -Xms2048m -Xss512k -XX:PermSize=512m -XX:MaxPermSize=512m -XX:MaxTenuringThreshold=7 -XX:+UseConcMarkSweepGC

-XX:CMSInitiatingOccupancyFraction=70，结合上图可以知道：NewSize = Eden + 2*Survivor (From Space + To Space)。新生代使用了并行垃圾回收机制，老生代使用了并发垃圾回收机制。这里有一个疑问：NewRatio = 2，那么NewSize的大小应该是整个堆栈的1/3，上图的NewSize为什么只有332.75M呢？

- jstack
查看该命令使用帮助：jstack -h。该命令主要观察JVM中当前所有线程的运行情况和运行状态。

- jstat
查看该命令使用帮助：jstat -h。该命令利用JVM内建的指令对java应用程序的资源和性能进行实时监控，包括各种堆和非堆的大小，内存使用情况和GC情况，classloader，compiler等。下面使用jstat对java程序的内存使用和GC情况进行监控：jstat -gcutil pid 1000，每隔1s输出一次实时信息。

上图中S0和S1分别表示两个Survivor空间，E表示Eden区，O表示Old区，P表示方法区，即Permsize；YGC和YGCT表示Young GC的次数和消耗时间；FGC和FGCT表示Full GC的次数和消耗时间，GCT表示GC总消耗时间。

- JConsole
JConsole是jdk1.5以后加入的图形化监控工具，由于通常的Linux服务器不支持图形化界面，一般采用在Windows机器上远程监控服务端程序。具体使用方式可以参考：使用JConsole监控远程Linux上的JVM。

- VisualVM
VisualVM是jdk1.6加入的图形化监控工具，能够实时动态的监控java应用程序的CPU占用、内存使用、线程运行情况等。具体使用请参考：使用visualvm监控远程JVM。

（2）Linux系统自带监控工具：top、dstat等，这些工具简便好用，实为监控调优之必备良工。

（3）商业付费软件：JProfiler。该工具的使用就不赘述了，请参考：JProfiler学习笔记。

2、JVM监控内容

        工具选定之后，就要确定监控对象。我们知道，性能无非就是这几种：CPU、内存、磁盘IO、网络。如果程序性能异常，监控这几个参数一般都可以发现问题。

- CPU
CPU的监控可以采用top、dstat、jconsole或visualvm等工具。

- 内存
内存除了观察使用率之外，还要关注GC情况。这些信息可以使用jmap和jstat两个命令获得。如果发现内存使用量不断增加，而且gc频率很高，这时需要谨慎查找程序中的内存增长点，可能存在内存泄露问题，可以采用visualvm工具辅助查找无法回收的对象。

- 磁盘IO
磁盘使用情况可以使用dstat命令获得。

- 网络
网络使用情况可以使用dstat命令获得。

二、JVM的优化

- 1、内存分配（可以通过JVM参数：-Xms 和 -Xmx 指定）
 新生代：包含Eden区和Survivor区，空间大小可以通过JVM参数：-Xmn或者-XX:NewRatio指定。
  - Eden：新创建的对象向Eden区申请内存空间
  - Survivor：一个起缓冲作用的内存区域，包含两块同样大小的内存空间，两块空间交替使用，完成新生代对象到老生代的转移。两块空间分别为：from space 和 to space。Survivor的空间大小可以通过JVM参数：SurvivorRatio指定。
  - from space
  - to space

老生代：新生代中的对象经过了指定的回收次数，仍无法被gc回收释放其内存，则被转移到老生代。空间大小 = 堆大小 - 新生代大小。-XX:MaxTenuringThreshold可以指定对象回收次数，如果设置为0的话,则年轻代对象不经过Survivor区,直接进入年老代。

持久代：应用程序初始化时加载类信息，方法名，常量等数据到持久代，空间大小可以通过JVM参数：-XX:PermSize指定，-XX:MaxPermSize指定该空间的最大值。

- 2、垃圾回收机制
JVM内存采用分代形式管理，则相应的内存垃圾回收机制也采用分代管理，不同的内存区采用不同的回收机制。根据垃圾回收运行方式分为三类：串行GC、并行GC和并发GC。

  - 新生代
    - Serial：串行，单线程回收垃圾
    - Parallel Scavenge：并行回收，多线程回收垃圾
    - ParNew：并行，与年老代的CMS配合使用

  -老生代
    - Serial MSC：串行
    - Parallel MSC：并行
    - CMS：并发

    垃圾回收机制的指定方式：
    - a. client, server模式默认GC策略

|类型| 新生代| 年老代和持久代  |
| ------------- |:-------------:| :-----:|
| client| 串行GC| 串行GC |
|server|并行回收GC|Parallel Mark Sweep GC|


    b.GC组合方式



### 来源
- [JVM的监控与优化](http://my.oschina.net/xiaohui249/blog/318184)