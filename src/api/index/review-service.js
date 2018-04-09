import {BaseService} from 'api/base-service'
import {HttpClient} from 'utils/http-client'
import $ from 'jquery'

export class ReviewService extends BaseService {
  constructor () {
    super('Review/')
  }
  /**
   * 获取评论
   * @param {obj} obj
   * obj.goodsId 物品id
   * obj.start 从第几条
   * obj.limit 到第几条
   */
  list (params) {
    let str = $.param(params)
    return HttpClient.get(`${this.apiContext}list?${str}`)
  }
}
