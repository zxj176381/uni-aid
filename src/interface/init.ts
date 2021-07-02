export interface SrcPagesJson {
  pages: Array<Pages>;
  subPackages?: Array<SubPackage>;
  globalStyle?: object;
  tabBar?: TabBar;
}

export interface TabBar {
  list: Array<TabBarOfList>;
}

export interface TabBarOfList {
  iconPath?: string;
  selectedIconPath?: string;
  text?: string;
  pagePath?: string;
}

export interface Pages {
  path: string;
  style?: object;
  '#home'?: boolean;
  '#tab'?: TabBarOfList;
  '#subPackage'?: SubPackage;
  '#config'?: object;
}

export interface SubPackage {
  root: string;
  pages?: Array<Pages>;
}

export interface Exclude {
  login?: Array<string>;
  phone?: Array<string>;
  wechat?: Array<string>;
}
