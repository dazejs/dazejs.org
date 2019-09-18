module.exports = {
  title: 'Daze.js',
  description: 'Just use Javascript',
  locales: {
    '/': {
      lang: 'en-US',
      title: 'Daze.js',
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'Daze.js',
    }
  },
  themeConfig: {
    locales: {
      '/': {
        selectText: 'Languages',
        label: 'English',
        editLinkText: 'Edit this page on GitHub',
        serviceWorker: {
          updatePopup: {
            message: "New content is available.",
            buttonText: "Refresh"
          }
        },
        algolia: {},
      },
      '/zh/': {
        // 多语言下拉菜单的标题
        selectText: '选择语言',
        // 该语言在下拉菜单中的标签
        label: '简体中文',
        // 编辑链接文字
        editLinkText: '在 GitHub 上编辑此页',
        // Service Worker 的配置
        serviceWorker: {
          updatePopup: {
            message: "发现新内容可用.",
            buttonText: "刷新"
          }
        },
        // 当前 locale 的 algolia docsearch 选项
        algolia: {},
        nav: [
          { text: '文档', link: '/zh/1.x/quick-start' },
          { text: '历史版本', items: [
            {
              text: '1.x',
              link: '/zh/1.x/quick-start'
            },
            {
              text: '0.x',
              link: '/zh/0.x/quick-start'
            }
          ] },
          { text: 'Github', link: 'https://github.com/dazejs/daze' },
        ],
        sidebar: {
          '/zh/0.x/': [
            {
              title: '序',
              collapsable: false,
              children: [
                'quick-start',
              ],
            },
            {
              title: '框架基础',
              collapsable: false,
              children: [
                'base/module',
                'base/controller',
                'base/request',
                'base/response',
                'base/view',
                'base/config',
                'base/middleware',
                'base/service',
                'base/validate',
              ]
            },
            {
              title: '高级进阶',
              collapsable: false,
              children: [
                'adv/cookie',
                'adv/session',
                'adv/mulenv',
                'adv/csrf',
                'adv/process',
              ]
            }
          ],
          '/zh/1.x/': [
            {
              title: '开始',
              collapsable: false,
              children: [
                // 'introduce',
                'quick-start',
              ]
            },
            {
              title: '核心概念',
              collapsable: false,
              children: [
                'core/container',
                'core/di',
                'core/autoload',
                'core/component',
                'core/provider',
              ]
            },
            {
              title: '框架基础',
              collapsable: false,
              children: [
                'base/controller',
                'base/middleware',
                'base/request',
                'base/response',
                'base/view',
                'base/config',
                'base/service',
                'base/validate',
                'base/resource',
                'base/cookie',
                'base/session',
              ]
            },
            {
              title: '高级进阶',
              collapsable: false,
              children: [
                'adv/log',
                'adv/mulenv',
                'adv/process',
              ]
            }
          ]
        }
      }
    }
  },
  markdown: {
    lineNumbers: true
  },
}