/**
 * User: 成雨
 * Date: 2019/6/30 0030
 * Time: 16:40
 *
 * 对 request 中的 headers 做一层加工
 */

import { deepMerge, isPlainObject } from './util'
import { Method } from '../types'

/**
 * 请求 header 属性是大小写不敏感的，比如我们之前的例子传入 header 的属性名 content-type 就是全小写的，
 * 所以我们先要把一些 header 属性名规范化
 * @param herders
 * @param normalizeName
 */
function normalizeHeaderName(herders: any, normalizeName: string): void {
  if (!herders) return
  Object.keys(herders).forEach(value => {
    if (value !== normalizeName && value.toUpperCase() === normalizeName.toUpperCase()) {
      herders[normalizeName] = herders[value]
      delete herders[value]
    }
  })
}

/**
 * 处理 herders参数值
 * @param herders
 * @param data
 */
export function processHeaders(herders: any, data: any): any {
  normalizeHeaderName(herders, 'Content-Type')

  if (isPlainObject(data)) {
    if (herders && !herders['Content-Type']) {
      herders['Content-Type'] = 'application/json;charset=utf-8'
    }
  }

  return herders
}

/**
 * 请求方法对应配置
 */
export function flattenHeaders(headers: any, method: Method): any {
  if (!headers) {
    return headers
  }

  headers = deepMerge(headers.common || {}, headers[method] || {}, headers)

  const methodsToDelete = ['delete', 'get', 'head', 'options', 'post', 'put', 'patch', 'common']

  methodsToDelete.forEach(method => {
    delete headers[method]
  })

  return headers
}

/**
 * 将请求头解析字符串解析为对象key：value形式
 * @param headers
 */
export function parseHeaders(headers: string): any {
  let parsed = Object.create(null)
  if (!headers) return parsed

  headers.split('\r\n').forEach(line => {
    let [key, ...vals] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) return
    const val = vals.join(':').trim()
    parsed[key] = val
  })

  return parsed
}
