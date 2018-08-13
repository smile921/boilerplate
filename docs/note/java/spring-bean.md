# Spring Bean

Spring依赖注入Bean实例默认是单例的，我们由此展开。

Spring的依赖注入（包括lazy-init方式）都是发生在AbstractBeanFactory的getBean里。getBean的doGetBean方法调用getSingleton进行bean的创建。lazy-init方式，在容器初始化时候进行调用，非lazy-init方式，在用户向容器第一次索要bean时进行调用

```java

/**
     * Return the (raw) singleton object registered under the given name.
     * <p>Checks already instantiated singletons and also allows for an early
     * reference to a currently created singleton (resolving a circular reference).
     * @param beanName the name of the bean to look for
     * @param allowEarlyReference whether early references should be created or not
     * @return the registered singleton object, or {@code null} if none found
     */
    protected Object getSingleton(String beanName, boolean allowEarlyReference) {
        Object singletonObject = this.singletonObjects.get(beanName);
        if (singletonObject == null && isSingletonCurrentlyInCreation(beanName)) {
            synchronized (this.singletonObjects) {
                singletonObject = this.earlySingletonObjects.get(beanName);
                if (singletonObject == null && allowEarlyReference) {
                    ObjectFactory<?> singletonFactory = this.singletonFactories.get(beanName);
                    if (singletonFactory != null) {
                        singletonObject = singletonFactory.getObject();
                        this.earlySingletonObjects.put(beanName, singletonObject);
                        this.singletonFactories.remove(beanName);
                    }
                }
            }
        }
        return (singletonObject != NULL_OBJECT ? singletonObject : null);
    }
```
## spring 概述

Spring框架是一个轻量级的解决方案，可以一站式地构建企业级应用。Spring是模块化的，所以可以只使用其中需要的部分。可以在任何web框架上使用控制反转（IoC），也可以只使用Hibernate集成代码或JDBC抽象层。它支持声明式事务管理、通过RMI或web服务实现远程访问，并可以使用多种方式持久化数据。它提供了功能全面的MVC框架，可以透明地集成AOP到软件中。

Spring被设计为非侵入式的，这意味着你的域逻辑代码通常不会依赖于框架本身。在集成层（比如数据访问层），会存在一些依赖同时依赖于数据访问技术和Spring，但是这些依赖可以很容易地从代码库中分离出来。

Spring可以使用POJO（普通的Java对象，plain old java objects）创建应用，并且可以将企业服务非侵入式地应用到POJO。这项功能适用于Java SE编程模型以及全部或部分的Java EE。

那么，做为开发者可以从Spring获得哪些好处呢？

* 不用关心事务API就可以执行数据库事务；
* 不用关心远程API就可以使用远程操作；
* 不用关心JMX API就可以进行管理操作；
* 不用关心JMS API就可以进行消息处理。
> 译者注：①JMX，Java Management eXtension，Java管理扩展，是一个为应用程序、设备、系统等植入管理功能的框架。JMX可以跨越一系列异构操作系统平台、系统体系结构和网络传输协议，灵活的开发无缝集成的系统、网络和服务管理应用。②JMS，Java Message Service，Java消息服务，是Java平台上有关面向消息中间件(MOM)的技术规范，它便于消息系统中的Java应用程序进行消息交换,并且通过提供标准的产生、发送、接收消息的接口简化企业应用的开发。

###  依赖注入（DI）和控制反转（IoC）

一个Java应用程序，从受限制的嵌入式应用到n层的服务端应用，典型地是由相互合作的对象组成的，因此，一个应用程序中的对象是相互依赖的。

Java平台虽然提供了丰富的应用开发功能，但是它并没有把这些基础构建模块组织成连续的整体，而是把这项任务留给了架构师和开发者。你可以使用设计模式，比如工厂模式、抽象工厂模式、创建者模式、装饰者模式以及服务定位器模式等，来构建各种各样的类和对象实例，从而组成整个应用程序。这些设计模式是很简单的，关键在于它们根据最佳实践起了很好的名字，它们的名字可以很好地描述它们是干什么的、用于什么地方、解决什么问题，等等。这些设计模式都是最佳实践的结晶，所以你应该在你的应用程序中使用它们。

Spring的控制反转解决了上述问题，它提供了一种正式的解决方案，你可以把不相干组件组合在一起，从而组成一个完整的可以使用的应用。Spring根据设计模式编码出了非常优秀的代码，所以可以直接集成到自己的应用中。因此，大量的组织机构都使用Spring来保证应用程序的健壮性和可维护性。

### spring 模块

Spring大约包含了20个模块，这些模块组成了核心容器（Core Container）、数据访问/集成（Data Access/Integration）、Web、AOP（面向切面编程，Aspect Oriented Programming）、Instrumentation、消息处理（Messaging）和测试（Test），
![spring-runtime](/note/java/spring-runtime.png)

#### 核心容器（Core Container）
核心容器包括spring-core，spring-beans，spring-context，spring-context-support和spring-expression（SpEL，Spring表达式语言，Spring Expression Language）等模块。

spring-core和spring-beans模块是Spring框架的基础，包括控制反转和依赖注入等功能。BeanFactory是工厂模式的微妙实现，它移除了编码式单例的需要，并且可以把配置和依赖从实际编码逻辑中解耦。

Context（spring-context）模块是在Core和Bean模块的基础上建立起来的，它以一种类似于JNDI注册的方式访问对象。Context模块继承自Bean模块，并且添加了国际化（比如，使用资源束）、事件传播、资源加载和透明地创建上下文（比如，通过Servelet容器）等功能。Context模块也支持Java EE的功能，比如EJB、JMX和远程调用等。ApplicationContext接口是Context模块的焦点。spring-context-support提供了对第三方库集成到Spring上下文的支持，比如缓存（EhCache, Guava, JCache）、邮件（JavaMail）、调度（CommonJ, Quartz）、模板引擎（FreeMarker, JasperReports, Velocity）等。

spring-expression模块提供了强大的表达式语言用于在运行时查询和操作对象图。它是JSP2.1规范中定义的统一表达式语言的扩展，支持set和get属性值、属性赋值、方法调用、访问数组集合及索引的内容、逻辑算术运算、命名变量、通过名字从Spring IoC容器检索对象，还支持列表的投影、选择以及聚合等。

#### AOP和检测（Instrumentation）
spring-aop模块提供了面向切面编程（AOP）的实现，可以定义诸如方法拦截器和切入点等，从而使实现功能的代码彻底的解耦出来。使用源码级的元数据，可以用类似于.Net属性的方式合并行为信息到代码中。

spring-aspects模块提供了对AspectJ的集成。

spring-instrument模块提供了对检测类的支持和用于特定的应用服务器的类加载器的实现。spring-instrument-tomcat模块包含了用于tomcat的Spring检测代理。

#### 消息处理（messaging）
Spring 4 包含的spring-messaging模块是从Spring集成项目的关键抽象中提取出来的，这些项目包括Message、MessageChannel、MessageHandler和其它服务于消息处理的项目。这个模块也包含一系列的注解用于映射消息到方法，这类似于Spring MVC基于编码模型的注解。

#### 数据访问与集成
数据访问与集成层包含JDBC、ORM、OXM、JMS和事务模块。
（译者注：JDBC=Java Data Base Connectivity，ORM=Object Relational Mapping，OXM=Object XML Mapping，JMS=Java Message Service）

spring-jdbc模块提供了JDBC抽象层，它消除了冗长的JDBC编码和对数据库供应商特定错误代码的解析。

spring-tx模块支持编程式事务和声明式事务，可用于实现了特定接口的类和所有的POJO对象。
（译者注：编程式事务需要自己写beginTransaction()、commit()、rollback()等事务管理方法，声明式事务是通过注解或配置由spring自动处理，编程式事务粒度更细）

spring-orm模块提供了对流行的对象关系映射API的集成，包括JPA、JDO和Hibernate等。通过此模块可以让这些ORM框架和spring的其它功能整合，比如前面提及的事务管理。

spring-oxm模块提供了对OXM实现的支持，比如JAXB、Castor、XML Beans、JiBX、XStream等。

spring-jms模块包含生产（produce）和消费（consume）消息的功能。从Spring 4.1开始，集成了spring-messaging模块。

#### Web
Web层包括spring-web、spring-webmvc、spring-websocket、spring-webmvc-portlet等模块。

spring-web模块提供面向web的基本功能和面向web的应用上下文，比如多部分（multipart）文件上传功能、使用Servlet监听器初始化IoC容器等。它还包括HTTP客户端以及Spring远程调用中与web相关的部分。

spring-webmvc模块（即Web-Servlet模块）为web应用提供了模型视图控制（MVC）和REST Web服务的实现。Spring的MVC框架可以使领域模型代码和web表单完全地分离，且可以与Spring框架的其它所有功能进行集成。

spring-webmvc-portlet模块（即Web-Portlet模块）提供了用于Portlet环境的MVC实现，并反映了spring-webmvc模块的功能。

#### Test
spring-test模块通过JUnit和TestNG组件支持单元测试和集成测试。它提供了一致性地加载和缓存Spring上下文，也提供了用于单独测试代码的模拟对象（mock object）。

####  Groovy Bean定义DSL
从Spring 4.0开始，可以使用Groovy DSL定义外部bean了。在概念上，这与使用XML配置bean类似，但是可以使用更简洁的语法。使用Groovy还可以很容易地把bean定义直接嵌入到引导代码中。例如：

```` groovy

def reader = new GroovyBeanDefinitionReader(myApplicationContext)
reader.beans {
    dataSource(BasicDataSource) {
        driverClassName = "org.hsqldb.jdbcDriver"
        url = "jdbc:hsqldb:mem:grailsDB"
        username = "sa"
        password = ""
        settings = [mynew:"setting"]
    }
    sessionFactory(SessionFactory) {
        dataSource = dataSource
    }
    myService(MyService) {
        nestedBean = { AnotherBean bean ->
            dataSource = dataSource
        }
    }
}
````
