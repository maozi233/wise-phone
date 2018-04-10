import {BaseService} from 'api/base-service'
import {HttpClient} from 'utils/http-client'
import $ from 'jquery'

export class MessageService extends BaseService {
  constructor () {
    super('ClientPrivateMessage/')
  }

  get (params) {
    let str = $.param(params)

    return HttpClient.get(`${this.apiContext}list?${str}`)
  }

  deleteIt (params) {
    return HttpClient.destroy(`${this.apiContext}delete`, {
      body: params
    })
  }

  unRead () {
    return HttpClient.get(`${this.apiContext}unReadedCount`)
  }
}
