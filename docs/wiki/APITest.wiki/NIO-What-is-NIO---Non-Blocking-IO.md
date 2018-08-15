与Socket及ServerSocket对应，NIO也提供了SocketChannel和ServerSocketChannel两种不同的套接字通道实现。
这两种通道支持阻塞和非阻塞两种模式。

对于高负载，高并发的网络应用，需要使用NIO的非阻塞模式进行开发。

**NIO关键概念**
1：缓冲区buffer
Buffer是一个对象，包含一些要写入或者要读出的数据。 在NIO中，所有的数据都是用缓冲区处理的，读数据时，直接读到缓冲区，写数据时，写入到缓冲区。
缓冲区实质上是个数组，缓冲区提供了对数据的结构化访问以及维护读写位置等信息。最常用的缓冲区是ByteBuffer

2：通道Channel
可以通过通道读取和写入数据，通道和流的主要不同是通道是双向的，流只是在一个方向上移动。通道可以用于读，写，或者同时读写。
实际上，Channel可以分为两大类，用于网络读写的SelectableChannel和处理文件的FileChannel

3：多路复用器Selector
Java NIO编程的基础，多路复用器提供选择已经就绪的任务的能力，Selector会不断的轮询注册在其上的Channel，如果某个Channel上面有新的TCP链接接入，读和写事件，这个Channel就进入就绪状态，会被Selector轮询出来，然后通过SelectionKey可以获取就绪Channel的集合。
一个多路复用Selector可以同时轮询多个Channel，由于JDK使用了epoll代替传统的select实现，所有并没有最大连接句柄1024/2048的限制，意味着只要一个线程负责Selector的轮询，就可以接入上万的客户端。

**AIO**
NIO2.0引入了新的异步通道概念，
通过java.util.concurrent.Future类来表示异步操作的结果
在执行异步操作的时候传入一个java.nio.channels | CompletionHandler接口的实现类作为操作完成的回调。

NIO2.0的异步套接字通道是真正的异步非阻塞I/O， 对应Unix网络编程中的时间驱动I/O(AIO)，它不需要通过多路复用器(Selector)对注册的通道进行轮询既可实现异步读写，从而简化NIO的编程模型。

**Netty**
NioEventLoopGroup: 是个线程组，专门用来处理网络事件。
ServerBootstrap：用于启动NIO服务端的辅助启动类，目的是降低服务端的开发复杂度。
ChannelHandlerAdapter: 用于对网络事件进行读写操作

**分隔符和定长解码器**
TCP以流的方式进行数据传输，上层的应用协议为了对消息进行区分，采用以下4种方式：
1） 消息长度固定 - 累计读取长度总和为Len的报文后，认为读取到了一次完整的信息，计数器置位，重新读取下一报文
2） 将回车符作为消息结束符
3） 将特殊的分隔符作为消息的结束标志
4） 通过在消息头中定义长度字段来标识消息的总长度
Netty提供了4中解码器解决上面的问题
DelimiterBasedFrameDecoder ： 以分隔符做结束标志的消息的解码
FixLengthFrameDecoder： 完成对定长的消息的解码


**编解码技术**
Java序列化仅仅是Java编解码技术的一种，具有种种缺陷，于是衍生出了多种编解码技术和框架，下面介绍如何在Netty

在进行远程服务RPC时，很少直接使用Java序列化进行消息的编解码和传输，原因如下：
1） 无法跨语言 - Java序列化是Java语言内部的私有协议，其他语言不支持，对于Java序列化后的字节数组，别的语言无法进行反序列化。
2） 序列化后的码流太大 
3） 序列化性能太低 - 

业界主流的编解码框架
1） Google Protobuf - 结构化存储格式，高效的编解码性能，语言无关，支持java C++ python
2） Facebook Thrift - Thrift可以作为高性能的通信中间件使用，支持数据（对象）序列化和多种类型的RPC服务，适用于静态的数据交换，需要先确定它的数据结构，当数据结构发生变化时，必需重新编辑IDL文件，生成代码和编译，适用于大型数据交换及存储的通用工具。
Thrift由以下5部分组成-
1： 语言系统以及IDL编译器
2： TProtocol RPC的协议层，可以选择多种不同的对象序列化方式 如 Json和Binary
3： TTransport RPC的传输层，可以选择不同的传输层实现，如 socket， NIO， MemoryBuffer
4： TProcessor 作为协议层和用户提供的服务实现的纽带，负责调用服务实现的接口
5： TServer 聚合TProtocol，TTransport， TProcessor等对象

Thrift支持3种比较典型的编解码方式
1： 通用的二进制编解码
2： 压缩二进制编解码
3： 优化的可选字段压缩编解码

3）JBoss Marshalling
Java对象的序列化API包，修正了JDK自带的序列化包的很多问题，又保持跟java.io.serializable接口的兼容，
1：可插拔的类解析器
2：可插拔的对象替换技术
3：可插拔的预定义类缓存表
4：无需实现seriliazable接口，即可实现java序列化
5：通过缓存技术提升对象的序列化性能


**Java序列化**

**Netty HTTP**


**WebSocket**
WebSocket 特点
1. 单一的TCP连接，采用全双工模式通信
2. 对代理，防火墙，路由器透明
3. 无头部信息，Cookie和身份验证
4. 无安全开销
5. 通过 “ping/pong” 帧保持链路激活
6. 服务器可以主动传递消息给客户端，不需要客户端轮训

**UDP协议**
UDP不对数据包分组，组装，校验和排序，因此是不可靠的。

UDP数据报格式有首部和数据两个部分
首部包含8个字节，分别为
1） 源端口 2字节
2） 目的端口 2字节
3） 长度 2字节 UDP用户数据报的总长度
4） 校验和 2字节 
NioDatagramChannel, DatagramPacket, ChannelOption.SO_BROADCAST, 

**文件传输**
通过NIO提供的FileChannel可以方便的以管道方式对文件进行各种I/O操作。

AsynchronousFileChannel 支持异步非阻塞文件操作。
在实际项目中，文件传输通常采用FTP 或者 HTTP附件的方式. 事实上，通过TCP Socket+File 的方式进行文件传输

**私有协议栈**
