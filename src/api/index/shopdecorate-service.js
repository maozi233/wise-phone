import {BaseService} from 'api/base-service'
import {HttpClient} from 'utils/http-client'
import $ from 'jquery'

export class ShopDecorate extends BaseService {
  constructor () {
    super('ClientShopDecorate/')
  }

  get (params) {
    let str = $.param(params)
    return HttpClient.get(`${this.apiContext}byType?${str}`)
  }
}
