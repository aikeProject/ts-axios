/**
 * User: 成雨
 * Date: 2019/6/30 0030
 * Time: 11:44
 */
import { AxiosRequestConfig } from './types'
import xhr from './xhr'

function axios(config: AxiosRequestConfig): void {
  xhr(config)
}

export default axios
