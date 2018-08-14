## JVM内存非典型术语介绍(shallow/retained/rss/reserved/committed)

### 背景

​    在服务器性能优化内存这一项时,有一些现象很诡异。如top显示的RES很大，但是实际jvm堆内存占用很小，同时使用nmt发现committed更大。所以决定写这篇wiki大概介绍一下

### JVM中如何计算一个对象的实际大小

1. 实际在服务器估算内存时经常会抛出这个问题，而这里有两个概念,Shallow Size和Retained Size
2. Shallow Size
   + 对象自身占用的内存大小，不包括它引用的对象
3. Retained Size
   + 当前对象大小+当前对象可直接或间接引用到的对象的大小总和
   + Retained Size就是当前对象被GC后，从Heap上总共能释放掉的内存(排除被GC Root引用的对象)
4. 计算方式(Shallow Size)
   + （对象头 + 实例数据 + padding） % 8等于0且0 <= padding < 8
   + HotSpot的对齐方式为8字节对齐
   + 32位对象头8个字节，64位16个字节
   + 可通过jinfo命令判断是否开启指针压缩 开启后64bit对象都变为12字节
   + 引用在32bit上是4个字节、64bit是8个字节、开启指针压缩后是4个字节
5. 举例1
   + Float对象
     + 对象头:12字节(64bit#指针压缩)
     + 实例数据(float value):4字节
     + 不用对齐
     + 12 + 4 =  16字节
   + Example对象
     + 对象头:12字节(64bit#指针压缩)
     + 实例数据
         + 当前类3个Float引用+1个其他引用
         + 父类1个Float引用+1个其他引用
         + 4 * 6 = 24(64bit#指针压缩)
     + 12 + 24 = 36
     + 需要补齐4
     + 最终40
6. 如何计算一个对象的真实大小(Retained Size)
   + 个人认为最简单的办法就是直接jmap#dump出堆内存快照
   + 然后直接利用如mat工具分析 方便快捷
   + 其他API
       - https://github.com/jbellis/jamm
       - https://docs.oracle.com/javase/8/docs/api/java/lang/instrument/Instrumentation.html#getObjectSize-java.lang.Object-
      - https://www.javamex.com/classmexer/
      - https://github.com/DimitrisAndreou/memory-measurer
      - https://stackoverflow.com/questions/52353/in-java-what-is-the-best-way-to-determine-the-size-of-an-object


7. 注意
   + jmap -histo:live命令显示出来的instances和bytes其实是Shallow Size,所以用jvm命令本身很难计算一个对象的真实内存占用情况

## 排查JVM内存的几种方式

- top(res)
   + 其中可以观察到java进程占用的res内存是1.6g

   ```
   $ top
   PID USER      PR  NI  VIRT  RES  SHR S %CPU %MEM    TIME+  COMMAND
   14730 landon  20   0 9283m 1.6g  19m S  0.3 20.5  30:43.57 java
   ```
- jstat
   + 可以看到从新生代(eden+s0+s1)到老年代的compacity显示和used显示
   + gcutil参数可以显示使用百分比
   + 注:这里的M指的是metaspace,从下面的输出可以看到M显示97.16,这里其实并非指metaspace直接使用了97.16,这里是指的Commited,而MU则是实际使用的size
 
   ```
    $ jstat -gc 14730
    S0C    S1C    S0U    S1U      EC       EU        OC         OU       MC     MU    CCSC   CCSU   YGC     YGCT    FGC    FGCT     GCT
   143360.0 143360.0  0.0    0.0   1146880.0 27569.6  4300800.0   88770.2   40448.0 39299.8 4648.0 4382.2     18    1.441   4      1.213    2.654

   $ jstat -gcutil 14730
     S0     S1     E      O      M     CCS    YGC     YGCT    FGC    FGCT     GCT
     0.00   0.00   2.40   2.06  97.16  94.28     18    1.441     4    1.213    2.654
   ```
- jmap 
   + -heap命令可以把堆内存的使用情况打印出来
   + 注意：1.8旧的update可能有bug会导致cms的显示有问题
   + -histo命令用来打印堆内存实例数和占用的字节数 注意是Shallow Size
   + -dump可dump出堆内存快照用来排查内存泄露或者大对象占用或者对象真正占用大小问题

   ```
   $ jmap -heap 14730
   Attaching to process ID 14730, please wait...
   Debugger attached successfully.
   Server compiler detected.
   JVM version is 25.172-b11

   using parallel threads in the new generation.
   using thread-local object allocation.
   Concurrent Mark-Sweep GC

   Heap Configuration:
      MinHeapFreeRatio         = 40
      MaxHeapFreeRatio         = 70
      MaxHeapSize              = 5872025600 (5600.0MB)
      NewSize                  = 1468006400 (1400.0MB)
      MaxNewSize               = 1468006400 (1400.0MB)
      OldSize                  = 4404019200 (4200.0MB)
      NewRatio                 = 2
      SurvivorRatio            = 8
      MetaspaceSize            = 21807104 (20.796875MB)
      CompressedClassSpaceSize = 1073741824 (1024.0MB)
      MaxMetaspaceSize         = 17592186044415 MB
      G1HeapRegionSize         = 0 (0.0MB)

   Heap Usage:
   New Generation (Eden + 1 Survivor Space):
      capacity = 1321205760 (1260.0MB)
      used     = 44450000 (42.39082336425781MB)
      free     = 1276755760 (1217.6091766357422MB)
      3.364351060655382% used
   Eden Space:
      capacity = 1174405120 (1120.0MB)
      used     = 44450000 (42.39082336425781MB)
      free     = 1129955120 (1077.6091766357422MB)
      3.7848949432373047% used
   From Space:
      capacity = 146800640 (140.0MB)
      used     = 0 (0.0MB)
      free     = 146800640 (140.0MB)
      0.0% used
   To Space:
      capacity = 146800640 (140.0MB)
      used     = 0 (0.0MB)
      free     = 146800640 (140.0MB)
      0.0% used
   concurrent mark-sweep generation:
      capacity = 4404019200 (4200.0MB)
      used     = 90900656 (86.68962097167969MB)
      free     = 4313118544 (4113.31037902832MB)
      2.0640385945638022% used

   14494 interned Strings occupying 1262456 bytes.


   $ jmap -histo:live 14730 | head -13

    num     #instances         #bytes  class name
   ----------------------------------------------
      1:        341052       13981272  [C
      2:        194673       11402072  [Ljava.lang.Object;
      3:        337876        8109024  java.lang.String
      4:        227540        7281280  java.util.HashMap$Node
      5:        180237        7209480  landon.WordFilterService$WordNode
      6:         62226        5685448  [Ljava.util.HashMap$Node;
      7:        220913        5301912  java.util.ArrayList
      8:         17448        4789712  [B
      9:          3841        4219752  [I
     10:         62187        2984976  java.util.HashMap

   $ jmap -dump:format=b,live,file=RobotMemoryLeak3.hprof 995
   ```
- nmt工具
   + nmt是Native Memory Tracking 可用来追踪native memory泄露这块
   + summary这块可以看到所有内存占用的部分
   + detail这块是具体到每一个内存起始地址段的内存占用
   + 注意：使用该工具需要启动参数增加-XX:NativeMemoryTracking=detail 而且某些1.8x某些update版本可能有问题

   ```
   $ jcmd 14730 VM.native_memory summary
   14730:

   Native Memory Tracking:

   Total: reserved=7316712KB, committed=6043896KB
   -                 Java Heap (reserved=5734400KB, committed=5734400KB)
                               (mmap: reserved=5734400KB, committed=5734400KB)

   -                     Class (reserved=1086288KB, committed=41296KB)
                               (classes #6377)
                               (malloc=848KB #10714)
                               (mmap: reserved=1085440KB, committed=40448KB)

   -                    Thread (reserved=91890KB, committed=91890KB)
                               (thread #90)
                               (stack: reserved=91492KB, committed=91492KB)
                               (malloc=292KB #452)
                               (arena=105KB #176)

   -                      Code (reserved=253971KB, committed=26147KB)
                               (malloc=4371KB #6376)
                               (mmap: reserved=249600KB, committed=21776KB)

   -                        GC (reserved=32269KB, committed=32269KB)
                               (malloc=12661KB #180)
                               (mmap: reserved=19608KB, committed=19608KB)

   -                  Compiler (reserved=429KB, committed=429KB)
                               (malloc=298KB #509)
                               (arena=131KB #6)

   -                  Internal (reserved=4983KB, committed=4983KB)
                               (malloc=4951KB #9495)
                               (mmap: reserved=32KB, committed=32KB)

   -                    Symbol (reserved=9467KB, committed=9467KB)
                               (malloc=7605KB #71844)
                               (arena=1862KB #1)

   -    Native Memory Tracking (reserved=1801KB, committed=1801KB)
                               (malloc=197KB #2791)
                               (tracking overhead=1603KB)

   -               Arena Chunk (reserved=190KB, committed=190KB)
                               (malloc=190KB)

   -                   Unknown (reserved=101024KB, committed=101024KB)
                               (mmap: reserved=101024KB, committed=101024KB)

   Virtual memory map:

   $ jcmd 14730 VM.native_memory detail | less
   ......
   [0x0000000662000000 - 0x00000007c0000000] reserved 5734400KB for Java Heap from
       [0x00007f755bf42482] ReservedSpace::initialize(unsigned long, unsigned long, bool, char*, unsigned long, bool)+0xc2
       [0x00007f755bf42e5e] ReservedHeapSpace::ReservedHeapSpace(unsigned long, unsigned long, bool, char*)+0x6e
       [0x00007f755bf0fe9b] Universe::reserve_heap(unsigned long, unsigned long)+0x8b
       [0x00007f755ba63ad2] GenCollectedHeap::allocate(unsigned long, unsigned long*, int*, ReservedSpace*)+0x182

           [0x00000006b9800000 - 0x00000007c0000000] committed 4300800KB from
               [0x00007f755bf41ef9] VirtualSpace::expand_by(unsigned long, bool)+0x199
               [0x00007f755bf42a4e] VirtualSpace::initialize(ReservedSpace, unsigned long)+0xee
               [0x00007f755ba74a01] CardGeneration::CardGeneration(ReservedSpace, unsigned long, int, GenRemSet*)+0xf1
               [0x00007f755b95f9de] ConcurrentMarkSweepGeneration::ConcurrentMarkSweepGeneration(ReservedSpace, unsigned long, int, CardTableRS*, bool, FreeBlockDictionary<FreeChunk>::DictionaryChoice)+0x4e

           [0x0000000662000000 - 0x00000006b9800000] committed 1433600KB from
               [0x00007f755bf41ef9] VirtualSpace::expand_by(unsigned long, bool)+0x199
               [0x00007f755bf42a4e] VirtualSpace::initialize(ReservedSpace, unsigned long)+0xee
               [0x00007f755ba744ad] Generation::Generation(ReservedSpace, unsigned long, int)+0xbd
               [0x00007f755b97afa6] DefNewGeneration::DefNewGeneration(ReservedSpace, unsigned long, int, char const*)+0x46
   ...
   ```
- pmap
   + 这个也主要用来排查native memory的
   + 最终也对应到实际的内存地址和rss关系
   + 注意:这个内存地址和上面nmt的内存地址很多都对的上
     + 如0000000662000000这个地址内存其实就是java heap的内存地址
     + 而且可以看到这个地址的rss大约是1.35g

   ```
   $ pmap -x 14730
   14730:   /bin/java -server -XX:NativeMemoryTracking=detail -cp lib/mavs-0.0.1-SNAPSHOT.jar -Djava.ext.dirs=lib:/lib/ext -XX:+HeapDumpOnOutOfMemoryError -XX:NewSize=1400m -XX:MaxNewSize=1400m -Xms5600m -Xmx5600m -XX:+UseConcMarkSweepGC -Dlog.home=/log/backend -Dlogback.configurationFile=config/logback.xml
   Address           Kbytes     RSS   Dirty Mode   Mapping
   0000000000400000       4       4       0 r-x--  java
   0000000000600000       4       4       4 rw---  java
   0000000002599000     132      36      36 rw---    [ anon ]
   0000000662000000 5739048 1416320 1416320 rw---    [ anon ]
   ......
   ```
- google-perftools#分析堆外内存

### 一些术语之间的关系

1. Reserved Memory（保留地址）：应用程序访问内存的方式之一，先保留（Reserve）一块内存地址空间，留着将来使用;被保留的地址空间，不能被其他程序访问，不然会出现访问越界的报错提示
2. Committed Memory（提交内存）：将保留（Reserve）的内存页面正式提交（Commit）使用
3. Resident Set Size 也就是每个进程用了具体的多少页的内存。由于linux系统采用的是虚拟内存，进程的代码，库，堆和栈使用的内存都会消耗内存，但是申请出来的内存，只要没真正touch过，是不算的，因为没有真正为之分配物理页面
4. stack memory (unlike the JVM heap) seems to be precommitted without becoming resident and over time becomes resident.They may or may not be backed by physical or swap due to lazy allocation and paging
5. Note that only committed memory is actually used. For example, if you run with `-Xms100m -Xmx1000m`, the JVM will reserve 1000 MB for the Java Heap. Since the initial heap size is only 100 MB, only 100MB will be committed to begin with
6. reserved-but-not-committed pages cannot be resident
7. RSS covers pages *resident* in physical memory. Things that have been paged out (or never paged in) can be be committed memory but not resident
8. The *Committed memory* is a measure of how much memory the JVM heap is really consuming
9. Reserved: The total address range that has been pre-mapped via mmap for a particular memory pool.
10. Committed: Address ranges that have been mapped with something other than PROT_NONE. They may or may not be backed by physical or swap due to lazy allocation and paging.
11. Resident: Pages which are currently in physical ram. This means code, stacks, part of the committed memory pools but also portions of mmaped files which have recently been accessed and allocations outside the control of the JVM.
12. Virtual: The sum of all virtual address mappings. Covers committed, reserved memory pools but also mapped files or shared memory. This number is rarely informative since the JVM can reserve very large address ranges in advance or mmap large files.

### 简单总结
1. top显示的res是指进程常驻内存 目前从经验上看这个常驻内存会比堆内存大 这个很容易理解 因为jvm除了堆内存外，还有metaspace、stack、jvm本身、堆外内存等
2. 使用nmt工具可以看到committed size比较大 比rss要大 这其实也可以理解 rss其实是真用使用的物理内存 而committed只是提交内存 而这些提交内存可能还没真正被touch
3. 通常我们主要关注java堆内存，可以使用jmap来追踪内存使用和内存实例对象占用等 如果要追踪大对象 则可以使用jmap dump出堆快照后用mat等工具分析
   + 所以top显示的res进程内存可以参考 但更多应关注堆内存
   + 只要res/rss没有超过最大堆内存就先不用太担心
4. 如果发现res占用非常大 那么要怀疑可能是堆外内存泄露
   + 可结合pmap、nmt、google-perftools追踪即可
5. free这个命令可能有时候比较另外迷惑
   + 比如现在我们的服务器用free查看发现used是5.8G(4c8g) 但我们java进程占用的常驻内存却只有1.6G
   + 其实还是对free命令不熟悉 因为used指总计分配给缓存（包含buffers 与cache ）使用的数量，但其中可能部分缓存并未实际使用
   + 而buffers/cached则表示系统分配但未被使用的
   + 所以从下面的输出可以看到分配了5.8G 但是未被使用的cached就达到了3.7G 所以整体没有大问题

   ```
   $ free -h
                total       used       free     shared    buffers     cached
   Mem:          7.8G       5.8G       2.0G       940K       220M       3.7G
   -/+ buffers/cache:       1.9G       5.9G
   Swap:           0B         0B         0B

   ```

### 参考

1. http://blog.yufeng.info/archives/2456
2. <https://stackoverflow.com/questions/31173374/why-does-a-jvm-report-more-committed-memory-than-the-linux-process-resident-set>
3. <https://stackoverflow.com/questions/31071019/does-rss-tracks-reserved-or-commited-memory>
4. <https://docs.oracle.com/javase/8/docs/api/java/lang/management/MemoryUsage.html>
5. http://lovestblog.cn/blog/2016/10/29/metaspace/
6. http://lovestblog.cn/blog/2015/08/21/rssxmx/
