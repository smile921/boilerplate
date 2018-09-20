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

[听R大论JDK11的ZGC](https://juejin.im/entry/5b86a276f265da435c4402d4)
[A FIRST LOOK INTO ZGC](https://dinfuehr.github.io/blog/a-first-look-into-zgc/)
