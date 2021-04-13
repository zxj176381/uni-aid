import glob from 'glob';
import fs from 'fs-extra';
import { SRC_PATH } from '@/shared';

function createPageLink() {
  const routersFilesPath = glob.sync(SRC_PATH + '*pages/**/*.json');
  const linkJsonPath = SRC_PATH + 'routers/link.json';
  let linkJson = routersFilesPath.map((item, index) => {
    const pageBelowJson = JSON.parse(fs.readFileSync(item, 'utf-8'));
    return {
      path: pageBelowJson.path,
      config: pageBelowJson['#config']
    }
  });
  let linkJsonContent = {
    pages: linkJson
  };
  fs.outputJsonSync(linkJsonPath, linkJsonContent, {
    spaces: 2
  })
}

export function link() {
  createPageLink();
}
