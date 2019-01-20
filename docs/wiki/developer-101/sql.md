# sql语句

#sql
###数据库操作
```
列出数据库
show databases
使用数据库
use database_name
创建数据库
create database database_name
删除数据库
drop database_name
```
###表的操作
```
列出所有表
show tables
创建一个tab_name表
creat table table_name(
id int(10) not bull auto_increment primary key,
name varchar(40) not null default "",
);
删除数据表tab_name
drop table tab_name 
show columns from tab_name
删除tab_name所有的数据
delete from tab_name
查询数据表tab_name的所有数据
select * from tab_name
```
###msyql常用的查询语句
```
添加数据
insert into 表名（字段1，字段2,.....） values(值1，值2);
修改数据
UPDATE 表名 SET 字段=值;
删除数据
delete from 表名 where 条件;
查询
	where 
		select * from 表名 where 条件
	order by  ————排序
		select * from 表名 order by 字段 desc;    #按条件进行降序排列
		select * from 表名 order by 字段 asc;     #按条件进行升序排列
	group by  ————分组
		select * from 表名 groud by 字段
	having  ————过滤条件，一般用于groud by 后面
	limit  ————查询的是某条或者某段记录
		select * from 表名 limit n,m   ————n表示开始位置，m表示结束位置
	like  ————模糊查询，在一个字符型字段列中检索包含对应子串
		select * from 表名 where 字段名 like %对应值(子串)%;
	in ————一般用于一个范围内的查找，比如查找id为212,231,232
		如：select * from 表名 where id in (212,231,232);
	between ...and...
		select * from 表名 between ... and ...;
	distinct  ————过滤重复
		delect distinct 字段名 from 表名;




```
###修改数据表的操作
```
设置表tab_name中的字段col_name为主键
ALTER TABLE table_name ADD PRIMARY KEY(col_name)
删除表tab_name中的字段col_name的定义主键
ALTER TABLE table_name DROP PRIMARY KEY(col_name)
给tab_name表添加一个字段字段名为col_name类型varchar(20)
ALTER TABLE tab_name ADD col_name varchar(20)
删除tab_name表col_name字段
ALTER TABLE tab_name drop col_name
修改表名tab_name为new_tab_name
ALTER TABLE tab_name rename new_tab_name
用一个已有的表来创建表old_tab_name，但不包含就表的数据tab_name
CREATE TABLE tab_name like old_tab_name 
```
###mysql常用的聚合函数
```
求和：sum
	select sum("字段名") from 表名;
平均：avg
	select sum("字段") from 表名;
最大：max
	select max("字段名") from 表名;
最小：min
	select min("字段名") from 表名;
总数：count
	select count from 表名;
```
###连接查询
```
inner join
	select  a.字段名，b.字段名，... from tab1 as a inner join tab2 as a on a.id=b.id;
left join 左连接
	select  a.字段名，b.字段名，... from tab1 as a left join tab2 as a on a.id=b.id;  
right join 有连接
	select  a.字段名，b.字段名，... from tab1 as a right join tab2 as a on a.id=b.id;
```


```


