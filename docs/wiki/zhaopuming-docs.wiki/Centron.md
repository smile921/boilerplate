## 概述 

centron的目标是将我们开发中常用的util类组织起来，方便代码复用

现在centron-core库现提供如下几类功能：

1. 快捷函数 : 常用变量的快速声明，提高开发效率和可读性
    centron.Centron.*

1. util类 : 提高代码复用率
    centron.util.*

1. 强化的集合类 : 给List，Map等集合类添加了功能，以及初步的函数编程功能; 设计了一个延迟加载的Flow类
    centron.col.*

1. IO库 : 模拟python的API，让Java的IO操作更方便(V1.0时计划移到centron-io库中)
    centron.io.*

## 代码演示

SVN地址：  http://192.168.1.197/svnroot/Centron/trunk/

## 未来计划

1. 在公司内开源，整合更多的代码
1. 集成更多的commons和guava的功能
1. 完善IO功能