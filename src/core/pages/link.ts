import glob from 'glob';
import fs from 'fs-extra';
import { SRC_PATH } from '@/shared';

export function getDirJsonConfig() {
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
      if (pageBelowJson['#tab']) {
        data = {
          ...data,
          '#tab': pageBelowJson['#tab']
        }
      }
    } else {
      if (pageBelowJson['#tab']) {
        data = {
          ...data,
          '#tab': pageBelowJson['#tab']
        }
      }
    }
    if (pageBelowJson['#entrance']) {
      data = {
        ...data,
        '#entrance': pageBelowJson['#entrance'],
      };
    }
    return data;
  });
  return {
    linkJsonPath,
    linkJson,
  };
}
