import {BaseService} from 'api/base-service'
import {HttpClient} from 'utils/http-client'
import $ from 'jquery'

export class MgrService extends BaseService {
  constructor () {
    super('mgr/Order/')
  }

  list (params) {
    let str = $.param(params)

    return HttpClient.get(`${this.apiContext}list?${str}`)
  }

  byId (id) {
    return HttpClient.get(`${this.apiContext}byId?id=${id}`)
  }
}
