const appConfig = require('../src/app.config')

module.exports = {
  title: appConfig.title + ' ... ',
  description: appConfig.description,
  themeConfig: {
    sidebar: [
      ['/', 'Introduction'],
      '/docs/notes',
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
