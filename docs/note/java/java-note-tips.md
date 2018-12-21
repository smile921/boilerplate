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
## 替换已有jar包的某个类

* maven 姿势 使用abtrun
```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-antrun-plugin</artifactId>
    <version>1.6</version>
    <executions>
      <execution>
        <id>repack</id>
        <phase>compile</phase>
        <goals>
          <goal>run</goal>
        </goals>
        <configuration>
          <target>
            <!-- note that here we reference previously declared dependency -->
            <unzip src="${org.apache:common-util:jar}" dest="${project.build.directory}/tmp"/>
            <!-- now do what you need to any of unpacked files under target/tmp/ -->
            <zip basedir="${project.build.directory}/tmp" destfile="${project.build.directory}/common-util-modified.jar"/>
            <!-- now the modified jar is available  -->
          </target>
        </configuration>
      </execution>
    </executions>
  </plugin>
```
[ref  maven-replace-a-file-in-a-jar](https://stackoverflow.com/questions/6307191/maven-replace-a-file-in-a-jar/7085511#7085511)
`jar uf jar-file input-file(s)`
`jar uf TicTacToe.jar -C images new.gif` -C change directory
`jar uf TicTacToe.jar images/new.gif`
* [Gradle 姿势](https://stackoverflow.com/questions/27946825/gradle-replace-class-file-into-modifying-the-manifest)

```gradle
task patchedJar(type: Zip, dependsOn: jar) {
    extension 'jar'
    from(zipTree(jar.archivePath)) {
        exclude '**/MyClass.class'
    }
    from("patches/dir") {
        include 'com/foo/package/MyClass.class'
    }
}
```
