module.exports = {
  title: 'uni-aid',
  description: 'uni-app 开发套件',
  themeConfig: {
    nav: [
      { text: '文档', link: '/pages/guide/' },
      {
        text: 'GitHub',
        link: '/',
      },
    ],
    sidebar: {
      '/pages/guide/': [
        {
          title: '文档',
          collapsable: false,
          children: ['', 'dir-analyse'],
        },
      ],
    },
  },
};
