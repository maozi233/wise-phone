import {BaseService} from 'api/base-service'
import {HttpClient} from 'utils/http-client'
import $ from 'jquery'

export class FormulaService extends BaseService {
  constructor () {
    super('ClientDtManager/')
  }
  /**
   * @param {obj} params
   * params.identityType 枚举类型
   *  2 获取推荐配方师
   *
   * params.limit 数量
   */
  getRecommend (params) {
    let str = $.param(params)
    return HttpClient.get(`${this.apiContext}recommendList?${str}`, {mask: true})
  }

  listWith () {
    return HttpClient.get(`${this.apiContext}listWithRecommendGoods`)
  }
}
