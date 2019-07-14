/**
 * User: 成雨
 * Date: 2019/6/30 0030
 * Time: 11:44
 */
import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import xhr from './xhr'
import { buildURL } from '../helpers/url'
import { transformRequest } from '../helpers/data'
import { flattenHeaders, processHeaders } from '../helpers/headers'
import transform from './transform'

/**
 * axios 入口函数
 * @param config
 */
function axios(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

/**
 * 发送请求前处理 config 参数
 * @param config
 */
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers = flattenHeaders(config.headers, config.method!)
}

/**
 * 发送请求前处理 url
 * @param config
 */
function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config
  // ! 的作用就是说 url 毕传 不会没有
  return buildURL(url!, params)
}

/**
 * 对响应数据进行处理
 * @param res
 */
function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transform(res.data, res.headers, res.config.transformResponse)

  return res
}

export default axios
