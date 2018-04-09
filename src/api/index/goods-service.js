import {BaseService} from 'api/base-service'
import {HttpClient} from 'utils/http-client'
import $ from 'jquery'

export class GoodsService extends BaseService {
  constructor () {
    super('ClientGoods/')
  }
  /**
   * 原料 配方 供应商查询接口
   * @param {obj} obj
   *  obj.start
   *  obj.limit
   *  obj.goodsProp 查询类型 (1: 原料 2: 配方 3: 供应商 4: 技术服务)
   *  obj.keyword
   *  obj.cateId 作用未知
   */
  search (params) {
    let str = $.param(params)
    // return HttpClient.get(`${this.apiContext}search?start=${params.start}&limit=${params.limit}&${str}`)
    return HttpClient.get(`${this.apiContext}search?${str}`, {mask: true})
  }
  /**
   * 获取物品详细信息
   * @param {obj}
   *  obj.id  物品id
   */
  get (params) {
    let str = $.param(params)
    return HttpClient.get(`${this.apiContext}byId?${str}`, {mask: true})
  }

  list4client (params) {
    let str = $.param(params)

    return HttpClient.get(`${this.apiContext}list4client?${str}`, {mask: true})
  }
}
