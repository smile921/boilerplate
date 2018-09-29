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

> 与标记对象的传统算法相比，ZGC在指针上做标记，在访问指针时加入Load Barrier（读屏障），比如当对象正被GC移动，指针上的颜色就会不对，这个屏障就会先把指针更新为有效地址再返回，也就是，永远只有单个对象读取时有概率被减速，而不存在为了保持应用与GC一致而粗暴整体的Stop The World。

[听R大论JDK11的ZGC](https://juejin.im/entry/5b86a276f265da435c4402d4)
[A FIRST LOOK INTO ZGC](https://dinfuehr.github.io/blog/a-first-look-into-zgc/)
[AZul的《The Pauseless GC Algorithm》论文](https://www.usenix.org/legacy/events/vee05/full_papers/p46-click.pdf)



## [Quasar](http://docs.paralleluniverse.co/quasar/)
[parallel universe](http://www.paralleluniverse.co/)
Quasar is a library that provides high-performance lightweight threads, Go-like channels, Erlang-like actors, and other asynchronous programming tools for Java and Kotlin.

A good introduction to Quasar can be found in the blog post Erlang (and Go) in Clojure (and Java), Lightweight Threads, Channels and Actors for the JVM.

## [Comsat](http://docs.paralleluniverse.co/comsat)
Comsat integrates standard Java web-related APIs with Quasar fibers and actors. It provides fiber-aware implementations of servlets, JAX-RS REST services, HTTP clients and JDBC. With Comsat, you can write web applications that are scalable and performant while, at the same time, are simple to code and maintain. You will enjoy the scalability of asynchronous services with no need to change your simple sequential code.

## [Quasar](http://docs.paralleluniverse.co/quasar/)
Quasar is an open source JVM library that greatly simplifies the creation of highly concurrent software. Quasar adds true lightweight threads — fibers — to the JVM. Those fibers are just like regular threads, only they add very little scheduling overhead, and allow you to run hundreds-of-thousands or even millions of lightweight threads on a single JVM instance. On top of those fibers, Quasar provides Go-like channels, and Erlang-like actors, complete with supervisor hierarchies, selective receive and more.

##  [SpaceBase](http://docs.paralleluniverse.co/spacebase/)
SpaceBase is an in-memory spatial and geo-spatial database. It allows updating and querying millions of entities in real-time. Speciﬁcally designed for applications that require performing spatial operations with very low latencies or at very high rates.

## [Galaxy](http://docs.paralleluniverse.co/galaxy/)
Galaxy is distributed in-memory data grid that horizontally scales Quasar’s actors across a cluster. Galaxy uses cache-coherence protocols across the network, and ensures that virtually all data queries and transactions are served with no need for IO.
