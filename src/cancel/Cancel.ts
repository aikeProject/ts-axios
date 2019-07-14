/**
 * @author 成雨
 * @date 2019-07-14
 * @Description:
 */

export default class Cancel {
  message?: string

  constructor(message?: string) {
    this.message = message
  }
}

export function isCancel(value: any): boolean {
  return value instanceof Cancel
}
