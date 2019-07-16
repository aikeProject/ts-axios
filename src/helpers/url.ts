/**
 * User: 成雨
 * Date: 2019/6/30 0030
 * Time: 15:05
 *
 * 处理url
 */

import { isDate, isPlainObject, isURLSearchParams } from './util'

interface URLOrigin {
  protocol: string
  host: string
}

function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function buildURL(url: string, params?: any, paramsSerializer?: (params: any) => string) {
  if (!params) {
    return url
  }

  let serializedParams

  if (paramsSerializer) {
    serializedParams = paramsSerializer(params)
  } else if (isURLSearchParams(params)) {
    serializedParams = params.toString()
  } else {
    const parts: string[] = []

    Object.keys(params).forEach(key => {
      let val = params[key]
      if (val === null || typeof val === 'undefined') {
        return
      }

      let values: string[]
      // 数组
      if (Array.isArray(val)) {
        values = val
        key += '[]'
      } else {
        values = [val]
      }

      values.forEach(value => {
        // 时间
        if (isDate(value)) {
          value = value.toISOString()
        }
        // 对象
        else if (isPlainObject(val)) {
          value = JSON.stringify(value)
        }

        parts.push(`${encode(key)}=${encode(value)}`)
      })
    })

    serializedParams = parts.join('&')
  }

  if (serializedParams) {
    // 去除哈希值
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }

    // 处理 '?'
    url += (url.indexOf('?') === -1 ? '?' : '') + serializedParams
  }

  return url
}

const urlParsingNode = document.createElement('a')

const currentOrigin = resolveURL(window.location.href)

function resolveURL(url: string): URLOrigin {
  urlParsingNode.setAttribute('href', url)
  const { protocol, host } = urlParsingNode

  return {
    protocol,
    host
  }
}

/**
 * 判断是否是同域
 * @param requestURL
 */
export function isURLSameOrigin(requestURL: string): boolean {
  const parsedOrigin = resolveURL(requestURL)

  return (
    parsedOrigin.protocol === currentOrigin.protocol && parsedOrigin.host === currentOrigin.host
  )
}
