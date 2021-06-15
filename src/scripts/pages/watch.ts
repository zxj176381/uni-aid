import glob from 'glob';
import chokidar from 'chokidar';
import { UNIAID_PATH, SRC_PATH, logInfo, logSuccess } from '@/shared';
import { build } from './build';

export function watch(){
    const uniaid = glob.sync(`${UNIAID_PATH}/*.json`);
    let routersFilesPath = glob.sync(SRC_PATH + '*pages/**/*.json');
    const watcher = chokidar.watch([...routersFilesPath, ...uniaid]);
    let isReady = false;
  
    watcher.on('ready', () => {
        isReady = true;
        logInfo('watcher is ready, waiting for changes...');
        build();
      })
      .on('add', (path) => {
        if (isReady) {
          routersFilesPath = glob.sync(SRC_PATH + '*pages/**/*.json');
          logSuccess('add [' + path + ']');
          build();
        }
      })
      .on('change', (path) => {
        if (isReady) {
          logSuccess('change [' + path + ']');
          build();
        }
      })
      .on('unlink', (path) => {
        if (isReady) {
          logSuccess('unlink [' + path + ']');
          build();
        }
      });
  
    return watcher;
  }
  