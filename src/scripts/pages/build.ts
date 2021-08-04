import glob from 'glob';
import fs from 'fs-extra';
import { getPagesJson, UNIAID_PATH, SRC_PATH, formatJson } from '@/shared';
import { TabBarOfList } from '@/interface';
import {
  createPageAlias,
  createPageExclude,
  getRoutersConfig,
  getUniaid,
  transformConfig,
  getDirJsonConfig,
} from '@/core';

function compareObject (obj1: any, obj2: any):any {
  // 递归终止条件，当 obj1 或 obj2 不是对象时，此时就可以进行判断了
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
    if (obj1 === obj2) {
      return true
    } else if (obj1 !== obj2) {
      return false
    }
  }
  // 获取对象的自由属性组成的数组
  const obj1PropsArr = Object.getOwnPropertyNames(obj1)
  const obj2PropsArr = Object.getOwnPropertyNames(obj2) 
  // 如果数组的长度不相等，那么说明对象属性的个数都不同，返回 false
  if (obj1PropsArr.length !== obj2PropsArr.length) {
    return false
  }
  // 记录当前 compareObject 的返回值，默认是 true
  let status = true
  for (let key of obj1PropsArr) {
    status = compareObject(obj1[key], obj2[key])
    // 关键代码，当 status 为 false 时下面就不用再进行判断了，说明两个对象的内容并不相同
    // 如果没有下面这条语句，那么只要对象底层的内容是相同的那么就返回 true
    if (!status) {
      break
    }
  }
  // 每次 compareObject 执行的返回结果
  return status
}

function setPageConfigTabBar() {
  const tabBar = fs.readFileSync(`${SRC_PATH}/_uniaid/tabBar.json`, 'utf-8');
  const tabBarConfig = formatJson(tabBar);
  const { list } = tabBarConfig;
  if (list && list.length > 0) {
    list.forEach((item: TabBarOfList, index: Number) => {
      let jsonPath = `${SRC_PATH}${item.pagePath}.json`;
      if (!fs.existsSync(jsonPath)) return;
      let jsonConfig = formatJson(fs.readFileSync(jsonPath, 'utf-8'));
      delete item.pagePath;
      jsonConfig['#tab'] = item;
      let config = JSON.parse(JSON.stringify(jsonConfig['#config']));
      delete jsonConfig['#config'];
      jsonConfig['#config'] = config;
      fs.outputJsonSync(jsonPath, jsonConfig, {
        spaces: 2,
      });
    });
  }
}

function getNewPagesJson() {
  const uniaid = glob.sync(`${UNIAID_PATH}/*.json`);
  let routersFilesPath = glob.sync(SRC_PATH + '*pages/**/*.json');
  const uniaidConfig = getUniaid(uniaid);
  const routersConfig = getRoutersConfig(routersFilesPath, uniaidConfig);
  const pagesJson = Object.assign(routersConfig, uniaidConfig);
  const pagesJsonPath = SRC_PATH + 'pages.json';
  fs.outputJsonSync(pagesJsonPath, pagesJson, {
    spaces: 2,
  });
}

function readPagesJson() {
  const pagesJsonContent = getPagesJson();
  return transformConfig(pagesJsonContent);
}

export function build() {
  // 创建新的 pages.json
  getNewPagesJson();
  // 创建路由拦截配置文件
  createPageExclude();
  // 创建页面路径别名文件
  let { linkJson } = getDirJsonConfig();
  createPageAlias(linkJson);
}
