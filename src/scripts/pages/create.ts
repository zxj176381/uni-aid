import fs from 'fs-extra';
import { Answers } from "@/interface";
import { getPagesJson, logSuccess, logWarn, SRC_PATH, VUE_TPL } from "@/shared";
import { createPageAlias, createServices, transformConfig } from '@/core';

function createPage(answers: Answers){
  let { path, subPackage } = answers;
  path = path.replace(/^\//, '').replace(/\/$/, '');
  path = path.match(/^\/?pages\//) ? path : 'pages/' + path;
  path = path.match(/\/index$/) ? path : path + '/index';
  let pageFilePath = SRC_PATH + path;
  const pageDir = pageFilePath.replace(/\/[a-z\d\-]+$/, '/');
  if(fs.existsSync(pageDir)){
    logWarn(
      `目录[${pageDir}]已存在，为确保每个页面拥有独立的目录，将不会执行创建操作。`
    );
    return
  }
  const pagesJsonContent = getPagesJson();
  const page = {
    path: path,
    style: {}
  }
  if(subPackage) {
    let root = path.replace(/^pages\//, '').replace(/\/index$/, '');
    root = 'pages/' + root.split('/')[0];
    let subPackages = pagesJsonContent.subPackages || [];
    let rootOfPath = path.replace(root, '');
    const subPack = subPackages?.findIndex(subPack => {
      return subPack.root === root;
    })
    if(~subPack) {
      subPackages && subPackages[subPack].pages?.push({
        path: rootOfPath,
        style: {}
      })
    }else {
      subPackages.push({
        root: root,
        pages: [{
          path: rootOfPath,
          style: {}
        }]
      })
    }
  }else {
    pagesJsonContent.pages.push(page);
  }
  const pagesJsonPath = SRC_PATH + 'pages.json';
  fs.outputJsonSync(pagesJsonPath, pagesJsonContent, {
    spaces: 2
  })
  let pagesConfig = transformConfig(pagesJsonContent);
  const currentAddOfIndex = pagesConfig.findIndex(pageConfig => pageConfig.path === path);
  createServices(pagesConfig[currentAddOfIndex]);
  createPageAlias(pagesConfig);
}

function createComponent(answers: Answers){
  let { path, subPackage, root } = answers;
  root = root?.match(/\/$/) ? root : root + '/';
  root = root?.replace(/^\//, '');
  root = root?.match(/^\/?pages\//) ? root : 'pages/' + root;
  path = path.replace(/^\//, '').replace(/\/$/, '');
  path = path.match(/^\/?components\//) ? path : 'components/' + path;
  path = path.match(/\/index$/) ? path : path + '/index';
  if(subPackage && root) {
    path = root + path;
    if(!fs.existsSync(SRC_PATH + root)) {
      logWarn(`未找到【${SRC_PATH + root}】此分包目录，请创建后重新创建组件`);
      return
    }
  }
  const componentPath = SRC_PATH + path + '.vue';
  if(fs.existsSync(componentPath)) {
    logWarn(`【${componentPath}】此组件已存在`);
    return
  }
  fs.outputFileSync(componentPath, VUE_TPL, 'utf-8');
  logSuccess('create ' + componentPath);
}

export function create(answers: Answers){
  if(answers.mode === 'page') {
    createPage(answers);
  }else if(answers.mode === 'component') {
    createComponent(answers);
  }
}
