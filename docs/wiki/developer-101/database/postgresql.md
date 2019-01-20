# PostgreSQL新手入门

#### 介绍

* [PostgreSQL 官方网站](https://www.postgresql.org/)
* 默认端口: 5432

#### 安装

**Ubuntu**
	
	apt-get install postgresql postgresql-client libpq-dev
	
**Mac**

	brew install postgresql

#### 登录


**Ubuntu**
	
	sudo su - postgres
	psql
	
**Mac**

	psql postgres
	
	
	
#### 控制台命令

psql 是 PostgreSQL中的客户端工具, 其中的命令都是以斜杠『\』开头。

* <code>\l</code>：列出所有数据库。
* <code>\c [database_name]</code>: 连接其他数据库
* <code>\d</code>: 列出当前数据库的所有表
* <code>\d [table_name]</code>: 列出某一张表格的结构
* <code>\q</code>:  退出控制台
