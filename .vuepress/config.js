const appConfig = require('../src/app.config')

module.exports = {
  title: appConfig.title + ' ... ',
  description: appConfig.description,
  themeConfig: {
    sidebar: [
      ['/', 'Introduction'],
      '/docs/notes', ['/docs/note/about-lock', '乐观锁与悲观锁'],
      ['/docs/note/java/jvm-memory', 'jvm 内存模型'],
      ['/docs/note/java/JVM-Architecture', 'JVM Architecture'],
      ['/docs/note/java/message-queue', '消息队列'],
      ['/docs/note/java/ten-java-written', '10道java面试题'],
      ['/docs/front/ember-goods', 'ember goods'],
      ['/docs/front/vue-goods', 'vue goods'],
      '/docs/guide/development',
      '/docs/guide/architecture',
      '/docs/guide/tech',
      '/docs/guide/routing',
      '/docs/guide/state',
      '/docs/guide/tests',
      '/docs/guide/linting',
      '/docs/guide/editors',
      '/docs/guide/production',
      '/docs/guide/troubleshooting',
    ],
  },
}
