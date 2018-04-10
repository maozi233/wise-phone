import {BaseService} from 'api/base-service'
import {HttpClient} from 'utils/http-client'
import $ from 'jquery'

export class GroupIdService extends BaseService {
  constructor () {
    super('ClientShopGoodsGroup/')
  }

  list (params) {
    let str = $.param(params)
    return HttpClient.get(`${this.apiContext}rootGroupList()?${str}`)
  }
}
