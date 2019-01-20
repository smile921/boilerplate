# MongoDb入门

#### 介绍

* [MongoDb官网](http://www.mongodb.org/downloads)
* 默认端口: 27017


#### 安装

* **Ubuntu**

		#添加MongoDb安装源
		sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6

		#Ubuntu 12.04:
	  	echo "deb http://repo.mongodb.org/apt/ubuntu precise/mongodb-org/testing multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list

		#Ubuntu 14.04:
		echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/testing multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list

		#Ubuntu 16.04
		echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/testing multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list

		apt-get update
		apt-get install -y mongodb-org


* **Mac**

		brew install mongodb

####常用命令

	* 查看版本: mongod --version
	* 启动:		mongod
	* 连接:		mongo --port 27017
	* 查看数据库:	 show dbs
	* 创建数据库并进入数据库:	 use <db_name>
	* 删除数据库:	 db.dropDatabase()
	* 插入数据:	 db.<db_name>.insert({"<key>":"<value>"}) #db.test.insert({"name","MongoDb"})
	* 修改数据:	 db.<db_name>.update({条件},{$set:{修改值}}) #db.test.update({"name":"MongoDb"},{$set:{"name":"Mongo"}})
	* 删除数据:	 db.<db_name>.remove({条件}) #db.test.remove({"name":"Mongo"})
	* 查询: db.<db_name>.find({条件}) #db.test.find({"name":"Mongo"})

更多教程请查询 [MongoDb教程](http://www.runoob.com/mongodb/mongodb-tutorial.html)
