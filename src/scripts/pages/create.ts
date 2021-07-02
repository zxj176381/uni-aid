import fs from 'fs-extra';
import { Answers } from '@/interface';
import { getPageConfig, addPageDir, SRC_PATH, PAGE_SUFFIX, VUE_TPL, logWarn, logSuccess } from '@/shared';
import { build } from './build';

function createPage(answers: Answers) {
  let { path, subPackage } = answers;
  path = path.replace(/^\//, '').replace(/\/$/, '');
  path = path.match(/^\/?pages\//) ? path : 'pages/' + path;
  path = path.match(/\/index$/) ? path : path + '/index';
  let config = getPageConfig({
    path,
    style: {
      navigationBarTitleText: 'uniAid',
    },
  });
  if (subPackage) {
    config = {
      ...config,
      '#subPackage': {
        root: `${path.split('/')[0]}/${path.split('/')[1]}`,
      },
    };
  }
  addPageDir(config, 'create');
  build();
}

function createComponent(answers: Answers) {
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
  const isExist = PAGE_SUFFIX.some(item => {
    return fs.existsSync(componentPath + item) === true;
  })
  if(isExist) {
    logWarn(`【${componentPath}】此组件已存在`);
    return
  }
  fs.outputFileSync(componentPath, VUE_TPL, 'utf-8');
  logSuccess('create ' + componentPath);
}

export function create(answers: Answers) {
  if (answers.mode === 'page') {
    createPage(answers);
  } else if (answers.mode === 'component') {
    createComponent(answers);
  }
}
