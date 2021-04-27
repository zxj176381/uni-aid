export default [
  {
    path: 'pages/entrance/index',
    config: { name: '页面名称', author: '作者', description: '页面描述信息' },
    '#home': false,
  },
  {
    path: 'pages/login/index',
    config: { name: '页面名称', author: '作者', description: '页面描述信息' },
    '#home': false,
  },
  {
    path: 'pages/shopping/index',
    config: {
      name: '页面名称',
      author: '作者',
      description: '页面描述信息',
      exclude: 'login',
    },
    '#home': false,
  },
  {
    path: 'pages/template/home/index',
    config: { name: '页面名称', author: '作者', description: '页面描述信息' },
    '#home': true,
  },
  {
    path: 'pages/template/user/index',
    config: { name: '页面名称', author: '作者', description: '页面描述信息' },
    '#home': false,
  },
];
