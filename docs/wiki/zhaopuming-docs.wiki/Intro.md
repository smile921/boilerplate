##. 问题描述：

我们设计一个简单的查询

> **从球员表中，查找“湖人”队中身高大于或等于198cm的队员。**

这是一个简单的联表查询。假设数据库中有**球员表**和**球队表**，如下定义：

##. 数据库表单

**球员表**

```sql
    create table player (
      id int not null primary key auto_increment,
      name varchar(200) not null,
      number int not null,
      height int not null default 198 comment 'cm',
      teamId int not null,
      foreign key (teamId) references team(id)
    );
```

**球队表**

```sql
    create table team (
      id int not null primary key auto_increment,
      name varchar(100) not null
    );
```

##. SQL查询语句

```sql
    select p.* from player as p, team as t 
    where p.teamId = t.id 
    and t.name like '%Lakers%'
    and p.height >= 198;
```

##. 查询结果

```
+----+-------------------+--------+--------+--------+
| id | name              | height | teamId | number |
+----+-------------------+--------+--------+--------+
|  1 | Kobe Bryant       |    201 |      1 |     24 |
|  2 | Pau Gasol         |    216 |      1 |     16 |
|  3 | Metta World Peace |    203 |      1 |     15 |
+----+-------------------+--------+--------+--------+
```