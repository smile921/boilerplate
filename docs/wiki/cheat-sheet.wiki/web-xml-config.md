
## 模式文件
web.xml的模式文件是由Sun公司定义的，每个web.xml文件的根元素**`<web-app>`**中，都必须标明这个web.xml使用的是哪个模式文件
```
<?xml version="1.0" encoding="utf-8"?>
<web-app xmlns="http://java.sun.com/xml/ns/javaee" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_3_0.xsd"
         version="3.0">
</web-app>
```
 而且web.xml的模式文件中定义的标签并不是定死的，模式文件也是可以改变的，一般来说，随着web.mxl模式文件的版本升级，里面定义的功能会越来越复杂，也即标签元素的种类会越来越多，但有些是不常用的，我们只需记住一些常用的就可以了。

## 加载顺序
> context-param -> listener -> filte-> servlet

## 元素详解

### 1.Web应用图标：指出IDE和GUI工具用来表示Web应用的大图标和小图标
```
<icon>
<small-icon>/images/app_small.gif</small-icon>
<large-icon>/images/app_large.gif</large-icon>
</icon>
```

### 2.Web 应用名称：提供GUI工具可能会用来标记这个特定的Web应用的一个名称
```
<display-name>Tomcat Example</display-name>
```
### 3. Web 应用描述：给出于此相关的说明性文本
```
<disciption>Tomcat Example servlets and JSP pages.</disciption>
```

### 4.上下文参数：声明应用范围内的初始化参数。
```
  <context-param>
    <param-name>ContextParameter</para-name>
    <param-value>test</param-value>
    <description>It is a test parameter.</description>
  </context-param>
```
在servlet里面可以通过getServletContext().getInitParameter("context/param")
得到
### 5.过滤器配置：将一个名字与一个实现javaxs.servlet.Filter接口的类相关联。
```
 <filter>
        <filter-name>setCharacterEncoding</filter-name>
        <filter-class>com.myTest.setCharacterEncodingFilter</filter-class>
        <init-param>
            <param-name>encoding</param-name>
            <param-value>GB2312</param-value>
        </init-param>
  </filter>
  <filter-mapping>
        <filter-name>setCharacterEncoding</filter-name>
        <url-pattern>/*</url-pattern>
  </filter-mapping>
```
### 6.监听器配置
```
 <listener>
      <listerner-class>listener.SessionListener</listener-class>
  </listener>
```

### 7. Servlet配置

基本配置

```

   <servlet>
      <servlet-name>snoop</servlet-name>
      <servlet-class>SnoopServlet</servlet-class>
   </servlet>
   <servlet-mapping>
      <servlet-name>snoop</servlet-name>
      <url-pattern>/snoop</url-pattern>
   </servlet-mapping>
```

高级配置

```

   <servlet>
      <servlet-name>snoop</servlet-name>
      <servlet-class>SnoopServlet</servlet-class>
      <init-param>
         <param-name>foo</param-name>
         <param-value>bar</param-value>
      </init-param>
      <run-as>
         <description>Security role for anonymous access</description>
         <role-name>tomcat</role-name>
      </run-as>
   </servlet>
   <servlet-mapping>
      <servlet-name>snoop</servlet-name>
      <url-pattern>/snoop</url-pattern>
   </servlet-mapping>
```

元素说明
- `` <servlet></servlet> ``用来声明一个servlet的数据，主要有以下子元素：
- ``<servlet-name></servlet-name>`` 指定servlet的名称
- ``<servlet-class></servlet-class>`` 指定servlet的类名称
- ``<jsp-file></jsp-file>`` 指定web站台中的某个JSP网页的完整路径
- ``<init-param></init-param>`` 用来定义参数，可有多个init-param。在servlet类中通过getInitParamenter(String name)方法访问初始化参数
- ``<load-on-startup></load-on-startup>``指定当Web应用启动时，装载Servlet的次序。
    - 当值为正数或零时：Servlet容器先加载数值小的servlet，再依次加载其他数值大的servlet.
    - 当值为负或未定义：Servlet容器将在Web客户首次访问这个servlet时加载它
- ``<servlet-mapping></servlet-mapping>`` 用来定义servlet所对应的URL，包含两个子元素
- ``<servlet-name></servlet-name>`` 指定servlet的名称
- ``<url-pattern></url-pattern>`` 指定servlet所对应的URL

### 8. 会话超时配置（单位为分钟）

```
   <session-config>
      <session-timeout>120</session-timeout>
   </session-config>
```
### 9. MIME类型配置
```
  <mime-mapping>
      <extension>htm</extension>
      <mime-type>text/html</mime-type>
  </mime-mapping>
```
### 10.指定欢迎文件页配置
```
   <welcome-file-list>
      <welcome-file>index.jsp</welcome-file>
      <welcome-file>index.html</welcome-file>
      <welcome-file>index.htm</welcome-file>
   </welcome-file-list>
```

### 配置错误页面
 一、通过错误码来配置error-page
```
   <error-page>
      <error-code>404</error-code>
      <location>/NotFound.jsp</location>
   </error-page>
```
上面配置了当系统发生404错误时，跳转到错误处理页面NotFound.jsp。


二、通过异常的类型配置error-page
```
   <error-page>
       <exception-type>java.lang.NullException</exception-type>
       <location>/error.jsp</location>
   </error-page>
```
上面配置了当系统发生java.lang.NullException（即空指针异常）时，跳转到错误处理
页面error.jsp

### 12.TLD配置
```
   <taglib>
       <taglib-uri>http://jakarta.apache.org/tomcat/debug-taglib</taglib-uri>
       <taglib-location>/WEB-INF/jsp/debug-taglib.tld</taglib-location>
   </taglib>
```
如果MyEclipse一直在报错,应该把`<taglib>` 放到 `<jsp-config>`中

```
   <jsp-config>
      <taglib>
          <taglib-uri>http://jakarta.apache.org/tomcat/debug-taglib</taglib-uri>
          <taglib-location>/WEB-INF/pager-taglib.tld</taglib-location>
      </taglib>
   </jsp-config>
```
### 13.资源管理对象配置
```
<resource-env-ref>
   <resource-env-ref-name>jms/StockQueue</resource-env-ref-name>
</resource-env-ref>
```

### 14.资源工厂配置
```
   <resource-ref>
       <res-ref-name>mail/Session</res-ref-name>
       <res-type>javax.mail.Session</res-type>
       <res-auth>Container</res-auth>
   </resource-ref>
```
配置数据库连接池就可在此配置：
```
   <resource-ref>
       <description>JNDI JDBC DataSource of shop</description>
       <res-ref-name>jdbc/sample_db</res-ref-name>
       <res-type>javax.sql.DataSource</res-type>
       <res-auth>Container</res-auth>
   </resource-ref>
```

### 15. 安全限制配置
```

   <security-constraint>
      <display-name>Example Security Constraint</display-name>
      <web-resource-collection>
         <web-resource-name>Protected Area</web-resource-name>
         <url-pattern>/jsp/security/protected/*</url-pattern>
         <http-method>DELETE</http-method>
         <http-method>GET</http-method>
         <http-method>POST</http-method>
         <http-method>PUT</http-method>
      </web-resource-collection>
      <auth-constraint>
        <role-name>tomcat</role-name>
        <role-name>role1</role-name>
      </auth-constraint>
   </security-constraint>
```

### 16.登陆验证配置
```
<login-config>
     <auth-method>FORM</auth-method>
     <realm-name>Example-Based Authentiation Area</realm-name>
     <form-login-config>
        <form-login-page>/jsp/security/protected/login.jsp</form-login-page>
        <form-error-page>/jsp/security/protected/error.jsp</form-error-page>
     </form-login-config>
   </login-config>
```

### 17. 安全角色
security-role元素给出安全角色的一个列表，这些角色将出现在servlet元素内的security-role-ref元素的role-name子元素中。
分别地声明角色可使高级IDE处理安全信息更为容易。
```
  security-role>
     <role-name>tomcat</role-name>
  </security-role>
```

### 18.Web环境参数：env-entry元素声明Web应用的环境项
```
  <env-entry>
     <env-entry-name>minExemptions</env-entry-name>
     <env-entry-value>1</env-entry-value>
     <env-entry-type>java.lang.Integer</env-entry-type>
  </env-entry>
```

### 19.EJB 声明
```
  <ejb-ref>
     <description>Example EJB reference</decription>
     <ejb-ref-name>ejb/Account</ejb-ref-name>
     <ejb-ref-type>Entity</ejb-ref-type>
     <home>com.mycompany.mypackage.AccountHome</home>
     <remote>com.mycompany.mypackage.Account</remote>
  </ejb-ref>
```

### 20.本地EJB声明
```
  <ejb-local-ref>
     <description>Example Loacal EJB reference</decription>
     <ejb-ref-name>ejb/ProcessOrder</ejb-ref-name>
     <ejb-ref-type>Session</ejb-ref-type>
     <local-home>com.mycompany.mypackage.ProcessOrderHome</local-home>
     <local>com.mycompany.mypackage.ProcessOrder</local>
  </ejb-local-ref>
```

### 21. 配置DWR
```
  <servlet>
      <servlet-name>dwr-invoker</servlet-name>
      <servlet-class>uk.ltd.getahead.dwr.DWRServlet</servlet-class>
  </servlet>
  <servlet-mapping>
      <servlet-name>dwr-invoker</servlet-name>
      <url-pattern>/dwr/*</url-pattern>
  </servlet-mapping>
```

### 22. 配置spring
```
   <!-- 指定spring配置文件位置 -->
   <context-param>
      <param-name>contextConfigLocation</param-name>
      <param-value>
       <!--加载多个spring配置文件 -->
        /WEB-INF/applicationContext.xml, /WEB-INF/action-servlet.xml
      </param-value>
   </context-param>

   <!-- 定义SPRING监听器，加载spring -->
  <listener>
     <listener-class>org.springframework.web.context.ContextLoaderListener
     </listener-class>
  </listener>

  <listener>
     <listener-class>
       org.springframework.web.context.request.RequestContextListener
     </listener-class>
  </listener>
```

## 参考
- [Web.xml详解](http://blog.csdn.net/believejava/article/details/43229361)
