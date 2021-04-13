# uni-aid

uni-aid: 一个用于提升 uni-app 开发体验的扩展套件。

## 安装

```
$ npm install uni-aid --save-dev
```

## 命令

```
$ npx uniaid init  // 根据pages.json创建对应的文件目录以及路由。

$ npx uniaid watch // 监听pages文件夹下json配置文件变化，修改pages.json中的配置。

$ npx uniaid add // 创建页面或者组件

$ npx uniaid link // 将所有页面的 '#config' 导出到 routers/link.json
```

## 注意事项

- **请忽略pages.json文件目录的修改，防止提交文件时冲突**
- **生成为vue文件，如需要nvue请手动修改文件后缀**
- **后期有时间再补充文档**
