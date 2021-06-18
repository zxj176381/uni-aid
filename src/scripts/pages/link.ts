import fs from 'fs-extra';
import prettier from 'prettier';
import { getDirJsonConfig } from '@/core';

function createPageLink() {
  const { linkJson, linkJsonPath } = getDirJsonConfig();
  let linkTpl = `const pages = ${JSON.stringify(linkJson)}`;
  linkTpl = prettier.format(linkTpl, {
    tabWidth: 2,
    singleQuote: true,
    parser: 'babel',
  });
  fs.outputFileSync(linkJsonPath, linkTpl, 'utf-8');
}

export function link() {
  createPageLink();
}
