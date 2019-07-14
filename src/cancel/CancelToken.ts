/**
 * @author 成雨
 * @date 2019-07-14
 * @Description: 取消功能类实现
 */

import { Canceler, CancelExecutor, CancelTokenSource } from '../types'
import Cancel from './Cancel'

interface ResolvePromis {
  (reason?: Cancel): void
}

export default class CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel

  constructor(executor: CancelExecutor) {
    let resolvePromise: ResolvePromis
    this.promise = new Promise<Cancel>(resolve => {
      resolvePromise = resolve
    })

    executor(message => {
      if (this.reason) return
      this.reason = new Cancel(message)
      resolvePromise(this.reason)
    })
  }

  throwIfRequested(): void {
    if (this.reason) throw this.reason
  }

  static source(): CancelTokenSource {
    let cancel!: Canceler
    const token = new CancelToken(cancel1 => {
      cancel = cancel1
    })
    return {
      cancel,
      token
    }
  }
}
