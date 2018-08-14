# Netty实战
> landon  
> 资深网络游戏服务器架构师

---

## UNIX网络编程5种I/O模型
![](https://i.imgur.com/DwfvqO7.png)

---

## I/O复用
* I/O 多路复用技术通过把多个I/O的阻塞复用到同一个select的阻塞上，从而使得系统在单线程的情况下可以同时处理多个客户端请求
	- 这里进程是被select阻塞但不是被socket io阻塞
* Select vs Epoll（Linux）
	- process fd、I/O efficiency、mmap、api
* Reactor vs Proactor
	- Dispatcher/Notifier/Hollywood principle、异步I/O
* java Nio vs Nio2
	- Linux 2.6 kernal epoll、通过epoll模拟异步
* Netty Native Transports
	- Since 4.0.16, Netty provides the native socket transport for Linux using JNI. This transport has higher performance and produces less garbage
	- Netty's epoll transport uses epoll edge-triggered while java's nio library uses level-triggered. Beside this the epoll transport expose configuration options that are not present with java's nio like TCP_CORK, SO_REUSEADDR and more.

---

## Java I/O类库的发展和改进
* BIO
* BIO-Improved
* NIO
* AIO
* 不选择Java原生NIO编程的原因
	+ epoll bug,导致Selector空轮询，最终导致CPU100%
	+ 需要做很多额外工作才能网络层的稳定性
* 区分I/O模型中的同步/异步和并发编程中的同步/异步(线程阻塞和非阻塞)
	- 同步I/O:需要进程去真正的去操作I/O
	- 异步I/O:内核在I/O操作完成后再通知应用进程操作结果
* 线程阻塞会占用CPU吗
	+ 不会、在I/O密集型的程序，采用并发方式可以提高CPU的使用率

---

## Netty入门#server
![](https://i.imgur.com/jg7RQoz.jpg)

---

## Netty入门#client
![](https://imgur.com/v0jr271.jpg)

---

## Netty#thread model
![](https://imgur.com/lxxORcP.jpg)

---

## Netty#ChannelPipeline
![](https://imgur.com/Eb9LEXH.jpg)

---

## 服务端、客户端创建
+ Builder模式
+ Reactor线程池(EventLoopGroup)/Boss-Worker/Acceptor-I/O Processor
+ 每一个NioEventLoop持有一个Selector/一个端口对应一个boss线程
+ ChannelPipeline
	+ Head、Tail
	+ 父类中的handler是添加到ServerSocketChannel的pipeline的，这个handler在server启动后就行执行，如LoggingHandler
	+ 子类的handler是添加导SocketChannel的pipeline的
+ DefaultEventExecutorChooserFactory-单线程
+ NioEventLoop#run
	- 包括非I/O任务
+ 时间轮/IO执行比例

---

## TCP参数
* ChannelOption(区分ServerSocketChannel/SocketChannel)
	+ SO_REUSEADDR、SO_TIMEOUT
	+ TCP_NODELAY、SO_LINGER
	+ SO_SNDBUF、SO_RCVBUF
	+ CONNECT_TIMEOUT_MILLIS
	+ SO_BACKLOG
* SO_BACKLOG
	+ backlog指定了内核为此套接口排队的最大连接个数，对于给定的监听套接口，内核要维护两个队列：未链接队列和已连接队列
	+ 和tcp建立链接的三次握手相关
	+ backlog被规定为两个队列总和的最大值
	+ 长链接项目要注意此值大小

---

## TCP粘包/拆包问题的解决之道
* TCP是基于字节流的，只维护发送出去多少，确认了多少，并没有维护消息与消息之间的边界
* 粘包/拆包
	- 应用程序写入的数据大于套接字缓冲区大小，这将会发生拆包
	- 应用程序写入数据小于套接字缓冲区大小，网卡将应用多次写入的数据发送到网络上，这将会发生粘包
	- 进行MSS（最大报文长度）大小的TCP分段，当TCP报文长度-TCP头部长度>MSS的时候将发生拆包
	- 接收方法不及时读取套接字缓冲区数据，这将发生粘包
* 大压力测试/发送大报文
* 解决方案
	+ 消息定长、消息边界
	+ 消息头+消息体，消息头中包含表示消息总长度（或者消息体长度）的字段

---

## Netty常用编解码器
+ LineBasedFrameDecoder 
	- 回车换行解码器
	- 配合StringDecoder
+ DelimiterBasedFrameDecoder 
	- 分隔符解码器
+ FixedLengthFrameDecoder 
	- 固定长度解码器
+ LengthFieldBasedFrameDecoder 
	- 基于'长度'解码器(私有协议最常用)
+ ByteToMessageDecoder 
	- 自解析
+ LengthFieldPrepender
	- 编码器

---

## 一个自解析的例子
![](https://imgur.com/aTIavaS.jpg)

---

## LengthFieldBasedFrameDecoder
* lengthFieldOffset
	- the offset of the length field
* lengthFieldLength
	- the length of the length field
* lengthAdjustment
	- the compensation value to add to the value of the length field
* initialBytesToStrip
	- the number of first bytes to strip out from the

---

## LengthFieldBasedFrameDecoder#例子1
![](https://imgur.com/R1wEQYl.jpg)

---

## LengthFieldBasedFrameDecoder#例子2
![](https://imgur.com/a1vRMUI.jpg)

---

## LengthFieldBasedFrameDecoder#解码
+ 根据lengthFieldOffset的字节数目，找到lengthField
+ 然后根据lengthFieldLength，读出长度
+ 这个长度可能是消息体的长度，也可能是消息头+消息体的长度
+ 所以实际消息体的长度是content(lengthFieldLength) + lengthAdjustment
+ initialBytesToStrip则表示从frame中移除的起始字节长度
+ 即协议均是消息头+消息体,消息头中必须有一个Length字段,Length后面的是实际的消息体
+ 实际分析的时候需要看Length的值具体是神马长度
* 举例某私有协议格式:dataLen(2 byte) + type(1 byte) + reserved(1 byte) + data 其中dataLen为消息体的长度;如果用netty的LengthFieldBasedFrameDecoder就很简单了.

---

## 自解码思路1
* ![](https://imgur.com/04Up2ss.jpg)
* mark、reset

---

## 自解码思路2
* ![](https://imgur.com/uCPM3F4.jpg)
* prefixLength传入2,避免了指针移动

---

## 协议
* Json
* Protobuf
	- Protocol buffers are an efficient binary serialization format, not a compressor
	- If you need to reduce the size, you could either gzip the data or use an application-level dictionary to substitute large strings with something smaller
	- snappy
* Thrift
* Msgpack
* 跨语言
* 内置了protobuf的编解码器

---

## 协议栈
* http
	+ 已提供了基础的HttpServerCodec、加上业务相关的数据编解码器即可
* websocket
	+ 握手走http、提供了websocketx相关支持
* 私有协议
	+ 定义私有协议格式(消息头+消息体)、消息头可扩展
	+ 编解码,MessageToByteEncoder/LengthFieldBasedFrameDecoder
	+ 握手/心跳/业务 握手成功后，定时器用于定期发送心跳消息
	+ 直接利用Netty的 ReadTimeoutHandler机制实现心跳超时
	+ 消息缓存重发-提供通知机制，将发送失败的消息通知给业务层
	+ 断线重连、重复登录保护、安全机制
	+ Handler Chain的机制可以方便地实现切面拦截和定制-扩展性

---

## API接口1
* ByteBuf
	+ HeapByteBuf
	+ DirectByteBuf
	+ ByteBuf的最佳实践是在I/O通信线程的读写缓冲区使用DirectByteBuf, 后端业务消息的编解码模块使用HeapByteBuf, 这样组合可以达到性能最优
	+ PooledByteBuf
* Channel、Unsafe
	+ ChannelOutboundBuffer#环形数组
	+ 实际的I/O读写操作都是由Unsafe接口负责完成的
* ChannelPipeline、ChannelHandler
	+ 过滤器
	+ inbound事件-通常由I/O 线程触发
	+ Outbound事件-通常是由用户主动发起的网络I/O操作

---

## API接口2
* EventLoop、EventLoopGroup
	+ 如果业务逻辑处理复杂，不要在NIO线程上完成
	+ NioEventLoop它除了负责I/O的读写之外,还负责运行很多系统task/定时任务(局部无锁化)
	+ NioEventLoop需要处理网络I/O读写事件，因此它必须聚合一个多路复用器对象(Selector)
	+ rebuildSelector
	+ setIoRatio
* Future、Promise
	+ 通过添加监听器的方式获取I/O操作结果
	+ checkDeadLock-不要在在I/O线程中调用Promise的await或者sync方法会导致死锁

---

## Netty架构剖析
* 高性能之道
	+ Reactor通信调度层
	+ 职责链ChannelPipeline
	+ 业务逻辑编排层（Service ChannelHandler)
	+ 高性能/可靠性/可定制/可扩展
	+ 传输、协议、线程
* 鸣谢
	+ 李林锋
	+ 占小狼
	+ 江南白衣
* 彩蛋
	+ TIME_WAIT、CLOSE_WAIT