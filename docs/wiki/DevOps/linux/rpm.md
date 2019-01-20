## rpm 使用教程


### 1、安装

> rpm -i 需要安装的包文件名

```
举例如下：

rpm -i example.rpm 安装 example.rpm 包；

rpm -iv example.rpm 安装 example.rpm 包并在安装过程中显示正在安装的文件信息；

rpm -ivh example.rpm 安装 example.rpm 包并在安装过程中显示正在安装的文件信息及安装进度；
```

### 2、查看安装完成的软件

```
[root@jacky zookeeper]# rpm -qa | grep jdk
java-1.6.0-openjdk-1.6.0.0-1.66.1.13.0.el6.i686
java-1.7.0-openjdk-1.7.0.45-2.4.3.3.el6.i686
```

### 3、卸载软件

```
rpm -e --nodeps 要卸载的软件包

root@jacky zookeeper]# rpm -e --nodeps java-1.6.0-openjdk-1.6.0.0-1.66.1.13.0.el6.i686
```
