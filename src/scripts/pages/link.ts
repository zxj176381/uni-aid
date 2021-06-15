import glob from 'glob';
import fs from 'fs-extra';
import prettier from 'prettier';
import { SRC_PATH } from '@/shared';

function createPageLink() {
  const routersFilesPath = glob.sync(SRC_PATH + '*pages/**/*.json');
  const linkJsonPath = SRC_PATH + 'routers/link.js';
  let linkJson = routersFilesPath.map((item, index) => {
    const pageBelowJson = JSON.parse(fs.readFileSync(item, 'utf-8'));
    let data: any = {
      path: pageBelowJson.path,
      config: pageBelowJson['#config'],
    };
    if (pageBelowJson['#home']) {
      data = {
        ...data,
        '#home': pageBelowJson['#home'],
      };
    }
    return data;
  });
  let linkTpl = `const pages = ${JSON.stringify(linkJson)}`;
  linkTpl = prettier.format(linkTpl, {
    tabWidth: 2,
    singleQuote: true,
    parser: 'babel',
  });
  fs.outputFileSync(linkJsonPath, linkTpl, 'utf-8');
}

export function link() {
  createPageLink();
}
