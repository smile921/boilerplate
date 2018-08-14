## 一、概述

[log4j 1.2 官方文档地址](http://logging.apache.org/log4j/1.2/)，当前版本为1.2.17，为1.x版本的最终版本，以后要使用[log4j2.x](http://logging.apache.org/log4j/2.x/)版本。但是本文是基于1.x版本的说明。

## 配置文件基本格式

下面是基于properties的配置格式，配置文件一般命名为 log4j.properties
```
#配置根Logger
log4j.rootLogger  =  [level],appenderName1, appenderName2 ,  …

#配置日志信息输出目的地Appender
log4j.appender.appenderName  =  fully.qualified.name.of.appender.class 
　　log4j.appender.appenderName.option1 = value1 
　　… 
　　log4j.appender.appenderName.optionN = valueN 

#配置日志信息的格式（布局）
log4j.appender.appenderName.layout = fully.qualified.name.of.layout.class 
　　log4j.appender.appenderName.layout.option1  =  value1 
　　… 
　　log4j.appender.appenderName.layout.optionN  =  valueN 
```

***

## 配置详解

在实际应用中，要使Log4j在系统中运行须事先设定配置文件。配置文件事实上也就是对Logger、Appender及Layout进行相应设定。Log4j支持两种配置文件格式，一种是XML格式的文件，一种是properties属性文件。下面以properties属性文件为例介绍log4j.properties的配置。

### 1、配置根Logger：

log4j.rootLogger = [level] , appenderName1, appenderName2, …    
**log4j.additivity.org.apache=false** ：表示Logger不会在父Logger的appender里输出,防止重复输出，默认为**true**。    
level ：设定日志记录的最低级别，可设的值有OFF、FATAL、ERROR、WARN、INFO、DEBUG、ALL或者自定义的级别，Log4j建议只使用中间四个级别。通过在这里设定级别，您可以控制应用程序中相应级别的日志信息的开关，比如在这里设定了INFO级别，则应用程序中所有DEBUG级别的日志信息将不会被打印出来。    
其中 [level] 是日志输出级别 [官方说明](http://logging.apache.org/log4j/1.2/apidocs/org/apache/log4j/Level.html)，共有9个等级，常用的有4个等级，越往后越详细：

* ERROR      3  
* WARN       4  
* INFO       6  
* DEBUG      7 

appenderName：就是指定日志信息要输出到哪里。可以同时指定多个输出目的地，用逗号隔开。    
例如：log4j.rootLogger＝INFO,A1,B2,C3

### 2、配置日志信息输出目的地（appender）：

log4j.appender.appenderName = className    
appenderName：*自定义appderName*，在log4j.rootLogger设置中使用；    

className：取值自

- org.apache.log4j.ConsoleAppender（控制台），
- org.apache.log4j.FileAppender（文件），
- org.apache.log4j.DailyRollingFileAppender（每天产生一个日志文件），
- org.apache.log4j.RollingFileAppender（文件大小到达指定尺寸的时候产生一个新的文件），
- org.apache.log4j.WriterAppender（将日志信息以流格式发送到任意指定的地方）


* (1)ConsoleAppender选项：
    - Threshold=WARN：指定日志信息的最低输出级别，默认为DEBUG。
    - ImmediateFlush=true：表示所有消息都会被立即输出，设为false则不输出，默认值是true。
    - Target=System.err：默认值是System.out。
* (2)FileAppender选项：
    - Threshold=WARN：指定日志信息的最低输出级别，默认为DEBUG。
    - ImmediateFlush=true：表示所有消息都会被立即输出，设为false则不输出，默认值是true。
    - Append=false：true表示消息增加到指定文件中，false则将消息覆盖指定的文件内容，默认值是true。
    - File=D:/logs/logging.log4j：指定消息输出到logging.log4j文件中。
* (3)DailyRollingFileAppender选项：
    - Threshold=WARN：指定日志信息的最低输出级别，默认为DEBUG。
    - ImmediateFlush=true：表示所有消息都会被立即输出，设为false则不输出，默认值是true。
    - Append=false：true表示消息增加到指定文件中，false则将消息覆盖指定的文件内容，默认值是true。
    - File=D:/logs/logging.log4j：指定当前消息输出到logging.log4j文件中。
    - DatePattern='.'yyyy-MM：每月滚动一次日志文件，即每月产生一个新的日志文件。当前月的日志文件名为logging.log4j，前一个月的日志文件名为logging.log4j.yyyy-MM。
另外，也可以指定按周、天、时、分等来滚动日志文件，对应的格式如下：
 
        * 1)'.'yyyy-MM：每月
        * 2)'.'yyyy-ww：每周
        * 3)'.'yyyy-MM-dd：每天
        * 4)'.'yyyy-MM-dd-a：每天两次
        * 5)'.'yyyy-MM-dd-HH：每小时
        * 6)'.'yyyy-MM-dd-HH-mm：每分钟

* (4)RollingFileAppender选项：
    - Threshold=WARN：指定日志信息的最低输出级别，默认为DEBUG。
    - ImmediateFlush=true：表示所有消息都会被立即输出，设为false则不输出，默认值是true。
    - Append=false：true表示消息增加到指定文件中，false则将消息覆盖指定的文件内容，默认值是true。
    - File=D:/logs/logging.log4j：指定消息输出到logging.log4j文件中。
    - MaxFileSize=100KB：后缀可以是KB, MB 或者GB。在日志文件到达该大小时，将会自动滚动，即将原来的内容移到logging.log4j.1文件中。
    - MaxBackupIndex=2：指定可以产生的滚动文件的最大数，例如，设为2则可以产生logging.log4j.1，logging.log4j.2两个滚动文件和一个logging.log4j文件。

### 3、配置日志信息的输出格式（Layout）：
Layout：日志输出格式，Log4j提供的layout有以下几种：

- org.apache.log4j.HTMLLayout（以HTML表格形式布局），
- org.apache.log4j.PatternLayout（可以灵活地指定布局模式），
- org.apache.log4j.SimpleLayout（包含日志信息的级别和信息字符串），
- org.apache.log4j.TTCCLayout（包含日志产生的时间、线程、类别等等信息）

### 4、格式化符号说明：

- %p：输出日志信息的优先级，即DEBUG，INFO，WARN，ERROR，FATAL。
- %d：输出日志时间点的日期或时间，默认格式为ISO8601，也可以在其后指定格式，如：%d{yyyy/MM/dd HH:mm:ss,SSS}。
- %r：输出自应用程序启动到输出该log信息耗费的毫秒数。
- %t：输出产生该日志事件的线程名。
- %l：输出日志事件的发生位置，相当于%c.%M(%F:%L)的组合，包括类全名、方法、文件名以及在代码中的行数。例如：test.TestLog4j.main(TestLog4j.java:10)。
- %c：输出日志信息所属的类目，通常就是所在类的全名。
- %M：输出产生日志信息的方法名。
- %F：输出日志消息产生时所在的文件名称。
- %L:：输出代码中的行号。
- %m:：输出代码中指定的具体日志信息。
- %n：输出一个回车换行符，Windows平台为"rn"，Unix平台为"n"。
- %x：输出和当前线程相关联的NDC(嵌套诊断环境)，尤其用到像java servlets这样的多客户多线程的应用中。
- %%：输出一个"%"字符。

另外，还可以在%与格式字符之间加上修饰符来控制其最小长度、最大长度、和文本的对齐方式。如：

- 1) c：指定输出category的名称，最小的长度是20，如果category的名称长度小于20的话，默认的情况下右对齐。
- 2)%-20c："-"号表示左对齐。
- 3)%.30c：指定输出category的名称，最大的长度是30，如果category的名称长度大于30的话，就会将左边多出的字符截掉，但小于30的话也不会补空格。

***

### 在代码中初始化Logger: 
1）在程序中调用BasicConfigurator.configure()方法：给根记录器增加一个ConsoleAppender，输出格式通过PatternLayout设为"%-4r [%t] %-5p %c %x - %m%n"，还有根记录器的默认级别是Level.DEBUG. 
2）配置放在文件里，通过命令行参数传递文件名字，通过PropertyConfigurator.configure(args[x])解析并配置；
3）配置放在文件里，通过环境变量传递文件名等信息，利用log4j默认的初始化过程解析并配置；
4）配置放在文件里，通过应用服务器配置传递文件名等信息，利用一个特殊的servlet来完成配置。

### 为不同的 Appender 设置日志输出级别：
当调试系统时，我们往往注意的只是异常级别的日志输出，但是通常所有级别的输出都是放在一个文件里的，如果日志输出的级别是BUG！？那就慢慢去找吧。
这时我们也许会想要是能把异常信息单独输出到一个文件里该多好啊。当然可以，Log4j已经提供了这样的功能，我们只需要在配置中修改Appender的Threshold 就能实现,比如下面的例子：

## Log4j的一些常用配置示例

```
log4j.rootLogger=info,console,mail,database,file
#控制台打印
log4j.appender.console=org.apache.log4j.ConsoleAppender
log4j.appender.console.Threshold=debug
log4j.appender.console.layout=org.apache.log4j.PatternLayout
log4j.appender.console.layout.ConversionPattern=%d - %c -%-4r [%t] %-5p %c %x - %m%n
 
#发送邮件
log4j.appender.mail=org.apache.log4j.net.SMTPAppender
log4j.appender.mail.Threshold=FATAL
log4j.appender.mail.BufferSize=10
log4j.appender.mail.From=atlantisholic@163.com
log4j.appender.mail.SMTPHost=smtp.163.com
log4j.appender.mail.SMTPUsername=username
log4j.appender.mail.SMTPPassword=password
log4j.appender.mail.Subject=TT
log4j.appender.mail.To=603470086@qq.com
log4j.appender.mail.layout=org.apache.log4j.PatternLayout
log4j.appender.mail.layout.ConversionPattern=%d - %c -%-4r [%t] %-5p %c %x - %m%n
 
#数据库存储
log4j.appender.database=org.apache.log4j.jdbc.JDBCAppender
log4j.appender.database.URL=jdbc:mysql://localhost:3306/test
log4j.appender.database.driver=com.mysql.jdbc.Driver
log4j.appender.database.Threshold=info
log4j.appender.database.user=root
log4j.appender.database.password=123456
log4j.appender.database.sql=INSERT INTO LOG4J (Message) VALUES ('[framework] %d - %c -%-4r [%t] %-5p %c %x - %m%n')
log4j.appender.database.layout=org.apache.log4j.PatternLayout
log4j.appender.database.layout.ConversionPattern=%d - %c -%-4r [%t] %-5p %c %x - %m%n
 
#文件存储
log4j.appender.file=org.apache.log4j.RollingFileAppender
log4j.appender.file.Threshold=ERROR
log4j.appender.file.File=file.log
log4j.appender.file.Append=true
log4j.appender.file.MaxFileSize=1MB
log4j.appender.file.MaxBackupIndex=1
log4j.appender.file.layout=org.apache.log4j.PatternLayout
log4j.appender.file.layout.ConversionPattern=%d - %c -%-4r [%t] %-5p %c %x - %m%n
 
#设置特定名称下的日志级别，覆盖root的设置
log4j.logger.com.holic.log4j=debug
```


### 配合SLF4J使用
### 性能优化

### 配置文件位置
CLASSPATH

或者在IDEA中添加运行参数    
-Dlog4j.configuration=file:/E:\bang\code\duck\flight-duck\flight-duck-port\src\main\resources\log4j.properties 

## 参考：
- [http://www.cnblogs.com/ITtangtang/p/3926665.html](http://www.cnblogs.com/ITtangtang/p/3926665.html)
- [http://www.oschina.net/code/snippet_116183_12059](http://www.oschina.net/code/snippet_116183_12059)
