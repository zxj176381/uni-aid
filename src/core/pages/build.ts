import fs from 'fs-extra';
import { hasOwn, SRC_PATH } from '@/shared';
import { Pages, SubPackage, TabBarOfList } from '@/interface';

export function getRoutersConfig(routersFilesPath: Array<string>, uniaidConfig: any) {
  const tabBarListPath = uniaidConfig.tabBar.list.map((item: TabBarOfList) => {
    return item.pagePath;
  });
  let pagesJson: any = {
      pages: [],
      subPackages: [],
    },
    routersFiles: Array<Pages> = [];
  routersFilesPath.forEach((routerFilePath) => {
    routersFiles.push(fs.readJsonSync(routerFilePath));
  });
  let hasEntrance = routersFiles.findIndex((routerFile) => hasOwn(routerFile, '#entrance') === true);
  routersFiles.forEach((routerFile) => {
    if (routerFile['#config'] && hasOwn(routerFile['#config'], 'using') && !routerFile['#config'].using) {
      return;
    }
    if (hasOwn(routerFile, '#entrance')) {
      delete routerFile['#entrance'];
      delete routerFile['#config'];
      pagesJson.pages.unshift(routerFile);
    } else if (hasOwn(routerFile, '#home')) {
      if (hasOwn(routerFile, '#tab')) {
        delete routerFile['#tab'];
        if (!~tabBarListPath.indexOf(routerFile.path)) {
          fs.outputJsonSync(`${SRC_PATH}${routerFile.path}.json`, routerFile, {
            spaces: 2,
          });
        }
      }
      delete routerFile['#home'];
      delete routerFile['#config'];
      if (~hasEntrance) {
        pagesJson.pages.push(routerFile);
      } else {
        pagesJson.pages.unshift(routerFile);
      }
    } else if (hasOwn(routerFile, '#tab')) {
      delete routerFile['#tab'];
      if (~tabBarListPath.indexOf(routerFile.path)) {
        fs.outputJsonSync(`${SRC_PATH}${routerFile.path}.json`, routerFile, {
          spaces: 2,
        });
      }
      if (routerFile['#config']) delete routerFile['#config'];
      pagesJson.pages.push(routerFile);
    } else if (hasOwn(routerFile, '#subPackage')) {
      // #subPackage
      const subPackageOfIndex = pagesJson.subPackages.findIndex((subPackage: SubPackage) => {
        return subPackage.root === routerFile['#subPackage']?.root;
      });
      const subPackagePath = routerFile.path.replace(routerFile['#subPackage']?.root || '', '');
      if (~subPackageOfIndex) {
        const page = {
          path: subPackagePath,
          style: routerFile.style,
        };
        pagesJson.subPackages[subPackageOfIndex].pages.push(page);
      } else {
        const subPackage = {
          root: routerFile['#subPackage']?.root,
          pages: [
            {
              path: subPackagePath,
              style: routerFile.style,
            },
          ],
        };
        pagesJson.subPackages.push(subPackage);
      }
    } else {
      // 基本页面
      delete routerFile['#config'];
      pagesJson.pages.push(routerFile);
    }
  });
  return pagesJson;
}

export function getUniaid(uniaid: Array<string>) {
  let pagesJson: any = {};
  uniaid.forEach((jsonPath) => {
    let json = fs.readJsonSync(jsonPath);
    const keyName = jsonPath.replace(/^src\/_uniaid\//, '').replace(/\.json$/, '');
    if (keyName === 'tabBar') {
      let tabBarList: Array<TabBarOfList> = [];
      json.list.forEach((item: TabBarOfList) => {
        const tabBarJson = fs.readJsonSync(`${SRC_PATH}${item.pagePath}.json`);
        if (hasOwn(tabBarJson['#config'], 'using') && !tabBarJson['#config'].using) {
          return;
        }
        tabBarList.push(item);
      });
      json.list = tabBarList;
    }
    pagesJson[keyName] = json;
  });
  return pagesJson;
}
