import {BaseService} from 'api/base-service'
import {HttpClient} from 'utils/http-client'
import $ from 'jquery'

export class PayService extends BaseService {
  constructor () {
    super('Pay/')
  }

  get (params) {
    return HttpClient.put(`${this.apiContext}repay`, {
      body: params
    })
  }

  pay (params) {
    let str = $.param(params)
    return HttpClient.get(`${this.apiContext}query?${str}`, {mask: false})
  }
}
