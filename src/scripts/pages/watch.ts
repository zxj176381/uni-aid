import fs from 'fs-extra';
import chokidar from 'chokidar';
import glob from 'glob';
import { getRoutersConfig, getUniaid, createPageExclude, createPageAlias, transformConfig } from "@/core";
import { getPagesJson, logInfo, logSuccess, SRC_PATH, UNIAID_PATH } from "@/shared";

function getNewsPagesJson(routersFilesPath: Array<string>, uniaid: Array<string>) {
  const routersConfig = getRoutersConfig(routersFilesPath);
  const uniaidConfig = getUniaid(uniaid);
  uniaidConfig.tabBar.list = routersConfig.tabBar.list;
  const pagesJson = Object.assign(routersConfig, uniaidConfig);
  const pagesJsonPath = SRC_PATH + 'pages.json';
  fs.outputJsonSync(pagesJsonPath, pagesJson, {
    spaces: 2,
  })
}

function readPagesJson() {
  const pagesJsonContent = getPagesJson();
  return transformConfig(pagesJsonContent);
}

function watchJson(routersFilesPath: Array<string>, uniaid: Array<string>) {
  getNewsPagesJson(routersFilesPath, uniaid);
  createPageExclude();
  let pagesConfig = readPagesJson();
  createPageAlias(pagesConfig);
}

export function watch(){
  const uniaid = glob.sync(`${UNIAID_PATH}/*.json`);
  const routersFilesPath = glob.sync(SRC_PATH + '*pages/**/*.json');
  const watcher = chokidar.watch([...routersFilesPath, ...uniaid]);
  let isReady = false;

  watcher.on('ready', () => {
      isReady = true;
      logInfo('watcher is ready, waiting for changes...');
      watchJson(routersFilesPath, uniaid);
    })
    .on('add', (path) => {
      if (isReady) {
        logSuccess('add [' + path + ']');
        watchJson(routersFilesPath, uniaid);
      }
    })
    .on('change', (path) => {
      if (isReady) {
        logSuccess('change [' + path + ']');
        watchJson(routersFilesPath, uniaid);
      }
    })
    .on('unlink', (path) => {
      if (isReady) {
        logSuccess('unlink [' + path + ']');
        watchJson(routersFilesPath, uniaid);
      }
    });

  return watcher;
}
