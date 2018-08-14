## 使用Tomcat部署 Java项目，war包

本文主要是记录如何在tomcat下部署war包以及如何通过配置去除端口和项目名。

### 使用maven打war包

在pom文件目录下：
~~~
   mvn package
~~~

### 将war包部署为子项目(即通过项目名称来访问)
在Tomcat中部署war包很简单：

首先，直接把相应的war包放到$TOMCAT_HOME/webapps下，不用建目录；

然后，修改$TOMCAT_HOME/conf/server.xml，在Host配置段中添加类似于如下内容：
~~~
      <Host name="localhost"  appBase="webapps"
            unpackWARs="true" autoDeploy="true">
          <Context path="/" docBase="my-app.war" debug="0" privileged="true" reloadable="true"/>
        <Valve className="org.apache.catalina.valves.AccessLogValve" directory="logs"
               prefix="localhost_access_log." suffix=".txt"
               pattern="%h %l %u %t &quot;%r&quot; %s %b" />
      </Host>
~~~
添加的内容为：
~~~
<Context path="/" docBase="my-app.war" debug="0" privileged="true" reloadable="true"/>
~~~
其中，docBase参数标识的是war包的名称。也可配置war包解压后的绝对路径。
访问时，使用如下地址进行访问：http://ip:port/my-app

### 部署war包为独立项目

有多重方式

1.部署在 $TOMCAT_HOME/webapps 内
在**$TOMCAT_HOME\conf\server.xml**中，找到如这句话：
~~~
<Host name="localhost" appBase="webapps"
unpackWARs="true" autoDeploy="true"
xmlValidation="false" xmlNamespaceAware="false">
~~~

目前在生产环境中是吧webapp部署在

~~~
<Host name="localhost"  appBase="webapps"
            unpackWARs="true" autoDeploy="true">
          <Context path="" docBase="air-report.war" debug="0" privileged="true" reloadable="true"/>
        <Valve className="org.apache.catalina.valves.AccessLogValve" directory="logs"
               prefix="localhost_access_log." suffix=".txt"
               pattern="%h %l %u %t &quot;%r&quot; %s %b" />
      </Host>
~~~

path 属性设置为空，docBase属性设置为war包的名称。

2. 部署在$TOMCAT_HOME/webapps 外：
一、把war包解压，部署到除$TOMCAT_HOME/webapps以外的目录
二、删除$TOMCAT_HOME/ webapps/ROOT目录下的所有文件
三、在$TOMCAT_HOME/conf/Catalina/localhost目录下，新建一个ROOT.xml文件，写入类似于如下内容：
~~~
    <?xml version='1.0' encoding='utf-8'?> 
    <Context path="/" docBase="/usr/local/tomcat-6.0/webdav" debug="0" privileged="true" reloadable="true"/> 
~~~
其中，docBase指向的是war包解压后的目录名称，需绝对路径。

### 修改Tomcat端口号
在$TOMCAT_HOME\conf\server.xml中，找到如这句话：
~~~
 <Connector port="8080" protocol="HTTP/1.1"
               connectionTimeout="20000"
               redirectPort="8443" />
~~~
Tomcat默认端口为8080,将8080端口修改为80即可不用通过端口访问，修改如下：
~~~
 <Connector port="80" protocol="HTTP/1.1"
               connectionTimeout="20000"
               redirectPort="8443" />
~~~

### 启动和重启Tomcat实例
Tomcat启动和关闭的脚本都在 **$TOMCAT_HOME\bin\** 下。直接运行脚本即可实现启动和关闭。
~~~
    ./shutdown.sh #关闭当前 实例
    ./startup.sh  #启动当前实例
~~~
