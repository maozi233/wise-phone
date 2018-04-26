import {BaseService} from 'api/base-service'
import {HttpClient} from 'utils/http-client'
import $ from 'jquery'

export class SupplierProductService extends BaseService {
  constructor () {
    super('mgr/SupplierProductIM/')
  }

  list (params) {
    let str = $.param(params)
    return HttpClient.get(`${this.apiContext}list4supplier?${str}`)
  }

  getGoodsById (id) {
    return HttpClient.get(`${this.apiContext}goodsList4supplier?buyerId=${id}`)
  }

  verify (params) {
    let str = $.param(params)
    return HttpClient.put(`${this.apiContext}verify?${str}`)
  }
}
