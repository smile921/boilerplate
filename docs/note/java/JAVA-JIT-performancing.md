# [AdoptOpenJDK/jitwatch](https://github.com/AdoptOpenJDK/jitwatch) 一个JAVA JIT 代码分析与优化工具

JITWATCH 是一个能理解分析JAVA Hotsopt Just-In-Time 及时编译代码的程序。
他通过处理JVM 进程输出的hotspot.log 文件来实现的。

* 使用下面选项生成hotspot.log文件
```bash
-XX:+UnlockDiagnosticVMOptions
-XX:+TraceClassLoading
-XX:+LogCompilation
-XX:+PrintAssembly
-XX:+TraceClassLoading
-XX:LogFile=mylogfile.log

```

* maven坐标依赖
```xml
<dependencies>
    <dependency>
      <groupId>com.chrisnewland</groupId>
      <artifactId>jitwatch</artifactId>
      <version>1.1.5</version>
    </dependency>
</dependencies>
```
* 运行命令行
```bash
mvn exec:java
```
