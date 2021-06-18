# uni-aid

uni-aid: 一个用于提升 uni-app 开发体验以及对路由管理的扩展套件。

## 安装

```
$ npm install uni-aid --save-dev
```

## 命令

```
$ npx uniaid init  // 根据pages.json创建对应的文件目录以及路由。

$ npx uniaid add // 创建页面或者组件

$ npx uniaid build // 根据pages文件夹下json配置文件变化，修改pages.json中的配置。

$ npx uniaid watch // 监听pages文件夹下json配置文件变化，修改pages.json中的配置。

$ npx uniaid link // 导出页面配置，主要用于后台管理页面配置的展示，前端开发人员可用此 json 文件开发APP等页面路径的展示。
```

## 注意事项

- **请忽略pages.json文件目录的修改，防止提交文件时冲突**
- **生成为vue文件，如需要nvue请手动修改文件后缀**
