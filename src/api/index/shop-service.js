import {BaseService} from 'api/base-service'
import {HttpClient} from 'utils/http-client'
import $ from 'jquery'

export class ShopResultService extends BaseService {
  constructor () {
    super('ClientDtManager/')
  }

  search (params) {
    let str = $.param(params)
    return HttpClient.get(`${this.apiContext}search?${str}`)
  }

  getShop (id) {
    return HttpClient.get(`${this.apiContext}byId?dtManagerId=${id}`)
  }
}
