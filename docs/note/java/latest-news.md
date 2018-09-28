# 一些前沿的技术，权当拓宽视野吧

## GraalVM 神什么
> GraalVM is a universal virtual machine for running applications written in JavaScript, Python 3, Ruby, R, JVM-based languages like Java, Scala, Kotlin, and LLVM-based languages such as C and C++.

> GraalVM removes the isolation between programming languages and enables interoperability in a shared runtime. It can run either standalone or in the context of OpenJDK, Node.js, Oracle Database, or MySQL.

简单来说 Graalvm 是一个为了跑各种应用的全面的虚拟机，他可以运行用 JavaScript, Python 3, Ruby, R, 像基于JVM 的语言如 Java, Scala, Kotlin, 和 基于LLVM 的语言 比如 C and C++ 等写的应用。 Graalvm 去掉了不同语言之间的独立，使他们共享一个运行时。

Graalvm，也就是Openjdk的一个插件，有了Graal之后，就能够将Lisp，Haskell等fp语言运行在JVM上，并且可以通过aot，jlink等技术，将其打包成size很小的可执行文件，并发布出去

## JDK 11 的一个 实验性的GC 叫 ZGC

> The Z Garbage Collector, also known as ZGC, is a scalable low-latency garbage collector.

据说ZGC 比G1 还要好，ZGC的原理待了解. 目标是把GC停顿时间控制在10ms 以内。
ZGC所采用的算法就是Azul Systems很多年前提出的Pauseless GC,而实现上它介乎早期Azul VM的Pauseless GC与后来Zing VM的C4之间。

* Pause times do not exceed 10ms
* Pause times do not increase with the heap or live-set size
* Handle heaps ranging from a few hundred megabytes to multi terabytes in size

At a glance, ZGC is:

* Concurrent
* Region-based
* Compacting
* NUMA-aware
* Using colored pointers
* Using load barriers

At its core, ZGC is a concurrent garbage collector, meaning all heavy lifting work is done while Java threads continue to execute. This greatly limits the impact garbage collection will have on your application's response time.

ZGC 在压缩堆内存的同时减少停顿时间，这里压缩堆内存是指移动存活的堆内存到一个连续区域，以减少堆上的内存碎片。减少停顿时间的方法：
* GC 使用多个线程来并行执行压缩。
* GC 压缩工作分割成多次停顿以实现增量压缩。
* 并发的执行压缩过程,压缩过程不停顿或者停顿很少的时间
* GO 的 GC 过程根本不压缩对内存就可以直接处理
* 你需要把一个对象复制到另一个地址上，同时其它线程可以读写旧的对象。
* 如果复制成功，可能还有很多堆上的对象指向旧对象的地址，这时候需要把他们跟新到新地址上。

### GC barries GC屏障
GC 屏障是理解ZGC的如何实现并发压缩堆内的关键。有GC 屏障的GC，最GC读入一个堆上的引用对象的时候，他需要先做些额外处理。GC屏障与CPU上的内存屏障不同。并发的压缩堆内存的GC都需要读屏障，基本的数据类型读写不需要读屏障。ZGC 额外保存了堆上的引用对象的元数据
```
 6                 4 4 4  4 4                                             0
 3                 7 6 5  2 1                                             0
+-------------------+-+----+-----------------------------------------------+
|00000000 00000000 0|0|1111|11 11111111 11111111 11111111 11111111 11111111|
+-------------------+-+----+-----------------------------------------------+
|                   | |    |
|                   | |    * 41-0 Object Offset (42-bits, 4TB address space)
|                   | |
|                   | * 45-42 Metadata Bits (4-bits)  0001 = Marked0
|                   |                                 0010 = Marked1
|                   |                                 0100 = Remapped
|                   |                                 1000 = Finalizable
|                   |
|                   * 46-46 Unused (1-bit, always zero)
|
* 63-47 Fixed (17-bits, always zero)
```

ZGC 并没有完全去掉GC的卡顿，但是GC停顿时间非常短，只有几毫秒。GC的停顿时间只在开始标记,结束标记和开始重新分配开始时会发生短暂的停顿。ZGC开始标记阶段，他会遍历所有的线程栈来标记应用的root set(对象引用图的开始)。在ZGC结束标记阶段他会遍历所有的线程局部缓冲区标记并清空之。这个过程也分两段，开始.标结束记阶段.之后暂停一下，整个图包括子图遍历完成之后再继续.标结束记阶段.。开始再分配堆内存阶段与标记开始阶段类似会有短暂的暂停。

> 与标记对象的传统算法相比，ZGC在指针上做标记，在访问指针时加入Load Barrier（读屏障），比如当对象正被GC移动，指针上的颜色就会不对，这个屏障就会先把指针更新为有效地址再返回，也就是，永远只有单个对象读取时有概率被减速，而不存在为了保持应用与GC一致而粗暴整体的Stop The World。

[听R大论JDK11的ZGC](https://juejin.im/entry/5b86a276f265da435c4402d4)
[A FIRST LOOK INTO ZGC](https://dinfuehr.github.io/blog/a-first-look-into-zgc/)
