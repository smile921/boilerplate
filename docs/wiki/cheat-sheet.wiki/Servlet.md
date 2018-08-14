## 简介
Servlet（Server Applet），全称Java Servlet，未有中文译文。是用Java编写的服务器端程序。其主要功能在于交互式地浏览和修改数据，生成动态Web内容。狭义的Servlet是指Java语言实现的一个接口，广义的Servlet是指任何实现了这个Servlet接口的类，一般情况下，人们将Servlet理解为后者。

Servlet运行于支持Java的应用服务器中。从实现上讲，Servlet可以响应任何类型的请求，但绝大多数情况下Servlet只用来扩展基于HTTP协议的Web服务器。

最早支持Servlet标准的是JavaSoft的Java Web Server。此后，一些其它的基于Java的Web服务器开始支持标准的Servlet。

## 官方文档
- [Servlet](https://java.net/projects/servlet-spec/)
- [Servlet 4](https://jcp.org/en/jsr/detail?id=369)
- [Servlet 3](https://jcp.org/en/jsr/detail?id=315)

## Servlet 规范&文档
JavaEE 当前版本是7，正在进行8版本的开发。Servlet 是Java EE下的框架，不再JavaSE中。 

- [Java EE 7 API文档](https://docs.oracle.com/javaee/7/api/toc.htm)
- [JSR 366: Java Platform, Enterprise Edition 8 (Java EE 8) Specification](https://jcp.org/en/jsr/detail?id=366)

## 项目使用   

目前项目中使用的是3.1.0版本
```
<dependency>
    <groupId>javax.servlet</groupId>
    <artifactId>javax.servlet-api</artifactId>
    <version>3.1.0</version>
</dependency>
```

## 重要概念和类
核心概念
* Servlet 
* Filter 

常用类：
* HttpServlet
* ServetConfig
* ServletContext
* Filter
* FilterConfig
* FilterChain
* RequestDispatcher
* HttpServletRequest
* HttpServletResponse
* HttpSession
* 一些 Listenser 类

## Servlet 配置文件
Java Web 项目还需要一个非常重要的配置文件 web.xml ，每个 servlet 都必须在 web.xml 中定义并进行 URL 映射配置.

> [配置文件元素详解](https://github.com/upan/cheat-sheet/wiki/web-xml-config)

加载顺序： *content-param --> listener --> filter --> servlet*
，通过查看3.0版本的xsd可以看到大概有以下一级节点：

- context-param
    - param-name
    - param-value
- filter
    - filter-name
    - filter-class ：The fully qualified classname of the filter
    - async-supported
    - init-param
         - param-name
         - param-value
- filter-mapping
    - filter-name
    - url-pattern
    - dispatcher
- listener
- servlet
  - servlet-name
  - servlet-class
  - jsp-file
  - init-param
  - load-on-startup
- servlet-mapping
  - servlet-name
  - url-pattern
- session-config
- mime-mapping
- welcome-file-list
- error-page
- jsp-config
- security-constraint
- login-config
- security-role
- message-destination
- locale-encoding-mapping-list

，配置示例
```
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://java.sun.com/xml/ns/javaee" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_3_0.xsd"
         version="3.0">
<web-app>
    <filter>
        <filter-name>helloFilter</filter-name>
        <filter-class>demo.HelloFilter</filter-class>
    </filter>
 
    <filter-mapping>
        <filter-name>helloFilter</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>
     
    <servlet>
        <servlet-name>hello_world</servlet-name>
        <servlet-class>demo.HelloServlet</servlet-class>
        <load-on-startup>1</load-on-startup>
    </servlet>
 
    <servlet-mapping>
        <servlet-name>hello_world</servlet-name>
        <url-pattern>/hello</url-pattern>
    </servlet-mapping>
 
</web-app>
```



### 参考
- [Java Servlet完全教程](http://www.importnew.com/14621.html)
- [Servlet 工作原理解析](https://www.ibm.com/developerworks/cn/java/j-lo-servlet/)
- [Servlet 3.0 介绍](http://www.oschina.net/question/12_8793)
- [Servlet 4.0 草案](http://www.oschina.net/news/54158/servlet_4_0)
- [Servlet的历史与规范](http://blog.csdn.net/u010297957/article/details/51498018)
- [红薯:初学 Java Web 开发，请远离各种框架，从 Servlet 开发](http://www.oschina.net/question/12_52027?sort=default&p=2#)
- [Servlet 3.0 新特性详解](http://www.ibm.com/developerworks/cn/java/j-lo-servlet30/)  
- [JSR-000315 Java Servlet 3.0 规范](http://jcp.org/aboutJava/communityprocess/final/jsr315/index.html)
- [Web.xml详解](http://blog.csdn.net/believejava/article/details/43229361)


