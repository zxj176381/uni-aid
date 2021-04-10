import fs from 'fs-extra';
import { Pages } from "@/interface";
import { hasOwn, logSuccess, SRC_PATH, UNIAID_PATH, VUE_TPL, PAGE_SUFFIX } from '@/shared';
import prettier from 'prettier';
import { getGlobalStyle, getTabBar } from './uniaid';

// create json vue helpers service
export function createServices(pageConfig: Pages) {
  const pageJsonPath = SRC_PATH + pageConfig.path + '.json';
  const pagePath = SRC_PATH + pageConfig.path;
  const pageHelperPath = SRC_PATH + pageConfig.path + '.js';
  const pageServicePath = SRC_PATH + pageConfig.path.replace('pages', 'service') + '.js';
  // create json
  if(!fs.existsSync(pageJsonPath)) {
    fs.outputJsonSync(pageJsonPath, pageConfig, {
      spaces: 2
    })
    logSuccess('create ' + pageJsonPath);
  }
  // create vue
  const isExist = PAGE_SUFFIX.every(item => {
    return fs.existsSync(pagePath + item) === false;
  })
  if(isExist) {
    fs.outputFileSync(pagePath + PAGE_SUFFIX[0], VUE_TPL, 'utf-8')
    logSuccess('create ' + pagePath);
  }
  // create helpers
  if(!fs.existsSync(pageHelperPath)) {
    fs.outputFileSync(pageHelperPath, `// helper ${pageHelperPath}`, 'utf-8')
    logSuccess('create ' + pageHelperPath);
  }
  // create service
  if(!fs.existsSync(pageServicePath)) {
    fs.outputFileSync(pageServicePath, `// ${pageServicePath}`, 'utf-8')
    logSuccess('create ' + pageServicePath);
  }
}

// create routers/alias
export function createPageAlias(pagesConfig: Array<Pages>) {
  let pagesPath:any = {
    HOME_PAGE: '',
    TAB_LIST: []
  };
  pagesConfig.forEach(pageConfig => {
    if(hasOwn(pageConfig, '#home')) {
      pagesPath['HOME_PAGE'] = pageConfig.path;
    }
    if(hasOwn(pageConfig, '#tab')) {
      pagesPath['TAB_LIST'].push(pageConfig.path);
    }
    const filterAlias = pageConfig.path.replace(/^pages\//, '').replace(/\/index$/, '');
    const alias = filterAlias.split('/').join('_').toUpperCase();
    pagesPath[alias] = pageConfig.path;
  })
  const aliasPath = SRC_PATH + 'routers/alias.js';
  let aliasTpl = `export default ${JSON.stringify(pagesPath)}`;
  aliasTpl = prettier.format(aliasTpl, {
    tabWidth: 2,
    singleQuote: true,
    parser: 'babel',
  });
  fs.outputFileSync(aliasPath, aliasTpl, 'utf-8');
}

// create uniaid
export function createUniaid() {
  // create tabBar
  const tabBar = getTabBar();
  const tabBarPath = UNIAID_PATH + 'tabBar.json';
  fs.outputJsonSync(tabBarPath, tabBar, {
    spaces: 2,
  });
  logSuccess('create ' + 'tabBar')
  // create globalStyle
  const globalStyle = getGlobalStyle();
  const globalStylePath = UNIAID_PATH + 'globalStyle.json';
  fs.outputJsonSync(globalStylePath, globalStyle, {
    spaces: 2,
  });
  logSuccess('create ' + 'globalStyle')
}
