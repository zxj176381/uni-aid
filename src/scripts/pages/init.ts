import { getPagesJson, addPageDir } from '@/shared';
import { transformConfig, createUniAid, createPageAlias } from '@/core';

function readPagesJson() {
  const pagesJsonContent = getPagesJson();
  return transformConfig(pagesJsonContent);
}

function createPageAndConfig() {
  const pagesConfig = readPagesJson();
  pagesConfig.forEach((pageConfig) => {
    addPageDir(pageConfig, 'init');
  });
}

export function init() {
  const pagesConfig = readPagesJson();
  // create json/helper/service
  createPageAndConfig();
  // create uniaid
  createUniAid();
  // create alias
  createPageAlias(pagesConfig);
}
