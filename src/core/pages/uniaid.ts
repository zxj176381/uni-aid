import { getPagesJson } from '@/shared';

// 获取 TabBar
export function getTabBar() {
  let pagesJsonContent = getPagesJson();
  const tabBar = pagesJsonContent.tabBar || {};
  return tabBar;
}

// 获取 globalStyle
export function getGlobalStyle() {
  let pagesJsonContent = getPagesJson();
  const globalStyle = pagesJsonContent.globalStyle;
  return globalStyle;
}
