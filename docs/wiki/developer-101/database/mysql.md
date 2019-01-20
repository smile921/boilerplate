# MySQL 新手入门

#### 介绍

* [MySQL 官方网站](http://www.mysql.com/)
* 默认端口: 3306


#### 安装

**Ubuntu**
	
	sudo apt-get install mysql-server mysql-client libmysqlclient-dev
	
	# 解决 Ubuntu 16.04 上不能直接用 root 用户登录
	sudo mysql -u root -e "update mysql.user set plugin='mysql_native_password' WHERE User='root';"
	
	sudo service mysql restart
	
**Mac**

	brew install mysql
	
	
#### 登录(进入控制台)

	mysql -u root
	
	
#### 控制台命令

* `show databases;`: 列出所有数据库
* `use [database_name];`: 连接其他数据库
* `show tables;`: 列出当前数据库的所有表
* `describe tables;`: 列出某一张表格的结构
* `exit`: 退出控制台
* `set names utf8`: 设置中文显示



### 相关问题

* [mysql5.7导出数据提示--secure-file-priv选项问题的解决方法](https://blog.csdn.net/fdipzone/article/details/78634992)
* [MySQL 5.1 中文参考手册(在线文档)](http://www.mysqlab.net/docs/view/refman-5.1-zh/chapter/index.html)