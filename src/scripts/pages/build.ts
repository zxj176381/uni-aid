import glob from 'glob';
import fs from 'fs-extra';
import { getPagesJson, UNIAID_PATH, SRC_PATH, formatJson } from '@/shared';
import { TabBarOfList } from '@/interface';
import { createPageAlias, createPageExclude, getRoutersConfig, getUniaid, transformConfig, getDirJsonConfig } from '@/core';

function setPageConfigTabBar() {
  const tabBar = fs.readFileSync(`${SRC_PATH}/_uniaid/tabBar.json`, 'utf-8');
  const tabBarConfig = formatJson(tabBar);
  const { list } = tabBarConfig;
  if (list && list.length > 1) {
    list.forEach((item: TabBarOfList, index: Number) => {
      let jsonPath = `${SRC_PATH}${item.pagePath}.json`;
      if (!fs.existsSync(jsonPath)) return;
      let jsonConfig = formatJson(fs.readFileSync(jsonPath, 'utf-8'));
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
  const routersConfig = getRoutersConfig(routersFilesPath);
  const uniaidConfig = getUniaid(uniaid);
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
  // _uniaid/tabBar 改变 PageJson 下的 #tab
  setPageConfigTabBar();
}
