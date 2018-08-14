##. 什么是Hibernate

Hibernate是一个ORM(Object Relational Mapping)框架，ORM顾名思义，将面向对象编程(Object)和关联数据库(Relational)两者联系起来，我们查询时只需要按照对象的关联来查询，ORM框架将其转化为SQL语句，并自动将查询结果组装成对象

这一节里介绍的是基于XML配置的Hibernate HQL查询

##. XML配置

传统的Hibernate是通过XML文件来配置的，配置有两类

1. 数据连接以及Hibernate整体配置 hibernate.cfg.xml
1. ORM映射配置 `Player.hbm.xml`

**hibernate.cfg.xml**
```xml
<hibernate-configuration>

    <session-factory>

        <!-- Database connection settings -->
        <property name="connection.driver_class">com.mysql.jdbc.Driver</property>
        <property name="connection.url">jdbc:mysql://localhost:3306</property>
        <property name="connection.username">root</property>
        <property name="connection.password"></property>

        <!-- JDBC connection pool (use the built-in) -->
        <property name="connection.pool_size">1</property>

        <!-- SQL dialect -->
        <property name="dialect">org.hibernate.dialect.MySQLDialect</property>

        <!-- Enable Hibernate's automatic session context management -->
        <property name="current_session_context_class">thread</property>

        <!-- Import Class Mappings -->
        <mapping resource="com/supertool/nba/mapping/Player.hbm.xml"/>

    </session-factory>

</hibernate-configuration>
```

**Player.hbm.xml**

```xml
<hibernate-mapping>
    <class name="com.supertool.nba.model.Play" table="player">
        <id name="id" type="java.lang.Integer">
            <column name="id"/>
            <generator class="native"/>
        </id>
        <property name="name" type="java.lang.String">
            <column name="name" length="100"></column>
        </property>
        <property name="number" type="java.lang.Integer">
            <column name="number"></column>
        </property>
        <property name="height" type="java.lang.Integer">
            <column name="height"></column>
        </property>
        <!-- Many-to-One Mapping -->
        <many-to-one name="team" column="teamId" not-null="true" />
    </class>
</hibernate-mapping>
```

##. 对象的关系

`注意上面的映射Player.hbm.xml中，Player和Team的关联是通过<many-to-one />来联系的`。

我们在类设计中直接将这两个类关联起来，如下：


```java
public class Player {
    private int id;
    private String name;
    private int number;
    private int height;
    private Team team;

    // Getters/Setters
    // ...
}

public class Team {
    private int id;
    private String name;
    private Set<Player> players;

    // Getters/Setters
    // ...
}

```

其中Team的映射 Team.hbm.xml 如下：

```xml
<hibernate-mapping>
    <class name="com.supertool.nba.model.Team" table="player">
        <id name="id" type="java.lang.Integer">
            <column name="id"/>
            <generator class="native"/>
        </id>
        <property name="name" type="java.lang.String">
            <column name="name" length="100"></column>
        </property>
        <!-- One-to-Many Mapping -->
        <set name="players">
            <key column="teamId" not-null="true"/>
            <one-to-many class="com.supertool.nba.model.Player"/>
        </set>
    </class>
</hibernate-mapping>
```

做好这样的映射后，以后查询出来的Player对象，就可一直接调用 `player.getTeam()`来获取其Team对象，Hibernate会自动调用相应的查询；在Team对象中，也可一直接查询`team.getPlayers()`来获取所属的全部Player。


##. Hibernate里的查询

Hibernate的查询方式有两种：HQL 和 Criteria

HQL：Hibernate Query Language，是面向对象的类似SQL语言的查询语言。
Criteria：完全程序化的组装查询。

两者的功能基本一致，只是使用方式和风格不一样。上一节讲到的查询，用HQL和Criteria的查询方法分别如下：

##. HQL

HQL和SQL很像，区别在于：

1. HQL查询的目标是对象(Player, Team等Java类)
1. 之所以设计HQL，而不是用SQL，是为了封装各种不同数据库的特殊语法，即我们一旦写好一个HQL查询，在切换数据库（如MySQL->SQLServer)，这个HQL仍然是可用的

代码如下：

```java
    public List<Player> findTallerPlayers() throws SQLException {
        // *(1) Session (2) p.team.name
        Query q = session.createQuery(
                "select p from Player as p "
                + " where p.team.name like :teamName "
                + " and p.heigt >= :height ");

        // *(3) named parameters
        q.setString("teamName", "%Lakers%");
        q.setInteger("height", 198);

        // *(4) Automatic Object conversion
        @SuppressWarnings("unchecked")
        List<Player> players = (List<Player>) q.list();
        return players;
    }
```
注：

1. Session是Hibernate的查询容器，封装了JDBC的Connection，并包含事务管理
1. 可以看出HQL和SQL的主要区别，HQL查询的是对象，因此可以直接使用关联关系`p.team.name like :teamName`来查询
1. Hibernate的Query对象添加了根据名称(如`:teamName`)来设置参数的功能，比根据位置(站位符`?`)更容易维护
1. 查询出来的结果直接就是`List<Player>`了，不需要手动转换

## Criteria

和HQL及SQL通过字符串拼凑查询语句的方式不同，Criterial是使用程序和对象拼凑一个查询对象的。这样查询条件可以拼接、复用，甚至以程序生成，更加灵活。

代码如下：

```java
    public List<Player> findTallerPlayers1() throws SQLException {

        Criteria crit = session.createCriteria(Player.class)
                .add(Restrictions.ge("height", 198))
                .add(Restrictions.like("p.team.name", "%Lakers%"));

        @SuppressWarnings("unchecked")
        List<Player> players = (List<Player>) crit.list();
        return players;
    }
```
注：

1. 可以看出来，Criteria查询和HQL基本上是一一对应的。
1. 各种条件通过函数来构建，如 `Restrictions.like(..)`等，这些条件可以单独声明，在其他代码中复用

##. HQL/Criteria的优缺点

**优点**

1. 面向对象，在Service层和Model设计时，可以更专注对象之间的关系
1. 组装对象结果很简单
1. 隐藏了各种数据库的不同，因此跨数据库及可移植性高
1. Hibernate本身有很好的缓存机制
1. 某些细节(如名字参数)比JDBC好
1. (Criteria) 程序化组装，复用性好

**缺点**

1. 因为隐藏了各种数据库的不同，因此每个数据库独有的高级功能无法使用
1. 通过反射机制填装对象，因此效率会低于手写的填装代码(缓存机制可以很好的弥补)
1. (Criteria) 接口设计的不够直观，调用起来比较罗嗦
1. 仍然使用字符串来获取字段，如`"p.team.name"`，不够类型安全
