import { getPagesJson } from '@/shared';
import { transformConfig, createServices, createPageAlias, createUniaid } from '@/core';

function readPagesJson() {
  const pagesJsonContent = getPagesJson();
  return transformConfig(pagesJsonContent);
}

let pagesConfig = readPagesJson();

function createConfig() {
  pagesConfig.forEach(pageConfig => {
    createServices(pageConfig);
  })
}

// 根据 page.json 创建对应的配置以及 services/routers/helpers 以及页面对应的 json 文件。
export function init(){
  // create json/helper/service
  createConfig();
  // create alias
  createPageAlias(pagesConfig);
  // create uniaid
  createUniaid();
}
