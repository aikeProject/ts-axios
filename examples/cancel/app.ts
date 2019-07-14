/**
 * User: 成雨
 * Date: 2019/6/30 0030
 * Time: 12:16
 */

import axios, { Canceler } from '../../src/index'

const CancelToken = axios.CancelToken
const source = CancelToken.source()

axios.get('/cancel/get', {
  cancelToken: source.token
}).catch(function(e) {
  if (axios.isCancel(e)) {
    console.log('Request canceled', e.message)
  }
})
// source.cancel('Operation canceled by the user.22222')
setTimeout(() => {
  source.cancel('Operation canceled by the user.')

  axios.post('/cancel/post', { a: 1 }, { cancelToken: source.token }).catch(function(e) {
    if (axios.isCancel(e)) {
      console.log(e.message)
    }
  })

  axios.post('/cancel/post', { a: 1 }).catch(function(e) {
    if (axios.isCancel(e)) {
      console.log(e.message)
    }
  })
}, 100)

// let cancel: Canceler
//
// axios.get('/cancel/get', {
//   cancelToken: new CancelToken(c => {
//     cancel = c
//   })
// }).catch(function(e) {
//   if (axios.isCancel(e)) {
//     console.log('Request canceled')
//   }
// })
//
// setTimeout(() => {
//   cancel()
// }, 200)
