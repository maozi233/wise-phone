import {BaseService} from 'api/base-service'
import {HttpClient} from 'utils/http-client'
import $ from 'jquery'

export class GoodsResultService extends BaseService {
  constructor () {
    super('ClientGoods/')
  }

  search (params) {
    let str = $.param(params)
    // return HttpClient.get(`${this.apiContext}search?start=${params.start}&limit=${params.size}&${str}`)
    return HttpClient.get(`${this.apiContext}search?${str}`)
  }
}
