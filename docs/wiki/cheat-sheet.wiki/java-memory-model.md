## Java 内存模型
根据存储数据的不同，java内存通常被划分为5个区域：

1. 程序计数器（Program Count Regster）
2. 本地方法栈（NativeStack）
3. 方法区（Method Area）
4. 栈 （Stack）
5. 堆 （Heap）

### 程序计数器（Program Count Regster） 
又叫程序寄存器。JVM支持多个线程同时运行，当每一个新线程被创建时，它都将得到它自己的PC寄存器（程序计数器）。如果现正正在执行的是一个Java方法（非native），那么PC寄存器的值总是指向吓一跳将被执行的指令，如果方法是native的吗，程序计数器的值不会被定义。JVM 的程序计数器的宽度足够保证可以持有一个返回地址或者native的指针。

### 栈（Stack）
又叫堆栈。JVM为每个新创建的此案称都分配一个栈。也就是说对于一个java程序员来说，它的运行就是通过对栈的操作来完成的。栈以帧（frame）为单位保存线程的状态。
JVM对栈的操作有两种：以帧为单位的压栈和出栈操作。
我们知道，某个线程正在执行的方法称为此线程的当前方法，。我们可能不知道当前方法使用的帧为当前帧。当前线程激活一个Java方法，JVM就会在线程的Java堆栈里压入一个帧，这个帧自然成为了当前帧。在此方法执行期间，这个帧用来保存参数、局部变量，中间计算结果，和其他数据。从Java这种分配机制来看，堆栈又可以这样理解：栈（Stack）是操作系统在简历某个进程时或线程（在支持多线程的操作系统是线程）为这个线程简历的存储区域，该区域具有先进后出的特性。

>方法栈为线程私有，用于存储线程产生的数据，如引用和基本来兴，方法栈遵循后进先出的原则

相关启动参数：

* -Xss 每个线程的栈大小
> 根据应用的线程所需内存大小进行调整。在相同物理内存下，减小这个值能生成更多的线程。一般小的应用，如果栈不是很深，应该是128k够用，大的应用建议使用256k。这个选项对性能影响比较大。

### 本地方法栈
用于支持native方法的执行，存储了每个native方法调用的状态

### 方法区(Method Area)
又叫持久代。存放了要加载的类信息、静态变量、final类型的常量、属性和方法等。
当虚拟机装载一个class文件时，它会从这个class文件包含的二进制数据中解析类型信息，然后把这些类型信息（包括类信息、常量、静态变量等）放到方法区中，该内存区域被所有线程共享。本地方法区存在一块特殊的内存区域，叫常量池（Constant Pool），这块内存将与String类型的分析密切相关。

相关启动参数

* -XX:PermSize  设置Perm区的初始大小，默认物理内存的1/64
* -XX:MaxPermSize  设置Perm区的最大值，物理内存的1/4


### 堆（Heap）
Java堆（Java Heap）是Java虚拟机所管理的内存中最大的一块。Java堆是被所有线程共享的一块内存区域。在此区域的唯一目的就是存放对象实例，几乎所有的对象实例都是在这里分配内存，但是这个对象的引用却是在栈（Stack）中分配。
因此，执行String s = new String("s")时，需要从两个地方分配内存：
在堆中为String对象分配内存，在栈中为引用（这个堆对象的内存地址，即指针）分配内存。

相关启动参数

* -Xms 设置堆内存初始化大小，默认是物理内存的1/64但是小于1G
* -Xmx 设置堆内存最大值，默认是物理内存的1/4但小于1G，服务器一般设置 -Xms、-Xmx相等以避免每次GC后调整堆的大小
* -XX:MaxTenuringThreshold 设置对象在新生代中存活的次数，如果设置为0的话，则年清代对象不经过Survivor区，直接进入老年代。对于老年代比较多的应用可以提高效率。如果将此值设置为一个较大值，则年清代对象会在Survivor区进行多次复制，这样可以增加对像在年清代的存活时间，增加在年清代即呗回收的概率
* -XX:PretenureSizeThreshold 设置超过指定大小的对象直接分配在老年代

### 堆-新生代 （Young Generation）
又分为：Eden区和Survivor区，Survivor区有分为From Space和To Space。Eden区是对象最初分配到的地方；默认情况下，From Space和To Space的区域大小相等。JVM进行Minor GC时，将Eden中还存活的对象拷贝到Survivor区中，还会将Survivor区中还存活的对象拷贝到Tenured区中。在这种GC模式下，JVM为了提升GC效率， 将Survivor区分为From Space和To Space，这样就可以将对象回收和对象晋升分离开来。

相关启动参数：
* -Xmn  设置新生代内存大小，增大年轻代后，将会减小老年代大小，此值对系统吸能影响较大，Sun 官方推荐配置为整个堆的3/8
* -XX:SurvivorRatio 设置Eden与Survivor 空间的大小比例，这只为8，则两个Survivor区Survivor区与一个Eden区的比值为2：8，一个Survivor区栈整个年清代的1/10
* -XX:NewRatio 年轻代（包括Eden和两个Survivor区）与老年代的壁纸（除去持久代），4 标识年清代与年老代的所占比值为1:4,年轻代占整个堆的1/5,Xms=Xmx 并且设置了Xmn的情况下，该参数不需要设置

### 堆-老年代（Old Generation）
当Old区控件不够时，JVM会在Old区进行major collection，完成垃圾收集后，若Survivor及 Old区任然无法存放从Eden复制过来的部分对象，导致JVM无法在Eden区为新对象创建内存区域，则出现“Out of memory错误”


### 参考
- [java内存分配和String类型的深度解析](http://my.oschina.net/xiaohui249/blog/170013)