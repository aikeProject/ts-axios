/**
 * User: 成雨
 * Date: 2019/6/30 0030
 * Time: 15:05
 *
 * 常用通用方法 util
 */

const toString = Object.prototype.toString

/**
 * 判断是不是Date（时间）
 * @param val 任意值
 */
export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

/**
 * 判断是不是Object（对象）
 * @param val 任意值
 */
export function isObject(val: any): val is Object {
  return val !== null && typeof val === 'object'
}

/**
 * 普通对象
 * @param val
 */
export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}

export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}
