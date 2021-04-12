# 介绍

在使用 uni-app 框架开发时，当我们每添加一个页面都需要在 pages.json 添加一次，在团队开发时很容易冲突。并且在 `路由拦截` 和 `统计页面路径` 以及 `页面参数` 时相对比较麻烦， `uni-aid` 就是来帮助开发者做这些事情的。


## 它是如何工作的？

在 `uni-aid` 中开发者不用再去关注 pages.json 文件，uni-aid 会把 pages.json 配置拆分到每个页面目录下，生成一个 JSON 文件，开发者只需修改和关注页面目录下的 JSON 配置即可实时更新 pages.json。

在此，建议开发者们在开发过程中使用 Git 忽略 pages.json 文件的修改和提交，团队中每个开发者的 pages.json 都由 uni-aid 帮助生成。

## 快速上手

::: warning 注意
本文建议新创建一个 uni-aid 框架搭配学习 uni-aid。
:::

**1. 在 `package.json` 中添加一些 scripts**

这一步骤是可选的，但我们推荐你完成它。在下文中，我们会默认这些 scripts 已经被添加。

```json
{
  "scripts": {
    "aid:add": "npx uniaid add",
    "aid:watch": "npx uniaid watch"
  }
}
```

**2. 初始化页面目录配置**

::: danger 警告
- 在第一次使用 uniaid 时，必须先使用 `npx uniaid init`。
- 此命令主要时根据 pages.json 来创建目录的，`npx uniaid watch` 不可创建页面目录，并且在没有执行 `npx uniaid init` 前执行 `npx uniaid watch` 时，会发生不可预估的问题。
:::

```bash
# 根据 pages.json 生成对应的页面目录以及页面配置。
$ npx uniaid init
```

**3. 创建新的页面和组件**

```bash
# 创建新的页面或者组件
$ npm run aid:add

? 选择要创建的视图类型
> 页面
> 组件

? 请输入视图目录名称 template/home

? 是否为分包视图 （y/N）
```

::: tip 提示
- 创建页面或者组件时，要么不填写 `vue文件的名称`， 要么`.vue` 文件的名字务必是 `index`。
- 页面路径建议 `pages/${PAGE_DIR}/index`，只需填写 `PAGE_DIR` 即可。
例如：
```bash
`/pages/template/home/index` 对应 `template/home`
```
:::

**4. 监听页面目录下 JSON 的文件和 _uniaid 文件夹下的 json 变化。**
```bash
$ npm run aid:watch
```

- 在这一步就可以把 pages.json 目录忽略了，因为你不再会去关注它或者去修改它。

## 目录结构

```vue
.
├── src
│  ├── _uniaid <!-- 全局配置 -->
│  │  ├── globalStyle.json
│  │  └── tabBar.json
│  │
│  ├── pages
│  │  ├── home
│  │  │  ├── index.js <!-- helper -->
│  │  │  ├── index.json <!-- 当前页面配置 -->
│  │  │  └── index.vue <!-- vue 页面 -->
│  │  │
│  │  └── personal
│  │     ├── index.js
│  │     ├── index.json
│  │     └── index.vue
│  │
│  ├── routers <!-- 路由 -->
│  │  ├── alias.js <!-- 所有页面的页面别名对应页面的路径 -->
│  │  └── exclude.js <!-- 路由权限权限管理 -->
│  │
│  └── service <!-- 服务 -->
│    ├── home
│    │  └── index.js <!-- home页的所有接口在此文件中 -->
│    │
│    └── personal
│       └── index.js
│
└── package.json
```
