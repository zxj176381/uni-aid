import { getPagesJson } from '@/shared';

// 获取 TabBar
export function getTabBar() {
  let pagesJsonContent = getPagesJson();
  return pagesJsonContent.tabBar || {};
}

// 获取 globalStyle
export function getGlobalStyle() {
  let pagesJsonContent = getPagesJson();
  return pagesJsonContent.globalStyle;
}
