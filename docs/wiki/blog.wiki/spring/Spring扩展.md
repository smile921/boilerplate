## spring初始化流程

### DispatcherServlet入口初始化，加载DispatcherServlet.properties文件初始化默认策略

```properties
# Default implementation classes for DispatcherServlet's strategy interfaces.
# Used as fallback when no matching beans are found in the DispatcherServlet context.
# Not meant to be customized by application developers.

org.springframework.web.servlet.LocaleResolver=org.springframework.web.servlet.i18n.AcceptHeaderLocaleResolver

org.springframework.web.servlet.ThemeResolver=org.springframework.web.servlet.theme.FixedThemeResolver

org.springframework.web.servlet.HandlerMapping=org.springframework.web.servlet.handler.BeanNameUrlHandlerMapping,\
    org.springframework.web.servlet.mvc.annotation.DefaultAnnotationHandlerMapping

org.springframework.web.servlet.HandlerAdapter=org.springframework.web.servlet.mvc.HttpRequestHandlerAdapter,\
    org.springframework.web.servlet.mvc.SimpleControllerHandlerAdapter,\
    org.springframework.web.servlet.mvc.annotation.AnnotationMethodHandlerAdapter

org.springframework.web.servlet.HandlerExceptionResolver=org.springframework.web.servlet.mvc.annotation.AnnotationMethodHandlerExceptionResolver,\
    org.springframework.web.servlet.mvc.annotation.ResponseStatusExceptionResolver,\
    org.springframework.web.servlet.mvc.support.DefaultHandlerExceptionResolver

org.springframework.web.servlet.RequestToViewNameTranslator=org.springframework.web.servlet.view.DefaultRequestToViewNameTranslator

org.springframework.web.servlet.ViewResolver=org.springframework.web.servlet.view.InternalResourceViewResolver

org.springframework.web.servlet.FlashMapManager=org.springframework.web.servlet.support.SessionFlashMapManager
```

### 父类FrameworkServlet实例初始化

该步只做简单的初始化，变量赋值等

### 父类HttpServletBean实例初始化

该类是一个HttpServlet所以会初始化调用init()方法

```java
public final void init() throws ServletException {
    if (logger.isDebugEnabled()) {
        logger.debug("Initializing servlet '" + getServletName() + "'");
    }

    // Set bean properties from init parameters.
    try {
        PropertyValues pvs = new ServletConfigPropertyValues(getServletConfig(), this.requiredProperties);
        BeanWrapper bw = PropertyAccessorFactory.forBeanPropertyAccess(this);
        ResourceLoader resourceLoader = new ServletContextResourceLoader(getServletContext());
        bw.registerCustomEditor(Resource.class, new ResourceEditor(resourceLoader, getEnvironment()));
        initBeanWrapper(bw);
        bw.setPropertyValues(pvs, true);
    }
    catch (BeansException ex) {
        if (logger.isErrorEnabled()) {
            logger.error("Failed to set bean properties on servlet '" + getServletName() + "'", ex);
        }
        throw ex;
    }

    // Let subclasses do whatever initialization they like.
    initServletBean();

    if (logger.isDebugEnabled()) {
        logger.debug("Servlet '" + getServletName() + "' configured successfully");
    }
}
```

### 调用FrameworkServlet.initServletBean()方法

创建servlet的WebApplicationContext上下文容器

```java
protected final void initServletBean() throws ServletException {
    getServletContext().log("Initializing Spring FrameworkServlet '" + getServletName() + "'");
    if (this.logger.isInfoEnabled()) {
        this.logger.info("FrameworkServlet '" + getServletName() + "': initialization started");
    }
    long startTime = System.currentTimeMillis();

    try {
        this.webApplicationContext = initWebApplicationContext();
        initFrameworkServlet();
    }
    catch (ServletException ex) {
        this.logger.error("Context initialization failed", ex);
        throw ex;
    }
    catch (RuntimeException ex) {
        this.logger.error("Context initialization failed", ex);
        throw ex;
    }

    if (this.logger.isInfoEnabled()) {
        long elapsedTime = System.currentTimeMillis() - startTime;
        this.logger.info("FrameworkServlet '" + getServletName() + "': initialization completed in " +
                elapsedTime + " ms");
    }
}
```

### 调用FrameworkServlet.initWebApplicationContext()方法初始化和发布WebApplicationContext


### 调用FrameworkServlet.createWebApplicationContext()方法创建XmlWebApplicationContext

```java
protected WebApplicationContext createWebApplicationContext(ApplicationContext parent) {
    Class<?> contextClass = getContextClass();
    if (this.logger.isDebugEnabled()) {
        this.logger.debug("Servlet with name '" + getServletName() +
                "' will try to create custom WebApplicationContext context of class '" +
                contextClass.getName() + "'" + ", using parent context [" + parent + "]");
    }
    if (!ConfigurableWebApplicationContext.class.isAssignableFrom(contextClass)) {
        throw new ApplicationContextException(
                "Fatal initialization error in servlet with name '" + getServletName() +
                "': custom WebApplicationContext class [" + contextClass.getName() +
                "] is not of type ConfigurableWebApplicationContext");
    }
    ConfigurableWebApplicationContext wac =
            (ConfigurableWebApplicationContext) BeanUtils.instantiateClass(contextClass);

    wac.setEnvironment(getEnvironment());
    wac.setParent(parent);
    wac.setConfigLocation(getContextConfigLocation());

    configureAndRefreshWebApplicationContext(wac);

    return wac;
}
```

### 在调用configureAndRefreshWebApplicationContext()方法配置后，调用XmlWebApplicationContext的父类AbstractApplicationContext.refresh()方法开始正式初始化

```java
public void refresh() throws BeansException, IllegalStateException {
    synchronized (this.startupShutdownMonitor) {
        // Prepare this context for refreshing.
        //设置启动日期、激活标识和资源文件初始化
        prepareRefresh();

        // Tell the subclass to refresh the internal bean factory.
        //最重要的就是bean工厂的初始化
        ConfigurableListableBeanFactory beanFactory = obtainFreshBeanFactory();

        // Prepare the bean factory for use in this context.
        prepareBeanFactory(beanFactory);

        try {
            // Allows post-processing of the bean factory in context subclasses.
            postProcessBeanFactory(beanFactory);

            // Invoke factory processors registered as beans in the context.
            invokeBeanFactoryPostProcessors(beanFactory);

            // Register bean processors that intercept bean creation.
            registerBeanPostProcessors(beanFactory);

            // Initialize message source for this context.
            initMessageSource();

            // Initialize event multicaster for this context.
            initApplicationEventMulticaster();

            // Initialize other special beans in specific context subclasses.
            onRefresh();

            // Check for listener beans and register them.
            registerListeners();

            // Instantiate all remaining (non-lazy-init) singletons.
            finishBeanFactoryInitialization(beanFactory);

            // Last step: publish corresponding event.
            finishRefresh();
        }

        catch (BeansException ex) {
            if (logger.isWarnEnabled()) {
                logger.warn("Exception encountered during context initialization - " +
                        "cancelling refresh attempt: " + ex);
            }

            // Destroy already created singletons to avoid dangling resources.
            destroyBeans();

            // Reset 'active' flag.
            cancelRefresh(ex);

            // Propagate exception to caller.
            throw ex;
        }

        finally {
            // Reset common introspection caches in Spring's core, since we
            // might not ever need metadata for singleton beans anymore...
            resetCommonCaches();
        }
    }
}
```

### 在obtainFreshBeanFactory方法中调用AbstractRefreshableApplicationContext.refreshBeanFactory()方法

```java
protected final void refreshBeanFactory() throws BeansException {
    if (hasBeanFactory()) {
        destroyBeans();
        closeBeanFactory();
    }
    try {
        //创建DefaultListableBeanFactory工厂
        DefaultListableBeanFactory beanFactory = createBeanFactory();
        beanFactory.setSerializationId(getId());
        customizeBeanFactory(beanFactory);
        //加载bean定义
        loadBeanDefinitions(beanFactory);
        synchronized (this.beanFactoryMonitor) {
            this.beanFactory = beanFactory;
        }
    }
    catch (IOException ex) {
        throw new ApplicationContextException("I/O error parsing bean definition source for " + getDisplayName(), ex);
    }
}
```

### 具体在XmlWebApplicationContext中的loadBeanDefinitions()方法中加载bean定义

```java
protected void loadBeanDefinitions(DefaultListableBeanFactory beanFactory) throws BeansException, IOException {
    // Create a new XmlBeanDefinitionReader for the given BeanFactory.
    //创建一个Reader，具体是用Reader来解析加载bean定义的
    XmlBeanDefinitionReader beanDefinitionReader = new XmlBeanDefinitionReader(beanFactory);

    // Configure the bean definition reader with this context's
    // resource loading environment.
    beanDefinitionReader.setEnvironment(getEnvironment());
    beanDefinitionReader.setResourceLoader(this);
    beanDefinitionReader.setEntityResolver(new ResourceEntityResolver(this));

    // Allow a subclass to provide custom initialization of the reader,
    // then proceed with actually loading the bean definitions.
    initBeanDefinitionReader(beanDefinitionReader);
    //确定spring.xml配置文件的location,然后解析加载
    loadBeanDefinitions(beanDefinitionReader);
}
```

### 由XmlBeanDefinitionReader的父类AbstractBeanDefinitionReader.loadBeanDefinitions()方法读取xml文件解析

```java
public int loadBeanDefinitions(String location, Set<Resource> actualResources) throws BeanDefinitionStoreException {
    ResourceLoader resourceLoader = getResourceLoader();
    if (resourceLoader == null) {
        throw new BeanDefinitionStoreException(
                "Cannot import bean definitions from location [" + location + "]: no ResourceLoader available");
    }

    if (resourceLoader instanceof ResourcePatternResolver) {
        // Resource pattern matching available.
        try {
            Resource[] resources = ((ResourcePatternResolver) resourceLoader).getResources(location);
            int loadCount = loadBeanDefinitions(resources);
            if (actualResources != null) {
                for (Resource resource : resources) {
                    actualResources.add(resource);
                }
            }
            if (logger.isDebugEnabled()) {
                logger.debug("Loaded " + loadCount + " bean definitions from location pattern [" + location + "]");
            }
            return loadCount;
        }
        catch (IOException ex) {
            throw new BeanDefinitionStoreException(
                    "Could not resolve bean definition resource pattern [" + location + "]", ex);
        }
    }
    ...
}
```

### 这里会再调用XmlBeanDefinitionReader.loadBeanDefinitions(encodedResource)方法加载xml文件

```java
public int loadBeanDefinitions(EncodedResource encodedResource) throws BeanDefinitionStoreException {

    ....

    try {
        InputStream inputStream = encodedResource.getResource().getInputStream();
        try {
            InputSource inputSource = new InputSource(inputStream);
            if (encodedResource.getEncoding() != null) {
                inputSource.setEncoding(encodedResource.getEncoding());
            }
            return doLoadBeanDefinitions(inputSource, encodedResource.getResource());
        }
        finally {
            inputStream.close();
        }
    }
    ....
}
```

### 由XmlBeanDefinitionReader.doLoadBeanDefinitions()方法做具体的读取xml配置文件并解析成Document

```java
protected int doLoadBeanDefinitions(InputSource inputSource, Resource resource)
			throws BeanDefinitionStoreException {
    try {
        //加载解析成document文档类型
        Document doc = doLoadDocument(inputSource, resource);
        //注册bean定义
        return registerBeanDefinitions(doc, resource);
    }
    catch (BeanDefinitionStoreException ex) {
        throw ex;
    }

    ...
}


//根据Document注册
public int registerBeanDefinitions(Document doc, Resource resource) throws BeanDefinitionStoreException {
		BeanDefinitionDocumentReader documentReader = createBeanDefinitionDocumentReader();
    int countBefore = getRegistry().getBeanDefinitionCount();
    documentReader.registerBeanDefinitions(doc, createReaderContext(resource));
    return getRegistry().getBeanDefinitionCount() - countBefore;
}
```
#### 这里重点看下spring.schemas的加载和应用

```java
protected Document doLoadDocument(InputSource inputSource, Resource resource) throws Exception {
    return this.documentLoader.loadDocument(inputSource, getEntityResolver(), this.errorHandler,
            getValidationModeForResource(resource), isNamespaceAware());
}

protected EntityResolver getEntityResolver() {
    if (this.entityResolver == null) {
        // Determine default EntityResolver to use.
        ResourceLoader resourceLoader = getResourceLoader();
        if (resourceLoader != null) {
            this.entityResolver = new ResourceEntityResolver(resourceLoader);
        }
        else {
            //生成DelegatingEntityResolver标签实体元素解析代理类
            this.entityResolver = new DelegatingEntityResolver(getBeanClassLoader());
        }
    }
    return this.entityResolver;
}
```

> DelegatingEntityResolver代理类

```java
public DelegatingEntityResolver(ClassLoader classLoader) {
    this.dtdResolver = new BeansDtdResolver();
    //新建一个Schema解析器
    this.schemaResolver = new PluggableSchemaResolver(classLoader);
}
```

> PluggableSchemaResolver类-Schema解析器

从默认的映射文件META-INF/spring.schemas中加载schema url到schema文件位置的映射，以便用来解析相应的schema

```java
public class PluggableSchemaResolver implements EntityResolver {

	/**
	 * The location of the file that defines schema mappings.
	 * Can be present in multiple JAR files.
	 */
	public static final String DEFAULT_SCHEMA_MAPPINGS_LOCATION = "META-INF/spring.schemas";


	private static final Log logger = LogFactory.getLog(PluggableSchemaResolver.class);

	private final ClassLoader classLoader;

	private final String schemaMappingsLocation;

	/** Stores the mapping of schema URL -> local schema path */
	private volatile Map<String, String> schemaMappings;


	/**
	 * Loads the schema URL -> schema file location mappings using the default
	 * mapping file pattern "META-INF/spring.schemas".
	 * @param classLoader the ClassLoader to use for loading
	 * (can be {@code null}) to use the default ClassLoader)
	 * @see PropertiesLoaderUtils#loadAllProperties(String, ClassLoader)
	 */
	public PluggableSchemaResolver(ClassLoader classLoader) {
		this.classLoader = classLoader;
		this.schemaMappingsLocation = DEFAULT_SCHEMA_MAPPINGS_LOCATION;
	}
}
```

### 关键看XmlBeanDefinitionReader.createReaderContext()方法，由该方法加载命名空间handler处理器

```java
public XmlReaderContext createReaderContext(Resource resource) {
    return new XmlReaderContext(resource, this.problemReporter, this.eventListener,
            this.sourceExtractor, this, getNamespaceHandlerResolver());
}

/**
 * Lazily create a default NamespaceHandlerResolver, if not set before.
 * @see #createDefaultNamespaceHandlerResolver()
 */
public NamespaceHandlerResolver getNamespaceHandlerResolver() {
    if (this.namespaceHandlerResolver == null) {
        this.namespaceHandlerResolver = createDefaultNamespaceHandlerResolver();
    }
    return this.namespaceHandlerResolver;
}
```

创建DefaultNamespaceHandlerResolver，该类会根据属性`public static final String DEFAULT_HANDLER_MAPPINGS_LOCATION = "META-INF/spring.handlers";`
指定所有schema全名空间解析处理器的位置，即META-INF/spring.handlers中，内容如

```properties
http\://www.springframework.org/schema/context=org.springframework.context.config.ContextNamespaceHandler
http\://www.springframework.org/schema/jee=org.springframework.ejb.config.JeeNamespaceHandler
http\://www.springframework.org/schema/lang=org.springframework.scripting.config.LangNamespaceHandler
http\://www.springframework.org/schema/task=org.springframework.scheduling.config.TaskNamespaceHandler
http\://www.springframework.org/schema/cache=org.springframework.cache.config.CacheNamespaceHandler

```

所以自己写的schema只要放在这里指明映射关系即可解析相应的命名空间


### 接下来由DefaultBeanDefinitionDocumentReader.registerBeanDefinitions()方法根据“spring-beans”XSD shcema解析bean定义

```java
public void registerBeanDefinitions(Document doc, XmlReaderContext readerContext) {
    this.readerContext = readerContext;
    logger.debug("Loading bean definitions");
    Element root = doc.getDocumentElement();
    doRegisterBeanDefinitions(root);
}
```

### 在doRegisterBeanDefinitions()中创建BeanDefinitionParserDelegate类bean解析代理类

```java
protected void doRegisterBeanDefinitions(Element root) {
    // Any nested <beans> elements will cause recursion in this method. In
    // order to propagate and preserve <beans> default-* attributes correctly,
    // keep track of the current (parent) delegate, which may be null. Create
    // the new (child) delegate with a reference to the parent for fallback purposes,
    // then ultimately reset this.delegate back to its original (parent) reference.
    // this behavior emulates a stack of delegates without actually necessitating one.
    BeanDefinitionParserDelegate parent = this.delegate;
    //创建中创建BeanDefinitionParserDelegate类
    this.delegate = createDelegate(getReaderContext(), root, parent);

    if (this.delegate.isDefaultNamespace(root)) {
        String profileSpec = root.getAttribute(PROFILE_ATTRIBUTE);
        if (StringUtils.hasText(profileSpec)) {
            String[] specifiedProfiles = StringUtils.tokenizeToStringArray(
                    profileSpec, BeanDefinitionParserDelegate.MULTI_VALUE_ATTRIBUTE_DELIMITERS);
            if (!getReaderContext().getEnvironment().acceptsProfiles(specifiedProfiles)) {
                if (logger.isInfoEnabled()) {
                    logger.info("Skipped XML bean definition file due to specified profiles [" + profileSpec +
                            "] not matching: " + getReaderContext().getResource());
                }
                return;
            }
        }
    }

    preProcessXml(root);
    //解析bean调用delegate.parseCustomElement(ele)
    parseBeanDefinitions(root, this.delegate);
    postProcessXml(root);

    this.delegate = parent;
}
```

### 由BeanDefinitionParserDelegate.parseCustomElement()触发解析bean

```java
public BeanDefinition parseCustomElement(Element ele, BeanDefinition containingBd) {
    String namespaceUri = getNamespaceURI(ele);
    //获取DefaultNamespaceHandlerResolver,调用resolve()方法解析
    NamespaceHandler handler = this.readerContext.getNamespaceHandlerResolver().resolve(namespaceUri);
    if (handler == null) {
        error("Unable to locate Spring NamespaceHandler for XML schema namespace [" + namespaceUri + "]", ele);
        return null;
    }
    return handler.parse(ele, new ParserContext(this.readerContext, this, containingBd));
}
```

>  DefaultNamespaceHandlerResolver.resolve()方法

```java
public NamespaceHandler resolve(String namespaceUri) {
    Map<String, Object> handlerMappings = getHandlerMappings();
    //根据全名空间url映射到处理类名
    Object handlerOrClassName = handlerMappings.get(namespaceUri);
    if (handlerOrClassName == null) {
        return null;
    }
    else if (handlerOrClassName instanceof NamespaceHandler) {
        return (NamespaceHandler) handlerOrClassName;
    }
    else {
        String className = (String) handlerOrClassName;
        try {
            Class<?> handlerClass = ClassUtils.forName(className, this.classLoader);
            if (!NamespaceHandler.class.isAssignableFrom(handlerClass)) {
                throw new FatalBeanException("Class [" + className + "] for namespace [" + namespaceUri +
                        "] does not implement the [" + NamespaceHandler.class.getName() + "] interface");
            }
            //实例化命名空间处理器类
            NamespaceHandler namespaceHandler = (NamespaceHandler) BeanUtils.instantiateClass(handlerClass);
            //初始化该命名空间中相应元素的解析类
            namespaceHandler.init();
            handlerMappings.put(namespaceUri, namespaceHandler);
            return namespaceHandler;
        }
        catch (ClassNotFoundException ex) {
            throw new FatalBeanException("NamespaceHandler class [" + className + "] for namespace [" +
                    namespaceUri + "] not found", ex);
        }
        catch (LinkageError err) {
            throw new FatalBeanException("Invalid NamespaceHandler class [" + className + "] for namespace [" +
                    namespaceUri + "]: problem with handler class file or dependent class", err);
        }
    }
}
```

> 如`<mysource:xxx/>`的处理器MyNameSpaceHandler

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:mysource="https://github.com/bingbo/blog/schema/people"
       https://github.com/bingbo/blog/schema/people
       https://github.com/bingbo/blog/schema/people.xsd">

    <mysource:people id="mypeople" name="bill" age="30"/>
</beans>
```


```java
public class MyNamespaceHandler extends NamespaceHandlerSupport{
    public void init() {
        //在this.parser中注册标签对应的BeanDefinitionParser
        this.registerBeanDefinitionParser("people", new PeopleBeanDefinitionParser());
    }
}
```


### 找到NamespaceHandler后，调用其父类NamespaceHandlerSuport.parse()方法解析

```java
public BeanDefinition parse(Element element, ParserContext parserContext) {
    //找到相应的beanDefinitionParser,调用其parse()方法解析
    return findParserForElement(element, parserContext).parse(element, parserContext);
}

/**
 * Locates the {@link BeanDefinitionParser} from the register implementations using
 * the local name of the supplied {@link Element}.
 */
private BeanDefinitionParser findParserForElement(Element element, ParserContext parserContext) {
    String localName = parserContext.getDelegate().getLocalName(element);
    //根据标签名如people在注册的parser中找到相应的BeanDefinitionParser
    BeanDefinitionParser parser = this.parsers.get(localName);
    if (parser == null) {
        parserContext.getReaderContext().fatal(
                "Cannot locate BeanDefinitionParser for element [" + localName + "]", element);
    }
    return parser;
}
```

### 调用找到的BeandefinitionParser如PeopleBeanDefinitionParser,调用其parse()方法解析

1. 先是调用父类AbstractBeanDefinitionParser.parse(Element,ParserContext)方法

    ```java
    public final BeanDefinition parse(Element element, ParserContext parserContext) {
		AbstractBeanDefinition definition = parseInternal(element, parserContext);
		if (definition != null && !parserContext.isNested()) {
		...
       }
	}
    ```

1. 其次调用子类AbstractSingleBeanDefinitionParser.parseInternal()方法解析

    ```java
    protected final AbstractBeanDefinition parseInternal(Element element, ParserContext parserContext) {
        //生成一个bean构建类
        BeanDefinitionBuilder builder = BeanDefinitionBuilder.genericBeanDefinition();
        String parentName = getParentName(element);
        if (parentName != null) {
            builder.getRawBeanDefinition().setParentName(parentName);
        }

        ....

        //调用子类具体的解析函数
        doParse(element, parserContext, builder);
        return builder.getBeanDefinition();
    }
    ```

1. 具体BeandefinitionParser.doParser()方法解析

    ```java
    public class PeopleBeanDefinitionParser extends AbstractSingleBeanDefinitionParser{
        @Override
        protected Class<?> getBeanClass(Element element) {
            return People.class;
        }

        @Override
        protected void doParse(Element element, BeanDefinitionBuilder builder) {
            String name = element.getAttribute("name");
            String age = element.getAttribute("age");
            String id = element.getAttribute("id");
            if (StringUtils.hasText(id)) {
                builder.addPropertyValue("id", id);
            }
            if (StringUtils.hasText(name)) {
                builder.addPropertyValue("name", name);
            }
            if (StringUtils.hasText(age)) {
                builder.addPropertyValue("age", Integer.valueOf(age));
            }
        }
    }
    ```

### 最后解析完会在finishRefresh()方法中发布广播事件，而后FrameworkServlet.this.onApplicationEvent(event)

```java
public void onApplicationEvent(ContextRefreshedEvent event) {
    this.refreshEventReceived = true;
    onRefresh(event.getApplicationContext());
}
```

### 调DispatcherServlet.onRefresh()初始化相应的请求处理策略

```java
protected void onRefresh(ApplicationContext context) {
    initStrategies(context);
}

/**
 * Initialize the strategy objects that this servlet uses.
 * <p>May be overridden in subclasses in order to initialize further strategy objects.
 */
protected void initStrategies(ApplicationContext context) {
    initMultipartResolver(context);
    initLocaleResolver(context);
    initThemeResolver(context);
    initHandlerMappings(context);
    initHandlerAdapters(context);
    initHandlerExceptionResolvers(context);
    initRequestToViewNameTranslator(context);
    initViewResolvers(context);
    initFlashMapManager(context);
}
```

## 创建schema及handler进行扩展开发

有关schema资料请参考[w3cSchema](http://www.w3school.com.cn/schema/)

### 创建schema

保存在本地META-INF下

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<xsd:schema xmlns:xsd="http://www.w3.org/2001/XMLSchema"
            targetNamespace="https://github.com/bingbo/blog/schema/people"
            xmlns="https://github.com/bingbo/blog/schema/people"
            elementFormDefault="qualified"
            attributeFormDefault="unqualified"
            xmlns:beans="http://www.springframework.org/schema/beans">

    <xsd:import namespace="http://www.springframework.org/schema/beans"/>
    <xsd:element name="people">
        <xsd:complexType>
            <xsd:complexContent>
                <xsd:extension base="beans:identifiedType">
                    <xsd:attribute name="name" type="xsd:string"/>
                    <xsd:attribute name="age" type="xsd:int"/>
                </xsd:extension>
            </xsd:complexContent>
        </xsd:complexType>
    </xsd:element>
</xsd:schema>
```

### 创建命名空间标签对应的BeanDefinitionParser解析类

```java
public class PeopleBeanDefinitionParser extends AbstractSingleBeanDefinitionParser{
    @Override
    protected Class<?> getBeanClass(Element element) {
        return People.class;
    }

    @Override
    protected void doParse(Element element, BeanDefinitionBuilder builder) {
        String name = element.getAttribute("name");
        String age = element.getAttribute("age");
        String id = element.getAttribute("id");
        if (StringUtils.hasText(id)) {
            builder.addPropertyValue("id", id);
        }
        if (StringUtils.hasText(name)) {
            builder.addPropertyValue("name", name);
        }
        if (StringUtils.hasText(age)) {
            builder.addPropertyValue("age", Integer.valueOf(age));
        }
    }
}
```
### 创建NamespaceHandler

```java
public class MyNamespaceHandler extends NamespaceHandlerSupport{
    public void init() {
        //注册元素标签对应的BeanDefinitionParser解析类
        this.registerBeanDefinitionParser("people", new PeopleBeanDefinitionParser());
    }
}
```

### 配置Namespace与NamespaceHandler和具体的XSD文件的映射

在META-INF下分别创建spring.handlers和spring.schemas

> spring.handlers

```properties
https\://github.com/bingbo/blog/schema/people=com.ibingbo.namespace.MyNamespaceHandler
```

> spring.schemas

```properties
https\://github.com/bingbo/blog/schema/people.xsd=META-INF/people.xsd
```

### spring.xml配置文件配置bean

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:mvc="http://www.springframework.org/schema/mvc"
       xmlns:mysource="https://github.com/bingbo/blog/schema/people"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd
       http://www.springframework.org/schema/context
       http://www.springframework.org/schema/context/spring-context.xsd
       http://www.springframework.org/schema/mvc
       http://www.springframework.org/schema/mvc/spring-mvc.xsd
       https://github.com/bingbo/blog/schema/people
       https://github.com/bingbo/blog/schema/people.xsd">

    <mvc:annotation-driven/>
    <context:component-scan base-package="com.ibingbo"/>
    <context:property-placeholder location="classpath:config.properties"/>

    <mysource:people id="mypeople" name="bill" age="30"/>
</beans>
```
