# 记录一下java开发的点子

## java 工程获取源码和 java doc

* Maven 姿势
  * `mvn dependency:sources`
  * `mvn dependency:resolve -Dclassifier=javadoc`
  * `mvn dependency:sources -DincludeArtifactIds=guava`
  获取源码，获取javadoc，获取指定坐标的源码

  当使用idea 插件式也可以 `mvn idea:idea -DdownloadSources=true -DdownloadJavadocs=true`
  当使用eclipse插件时可以 `mvn eclipse:eclipse -DdownloadSources=true -DdownloadJavadocs=true`
  或者
  ````xml
  <plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-eclipse-plugin</artifactId>
    <configuration>
      <downloadSources>true</downloadSources>
      <downloadJavadocs>true</downloadJavadocs>
    </configuration>
  </plugin>
  ````

[maven soruce plugin 文档](https://maven.apache.org/plugins/maven-dependency-plugin/sources-mojo.html)

* Gradle 姿势
  * `gradle cleanEclipse eclipse`
  * `gradle cleanIdea idea`

  * eclipse 配置
  ``` gradle
  apply plugin: 'java'
  apply plugin: 'eclipse'

  eclipse {
      classpath {
          downloadJavadoc = true
          downloadSources = true
      }
  }
  ```

  * IntelliJ 配置
  ```gradle
  apply plugin: 'java'
  apply plugin: 'idea'

  idea {
      module {
          downloadJavadoc = true
          downloadSources = true
      }
  }
  ```
