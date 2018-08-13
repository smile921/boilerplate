const appConfig = require('../src/app.config')

module.exports = {
  title: appConfig.title + ' ... ',
  description: appConfig.description,
  themeConfig: {
    sidebar: [
      ['/', 'Introduction'],
      '/docs/notes', ['/docs/note/about-lock', '乐观锁与悲观锁'],
      ['/docs/note/java/jvm-memory', 'jvm 内存模型'],
      ['/docs/note/java/message-queue', '消息队列'],
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
