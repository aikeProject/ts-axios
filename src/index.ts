/**
 * User: 成雨
 * Date: 2019/6/30 0030
 * Time: 11:44
 */
import { AxiosRequestConfig } from './types'
import xhr from './xhr'
import { buildURL } from './helpers/url'

/**
 * axios 入口函数
 * @param config
 */
function axios(config: AxiosRequestConfig): void {
  processConfig(config)
  xhr(config)
}

/**
 * 发送请求前处理 config 参数
 * @param config
 */
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
}

/**
 * 发送请求前处理 url
 * @param config
 */
function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}

export default axios
