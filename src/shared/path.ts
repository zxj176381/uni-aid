import { SrcPagesJson } from '@/interface';
import fs from 'fs-extra';
import { SRC_PATH } from './constants';
import { formatJson } from './util';

function validateUniApp(){
  let result: string = '';
  if (fs.pathExistsSync('manifest.json')) {
    result = 'hx';
  } else if (fs.pathExistsSync('src/manifest.json')) {
    result = 'cli'
  }
  return result;
}

const isUniApp = validateUniApp();
// 是否通过 cli 创建的项目
export function isCli() {
  return isUniApp === 'cli';
}

// 获取pages.json
export function getPagesJson(){
  const srcPagesJsonPath = SRC_PATH + 'pages.json';
  const pagesJsonString = fs.readFileSync(srcPagesJsonPath, 'utf-8');
  const pagesJsonContent: SrcPagesJson = formatJson(pagesJsonString);
  return pagesJsonContent;
}
