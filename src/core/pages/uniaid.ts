import { getPagesJson } from "@/shared";

let pagesJsonContent = getPagesJson();

// 获取 TabBar
export function getTabBar() {
  const tabBar = pagesJsonContent.tabBar;
  if(tabBar) {
    tabBar.list.forEach(tab => {
      delete tab.iconPath;
      delete tab.selectedIconPath;
      delete tab.text;
    })
  }
  return tabBar || {}
}

// 获取 globalStyle
export function getGlobalStyle() {
  const globalStyle = pagesJsonContent.globalStyle;
  return globalStyle;
}
