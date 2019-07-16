/**
 * @author 成雨
 * @date 2019-07-16
 * @Description: 测试 util.ts
 */

import {
  isDate,
  isFormData,
  isPlainObject,
  isURLSearchParams,
  extend,
  deepMerge
} from '../../src/helpers/util'

describe('helpers:util', () => {
  describe('isXX', function() {
    test('should validate Date', () => {
      expect(isDate(new Date())).toBeTruthy()
      expect(isDate(Date.now())).toBeFalsy()
    })

    test('should validate PlainObject', () => {
      function plain() {
        //
      }

      class A {}

      expect(isPlainObject({})).toBeTruthy()
      expect(isPlainObject({ a: '11' })).toBeTruthy()
      expect(isPlainObject(new A())).toBeTruthy()
      expect(isPlainObject(plain)).toBeFalsy()
      expect(isPlainObject(new Date())).toBeFalsy()
      expect(isPlainObject(null)).toBeFalsy()
      expect(isPlainObject('')).toBeFalsy()
      expect(isPlainObject('11')).toBeFalsy()
      expect(isPlainObject(false)).toBeFalsy()
      expect(isPlainObject(true)).toBeFalsy()
      expect(isPlainObject(Number(1))).toBeFalsy()
      expect(isPlainObject(1)).toBeFalsy()
    })

    test('should validate FormData', () => {
      expect(isFormData(new FormData())).toBeTruthy()
      expect(isFormData({})).toBeFalsy()
    })

    test('should validate URLSearchParams', () => {
      expect(isURLSearchParams(new URLSearchParams())).toBeTruthy()
      expect(isURLSearchParams('foo=1&bar=2')).toBeFalsy()
    })
  })
})
