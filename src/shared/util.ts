import JSONMinify from 'jsonminify';

// 压缩JSON
export function formatJson(json:string){
  return JSON.parse(JSONMinify(json))
}

function _formatDateText(value: number) {
  return value > 9 ? value : '0' + value;
}

// 获取当前时间
export function formatDateTime(date?: Date) {
  date = date || new Date();
  const year = date.getFullYear();
  const month = _formatDateText(date.getMonth() + 1);
  const day = _formatDateText(date.getDate());

  const hours = _formatDateText(date.getHours());
  const minutes = _formatDateText(date.getMinutes());
  const seconds = _formatDateText(date.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// 判断对象中是否包含某个属性
const hasOwnProperty = Object.prototype.hasOwnProperty;

export function hasOwn(obj:object, prop: string) {
  return hasOwnProperty.call(obj, prop)
}
