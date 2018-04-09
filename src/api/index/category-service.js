import {BaseService} from 'api/base-service'
import {HttpClient} from 'utils/http-client'
import $ from 'jquery'

export class CategoryService extends BaseService {
  constructor () {
    super('ClientCategory/')
  }

  list (params) {
    let str = $.param(params)

    return HttpClient.get(`${this.apiContext}listCache?${str}`)
  }

  /**
   * @param {num} type
   * 3 配方种类
   * 1 原料种类
   */
  listCache (type) {
    return HttpClient.get(`${this.apiContext}listCache?type=${type}`)
  }
}
