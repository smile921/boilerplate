##. 什么是JPA - **Java Persistence API**

JPA是JavaEE标准的数据访问接口。

* JPA 1.0出现于2006年
* EJB2.0和EJB2.1基本上都失败了
* 当时开源的Hibernate, JDO, Toplink等ORM框架都比EJB更好使
* JPA融合了Hibernate, JDO等设计理念，设计一个统一的标准
* Hibernate是JPA设计的一个重要推动
* Hibernate 3.2版本之后，实现了JPA接口

##. Hibernate的JPA

由于历史的原因，可以看到JPA和传统Hibernate有很多相似之处

* Session -> EntityManager
* HQL -> JPQL
* Criteria -> JPACriteria

另外，在JPA出现之时，Hibernate也正从XML配置向标注配置转换，到3.7之后，标注配置取代XML，成为官方默认推荐的配置方式

下面一一介绍：

##. 标注配置

标注配置和XML配置达到的功能基本一一对应，但是更直观，更容易维护。如Player类的配置
Player.java
```java
@Entity
public class Player {
    @Id
    @GeneratedValue
    private int id;

    @Column(name = "name")
    private String name;

    private int number;
    private int height;

    @ManyToOne(fetch=FetchType.LAZY)
    private Team team;

}
```

Team.java
```java
@Entity
public class Team {
    @Id
    @GeneratedValue
    private int id;

    private String name;

    @OneToMany(mappedBy="team", fetch=FetchType.LAZY)
    private Set<Player> players;
}
```

注：

1. 标注配置将Java对象和XML配置写在一起了，编辑维护更简单
2. 每一种XML配置，都有对应的标注，功能程度是一样的
3. 大部分Hibernate标注都进入到JPA的标准中了。JPA标准是基于标注的
4. 对于简单的映射，如`String name`, 因为代码中已经指明了类型，而数据表的列明又和字段名相同，因此不许要任何配置就可以使用了(Convention over Configuration)

##. EntityManager

JPA引入了新设计的对象存储机制，EntityManager为此实现了如下功能：

* 对象的持久态和暂住态管理
* 事务管理
* 查询构造

前两点主要用于增删改的操作，这里暂不介绍。查询构造和以往的Session区别在于使用的是JPQL和JPACriteria，具体实现有所不同。下面分别介绍

##. JPQL

由于Hibernate深入参与了JPA标准的制定，因此可以发现JPQL和HQL极其类似，下面是球员查询问题的JQPL实现：

```java
    public List<Player> findTallerPlayers() throws SQLException {
        TypedQuery<Player> q = em.createQuery("select p from Player as p, p.team as t"
                + " where t.name like :teamName "
                + " and p.heigt >= :height ", Player.class);

        q.setParameter("teamName", "%Lakers%");
        q.setParameter("height", 198);

        List<Player> players = q.getResultList();
        return players;
    }
```
注：

1. em是EntityManager，在Spring中通过依赖IOC注入
1. EntityManager为构造JPQL提供了createQuery()方法，如果第二个参数是`Class<T>`，则查询的结果是`List<T>`类型的。
1. 注意`TypedQuery<T>`，JPA比传统JPQL更注重类型安全
1. q.setParameter(..), 在传统Hibernate里需要q.setInt(..), q.setString(..)
1. q.getResultList()返回的是`List<T>`，不需要再转型了

##. JPACriteria

在Criteria基础上，JPACriteria添加了另一种构造查询的方式，即使用CriteriaBuilder

```java
    public List<Player> findTallerPlayers3() throws SQLException {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        Metamodel model = em.getMetamodel();

        EntityType<Player> Player_ = model.entity(Player.class);
        CriteriaQuery<Player> cq = cb.createQuery(Player.class);

        SingularAttribute<Player, Integer> height = Player_.getDeclaredSingularAttribute("height", Integer.class);
        SingularAttribute<Player, String> teamName = Player_.getDeclaredSingularAttribute("team.name", String.class);

        Root<Player> player = cq.from(Player.class);

        CriteriaQuery<Player> select = cq.select(player)
                .where(cb.ge(player.get(height), 198))
                .where(cb.like(player.get(teamName), "%Lakers"));

        TypedQuery<Player> typedQuery = em.createQuery(select);
        List<Player> players = typedQuery.getResultList();
        return players;
    }
```

注：

1. 明显可以看到，上面的查询比以往更加复杂罗嗦了
2. 上一节Hibernate的Criteria所有功能在JPACriteria中都有，因此可以一样实现
3. 更罗嗦的查询，是为了实现类型安全以及利于代码生成考虑
4. JPA自带了一套代码生成工具，可以根据@Entity类，自动生成包含Attribute的Entity_类代码，即相当于如下代码：

```java
    @Generated("EclipseLink-2.1.0.v20100614-r7608 @ Tue Jul 27 10:13:02 IST 2010")
    @StaticMetamodel(Player.class)
    public class Player_ {
        public static volatile SingularAttribute<Player, Integer> id;
        public static volatile SingularAttribute<Player, String> name;
        public static volatile SingularAttribute<Player, Integer> number;
        public static volatile SingularAttribute<Player, Integer> number;
        public static volatile SingularAttribute<Player, Team_> team;
    }
```
这样，使用生成的代码，上述查询就变为
```java
   public List<Player> findTallerPlayers3() throws SQLException {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Player> cq = cb.createQuery(Player.class);

        Root<Player> player = cq.from(Player.class);

        CriteriaQuery<Player> select = cq.select(player)
                .where(cb.ge(player.get(Player_.height), 198))
                .where(cb.like(player.get(Player_.team.name), "%Lakers"));

        TypedQuery<Player> typedQuery = em.createQuery(select);
        List<Player> players = typedQuery.getResultList();
        return players;
    }
```
可以看出来，比上面的代码简单很多，并且拼装条件时，已经有了SQL的样子，但达到了类型安全.

总的来说，JPACriteria使用仍然不是很方便

##. JPA的优缺点

**优点**
1. 相对与XML来说, 配置简单
1. JPQL和HQL差不多
1. EntityManager有些细节地方比Session好用
1. 未来的演化方向，Hibernate会逐渐放弃对传统查询的支持

**缺点**
1. JPQL和HQL比起来变化不大，功能仍然不够强大。较复杂的查询，仍然需要切换成原生SQL
1. EntityManger有些细节没有Session好用
1. (JPACriteria) 多了一步代码生成，却没有减少多少复杂度，得不偿失
