##. 什么是QueryDSL

QueryDSL目标: 像SQL一样的Java查询代码。

QueryDSL和JPA Criteria有些类似的理念:

* 用Java代码来组织查询
* 利用工具生成辅助构造查询的类，和Entity类一一对应

但是和Criteria不一样的地方在于，QueryDSL号称DSL，目标就是要达到类似于SQL的编写体验。

##. 使用QueryDSL查询

QueryDSL-JPA版是在JPA基础之上封装的，因此和JPA一样，先配置好`@Entity`类，通过Maven工具会自动生成对应的查询辅助类

如`Player`对应生成`QPlayer`

```java
@Generated("com.mysema.query.codegen.EntitySerializer")
public class QPlayer extends EntityPathBase<Player> {

    public static final QPlayer player = new QPlayer("player");

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final NumberPath<Integer> number = createNumber("number", Integer.class);
    public final NumberPath<Integer> height = createNumber("height", Integer.class);

    public final StringPath name = createString("name");

    public final QTeam team;
}
```

这样在查询时，就可一用QPlayer来构造查询了

```java
    public List<Player> findTallerPlayers2() throws SQLException {
        QPlayer p = QPlayer.player;
        Query q = new JPAQuery(em).from(p)
                   .where(p.team.name.like("%Lakers%")
                   .where(p.height.eq(198));

        List<Player> players = q.list(p);
        return players;
    }
```

可以看出来：

* 查询完全是类型安全的
* 构造查询的代码很流畅，明晰，类似JPQL


##. QueryDSL的优缺点

**优点**

1. 相对于Criteria简单多了，功能却一样强大
1. 可以将查询条件拆分，将常用的子条件提取出来，作为代码复用
1. 可以将复杂的查询拆解成子问题，而不是编写巨大的SQL
1. QueryDSL除了封装 JPA外，也有直接封装了JDBC的库，也有封装NoSQL的库（如 MongoDB)

**缺点**

1. 多一步代码生成的过程，有时候会扰乱编译流程，影响Eclipse的配置
1. 有些细节的地方有Bug，如超过两层以上的关联如`player.team.manager`默认是null，这样如果查询中使用`player.team.manager.name`会遇到NullPointer
1. 在JPA环境中，表达能力和JPA一样，所以无法处理JPA无法处理的复杂查询