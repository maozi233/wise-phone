import {BaseService} from 'api/base-service'
import {HttpClient} from 'utils/http-client'
import $ from 'jquery'

export class BuyerService extends BaseService {
  constructor () {
    super('ClientOrder/')
  }

  list (params) {
    let str = $.param(params)

    return HttpClient.get(`${this.apiContext}list?${str}`)
  }

  byId (id) {
    return HttpClient.get(`${this.apiContext}byId?id=${id}`)
  }
}