##. 什么是MyBatis

MyBatis是介于JDBC和ORM之间的解决方案，主要解决的问题是查询结果到对象层的组装

设计目标：

* 简单
* 灵活
* 高效

主要机制：

*  只是对JDBC的简单封装
*  使用XML组装查询SQL
*  `多数查询只要List<Map>类型结果就足够好了`
*  使用XML配置如何组装查询结果到对象层

##. 使用MyBatis查询

**配置连接**

````xml

<configuration>
  <environments default="development">
    <environment id="development">
      <transactionManager type="JDBC"/>
      <dataSource type="POOLED">
        <property name="driver" value="${driver}"/>
        <property name="url" value="${url}"/>
        <property name="username" value="${username}"/>
        <property name="password" value="${password}"/>
      </dataSource>
    </environment>
  </environments>
  <mappers>
    <mapper resource="com/supertool/nba/mapper/Player.xml"/>
  </mappers>
</configuration>

````

**配置查询**

````xml

<mapper namespace="com.supertool.nba.mapper.PlayerMapper">
  <select id="selectTallerPlayers" parameterType="int" resultType="com.supertool.nba.model.Player">
    select p.* from player as p, team as t
    where p.height > #{height}
    and p.teamId = t.id
    and t.name like #{teamName}
  </select>
</mapper>

````

**查询接口**

````java
package com.supertool.nba.mapper;

public interface PlayerMapper {
    public List<Player> selectTallerPlayers(@Param("height") int height, @Param("teamName") String teamName);
}

````

**使用查询**

````java
public List<Player> findTallerPlayers() {
    PlayerMapper mapper = session.getMapper(PlayerMapper.class);
    List<Player> players = mapper.selecTallerPlayers(198, "%Lakers");
    return players;
}

````

##. MyBatis的优缺点

**优点**

1. 配置简单，学习曲线极低
1. 维护简单
1. 性能高
1. 可以做到复杂的查询映射

**缺点**

1. 和JDBC一样，使用原生SQL，所以移植性差
2. 由于是用XML来组织映射，做复杂查询的结果映射时会相对麻烦
