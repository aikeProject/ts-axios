/**
 * User: 成雨
 * Date: 2019/6/30 0030
 * Time: 11:49
 */
import { AxiosRequestConfig, AxiosResponse, AxiosPromise } from './types'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { url, data = null, method = 'get', headers, responseType } = config

    const request = new XMLHttpRequest()
    if (responseType) {
      request.responseType = responseType
    }
    request.open(method.toUpperCase(), url, true)

    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) return
      const responseHeaders = request.getAllResponseHeaders()
      const responseDate = responseType && responseType !== 'text'
        ? request.response
        : request.responseText
      const response: AxiosResponse = {
        data: responseDate,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      resolve(response)
    }

    Object.keys(headers).forEach(value => {
      if (data == null && value.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(value, headers[value])
      }
    })

    request.send(data)
  })
}
