/**
 * @author 成雨
 * @date 2019-07-14
 * @Description: 拦截器管理
 */

import { ResolvedFn, RejectedFn } from '../types'

interface Interceptor<T> {
  resolved: ResolvedFn<T>
  rejected?: RejectedFn
}

export default class InterceptorManager<T> {
  // 私有属性
  // 用来存储拦截器
  private interceptors: Array<Interceptor<T> | null>

  constructor() {
    // 初始化
    this.interceptors = []
  }

  /**
   * 添加拦截器
   * @param resolved
   * @param rejected
   */
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number {
    this.interceptors.push({
      resolved,
      rejected
    })
    // 返回当前拦截器存储的位置 作为拦截器id
    return this.interceptors.length - 1
  }

  /**
   * 遍历拦截器
   * @param fn
   */
  froEach(fn: (interceptor: Interceptor<T>) => void): void {
    this.interceptors.forEach(interceptor => {
      if (interceptor !== null) {
        fn(interceptor)
      }
    })
  }

  /**
   * 删除拦截器
   * @param id
   */
  eject(id: number): void {
    if (this.interceptors[id]) {
      this.interceptors[id] = null
    }
  }
}
