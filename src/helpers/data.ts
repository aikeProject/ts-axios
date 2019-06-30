/**
 * User: 成雨
 * Date: 2019/6/30 0030
 * Time: 16:16
 *
 * 对 request 中的 data 做一层转换
 */

import { isPlainObject } from './util'

export function transformRequest(data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}
