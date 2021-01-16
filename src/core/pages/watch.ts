import fs from 'fs-extra';
import { hasOwn } from '@/shared';
import { Pages, SubPackage } from '@/interface';

export function getRoutersConfig(routersFilesPath: Array<string>) {
  let pagesJson:any = {
    pages: [],
    subPackages: [],
    tabBar: {
      list: []
    }
  }, routersFiles: Array<Pages> = [];
  routersFilesPath.forEach((routerFilePath) => {
    routersFiles.push(fs.readJsonSync(routerFilePath));
  })
  routersFiles.forEach(routerFile => {
    // #home
    if(hasOwn(routerFile, '#home')) {
      if(hasOwn(routerFile, '#tab')) {
        const tab = {
          ...routerFile['#tab'],
          pagePath: routerFile.path
        }
        pagesJson.tabBar?.list.push(tab);
        delete routerFile['#tab'];
      }
      delete routerFile['#home'];
      delete routerFile['#config'];
      pagesJson.pages.unshift(routerFile);
    }else if(hasOwn(routerFile, '#tab')) {
      // #tab
      const tab = {
        ...routerFile['#tab'],
        pagePath: routerFile.path
      }
      pagesJson.tabBar?.list.push(tab);
      delete routerFile['#tab'];
      delete routerFile['#config'];
      pagesJson.pages.push(routerFile);
    }else if(hasOwn(routerFile, '#subPackage')) {
      // #subPackage
      const subPackageOfIndex = pagesJson.subPackages.findIndex((subPackage:SubPackage) => {
        return subPackage.root === routerFile['#subPackage']?.root;
      })
      const subPackagePath = routerFile.path.replace(routerFile['#subPackage']?.root || '', '');
      if(~subPackageOfIndex) {
        const page = {
          path: subPackagePath,
          style: routerFile.style
        };
        pagesJson.subPackages[subPackageOfIndex].pages.push(page);
      }else {
        const subPackage = {
          root: routerFile['#subPackage']?.root,
          pages: [
            {
              path: subPackagePath,
              style: routerFile.style
            }
          ]
        }
        pagesJson.subPackages.push(subPackage);
      }
    }else {
      // 基本页面
      delete routerFile['#config'];
      pagesJson.pages.push(routerFile);
    }
  })
  return pagesJson;
}

export function getUniaid(uniaid: Array<string>) {
  let pagesJson: any = {};
  uniaid.forEach(jsonPath => {
    const json = fs.readJsonSync(jsonPath);
    const keyName = jsonPath.replace(/^src\/_uniaid\//, '').replace(/\.json$/, '');
    pagesJson[keyName] = json;
  })
  return pagesJson;
}
