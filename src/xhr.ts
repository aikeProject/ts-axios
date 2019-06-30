/**
 * User: 成雨
 * Date: 2019/6/30 0030
 * Time: 11:49
 */
import { AxiosRequestConfig } from './types'

export default function xhr(config: AxiosRequestConfig): void {
  const { url, data = null, method = 'get', headers } = config

  const request = new XMLHttpRequest()

  request.open(method.toUpperCase(), url, true)

  Object.keys(headers).forEach(value => {
    if (data == null && value.toLowerCase() === 'content-type') {
      delete headers[name]
    } else {
      request.setRequestHeader(value, headers[value])
    }
  })

  request.send(data)
}
