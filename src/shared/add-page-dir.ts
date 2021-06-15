import fs from 'fs-extra';
import { Pages } from '@/interface';
import { SRC_PATH, VUE_TPL, PAGE_SUFFIX } from './constants';
import { logWarn, logSuccess } from './log';

export function getPageConfig(pageConfig: Pages) {
  let config = {
    ...pageConfig,
    '#config': {
      name: '页面名称',
      author: '页面作者',
      description: '页面描述',
    },
  };
  return config;
}

export function addPageDir(pageConfig: Pages, type: string) {
  const pagePath = pageConfig.path;
  const pageFilePath = SRC_PATH + pagePath;
  const pageDir = pageFilePath.replace(/\/[a-z\d\-]+$/, '');
  if (fs.existsSync(pageDir) && type === 'create') {
    logWarn(`目录[${pageDir}]已存在，为确保每个页面拥有独立的目录，将不会执行创建操作。`);
    return;
  }

  const pageJsonPath = pageFilePath + '.json';
  const pageHelperPath = pageFilePath + '.js';
  const pageServicePath = pageFilePath.replace('pages', 'service') + '.js';

  // create json
  if (!fs.existsSync(pageJsonPath)) {
    fs.outputJsonSync(pageJsonPath, pageConfig, {
      spaces: 2,
    });
    logSuccess('create ' + pageJsonPath);
  }
  // create vue
  const isExist = PAGE_SUFFIX.every(item => {
    return fs.existsSync(pagePath + item) === false;
  })
  if(isExist) {
    fs.outputFileSync(SRC_PATH + pagePath + PAGE_SUFFIX[0], VUE_TPL, 'utf-8')
    logSuccess('create ' + pagePath);
  }
  // create helpers
  if (!fs.existsSync(pageHelperPath)) {
    fs.outputFileSync(pageHelperPath, `// helper ${pageHelperPath}`, 'utf-8');
    logSuccess('create ' + pageHelperPath);
  }
  // create service
  if (!fs.existsSync(pageServicePath)) {
    fs.outputFileSync(pageServicePath, `// ${pageServicePath}`, 'utf-8');
    logSuccess('create ' + pageServicePath);
  }
}
