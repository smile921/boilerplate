# Sqlite


CLP 会将输入的任何语句当成查询命令，除非命令以(.)开始


**相关配置**

	.headers on
	.mode column


创建数据库

	sqlite3 test.db
	
	
获取所有的表

	.tables
	
	
显示表的索引

	.indices
	
	
	.scheam 返回表 DDL
	
	sqlite_master
	
导出数据

	.dump
	.output
	
导入数据


	
	

	