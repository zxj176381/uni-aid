import { Pages, SrcPagesJson } from "@/interface";

// construct page config
function createIndexJson(pagesJsonContent: SrcPagesJson) {
  let pages = pagesJsonContent.pages;
  let subPackages = pagesJsonContent.subPackages;
  let tabBar = pagesJsonContent.tabBar;
  // #subPackages
  if (subPackages && subPackages.length > 0) {
    let subPackagesPages: Array<Pages> = [];
    subPackages.forEach(subPackage => {
      subPackage.pages?.forEach(page => {
        const subPackagePath = subPackage.root + page.path;
        const pageJson = {
          path: subPackagePath,
          style: page.style,
          ['#subPackage']: {
            root: subPackage.root
          }
        }
        subPackagesPages.push(pageJson);
      })
    })
    // 合并 pages subPackages
    pages = pages.concat(subPackagesPages)
  }
  // #tab
  if(tabBar && tabBar.list.length > 0) {
    tabBar.list.forEach((tab, tIndex) => {
      pages.forEach(page => {
        // #home
        // if(tIndex === 0 && page.path === tab.pagePath) {
        //   page['#home'] = true
        // }
        if(page.path === tab.pagePath) {
          page['#tab'] = {
            iconPath: tab.iconPath,
            selectedIconPath: tab.selectedIconPath,
            text: tab.text,
          }
        }
      })
    })
  }else {
    pages[0]['#home'] = true;
  }
  // #config
  pages.forEach(page => {
    page['#config'] = {
      name: '页面名称',
      author: '作者',
      description: '页面描述信息'
    }
  });
  return pages;
}

export function transformConfig(pagesJsonContent: SrcPagesJson) {
  let pagesConfig = createIndexJson(pagesJsonContent);
  return pagesConfig
}
