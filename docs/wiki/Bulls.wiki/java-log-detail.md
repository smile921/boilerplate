## 关于Java log库、console、stdout、stderr、nohup.out之间的关系

### 为什么讨论这个问题
+ 因为项目会引用一些第三方库,而第三方库本身会用一些log库，而这些log库可能不是slf4j,如jedis用的是jul(java.util.logging)
+ 而实际线上部署的比如会用nohup会将console的输出包括stdout/stderr都会给清空(重定向到/dev/null),这样对于第三方库的控制台输出就看不到日志了
+ 如果第三方库用了slf4j,那么我们就可以通过logback配置第三方的logger输出了
+ 即不同的脚本启动等会影响三方日志的输出，有可能会吞掉第三方非slf4j的控制台日志

### 相互之间的关系
1. console
    * 控制台，可标准输入(stdin)，标准输出(stdout)，标准错误(stderr)
2. Java log库和标准输出，标准错误的关系
    * Java的标准输出是System.out,标准错误是System.err
    * 都会输出到控制台(Eclipse控制台标准输出是正常颜色，标准错误是红色)
    * logback
        + 通常logback.xml都会配置一个ConsoleAppender，即控制台输出源
        + ch.qos.logback.core.ConsoleAppender
        + protected ConsoleTarget target = ConsoleTarget.SystemOut
        + 可以看到logback的控制台输出源是System.out,即标准输出
        + 这个也解释了比如我们在eclipse运行项目的时候，eclipse的控制台会标准输出logback所有的日志输出,因为其配置了ConsoleAppender,即相当于用System.out输出
    * jul
        + jul默认的输出源是ConsoleHandler
        + java.util.logging.ConsoleHandler
        + setOutputStream(System.err)
        + 可以看到jul的控制台输出源是System.err,即标准错误
        + 这个也解释了为什么我们用jul的log进行输出的时候，eclipse控制台输出的都是红色，所以是标准错误
3. 关于nohup.out
    * 实际项目在操作过程中,通常会用nohup启动程序
    * 默认nohup会将控制的标准输出和标准错误都会被重定向到nohup.out
    * 而我们项目如用logback,其配置了ConsoleAppender，即相当于所有的logback输出都会被重定向到nohup.out(当然可以配置logger等级来减少输出);包括如第三方库用到的日志库jul，其控制台输出源是标准错误，也会被重定向到nohup.out
    * 这样nohup.out会越来越大
    * 注:nohup通常结合&,程序后台运行，所以不会有标准输入的问题
    * 如何解决nohup.out过大问题
        + >/dev/null 2>&1 &
        + 这种方式是将标准输出和标准错误全部重定向到/dev/null,即什么信息都不输出，也不会生成nohup.out
        + >/dev/null 2>nohup_err.log &
        + 这种方式是只将标准错误重定向到指定的文件中
    * 目前线上是用第一种方式,原因如下
        + 目前项目中所有日志的输出，都走logback, 会配置xxFileAppender,即输出到文件中，所以nohup.out中的控制台的相关输出确实可以都不要
        + 另外线上的logback.xml通常可以关闭掉ConsoleAppender
        + 但是这种方式有一种问题就是第三方的非slf4j的日志输出会丢失,有一些可能的错误输出等.那么如果采用第二种方式呢，将标准错误保留呢？也有问题，因为有的日志库的输出全部是system.err,即如果三方库调用很频繁或者日志很大，那么也可能会导致nohup相关日志很大

### 总结1
* 对于标准输出和标准错误的重定向完全要看日志库的console输出流实现方式是什么
* 对于第三方库的日志是否需要输出
    - 个人建议第一步确认是否是slf4j实现，如果是，那么可以自己控制输出
    - 如果不是 那么建议在上线前，即开发环境下保留nohup.out，即保留所有的控制台输出（包括第三方输出和项目输出）然后可以去看一下是否有第三方库自己的异常产生等
    - 当然这个仅是个人保留意见 值得商榷 因为实际上好的第三方库第一基本是用slf4j的，第二是即使他出现了异常，通常自己记录日志，也会继续向上抛出到项目层的
    - 所以第三方的库日志其实无所谓
### 总结2
* 回归到一个实际案例，项目中对于引用的jedis库，其用到了jul,其启动的时候可能会抛出一个异常，其用jul记录了，默认输出到了控制台（stderr）
* 如果我们nohup启动的时候将stdout和stderr全部重定向/dev/null,那么关于jedis的这个日志我们是无法看到的
* 所以正因为如jedis#jul的控制台输出是stderr,我们可以nohup启动的时候只重定向stderr到一个日志文件，只要我们就可以在这个日志文件看到如jedis的输出了

### 总结3
* 如果上面说的两种方式都不想用，那么可以引入第三方库
* jul-to-slf4j
* sysout-over-slf4j
* 这两个第三方库可以引入后增加一些代码可以实现to slf4j

### 总结4 
* 关于e.printstacktrace
* printStackTrace(System.err)
* 该方法是标准错误，很多人可能习惯这样输出异常，但是线上项目千万不要
* 因为如之前说的，这种标准错误会被重定向清空的
* 所以一定要用slf4j记录日志异常
* 需要检查项目代码，是否有类似的代码
* 同理System.out的代码也不能有