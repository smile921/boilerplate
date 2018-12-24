const appConfig = require('../src/app.config')

module.exports = {
  title: appConfig.title + ' ... ',
  description: appConfig.description,
  themeConfig: {
    nav: [
      { text: '主页', link: '/' },
      { text: '前端', link: '/frontEnd/' },
      { text: '后端', link: '/backEnd/' },
      { text: 'JAVA', link: '/java/' },
      { text: '学习文档', link: '/notes/' },
      { text: '其它', link: '/other/' },
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
