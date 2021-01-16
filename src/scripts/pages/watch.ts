import fs from 'fs-extra';
import chokidar from 'chokidar';
import glob from 'glob';
import { getRoutersConfig, getUniaid } from "@/core";
import { logInfo, logSuccess, SRC_PATH, UNIAID_PATH } from "@/shared";

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

export function watch(){
  const uniaid = glob.sync(`${UNIAID_PATH}/*.json`);
  const routersFilesPath = glob.sync(SRC_PATH + '*pages/**/*.json');
  const watcher = chokidar.watch([...routersFilesPath, ...uniaid]);
  let isReady = false;

  watcher.on('ready', () => {
      isReady = true;
      logInfo('watcher is ready, waiting for changes...');
      getNewsPagesJson(routersFilesPath, uniaid);
    })
    .on('add', (path) => {
      if (isReady) {
        logSuccess('add [' + path + ']');
        getNewsPagesJson(routersFilesPath, uniaid);
      }
    })
    .on('change', (path) => {
      if (isReady) {
        logSuccess('change [' + path + ']');
        getNewsPagesJson(routersFilesPath, uniaid);
      }
    })
    .on('unlink', (path) => {
      if (isReady) {
        logSuccess('unlink [' + path + ']');
        getNewsPagesJson(routersFilesPath, uniaid);
      }
    });

  return watcher;
}
