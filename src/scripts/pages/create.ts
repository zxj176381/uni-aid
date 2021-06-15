import { Answers } from '@/interface';
import { getPageConfig, addPageDir } from '@/shared';
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

function createComponent(answers: Answers) {}

export function create(answers: Answers) {
  if (answers.mode === 'page') {
    createPage(answers);
  } else if (answers.mode === 'component') {
    createComponent(answers);
  }
}
