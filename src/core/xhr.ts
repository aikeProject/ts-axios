/**
 * User: 成雨
 * Date: 2019/6/30 0030
 * Time: 11:49
 */
import { AxiosRequestConfig, AxiosResponse, AxiosPromise } from '../types'
import { createError } from '../helpers/error'
import { isURLSameOrigin } from '../helpers/url'
import cookie from '../helpers/cookie'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {
      url,
      data = null,
      method = 'get',
      headers,
      responseType,
      timeout,
      cancelToken,
      withCredentials,
      xsrfCookieName,
      xsrfHeaderName
    } = config

    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }

    if (timeout) {
      // 请求默认的超时时间是0，即用不超时
      request.timeout = timeout
    }

    // 跨域请求可以携带cookie
    if (withCredentials) {
      request.withCredentials = true
    }
    // xsrf
    if (withCredentials || (isURLSameOrigin(url!) && xsrfCookieName)) {
      const xsrfValue = cookie.read(xsrfCookieName!)
      if (xsrfValue && xsrfHeaderName) {
        headers[xsrfHeaderName] = xsrfValue
      }
    }

    request.open(method.toUpperCase(), url!, true)

    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) return
      if (request.status === 0) return

      const responseHeaders = request.getAllResponseHeaders()
      const responseDate =
        responseType && responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: responseDate,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }

      // 处理非200状态码
      handleResponse(response)
    }

    // 网络请求错误
    request.onerror = function handleError() {
      reject(createError('Network Error', config, null, request))
    }

    // 请求超时
    request.ontimeout = function handleTimeout() {
      reject(createError(`Timeout of ${timeout} ms exceeded`, config, 'ECONNABORTED', request))
    }

    // 取消求情
    if (cancelToken) {
      cancelToken.promise.then(reason => {
        request.abort()
        reject(reason)
      })
    }

    Object.keys(headers).forEach(value => {
      if (data == null && value.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(value, headers[value])
      }
    })

    request.send(data)

    function handleResponse(response: AxiosResponse) {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(
          createError(
            `Request failed with status code ${response.status}`,
            config,
            null,
            request,
            response
          )
        )
      }
    }
  })
}
