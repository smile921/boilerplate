const appConfig = require('../src/app.config')

module.exports = {
  title: appConfig.title + ' ... ',
  description: appConfig.description,
  themeConfig: {
    nav: [
      { text: '主页', link: '/' },
      { text: '前端', link: '/docs/front/ember-goods.html' },
      { text: '后端', link: '/docs/note/java/jvm_princple_structure__gc_in_details.html' },
      { text: 'JAVA', link: '/docs/note/java/JAVA-JIT-performancing.html' },
      { text: '学习文档', link: '/docs/note/java/java-note-tips.html' },
      { text: '其它', link: '/docs/note/java/latest-news.html' },
      // 下拉列表的配置
      {
        text: '语言',
        items: [
          { text: '中文', link: '/#' },
          // { text: 'English', link: '/language/English' }
        ]
      }
    ],
    // sidebar: [
    //   ['/', ' 开篇笔记 '],
    //   // ['/docs/note/OpenAPI-3.0','Open API 3.0 '],
    // ],
    sidebar: [
      {
        title: 'home',
        collapsable: true,
        children: [
          ['/','首页'],
        ]
      },
      {
        title: '前端',
        collapsable: true,
        children: [
          // ['/','开篇笔记'],
          ['/docs/front/ember-goods', 'ember goods'],
          ['/docs/front/vue-goods', 'vue goods'],
          ['/docs/front/common-goods', '收集一些实用好东东'],
          ['/docs/front/grid-layout', '网格布局'],
          ['/docs/front/sourcemap-seven-type','7种 sourcemap 选项详解'],
        ]
      },
      {
        title: 'JAVA',
        collapsable: true,
        children: [
          // ['/','开篇笔记'],
          ['/docs/note/java/JAVA-JIT-performancing','JIT 代码分析与优化工具'],
          ['/docs/note/java/spring-boot-app-src', 'spring boot application 创建启动'],
          ['/docs/note/java/vert.x', 'vert.x'],
          ['/docs/note/java/vert.x-API-Gateway', 'VX-API-Gateway'],
          ['/docs/note/java/Dropwizard', 'Dropwizard'],
          ['/docs/note/java/JDK OpenJDK binaries', 'JDK OpenJDK binaries'],
          ['/docs/note/java/ZGC you should know', 'ZGC you should know'],
          ['/docs/note/java/jvm-memory', 'jvm 内存模型'],
          ['/docs/note/java/ten-java-written', '10道java面试题'],
        ]
      },
      {
        title: '后端',
        collapsable: true,
        children: [
          // ['/','开篇笔记'],
          ['/docs/note/about-lock', '乐观锁与悲观锁'],
          ['/docs/note/java/jvm_princple_structure__gc_in_details', 'JVM 的 工作原理，层次结构 以及 GC工作原理'],
          ['/docs/note/java/JVM-Architecture', 'JVM Architecture'],
          ['/docs/note/java/message-queue', '消息队列'],
        ]
      },
      {
        title: '笔记',
        collapsable: true,
        children: [
          // ['/','开篇笔记'],
          ['/docs/note/java/java-note-tips','JAVA 一些笔记小tips '],
          ['/docs/note/java/note-java-top-problems', 'java 笔记'],
          ['/docs/note/Monad-you-need-know', 'Monad 笔记'],
        ]
      },
      {
        title: '其它',
        collapsable: true,
        children: [
          // ['/','开篇笔记'],
          ['/docs/note/java/latest-news', '一些前沿的技术，权当拓宽视野吧'],
          ['/docs/note/Here are the 5 free platforms for notebook','五种免费的 Jupyter Notebook 平台'],
          ['/docs/note/nothing-it-will-change','蔡志忠：努力是没有用的'],
          ['/docs/some_interesting','一些有趣的东西'],
          ['/docs/guide/architecture','architecture'],
        ]
      },
      {
        title: 'blog1',
        collapsable: true,
        children: [
          // ['/','开篇笔记'],
          '/docs/wiki/APITest.wiki/Create-good-test-plan',
          '/docs/wiki/APITest.wiki/Home',
          ['/docs/wiki/APITest.wiki/a60c29f44f3afa883ac4c15244edf826','Java-8-Lambda-表达式'],
          ['/docs/wiki/APITest.wiki/dcd573062801f16a48fe67b9fa5cee0a','Java-性能调优'],
          ['/docs/wiki/APITest.wiki/e750fab40ace7a0e351da48b9182c432','Linux-常用命令汇总'],
          '/docs/wiki/APITest.wiki/NIO-What-is-NIO---Non-Blocking-IO',
          '/docs/wiki/APITest.wiki/PinPoint-Introduction',
          ['/docs/wiki/APITest.wiki/c2f42bd2a149bbeb4627b1e1b5fabedb','性能优化'],
          ['/docs/wiki/APITest.wiki/2e576047ae509e55d8e86f36d730caf4','正则表达式'],
          ['/docs/wiki/APITest.wiki/4a670268e1c9b50795f89e55b4fe4df2','测试人员的角色定位'],
          ['/docs/wiki/APITest.wiki/f515195aa155e01711ede5439a569d71','负载均衡策略'],
          ['/docs/wiki/APITest.wiki/2db47d2d68aaf50a35e27e58822a13a2','面向对象的类的设计原则'],
          ['/docs/wiki/APITest.wiki/432de5d5191102cd497b52fb5412f4fc','Ｊａｖａ内存模型'],
        ]
      },
      {
        title: 'blog2',
        collapsable: true,
        children: [
          // ['/','开篇笔记'],
          '/docs/wiki/blog.wiki/design_pattern',
          '/docs/wiki/blog.wiki/Home',
          ['/docs/wiki/blog.wiki/76893b63e68ca4f5382cc199f6679de6','RUP及UML建模'],
          ['/docs/wiki/blog.wiki/bb77a6161f572e6f5dec6bd9db61f199','SQLITE数据库应用'],
          ['/docs/wiki/blog.wiki/8ad2bd59d24a31dc4d3daac27e671f55','vim配置'],
          '/docs/wiki/blog.wiki/_Footer',
          '/docs/wiki/blog.wiki/_Sidebar',
          ['/docs/wiki/blog.wiki/3112f26ec060c26b7aaebc2fbaf9cb76','服务器推技术实现'],
          ['/docs/wiki/blog.wiki/be2df775eb1d64e43a569cde6c7aa974','面向对象设计'],
        ]
      },
      {
        title: 'blog3',
        collapsable: true,
        children: [
          // ['/','开篇笔记'],
          '/docs/wiki/Bulls.wiki/foreach-remove-concurrentmodificationexception',
          '/docs/wiki/Bulls.wiki/gameserver-java-advanced',
          '/docs/wiki/Bulls.wiki/gameserver-save-strategy',
          '/docs/wiki/Bulls.wiki/git-basic-practice',
          '/docs/wiki/Bulls.wiki/Home',
          '/docs/wiki/Bulls.wiki/java-gameserver-practice',
          '/docs/wiki/Bulls.wiki/java-io-netty-practice',
          '/docs/wiki/Bulls.wiki/java-log-detail',
          '/docs/wiki/Bulls.wiki/java-profiling-tools',
          '/docs/wiki/Bulls.wiki/java-profiling-practice',
          '/docs/wiki/Bulls.wiki/jvm-memory-detail',
          '/docs/wiki/Bulls.wiki/ten-java-written-test',
        ]
      },
      {
        title: 'blog4',
        collapsable: true,
        children: [
          //
          // ['/','开篇笔记'],
          '/docs/wiki/cheat-sheet.wiki/architecture-slang',
          '/docs/wiki/cheat-sheet.wiki/awesome',
          '/docs/wiki/cheat-sheet.wiki/awk',
          '/docs/wiki/cheat-sheet.wiki/Blogs',
          '/docs/wiki/cheat-sheet.wiki/Book-List',
          '/docs/wiki/cheat-sheet.wiki/Books',
          '/docs/wiki/cheat-sheet.wiki/functional-interface',
          '/docs/wiki/cheat-sheet.wiki/Git-Tutorial',
          '/docs/wiki/cheat-sheet.wiki/Git',
          '/docs/wiki/cheat-sheet.wiki/grep',
          '/docs/wiki/cheat-sheet.wiki/Home',
          '/docs/wiki/cheat-sheet.wiki/interview',
          '/docs/wiki/cheat-sheet.wiki/Jackson',
          '/docs/wiki/cheat-sheet.wiki/java-memory-model',
          '/docs/wiki/cheat-sheet.wiki/Java-Project',
          '/docs/wiki/cheat-sheet.wiki/Java-Tools',
          '/docs/wiki/cheat-sheet.wiki/Java8',
          '/docs/wiki/cheat-sheet.wiki/javac',
          '/docs/wiki/cheat-sheet.wiki/javap',
          '/docs/wiki/cheat-sheet.wiki/Javascript-Project',
          '/docs/wiki/cheat-sheet.wiki/jvm-optimize',
          ['/docs/wiki/cheat-sheet.wiki/ac1c659a8a872e66ee9d5508c1440a48','Java基础环境'],
          '/docs/wiki/cheat-sheet.wiki/JVM-tools',
          '/docs/wiki/cheat-sheet.wiki/JVM',
          '/docs/wiki/cheat-sheet.wiki/keymap',
          '/docs/wiki/cheat-sheet.wiki/Linux-Shell',
          '/docs/wiki/cheat-sheet.wiki/Log',
          '/docs/wiki/cheat-sheet.wiki/log4j-config',
          '/docs/wiki/cheat-sheet.wiki/Maven-FAQ',
          '/docs/wiki/cheat-sheet.wiki/maven',
          '/docs/wiki/cheat-sheet.wiki/MySQL',
          '/docs/wiki/cheat-sheet.wiki/new-datetime-api',
          '/docs/wiki/cheat-sheet.wiki/NoSQL',
          '/docs/wiki/cheat-sheet.wiki/OPS',
          '/docs/wiki/cheat-sheet.wiki/Python-Project',
          '/docs/wiki/cheat-sheet.wiki/redis',
          '/docs/wiki/cheat-sheet.wiki/Servlet',
          '/docs/wiki/cheat-sheet.wiki/Shell-Shortcut',
          '/docs/wiki/cheat-sheet.wiki/ssh',
          '/docs/wiki/cheat-sheet.wiki/sublime-config',
          '/docs/wiki/cheat-sheet.wiki/Tomcat-Deploy',
          '/docs/wiki/cheat-sheet.wiki/Tools',
          '/docs/wiki/cheat-sheet.wiki/web-xml-config',
          '/docs/wiki/cheat-sheet.wiki/WebSite',
          '/docs/wiki/cheat-sheet.wiki/ZooKeeper',
          '/docs/wiki/cheat-sheet.wiki/_Footer',
          '/docs/wiki/cheat-sheet.wiki/_Sidebar',
          ['/docs/wiki/cheat-sheet.wiki/0d3092e43af851a6599df5d41c3a2c58','国外程序员整理的Java资源大全'],
          ['/docs/wiki/cheat-sheet.wiki/19495fe20b0881495ad904febca74be9','如何查看Java类对应的字节码'],
          ['/docs/wiki/cheat-sheet.wiki/648ba1aa4333742f781824ac57367bb7','最常用的Java库一览'],
          ['/docs/wiki/cheat-sheet.wiki/e96b3c4811f6ae3ce8909ce9cf4614c2','老衣的开发工具和类库集之2014版'],
        ]
      },
      {
        title: 'blog5',
        collapsable: true,
        children: [
          //
          // ['/','开篇笔记'],
          '/docs/wiki/core-java.wiki/Advanced-Multi-threading-Concepts',
          '/docs/wiki/core-java.wiki/Concurrent-Collection',
          '/docs/wiki/core-java.wiki/Home',
          '/docs/wiki/core-java.wiki/IO-Streams',
          '/docs/wiki/core-java.wiki/JVM-Architecture',
          '/docs/wiki/core-java.wiki/Language-Fundamentals',
          '/docs/wiki/distributed.wiki/Home',
          ['/docs/wiki/distributed.wiki/fd0cc328a7a82788cf2bcc69bfe346a7','JAVA缓存'],
        ]
      },
      {
        title: 'blog6',
        collapsable: true,
        children: [
          //
          // ['/','开篇笔记'],
          '/docs/wiki/fanfever-roadmap.wiki/atlassian',
          '/docs/wiki/fanfever-roadmap.wiki/AWS',
          '/docs/wiki/fanfever-roadmap.wiki/CI',
          '/docs/wiki/fanfever-roadmap.wiki/coding-convention',
          '/docs/wiki/fanfever-roadmap.wiki/coding-style',
          '/docs/wiki/fanfever-roadmap.wiki/concurrency',
          '/docs/wiki/fanfever-roadmap.wiki/Docker',
          '/docs/wiki/fanfever-roadmap.wiki/DesignPattern',
          '/docs/wiki/fanfever-roadmap.wiki/ElasticSearch',
          '/docs/wiki/fanfever-roadmap.wiki/framework',
          '/docs/wiki/fanfever-roadmap.wiki/Hadoop',
          '/docs/wiki/fanfever-roadmap.wiki/git',
          '/docs/wiki/fanfever-roadmap.wiki/hbase',
          '/docs/wiki/fanfever-roadmap.wiki/Home',
          '/docs/wiki/fanfever-roadmap.wiki/ide',
          '/docs/wiki/fanfever-roadmap.wiki/JVM',
          '/docs/wiki/fanfever-roadmap.wiki/Lambda',
          '/docs/wiki/fanfever-roadmap.wiki/linux',
          '/docs/wiki/fanfever-roadmap.wiki/LocalDate',
          '/docs/wiki/fanfever-roadmap.wiki/maven',
          '/docs/wiki/fanfever-roadmap.wiki/micro-benchmark',
          '/docs/wiki/fanfever-roadmap.wiki/metrics',
          '/docs/wiki/fanfever-roadmap.wiki/microserver',
          '/docs/wiki/fanfever-roadmap.wiki/mysql',
          '/docs/wiki/fanfever-roadmap.wiki/node.js',
          '/docs/wiki/fanfever-roadmap.wiki/orm',
          '/docs/wiki/fanfever-roadmap.wiki/OS-X',
          '/docs/wiki/fanfever-roadmap.wiki/regular-expression',
          '/docs/wiki/fanfever-roadmap.wiki/server',
          '/docs/wiki/fanfever-roadmap.wiki/shell',
          '/docs/wiki/fanfever-roadmap.wiki/shiro',
          '/docs/wiki/fanfever-roadmap.wiki/slides',
          '/docs/wiki/fanfever-roadmap.wiki/spring-boot',
          '/docs/wiki/fanfever-roadmap.wiki/Sublime-text-3',
          '/docs/wiki/fanfever-roadmap.wiki/temp',
          '/docs/wiki/fanfever-roadmap.wiki/temp.md',
          '/docs/wiki/fanfever-roadmap.wiki/Vagrant',
          '/docs/wiki/fanfever-roadmap.wiki/vps',
          '/docs/wiki/fanfever-roadmap.wiki/windows-10',
          ['/docs/wiki/fanfever-roadmap.wiki/baebdfe11917500c6829d24fb2be9ab6','后端环境部署Version1'],
          ['/docs/wiki/fanfever-roadmap.wiki/9c27c43dda3fbc24eda40419b7ba3a99','安全性'],
          ['/docs/wiki/fanfever-roadmap.wiki/46406268363f139863801805787e0eea','新手入门'],
          ['/docs/wiki/fanfever-roadmap.wiki/3b66e969d7c027cad85d87ce0fba0c19','笔试题'],
          ['/docs/wiki/fanfever-roadmap.wiki/904206cc57b9eaf646219af04aefd205','笔试题答案'],
          ['/docs/wiki/fanfever-roadmap.wiki/08c04e55a621464856edaf8aab64c398','自定义字段mysql索引实现调研'],
        ]
      },
      {
        title: 'blog7',
        collapsable: true,
        children: [
          // '/docs/wiki/fanfever-roadmap.wiki/atlassian',
          '/docs/wiki/zhaopuming-docs.wiki/Centron',
          '/docs/wiki/zhaopuming-docs.wiki/Conclusion',
          '/docs/wiki/zhaopuming-docs.wiki/Debug-and-deploy',
          '/docs/wiki/zhaopuming-docs.wiki/Eclipse-tips',
          '/docs/wiki/zhaopuming-docs.wiki/Home',
          '/docs/wiki/zhaopuming-docs.wiki/Hibernate',
          '/docs/wiki/zhaopuming-docs.wiki/Intro',
          '/docs/wiki/zhaopuming-docs.wiki/Java-database-intro',
          '/docs/wiki/zhaopuming-docs.wiki/Java-memory',
          '/docs/wiki/zhaopuming-docs.wiki/JDBC',
          '/docs/wiki/zhaopuming-docs.wiki/JPA',
          '/docs/wiki/zhaopuming-docs.wiki/Maven',
          '/docs/wiki/zhaopuming-docs.wiki/Message-queue',
          '/docs/wiki/zhaopuming-docs.wiki/Mybatis',
          '/docs/wiki/zhaopuming-docs.wiki/Paste-bin',
          '/docs/wiki/zhaopuming-docs.wiki/Querydsl',
          '/docs/wiki/zhaopuming-docs.wiki/Vert.x-code-review',
          '/docs/wiki/zhaopuming-docs.wiki/Vert.x-data',
          ['/docs/wiki/zhaopuming-docs.wiki/a87f55f8fb07bd459978d121462bfaaa','技术讨论'],
        ]
      },
      {
        title: 'blog8',
        collapsable: true,
        children: [
          // '/docs/wiki/fanfever-roadmap.wiki/atlassian',
          ['/docs/wiki/blog.wiki/c/1fc69abd66023d2f999c8f2c08d853b7','cgi模仿'],
          ['/docs/wiki/blog.wiki/c/e0b7be03ac52c1bf86cf8dc201cd4b5f','c笔记'],
          ['/docs/wiki/blog.wiki/c/661bfb5f1fb65ecaa3526f6d4dff6518','c算法'],
          ['/docs/wiki/blog.wiki/c/41ef4a9aab3bf19dbef32f2cece7d2b7','GDB调试'],
          '/docs/wiki/blog.wiki/c/queue_impl',
          '/docs/wiki/blog.wiki/c/stack_impl',
          ['/docs/wiki/blog.wiki/go/205de81b86da3bbcff9ba556b6eae28e','Chan在多线程中的应用'],
          ['/docs/wiki/blog.wiki/go/eadfc8a04f7004ed6336071efb52a4c3','Go与Memcache交互应用'],
          ['/docs/wiki/blog.wiki/go/9225946559cedcd8b01591c31e6c27c1','Go与Mongo交互应用'],
          ['/docs/wiki/blog.wiki/go/e093603abb9c184cd793e8a8a8bcd3b6','Go与Mysql交互应用'],
          ['/docs/wiki/blog.wiki/go/017bfef328765c9e235ad39b0e6ed7d0','Go与Redis交互应用'],
          ['/docs/wiki/blog.wiki/go/e437625b23be0367e3948aed7747dd72','Go中Socket及Http应用'],
          ['/docs/wiki/blog.wiki/hbase/968d4f7f04120954cd6fbdc21fe148ca','Hbase优化配置'],
          ['/docs/wiki/blog.wiki/hbase/b65bd8848f167614118a2c2bc3e1cb12','Hbase概要'],
          ['/docs/wiki/blog.wiki/hbase/179da9b00c0fa063dc4ef4ed3aa384b7','HBase的安装'],
          ['/docs/wiki/blog.wiki/hbase/437ab79d11dec13a0f5d7f9d6919a35a','Hbase相关操作命令'],
          ['/docs/wiki/blog.wiki/html_css_js/82a184b0ecd2459a24610fbfa16a2a02','js跨域请求方法'],
          ['/docs/wiki/blog.wiki/html_css_js/8f7c644f9769e6a5a859454c83be8b22','开发笔记'],
          ['/docs/wiki/blog.wiki/html_css_js/878463c7939190ec51b0845f57da1301','文字自动截断'],
          ['/docs/wiki/blog.wiki/html_css_js/2a3efc04c28b4986aa9528a1b33e4def','禁止复制拖动'],
          ['/docs/wiki/blog.wiki/http/781845986ee36177787d800556571063','HTTP代理'],
          ['/docs/wiki/blog.wiki/http/9aa9f3eb840e2278563d9b10a2642144','HTTP协议'],
          ['/docs/wiki/blog.wiki/http/26da68c89720dde7b9658a627e3cd554','HTTP缓存'],
          ['/docs/wiki/blog.wiki/java/0c049653ab1b66add546d2bc9ce05b59','AOP切面编程应用'],
          ['/docs/wiki/blog.wiki/java/a305972e3165e4e86de578ed3f39456a','HttpClient应用'],
          ['/docs/wiki/blog.wiki/java/8639031def12198dd3d428e1028c9d08','Java8日期时间API'],
          ['/docs/wiki/blog.wiki/java/77b6c46d1257b9283025f5b41ec4a302','JavaSsist的使用'],
          '/docs/wiki/blog.wiki/java/Java_AesForNodeJs',
          '/docs/wiki/blog.wiki/java/Java_CountDownLatch',
          '/docs/wiki/blog.wiki/java/Java_HttpClient',
          '/docs/wiki/blog.wiki/java/Java_nio',
          '/docs/wiki/blog.wiki/java/Java_RPC',
          ['/docs/wiki/blog.wiki/java/075fb700de5cbaac4d20c0b489fdaf7f','Java_多线程'],
          ['/docs/wiki/blog.wiki/java/c2a01acbfac579b626ec5adbd3726b80','Java_多线程与单例模式'],
          ['/docs/wiki/blog.wiki/java/f7ad3f75c7ec191a636cbb768ea275f1','Java_虚拟机主要参数'],
          ['/docs/wiki/blog.wiki/java/558e599d7311a47f0b3a90a2aec3a96b','Java_虚拟机性能监控与故障处理工具'],
          ['/docs/wiki/blog.wiki/java/d00d8ab464753f5a1717624a5206a806','Java与Memcached'],
          ['/docs/wiki/blog.wiki/java/c6dd894289f8a4ba3a77d7d41be1fccd','Java与Node结合AES加密解密'],
          ['/docs/wiki/blog.wiki/java/75953cc56ed5823cc6445e3c026f124f','Java与RabbitMQ'],
          ['/docs/wiki/blog.wiki/java/372a955f32b497749f06ffa90496e151','Java中volatile详解'],
          ['/docs/wiki/blog.wiki/java/edbeae5a604092d116e05705f1e11c52','Java与Redis'],
          ['/docs/wiki/blog.wiki/java/8773f19ab7fb15726eadd180b0316a6d','Java中定时任务应用'],
          ['/docs/wiki/blog.wiki/java/f6458f2810030297e569fb7010a7f5aa','Java中的xml解析'],
          ['/docs/wiki/blog.wiki/java/21c13dd14a4573267a31f971f9a74091','Java动态代理'],
          ['/docs/wiki/blog.wiki/java/1d0b6660a6550845b8ebb9f09f8d6d8b','Java垃圾回收器原理'],
          ['/docs/wiki/blog.wiki/java/79bd95be1f8b24c65ff3102db300cf62','Java树生成方法'],
          ['/docs/wiki/blog.wiki/java/2bb880b4a9ca14276e6a671fb51dcb12','Java自定义注解初试'],
          ['/docs/wiki/blog.wiki/java/3f0b4f146c541e9d2b497c1e1fbca31e','Java读取classpath中的文件'],
          ['/docs/wiki/blog.wiki/java/fe3d9b158ebba9135d95c2d3c95c1026','Java读取大文件方法'],
          ['/docs/wiki/blog.wiki/java/6bc773028e60809eba7a07e46bf05cd5','Java读文件方法'],
          ['/docs/wiki/blog.wiki/java/b5832d2ae1fb9099ba30776aba0b75bd','JVM内存及CPU占用过高排查'],
          ['/docs/wiki/blog.wiki/java/605b186b34220bea9a7b810a76f4116d','log4j日志应用'],
          ['/docs/wiki/blog.wiki/java/0b6a1ef6a797c71b21a60e12cc806893','spring-事务应用'],
          ['/docs/wiki/blog.wiki/java/47fe47deecd1827fb2197fcb7e46481d','URLConnection应用'],
          ['/docs/wiki/blog.wiki/java/2b6df45ce28cf41bdc71c1ce31c5b3d9','过滤器、监听器和拦截器'],
          ['/docs/wiki/blog.wiki/maven/b15b04b4efc517bde522570f2000e0ad','maven_assembly打包插件应用'],
          ['/docs/wiki/blog.wiki/maven/c03abb98db922fab9d229adf3de902de','maven仓库'],
          ['/docs/wiki/blog.wiki/maven/a0bf9998671b0e604d79055b593284de','maven依赖范围'],
          ['/docs/wiki/blog.wiki/maven/605dd167ebbfae2ffe748ff3ee719247','maven常用命令'],
          ['/docs/wiki/blog.wiki/maven/ef27d89a58e65329fdad8c29fcb1f137','maven环境差异化应用'],
          ['/docs/wiki/blog.wiki/memcached/7c5e99fd9fe3c5ae3c60439e18d9aa29','memcached内存管理机制'],
          ['/docs/wiki/blog.wiki/memcached/5a21305b54eb60d1e47fb4ce96e7a73f','memcached分布式算法'],
          ['/docs/wiki/blog.wiki/memcached/ce371782e569e5c54b68da28e9e4beda','memcached安装'],
          ['/docs/wiki/blog.wiki/mongodb/5ecf95d5fcd5b98f927e5b2996bb3f35','MongoDB安装'],
          ['/docs/wiki/blog.wiki/mongodb/bf2db2a382f481e3a910d249460d27d8','MongoDB的CURD操作'],
          ['/docs/wiki/blog.wiki/mongodb/137527669a236cab00ef7c47028b6c6e','redis、memcached和mongodb的对比'],
          ['/docs/wiki/blog.wiki/mysql/b78416dbf3167b7b98bde632dd341f0b','MYSQL主从复制'],
          ['/docs/wiki/blog.wiki/mysql/88edabcddd6bdb2c02c3c4e5ab51d165','MYSQL中文乱码问题'],
          ['/docs/wiki/blog.wiki/mysql/af0d4bf5dca2fddac4b5d1b852a317d0','MYSQL内置函数'],
          ['/docs/wiki/blog.wiki/mysql/d82767046d4a5e596c17b2ba50af6685','MYSQL分区管理'],
          ['/docs/wiki/blog.wiki/mysql/b03094286c8ca8d4584516602fc7a12f','MYSQL分区类型'],
          ['/docs/wiki/blog.wiki/mysql/453ff37cbc91c5a9a2dc645ec64f9c1e','MYSQL分库分表方案'],
          ['/docs/wiki/blog.wiki/mysql/a8b4dcad81a675b040563601e93f09cb','MYSQL复制语句'],
          ['/docs/wiki/blog.wiki/mysql/5d1576ffb1f9f60d6cc899e26a46c389','MYSQL学习笔记'],
          ['/docs/wiki/blog.wiki/mysql/b09b69a240f3e80e58d3edeb95e69475','MYSQL安装'],
          ['/docs/wiki/blog.wiki/mysql/84c3ab682833dcc823c030c188615362','MYSQL应用实例'],
          ['/docs/wiki/blog.wiki/mysql/6650e6c1c91294a984398f1407abadcb','MYSQL性能优化'],
          ['/docs/wiki/blog.wiki/nginx/ce92bc60ab603da10a0442244619a8f9','NGINX_GDB调试'],
          ['/docs/wiki/blog.wiki/nginx/206dea9c84856da23fb303666f9e7ae4','NGINX优化配置'],
          ['/docs/wiki/blog.wiki/nginx/6525d365fde5d8f7f474aa0c5ba58d5d','NGINX压力测试'],
          ['/docs/wiki/blog.wiki/nginx/7409a0924f1e781e8c487e4101314666','NGINX处理请求的几个阶段'],
          ['/docs/wiki/blog.wiki/nginx/428440a0fdd519718c89ae67da4ebef0','NGINX指南'],
          ['/docs/wiki/blog.wiki/nginx/927d4d748ccf83ab49586457fe71351b','NGINX日志切分方式'],
          ['/docs/wiki/blog.wiki/nginx/649b948c288efd2dc98f0df21d916967','NGINX注意事项'],
          ['/docs/wiki/blog.wiki/nginx/01bcd22af1671fe9896ffabe73185f3d','NGINX编译安装运行'],
          ['/docs/wiki/blog.wiki/php/e80d6bb55a89c4c9944efdd6cb8a58d0','PHP-FPM优化配置'],
          ['/docs/wiki/blog.wiki/php/2c99a51acede59dea7f5125402e19458','PHP与HHVM的比较'],
          ['/docs/wiki/blog.wiki/php/1b10357a1056460f032101ec8c220323','PHP与MongoDB交互'],
          ['/docs/wiki/blog.wiki/php/ebcc20fb9cd1d7a73c05c25df797d94d','PHP信号管理'],
          ['/docs/wiki/blog.wiki/php/18fc678d1a0ac08d2c53516cda3acc57','PHP多进程'],
          ['/docs/wiki/blog.wiki/php/27ee1eb1aa7d4cfe8f11527397442fd8','PHP发送post请求'],
          ['/docs/wiki/blog.wiki/php/524fc2cf39be2c78f067879d11f2d9e3','PHP导出EXCEL表格'],
          ['/docs/wiki/blog.wiki/php/6fd636cb12975fe6fc04883a683ed8bf','PHP性能优化'],
          ['/docs/wiki/blog.wiki/php/ac86a0cc8f9320e6f0672f8e30540618','PHP扩展开发'],
          ['/docs/wiki/blog.wiki/php/719f3df582df8cd7a293e6370cec15b5','PHP提高编程效率的50个方法'],
          ['/docs/wiki/blog.wiki/php/5b00ff958768174397d368e9988e8586','PHP生成验证码'],
          ['/docs/wiki/blog.wiki/php/6415af459ce1c8d3d4e084584a2a216b','PHP的Memcached扩展源码分析'],
          ['/docs/wiki/blog.wiki/php/014cb1424ec933e5cc1f19f43cd1c28a','PHP编译安装'],
          ['/docs/wiki/blog.wiki/php/0c4c31b7019d553136c7574dc4d15cd1','PHP解析xml为数组'],
          ['/docs/wiki/blog.wiki/php/86d496731b15281f6b174e9a358412e9','PHP读取文件的三种方法'],
          ['/docs/wiki/blog.wiki/php/b10de9e6e3a1c2b2693aa96dd5fd2fe0','Xhprof性能优化'],
          ['/docs/wiki/blog.wiki/php/5131b0fbd7d9ac979b693287089da4b6','YII框架使用总结'],
          ['/docs/wiki/blog.wiki/php/bb38cb27040ea37f314ecddd9e7a19d1','YII框架解析'],
          ['/docs/wiki/blog.wiki/python/f4e92e66dd1698ba38d715a1318b1ecc','Django与web服务器(Ningx和uWSGI)的部署与配置'],
          ['/docs/wiki/blog.wiki/rabbitmq/0efe6c07218926a46e88ba4e65f96c96','RabbitMQ-php客户端安装'],
          ['/docs/wiki/blog.wiki/rabbitmq/c5e6e83cb2f21a2011e3c9b5a38adaea','RabbitMQ_RPC应用'],
          ['/docs/wiki/blog.wiki/rabbitmq/fb3bed7fafb1f75f0e18dbb0afaa583e','RabbitMQ主题交换机应用'],
          ['/docs/wiki/blog.wiki/rabbitmq/e83d4bcb4b94732681969ea7f3d125ff','RabbitMQ发布订阅应用'],
          ['/docs/wiki/blog.wiki/rabbitmq/a6c884793fe907260c70ec42f14ae9d6','RabbitMQ工作队列应用'],
          ['/docs/wiki/blog.wiki/rabbitmq/fcefa4cd349a508b61ed02e19d08d4f8','RabbitMQ简介'],
          ['/docs/wiki/blog.wiki/rabbitmq/95bc437a89a0aadeebc7959c777c2658','RabbitMQ简单应用'],
          ['/docs/wiki/blog.wiki/rabbitmq/b4e49396bcce4e060072b912d2837448','RabbitMQ路由应用'],
          ['/docs/wiki/blog.wiki/redis/bbf56d1b71dd0c9df70e7feb94166984','Redis安装'],
          ['/docs/wiki/blog.wiki/redis/d987ac7f663dac3a187cb8fe8f64018e','Redis数据淘汰机制'],
          ['/docs/wiki/blog.wiki/shell/e81dc6b810a655dbe22d2ad5c3f0de86','awk应用'],
          ['/docs/wiki/blog.wiki/shell/9be76379e16abb1706035aa4fdd5bd7b','find和xargs的应用'],
          ['/docs/wiki/blog.wiki/shell/c09fe2231820cf76f00e730aa5d233a4','grep与正则'],
          ['/docs/wiki/blog.wiki/shell/62ef83b7be3985d005275499d97220af','IPTables防火墙规则'],
          ['/docs/wiki/blog.wiki/shell/62bfad7a36da70d16da2cbd16e4e29a0','Linux基础命令'],
          ['/docs/wiki/blog.wiki/shell/4fd839d27d1f209c68d895a3e697c0c9','Linux性能监控'],
          ['/docs/wiki/blog.wiki/shell/f2709c3abc2445118d975ae800c7e2ce','Linux查看系统信息方法'],
          ['/docs/wiki/blog.wiki/shell/c00a81ea0a8694a0177f0f9c86528526','sed应用'],
          ['/docs/wiki/blog.wiki/shell/03caafd9c6393f4579a5027c5c8fc077','shell内嵌命令'],
          ['/docs/wiki/blog.wiki/shell/94cb1f55d76e5dd6f9e633a415a4a8ca','shell函数及参数操作'],
          ['/docs/wiki/blog.wiki/shell/8af1e3879e0022188e9feccae6e478c0','shell变量'],
          ['/docs/wiki/blog.wiki/shell/da65af88408b5b78b99fce514f10a6aa','shell常用命令'],
          ['/docs/wiki/blog.wiki/shell/42c85319863c4c15e9a733a755064881','shell程序调试'],
          ['/docs/wiki/blog.wiki/shell/6e3a79e37a54d8dbf723b1fa7158c08d','tr应用'],
          ['/docs/wiki/blog.wiki/shell/deae5f1746b326b2ab316661aa9f4ddf','个性化设置之profile'],
          ['/docs/wiki/blog.wiki/shell/eaaf95ff2300b84f90fb44073a8e9c27','信号'],
          ['/docs/wiki/blog.wiki/shell/17af672fcabda3aefccf0ce3d9a38471','合并-排序-分隔'],
          ['/docs/wiki/blog.wiki/shell/1a94b9cabd4b363beb09da93b9fea17c','后台执行命令'],
          ['/docs/wiki/blog.wiki/shell/97c51be28b7268a95e0db93624afa58b','控制语句应用'],
          ['/docs/wiki/blog.wiki/shell/a34725da45d309812c549e1ef2107625','文件权限操作'],
          ['/docs/wiki/blog.wiki/shell/e08d313125d7bbca9c8d8efc808c12d0','设置外网访问权限'],
          ['/docs/wiki/blog.wiki/shell/5821fa63f3ce0ab41cbda6b4ddbee5ca','条件测试'],
          ['/docs/wiki/blog.wiki/shell/6cd7da158a18361142f2dea95fb7f9ac','输入输出命令'],
          ['/docs/wiki/blog.wiki/spring/7e80d2f08fb90e905d1cfda65359e215','Spring扩展'],
          ['/docs/wiki/blog.wiki/tools/11eb1585ac1a8a90727fda297870d838','mac_iterm配置'],
          ['/docs/wiki/blog.wiki/tools/a26a36464477210ba7072ee5633536f0','MAC上的StarUML'],
          ['/docs/wiki/blog.wiki/zookeeper/2d5e64cc5ceb74f929ae2c148e2967fc','zookeeper四字命令'],
          ['/docs/wiki/blog.wiki/zookeeper/c1c365f72032fb0863c7d0c8fa80d7ff','zookeeper应用实例'],
          ['/docs/wiki/blog.wiki/zookeeper/b47a28f701a7cdabd40cd0afdd2f4aaf','zookeeper配置']
        ]
      }
    ]
  },
  head: [
    ['link', { rel: 'icon', href: `/favicon.ico` }],
    //增加manifest.json
    ['link', { rel: 'manifest', href: '/manifest.json' }],
  ],
  serviceWorker: true,
}
