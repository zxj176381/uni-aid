module.exports = {
  title: 'uni-aid',
  description: '一个用于提升 uni-app 开发体验的扩展套件',
  themeConfig: {
    nav: [
      { text: '指南', link: '/' }, // 根路径
    ],
    sidebar: {
      '/pages/': [
        {
          title: '指南',
          collapsable: true,
          path: '/',
          children: [
            { title: '内置功能', path: '/' },
            { title: '展望未来', path: '/handbook/' },
          ],
        },
        // ["/handbook/framework", "1. 框架指南"],
        {
          title: '2. 功能特性',
          collapsable: true,
          children: [
            { title: '内置功能', path: '/handbook/' },
            { title: '展望未来', path: '/handbook/' },
          ],
        },
      ],
    },
  },
};
