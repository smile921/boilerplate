SQLite库包含一个名字叫做sqlite3的命令行,它可以让用户手工输入并执行面向SQLite数据库的SQL命令。一般系统有自带的命令，如果没有则需要自己安装。

## 用法
```shell
Usage: sqlite3 [OPTIONS] FILENAME [SQL]
```

FILENAME是sqlite数据库的名字，如果该文件不存在，则创建一个新的数据库。

##相关命令

> .backup ?DB? FILE 

备份数据库到FILE该文件

> .clone NEWDB

从现有数据库复制数据到新的数据库

> .databases

列表所有的数据库名及其文件

> .dbinfo ?DB?

显示数据库的状态信息

> .dump ?TABLE?

以sql文本格式dump数据库，如果指定了TABLE，则只dump相应的表

> .echo on|off

关闭或打开echo

> .exit

退出程序

> .explain ?on|off? 

打开或关闭explain相应的输出模式

> .headers on|off

打开或关闭显示头信息

> .help 

显示帮助相关信息

> .import FILE TABLE

从文件导入数据到相应的表

> .indexes ?TABLE?

显示所有的索引信息，如果指定表，则显示表相应的索引信息

> .limit ?LIMIT? ?VAL?

显示或改变SQLITE_LIMIT语句的值

> .log FILE|off

打开或关闭日志，FILE可以是stderr/stdout

> .open ?FILENAME?

关闭现有数据库并重新打开FILENAME文件

> .output ?FILENAME? 

发送输出到文件或stdout

> .print STRING

打印输出字符串

> .quit

退出当前程序

> .read FILENAME

执行文件中的SQL

> .restore ?DB? FILE

从文件中重新存储数据到数据库

> .save FILE

写缓存中的数据到文件

> .separator COL ?ROW?

改变列和行的分隔符

> .show

显示相应变量的当前值

> .tables ?TABLE?

列出所有表，如果指定表，则列表匹配的表

## 数据操作语法

DML语法与其他数据库一样，如create table、insert into table、select * from table等