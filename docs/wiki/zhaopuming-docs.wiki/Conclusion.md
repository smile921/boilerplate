1. JDBC太底层，不适合直接使用
1. MyBatis, QueryDSL-SQL直接封装JDBC，复杂度和性能都合适，如果在确认数据库不需要更换的情况下，非常合适
1. Hibernate/JPA较重量级，并且在很多复杂查询时还是得回到原生SQL
1. JPA的话，推荐和QueryDSL-JPA配合使用
1. 如果想学做数据访问层设计，还有很多其他的库可以参考: 
    1. Java语言：
        1. JDO (Apache)
        1. Ebean (Scala官方的组件Play!Framework的Java模块使用，替代了JPA)
    1. Scala语言：
        1. Anorm (Scala官方)   
        1. Squeryl
        1. Circumflex ORM (和SQL看起来几乎一样的DSL)
        1. Querulous (from Twitter)
    1. 其他JVM语言