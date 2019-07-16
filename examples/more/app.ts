/**
 * User: 成雨
 * Date: 2019/6/30 0030
 * Time: 12:16
 */

import axios from '../../src/index'

document.cookie = 'a=b'

axios.get('/more/get').then(res => {
  console.log(res)
})

axios.post('http://localhost:8088/more/server2', { }, {
  withCredentials: true
}).then(res => {
  console.log(res)
})

