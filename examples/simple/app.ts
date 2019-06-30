/**
 * User: 成雨
 * Date: 2019/6/30 0030
 * Time: 12:16
 */

import axios from '../../src/index'

axios({
  method: 'get',
  url: '/simple/get',
  params: {
    a: 1,
    b: 2
  }
})
