# Java调优系列之工具篇之-btrace-gperftools
> landon 网络游戏资深服务器架构师
> 2018-06-14

## 线上遇到了问题？
1. 服务上线出问题，想增加打印日志怎么办？
2. 线上怀疑某个接口慢，想打印接口耗时怎么办？
3. 线上某个接口报错，想看看调用的参数和谁调用了怎么办？
4. 线上出错了，想看某个对象的数据怎么办？
5. 线上出错了，想看一下jvm的一些信息怎么办？
6. 不确定线上某一行代码执行了怎么办？
7. ......

## 传统解决方案
+ 修改源代码 -> 增加相关打印日志 -> hotswap
+ Thread.dumpStack
+ beanshell可以查看内存数据
+ jvm信息可以通过jvm内置命令去获取
- 缺点
  * 代码侵入式
  * 不灵活
  * 源代码冗余
  * 如果你的服务不支持hotswap呢？

## 什么是btrace
+ BTrace is a safe, dynamic tracing tool for the Java platform.
+ BTrace can be used to dynamically trace a running Java program (similar to DTrace for OpenSolaris applications and OS). BTrace dynamically instruments the classes of the target application to inject tracing code ("bytecode tracing").
+ 江南白衣
  - Btrace是神器，每一个需要每天解决线上问题，但完全不用Btrace的工程师，都是可疑的

## btrace基础
1. https://github.com/btraceio/btrace
    + 以前sun开源的项目
2. 下载
   + bin 加入环境变量
   + build 实现包和依赖包
   + samples 示例脚本
   + docs 帮助文档
3. 基础使用
   + IDE下编写btrace脚本
   + jps找到运行的java进程pid
   + btrace pid btracescript

## btrace脚本编写基础事项
1. IDE编写要引入依赖jar
   + btrace-agent.jar
   + btrace-boot.jar
   + btrace-client.jar
2. 脚本就是一个.java源文件
3. @BTrace注解
4. trace的class要用full name
5. 只能使用btrace提供的方法，不能自己随意调用(保证性能不受影响，trace才更放心)

## btrace实战
1. 一个简单的偏游戏业务的sample
2. btrace
   + Locate 定位trace的方法
   + Intercept 对定位到的方法进行拦截
   + Print 打印需要的数据
3. 典型场景
   + 找出最耗时的业务方法
   + 打印调用堆栈
   + ......

## btrace#locate
1. TraceLocate.java
2. 举例
   - `@OnMethod(clazz = "/practice.*/", method = "/.*/")`
   - `@OnMethod(clazz = "+practice.IHandler", method = "/.*/")`
   - `@OnMethod(clazz = "/practice.*/", method = "@practice.LogicMethod")`
   - `@OnMethod(clazz = "/practice.*/", method = "<init>")`
3. 看示例代码

## btrace#intercept
1. TraceIntercept.java
2. 举例
   + `@OnMethod(clazz = "practice.LoginHandler", method = "login", location = @Location(Kind.ENTRY))`
   + `@OnMethod(clazz = "practice.LoginHandler", method = "login", location = @Location(Kind.RETURN))`
   + `@OnMethod(clazz = "+practice.IHandler", method = "/.*/", location = @Location(Kind.THROW))`
   + `@OnMethod(clazz = "practice.LoginHandler", method = "login", location = @Location(value = Kind.CALL, clazz = "/.*/", method = "/.*/", where = Where.AFTER))`
   + `@OnMethod(clazz = "practice.HeroHandler", method = "starUp", location = @Location(value = Kind.LINE, line = 16))`
3. 看示例代码

## btrace#print
1. TracePrint.java
2. 举例
   + printMethodSignature
   + AnyType
   + `Field field = BTraceUtils.field("practice.PlayerService", "playerMap")`
   + `@TLS thread local share`
3. 看示例代码

## btrace#TypicalScenes
1. TraceTypicalScenes.java
2. 举例
    + @Duration long duration
      - 纳秒
      - Kind.RETURN
    + BTraceUtils.jstack
    + OnTimer
    + jvm
      - jinfo/jmap/...
      - sizeof/deadlock
3. 示例代码和自带sample

## btrace原理
1. Client(Java compile api + attach api) + Agent（脚本解析引擎 + ASM + JDK6 Instumentation） + Socket
2. java attach api附加agent.jar + 脚本解析引擎+asm来重写指定类的字节码  + instrument实现对原有类的替换
3. 通过JVM Attach API，btrace把自己绑进了被监控的进程 -> 按照脚本定义 -> AOP代码植入

## btrace原理图解
![](https://i.imgur.com/OAv5e6c.png)


## btrace注意的问题
1. 限制
   - 为了保证性能不受影响，Btrace不允许调用任何实例方法，必须使用btrace提供的api
2. BTrace植入过的代码，会一直在
3. 属于“事后工具” ，即服务已经上线了，无法再通过打印日志等方式埋点分析
4. 无法trace native
5. 一定要用IDE写btrace脚本
6. 其他
   - 有一些脚本细节需要自行体会 如追踪异常的上下文
   - 可以远程、可用于线上生成环境 还有许多其他命令参数如指定文件输出

## 其他工具和参考
1. 其他类似工具(可能更强大 但是我个人还是偏向sun的btrace)
   - https://github.com/alibaba/jvm-sandbox
   - https://github.com/oldmanpushcart/greys-anatomy
2. 参考
   - http://calvin1978.blogcn.com/articles/btrace1.html
   - http://jm.taobao.org/2010/11/11/509/
   - http://www.rowkey.me/blog/2016/09/20/btrace/
   - http://agapple.iteye.com/blog/1005918
   - http://tech.lede.com/2017/10/11/rd/server/javaToolsBTrace/
   - https://www.ezlippi.com/blog/2018/01/btrace-introduce.html

## gperftools
1. 场景
   - 主要分析Java的堆外内存泄露
2. Java进程占用内存
   - Note that the JVM uses more memory than just the heap. For example Java methods, thread stacks and native handles are allocated in memory separate from the heap, as well as JVM internal data structures
3. 堆外内存
   - jni
   - nio direct buffer

## gperftools#install
1. 下载地址
   + https://github.com/gperftools/gperftools
2. install
   - Perftools was developed and tested on x86 Linux systems, and it works in its full generality only on those systems.  However, we've successfully ported much of the tcmalloc library to FreeBSD, Solaris x86, and Darwin (Mac OS X) x86 and ppc; and we've ported the basic functionality in tcmalloc_minimal to Windows.  See INSTALL for details.See README_windows.txt for details on the Windows port.
   - 强烈建议直接在linux安装，mac文档少，windows不考虑
3. linux注意问题
   - https://github.com/gperftools/gperftools/blob/master/INSTALL
   - if you use a 64-bit system, we strongly recommend you install libunwind before trying to configure or install gperftools
   - 动态库配置(ld.so.conf.d/ldconfig)、root

## 堆外内存泄露sample
1. NonHeapLeakExample.java
   - java.util.zip.Deflater
2. javac -> jar -> run.sh
   - javac NonHeapLeakExample.java
   - jar cvf NonHeapLeak.jar NonHeapLeakExample.class
   - java -cp ./NonHeapLeak.jar NonHeapLeakExample
3. top/jmap/jstat
4. 示例代码和脚本

## gperftools排查
1. java启动脚本增加参数
   - export LD_PRELOAD=/usr/local/lib/libtcmalloc.so
   - export HEAPPROFILE=/tmp/nonheapleak
2. 启动输出
   - Starting tracking the heap
3. 查看heap是否生成
   - `$ ll /tmp | grep .heap`
   - `-rw-rw-r--  1 playcrab playcrab 1048574 Jun 13 16:24 nonheapleak_28759.0001.heap`
4. 分析heap
   - `pprof --text $JAVA_HOME/bin/java /tmp/nonheapleak_28759.0001.heap`


## gperftools结果展示
1. 结果展示

````bash
Using local file /data/home/user00/playcrab/usr/jdk/bin/java.
Using local file /tmp/nonheapleak_28759.0003.heap.
Total: 300.2 MB
   281.9  93.9%  93.9%    281.9  93.9% deflateInit2_
    17.7   5.9%  99.8%     17.7   5.9% os::malloc@907360
     0.3   0.1%  99.9%      0.3   0.1% readCEN
     0.1   0.0% 100.0%    282.0  94.0% Java_java_util_zip_Deflater_init
......
````
2. 分析
   + Java_java_util_zip_Deflater_init是一个jni方法 对应java方法
   + 可以看到这块占用内存占用很大

## 如何找到谁调用了Deflater？
1. btrace派上用场
```java
@OnMethod(clazz = "java.util.zip.Deflater", method = "<init>")
     public static void traceStack() {
         BTraceUtils.jstack();
     }
```
2. 有了Java的调用堆栈，就好办了
3. 原因
   + deflater没有调用end
   + deflater的底层实现全部是调用jni
   + 只申请了内存但是没有释放

## 源代码
1. [btrace-sample](https://github.com/landon30/Bulls/tree/master/btrace-sample)
2. [NonHeapLeak-sample](https://github.com/landon30/Bulls/tree/master/non-heap-leak-sample)

## Q & A
- 演示过程中，貌似gperftools的heap没生成，进程kill的时候生成了
   + 可以生成 不过得等一下
   + 从输出看 是差不多6分钟左右 heap文件才生成

````bash
$ date
2018年 06月 14日 星期四 22:39:43 CST
[playcrab@achilles landon]$ sh nonHeapLeak.sh
$ ll /tmp/*.heap
-rw-rw-r-- 1 playcrab playcrab 1048562 6月  14 22:45 /tmp/nonheapleak_10821.0001.heap
-rw-rw-r-- 1 playcrab playcrab 1048563 6月  14 22:51 /tmp/nonheapleak_10821.0002.heap

````

- 关于btrace的注入问题

````
1. btrace注入的代码确实一直都在
2. 没有办法移除 因为再次写脚本也是在注入后的基础上
3. 通常来说线上排查问题 我们不会写如定位线上所有的业务方法都进行拦截 肯定会有选择性的 另外和源代码增加日志一样 不会有什么性能问题
4. btraceutils.println是直接发送到了attach的agent的buff（socket）没什么问题，client退出了就不会发了，只不过代码还依然执行而已 landon-本质还是socket通讯
````
