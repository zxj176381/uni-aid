import fs from 'fs-extra';
import glob from 'glob';
import prettier from 'prettier';
import { Pages, Exclude } from '@/interface';
import { getTabBar, getGlobalStyle } from '@/core';
import { UNIAID_PATH, SRC_PATH, logSuccess, hasOwn } from '@/shared';

// create uniaid
export function createUniAid() {
  // create tabBar
  const tabBar = getTabBar();
  const tabBarPath = UNIAID_PATH + 'tabBar.json';
  fs.outputJsonSync(tabBarPath, tabBar, {
    spaces: 2,
  });
  logSuccess('create ' + 'tabBar');
  // create globalStyle
  const globalStyle = getGlobalStyle();
  const globalStylePath = UNIAID_PATH + 'globalStyle.json';
  fs.outputJsonSync(globalStylePath, globalStyle, {
    spaces: 2,
  });
  logSuccess('create ' + 'globalStyle');
}

// create routers/alias
export function createPageAlias(pagesConfig: Array<Pages>) {
  let pagesPath: any = {
    HOME_PAGE: '',
    TAB_LIST: [],
  };
  pagesConfig.forEach((pageConfig, index) => {
    if (hasOwn(pageConfig, '#home')) {
      pagesPath['HOME_PAGE'] = pageConfig.path;
      if (hasOwn(pageConfig, '#tab')) {
        pagesPath['TAB_LIST'].push(pageConfig.path);
      }
      return;
    }
    if (hasOwn(pageConfig, '#tab')) {
      pagesPath['TAB_LIST'].push(pageConfig.path);
    }
    const filterAlias = pageConfig.path.replace(/^pages\//, '').replace(/\/index$/, '');
    const alias = filterAlias.split('/').join('_').toUpperCase();
    pagesPath[alias] = pageConfig.path;
  });
  const aliasPath = SRC_PATH + 'routers/alias.js';
  let aliasTpl = `export default ${JSON.stringify(pagesPath)}`;
  aliasTpl = prettier.format(aliasTpl, {
    tabWidth: 2,
    singleQuote: true,
    parser: 'babel',
  });
  fs.outputFileSync(aliasPath, aliasTpl, 'utf-8');
}

// create routers/exclude.js
export function createPageExclude() {
  const routersFilesPath = glob.sync(SRC_PATH + '*pages/**/*.json');
  let excludeList: Exclude = {
    login: [],
    phone: [],
  };
  routersFilesPath.forEach((item, index) => {
    const pageBelowJson = fs.readFileSync(item, 'utf-8');
    const excludeConfig = JSON.parse(pageBelowJson);
    const exclude = excludeConfig['#config'].exclude;
    const pagePath = excludeConfig.path;
    if (exclude) {
      // TODO: any 不能为索引，后期找到解决方案补充。
      excludeList[exclude].push(pagePath);
    }
  });
  let excludeTpl = `export default ${JSON.stringify(excludeList)}`;
  const excludePath = SRC_PATH + 'routers/exclude.js';
  excludeTpl = prettier.format(excludeTpl, {
    tabWidth: 2,
    singleQuote: true,
    parser: 'babel',
  });
  fs.outputFileSync(excludePath, excludeTpl, 'utf-8');
}
