

## 一、 安装JDK
版本：1.7.0_45
下载链接：[http://www.oracle.com/technetwork/java/javase/downloads/java-archive-downloads-javase7-521261.html#jdk-7u45-oth-JPR](http://www.oracle.com/technetwork/java/javase/downloads/java-archive-downloads-javase7-521261.html#jdk-7u45-oth-JPR)

###[配置]
* 在“系统变量”中，设置3项属性，JAVA_HOME,PATH,CLASSPATH(大小写无所谓),若已存在则点击“编辑”，不存在则点击“新建”；
* JAVA_HOME指明JDK安装路径，就是刚才安装时所选择的路径C:\Program Files\Java\jdk1.6.0_35，此路径下包括lib，bin，jre等文件夹（此变量最好设置，因为以后运行tomcat，eclipse等都需要依*此变量）；
* Path使得系统可以在任何路径下识别java命令，设为：%JAVA_HOME%/bin;%JAVA_HOME%/jre/bin
* CLASSPATH为java加载类(class or lib)路径，只有类在classpath中，java命令才能识别，设为：.;%JAVA_HOME%/lib/dt.jar;%JAVA_HOME%/lib/tools.jar (要加.表示当前路径)
* %JAVA_HOME%就是引用前面指定的JAVA_HOME；
* “开始”－>;“运行”，键入“cmd”；
* 键入命令“java -version”，“java”，“javac”几个命令，出现画面，说明环境变量配置成功；

## 二、安装SVN
下载地址：http://tortoisesvn.net
建议版本：最新的
## 三、安装Maven
下载地址：http://maven.apache.org/download.cgi  
建议版本：最新的 (Binary zip)

###[配置]
下载完成后将压缩包解压到某磁盘下。（例如：D:\apache-maven-3.2.3）,
目录结构：

* bin Maven的运行脚本
* boot Maven自己的类装载器
* conf 该目录下包含了全局行为定制文件 setting.xml
* lib Maven运行时所需的类库

### 环境变量配置
在“系统变量”中“新建”或“编辑”如下几个变量。

* 1 M2_HOME：D:\apache-maven-3.2.3（第 1 步解压的位置）
* 2 path：D:\apache-maven-3.2.3\bin

测试
在命令行 cmd 中输入“mvn -version”后显示 maven 版本号，java version 等信息，说明安装成功。
###[Setting]
为了共享公司内部的jar包组件，需要要连接开发私库；
下载 setting 文件覆盖${MAVEN_HOME}\conf目录setting文件使其全局生效；