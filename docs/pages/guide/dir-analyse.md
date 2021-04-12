# 目录分析

本文讲解初始化后页面目录的作用，以及页面目录下 JSON 的配置。

## 目录作用讲解

- `_uniaid/globalStyle.json`: 同 [uni-app glboalStyle](https://uniapp.dcloud.io/collocation/pages?id=globalstyle)
- `_uniaid/tabBar`: 同 [uni-app tabBar](https://uniapp.dcloud.io/collocation/pages?id=tabbar)
  - 注：`tabBar.list` 下的 `text` 、`iconPath` 和、`selectedIconPath` 移动到页面目录下对应的JSON中 `#tab` 字段里。
  - 在 `_uniaid` 中，其他配置会在之后加入。
- `pages/template/home/index.js`: 此文件作用同 helper ，主要是对当前页面中一些对基本类型或者引用类型的基本操作。让主体文件vue中不要有多余的代码。
- `pages/template/home/index.vue`: 当前页面。
- `pages/template/home/index.json`: 当前页面对应的 pages.json 配置。
  - `path`: 当前页面路径。
  - `style`: 同 `pages.json` 下每个页面对应的 `style`。[uni-app pages.style](https://uniapp.dcloud.io/collocation/pages?id=style)
  - `#home`: 首页标识，有且只能有一个，`npx uniaid init` 默认将 `pages.json` 中 `pages` 数组中的第一个页面设置为首页，在 `npm run watch` 下 `#home` 在哪个页面对应的JSON中，哪个页面就会在 `pages.json` 中的 `pages` 排第一个。
  - `#subPackage`: `root` 分包目录。
  - `#tab`: 底部导航栏标识，配置有 `iconPath` 默认图标、 `selectedIconPath` 选中图标 和 `text` 标题。
  - `#config`: 新增相关配置，可根据需求加入。
    - `name`: 页面名称。
    - `author`: 页面作者。
    - `description`: 页面描述信息。
    - `exclude`: 默认为空，为空时不需要登录即可访问，当值为 `login` 时此页面登录后可访问，当值为 `phone` 时此页面登录并且获取手机号才可访问。
- `routers/alias`: 给所有页面路径设置一个别名，别名格式为大写，`/` 改为 `_`，去除 `pages/` 和 `/index`。
- `routers/exclude`: 对应页面配置中的 `#config.exclude`，使用此js文件在跳转时拦截路由，验证此页面是否可访问。
- `service`: 此目录对应页面目录，每个页面都有一个 service ，这里主要存放接口，类似 `api` 目录格式。

## 发展计划

::: tip TODO
- 在 `#config` 中添加字段 `link` ，用来存放当前页面的跳转参数，生成 HTML 文件，此文件可搜索查询每个页面的路径以及参数，后台管理人员可在此 HTML 中复制相关页面的路径进行配置管理后台。
:::
