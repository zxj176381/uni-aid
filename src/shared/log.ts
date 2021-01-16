import {
  formatDateTime
} from './util';
const colors = require('colors/safe');

function getTagText() {
  return '[' + formatDateTime() + '] ';
}

function getPerfix() {
  return '[uniaid]' + getTagText();
}

export function log(msg: any) {
  console.log(getPerfix() + msg);
}

export function logSuccess(msg: any) {
  console.log(colors.brightGreen(getPerfix() + msg));
}

export function logInfo(msg: any) {
  console.log(colors.brightBlue(getPerfix() + msg));
}

export function logWarn(msg: any) {
  console.log(colors.brightYellow(getPerfix() + msg));
}

export function logError(msg: string) {
  console.log(colors.brightRed(getPerfix() + msg));
}
