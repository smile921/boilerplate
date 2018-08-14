Maven FAQ
#### 1. 创建java工程
 mvn archetype:create -DgroupId=com.mycompany.app -DartifactId=my-app
#### 2. 创建Web工程
 mvn archetype:create -DgroupId=com.mycompany.app -DartifactId=my-web-app -DarchetypeArtifactId=maven-archetype-webapp
#### 3. 编译代码
 mvn compile
#### 4. 构建代码或者叫 打包:D
 mvn package
####5. 清除构建
 mvn clean
#### 6. 安装到Local Repository
 mvn install

安装第三方文件
 mvn install:install-file -DgroupId=org.guzz -DartifactId=guzz -Dversion=1.2.9.20110830 -Dfile=guzz-1.2.9.20110830.jar -Dpackaging=jar -DgeneratePom=true
####7. 发布到私服
 mvn deploy
发布第三方文件到snapshot
 mvn deploy:deploy-file -DgroupId=org.guzz -DartifactId=guzz -Dversion=1.0-SNAPSHOT -Dpackaging=jar -Dfile=guzz-1.0-SNAPSHOT.jar -Durl= http://mvn.elong.cn:8081//nexus/content/repositories/snapshots -DrepositoryId=nexus-snapshots

发布第三方文件到release找管理员
上线代码不允许使用snapshot文件
#### 8. 分析依赖
 mvn dependency:analyze
不是很准，仅供参考
#### 9. 依赖树
 mvn dependency:tree
#### 10. 有效POM
 mvn help:effective-pom

####11. 生成源码jar
 mvn source:jar
#### 12. 生成javadoc
 mvn javadoc:jar
#### 13. 生成cient jar
 mvn shade:shade
 生成文件： ${artifactId}-${version}-cli.jar
#### 14. 生成带所有依赖的jar

14.1 所有依赖的jar会被unpack后，和工程的文件一起放到jar中

 mvn assembly:assembly

 生成文件： ${artifactId}-${version}-jar-with-dependencies.jar

14.2 如果希望依赖的jar不被unpack，还是独立的jar，在pom.xml的build中增加

```xml
<plugin>
 <groupId>org.apache.maven.plugins</groupId>
 <artifactId>maven-assembly-plugin</artifactId>
 <configuration>
 <descriptors>
 <descriptor>src/main/assembly/assembly.xml</descriptor>
 </descriptors>
 </configuration>
</plugin>
```
 assembly.xml 文件内容如下：

```xml
 <assembly xmlns=" http://maven.apache.org/plugins/maven-assembly-plugin/assembly/1.1.2 "
 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
 xsi:schemaLocation="http://maven.apache.org/plugins/maven-assembly-plugin/assembly/1.1.2 http://maven.apache.org/xsd/assembly-1.1.2.xsd ">
 <id>with-dependencies</id>
 <formats>
 <format>jar</format>
 </formats>
 <includeBaseDirectory>false</includeBaseDirectory>
 <dependencySets>
 <dependencySet>
 <unpack>false</unpack>
 <scope>runtime</scope>
 </dependencySet>
 </dependencySets>
 <fileSets>
 <fileSet>
 <directory>${project.build.outputDirectory}</directory>
 </fileSet>
 </fileSets>
</assembly>
```
 执行命令
 mvn assembly:assembly
 生成文件： ${artifactId}-${version}-with-dependencies.jar
#### 15. 列出所有依赖
 mvn dependency:copy-dependencies
 会在target下生成lib目录，包含工程所有依赖的jar
#### 16. release and tag
 确保测试代码一定能通过
 mvn release:prepare
 if( success )
 mvn release:perform
 else
 mvn release:rollback release:clean
 完成后，会在svn建立分支 ${SVN_HOME}/tags/project/project-name-X.X
#### 17. versions管理
 a) parent使用快照版本号，修改parent的pom后，直接deploy就可以了。
 例如：
 cd trunk/parent
 mvn deploy
 b) parent使用release版本号，修改parent的version后，需要同步更新所有子模块parent中的version
 修改 trunk/parent/pom.xml 的version为 X，再修改 trunk/aggregator/pom.xml的version 为相同的 X ，进入trunk/aggregator目录，
 mvn versions:update-child-modules
 if( success )
 mvn versions:commit
 else
 mvn versions:revert
 release后通知管理员
#### 18. 查看依赖更新
 mvn versions:display-dependency-updates
#### 19. package同时把依赖包放到target/lib目录下
```xml

<build><plugins>下加入
<plugin>
 <groupId>org.apache.maven.plugins</groupId>
 <artifactId>maven-dependency-plugin</artifactId>
 <executions>
 <execution>
 <id>copy-dependencies</id>
 <phase>package</phase>
 <goals>
 <goal>copy-dependencies</goal>
 </goals>
 <configuration>
 <outputDirectory>${project.build.directory}/lib</outputDirectory>
 <overWriteReleases>false</overWriteReleases>
 <overWriteSnapshots>false</overWriteSnapshots>
 <overWriteIfNewer>true</overWriteIfNewer>
 </configuration>
 </execution>
 </executions>
</plugin>

```
#### 20. package时配置文件不想打包在jar中
1）排除相关配置文件
`<build><plugins>`中设置如下：

```xml
<plugin>
 <groupId>org.apache.maven.plugins</groupId>
 <artifactId>maven-jar-plugin</artifactId>
 <configuration>
 <excludes>
 <exclude>log4j.xml</exclude>
 <exclude>config.properties</exclude>
 </excludes>
 </configuration>
</plugin>
```

2）将1)中相关配置文件放入target/conf目录

```xml
<plugin>
 <groupId>org.apache.maven.plugins</groupId>
<artifactId>maven-resources-plugin</artifactId>
<executions>
<execution>
<id>copy-resources</id>
<phase>package</phase>
<goals>
<goal>copy-resources</goal>
</goals>
<configuration>
<encoding>UTF-8</encoding>
<outputDirectory>${project.build.directory}/conf</outputDirectory>
<resources>
<resource>
<directory>src/main/resources</directory>
<includes>
<include>log4j.xml</include>
<include>config.properties</include>
</includes>
<filtering>true</filtering>
</resource>
</resources>
</configuration>
</execution>
</executions>
</plugin>
```

#### 22. 设置可执行jar的MANIFEST文件，例如可执行类和classpath
假设依赖jar都放到lib目录，配置文件都放到conf目录（参见 21）

```xml
<plugin>
<groupId>org.apache.maven.plugins</groupId>
<artifactId>maven-jar-plugin</artifactId>
<configuration>
<classesDirectory>classes/</classesDirectory>
<archive>
<manifest>
<mainClass>com.mypackage.myclass.Main</mainClass>
<addClasspath>true</addClasspath>
<classpathPrefix>lib/</classpathPrefix>
</manifest>
<manifestEntries>
<Class-Path>conf/</Class-Path>
</manifestEntries>
</archive>
<excludes>
<exclude>log4j.xml</exclude>
<exclude>config.properties</exclude>
</excludes>
</configuration>
</plugin>

```
23. 生成site及各种报表
 mvn site
 成功后打开 target/site/project-reports.html，可以查看
 * Checkstyle
 * PMD Report
 * CPD Report
 * Surefire Report
 * FindBugs Report
