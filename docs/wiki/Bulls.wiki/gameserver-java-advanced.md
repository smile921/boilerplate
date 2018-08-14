# 游戏服务器之Java进阶实战（HotSwap/Script/JVM）

## Java HotSwap

1. hotswap定义、基础知识
2. hotswap的几种实现方式
3. jrebel/spring loaded/dcevm/osgi/jpda
4. 游戏服务器实战

### hotswap基础

1. hotswap是在不重启 Java 虚拟机的前提下，能自动侦测到 class 文件的变化，更新运行时 class 的行为 
2. classloader Ⅰ
   + .java -> compile -> .class
   + classloader -> load byte code -> transform 2 Class instance
   + Class -> new -> Object instance
3. classloader Ⅱ
   + BootStrapClassLoader -> ExtClassLoader -> AppClassLoader  -> CustomClassLoader
   + 双亲委派
   + 每个类加载器有自己的名字空间，对于同一个类加载器实例来说，名字相同的类只能存在一个，并且仅加载一次。不管该类有没有变化，下次再需要加载时，它只是从自己的缓存中直接返回已经加载过的类引用
   + 即使是同一个类文件，如果是由不同的类加载器实例加载的，那么它们的类型是不相同的；因为相同的字节码如果由不同的类加载器来加载并定义的话，则所得到的Class类对象是不相同的

### 图解classloader
![](https://github.com/landon30/Bulls/blob/master/upload/classloader-1.png)
![](https://github.com/landon30/Bulls/blob/master/upload/classloder-2.png)

### hotswap的几种实现方式

1. 自定义classloader实现
   + 实现 Java 类的热替换，首先必须要实现系统中同名类的不同版本实例的共存。要想实现同一个类的不同版本的共存，我们必须要通过不同的类加载器来加载该类的不同版本
   + 即不能把这些类的加载工作委托给系统加载器来完成，因为它们只有一份
   + 面向接口编程，接口由系统加载器来加载，否则ClassCastException
     + 最好逻辑和数据分离 否则数据丢失
   + 避免可能的内存泄露
     + class和classloader的gc
     + 每一个class对象都引用了加载它的classloader对象
     + 每一个classloader对象都持有着所有由它加载的类对象
2. Instrumentation
   + redefineClasses
   + javaagent -> aop
   + getObjectSize
3. 继承修改
   + 不自定义classloader的情况下 可以新写一个子类覆写需要hotswap的方法
   + 可以通过asm等字节码修改工具做成通用，即将hotswap的类动态修改为子类
4. 脚本
   + 部分业务逻辑直接通过脚本实现 通常脚本已'内置实现'hotswap
5. 注意
   + redefinition is limited only to changing method bodies

## CustomClassLoader sample
1. HotSwapClassLoader
  + 自定义类加载器
  + 加载指定目录的class
2. IShopService
  + 某业务接口
3. checkHotswap
  + 线上发现shopservice的方法实现出错，需要hotswap

![](https://github.com/landon30/Bulls/blob/master/upload/hotswap-sample.png)

### jrebel/spring loaded/dcevm/jpda/osgi

1. jrebel/spring loaded
   + Whereas HotSwap works at the virtual machine level and is dependent on the inner workings of the JVM, JRebel makes use of two remarkable features of the JVM — abstract bytecode and classloaders. Classloaders allow JRebel to recognize the moment when a class is loaded, then translate the bytecode on-the-fly to create another layer of abstraction between the virtual machine and the executed code.--字节码修改方法实现，由Runtime代理
   + 建议只用于开发环境
2. dcevm
   + Dynamic Code Evolution VM
   + A modification of the Java HotSpot(TM) VM that allows unlimited class redefinition at runtime
   + 补丁-支持更多重定义功能
   + HotSwapAgent combination
   + 建议只用于开发环境
3. jpda
   + Java Platform Debugger Architecture
   + jdb
   + VirtualMachine#redefineClasses
4. osgi
   + The Dynamic Module System for Java
   + 每一个bundle都是可热插拔的

### 游戏服务器实战

1. 线上业务逻辑代码出bug，需要动态修复，绝大多数bug都是方法实现出错
2. 使用Instrumentation最方便
3. com.playcrab:CHR

## JVM Scripting Languages

1. Bean Scripting Framework
2. JSR223
3. JS/Groovy/Scala/Clojure/JEXL/BeanShell/Kotlin
4. 游戏服务器实战

### BSF

1. Bean Scripting Framework (BSF) is a set of Java classes which provides scripting language support within Java applications, and access to Java objects and methods from scripting languages.  
2. Java6以前
3. 2.x/3.x

### JSR223

1. JSR-223 is a standard API for calling scripting frameworks in Java. It is available since Java 6 and aims at providing a common framework for calling multiple languages from Java. 
2. javax.script
3. 使用统一规范在JVM上执行脚本

### JS/Groovy/Scala/Clojure/JEXL/BeanShell/Kotlin

1. JS
   + Rhino -> Nashorn
   + jjs
   + 内置
2. Groovy/Scala/Clojure
   + 三大脚本语言
3. JEXL
   + 表达式引擎
4. BeanShell
   + Lightweight Scripting for Java
5. Kotlin
   + Android#swift
6. 基本原理
   + Java自实现解释器(如语法、词法分析) -> 如asm按照JVM规范生成Java字节码 -> JVM run
   + 相互调用
7. 其他
   + JPhp、jython
   + 注：java中调用lua的实现和其他脚本不太一样(1. 用Java实现一个Lua虚拟机解释器[可能无法调用.so] 2. 直接JNI)

### 游戏服务器实战

1. 线上修改玩家数据、执行某些业务逻辑--需要游戏服务器在线执行一些脚本
   + 目前项目这边用的是beanshell，可用groovy替换(注：其实也可以用Java，不过用脚本更简单方便)
2. C++服务器
   + 使用lua/python作为业务逻辑的脚本，可实现业务热更需求(注：上面提到Java本身即可以做到hotswap)
3. 关于策划配置的数值公式
   +  如何解析一个策划配置的字符串数值公式 -> 表达式引擎

## JVM Basics

1. jvm内存区域概述
2. gc
3. 内置命令介绍
4. 游戏服务器实战

### JVM内存区域概述
![](https://github.com/landon30/Bulls/blob/master/upload/jvm-summary.png)

### JVM内存区域细节
1. The pc Register、Java Virtual Machine Stacks、Heap、Method Area、Run-Time Constant Pool、Native Method Stacks
2. IntegerCache、String.intern
3. PermGen -> Metaspace
4. java.lang.OutOfMemoryError:Java heap space、java.lang.OutOfMemoryError:Permgen space、java.lang.OutOfMemoryError:Metaspace、java.lang.OutOfMemoryError:Unable to create new native thread

### GC

1. 什么是gc
   + 指JVM用于释放那些不再使用的对象所占用的内存
2. 如何gc
   + 复制(s0/s1)、标记-清除、标记-整理
   + 分代(如堆新生代、老年代)-根据对象的''年龄''选择合适的垃圾回收算法
   + gc的对象：GC Root Tracing不可达
     - 四种引用
     - 方法区回收
3. 什么时候gc
   + System.gc
   + jvm决定何时触发
     - minor gc
     - full gc
     - eden -> so -> s1 -> tenured
4. 什么时候内存溢出
   + 当内存空间不足，Java虚拟机宁愿抛出OutOfMemoryError错误，使程序异常终止，也不会靠随意回收具有强引用的对象来解决内存不足的问题

### JVM内部命令

1. jps、jmap、jstat、jstack、jinfo、jhat
2. jcmd
3. jconsole、jvisualvm、jmc

### 游戏服务器实战

1. Java服务器启动参数
   + 通常要设置如堆大小、内存溢出dump、垃圾回收器类型等
2. 线上服务器Java进程出现问题
   + 内存、cpu

## References

1. jrebel系列
   + http://www.zeroturnaround.com/blog/reloading-objects-classes-classloaders/
   + http://www.zeroturnaround.com/blog/rjc201/
   + http://www.zeroturnaround.com/blog/rjc301/
   + http://www.zeroturnaround.com/blog/reloading_java_classes_401_hotswap_jrebel/
   + http://www.zeroturnaround.com/blog/reloading_java_classes_social_cost_of_turnaround/
   + https://zeroturnaround.com/rebellabs/why-hotswap-wasnt-good-enough-in-2001-and-still-isnt-today/
2. 其他hotswap系列
   + http://www.blogjava.net/landon/category/54860.html
   + http://www.infoq.com/cn/articles/javaagent-illustrated
   + https://docs.oracle.com/javase/8/docs/technotes/guides/jpda/enhancements1.4.html
   + http://ssw.jku.at/dcevm/
   + https://github.com/dcevm/dcevm
3. scripting
   + https://commons.apache.org/proper/commons-bsf/
   + https://www.slideshare.net/RednaxelaFX/jvm-a-platform-for-multiple-languages
4. jvm
   + https://docs.oracle.com/javase/specs/jvms/se8/html/index.html
   + https://www.jianshu.com/p/2fdee831ed03
   + https://blog.yangx.site/2017/04/10/jvm-generation-GC/