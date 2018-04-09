import {BaseService} from 'api/base-service'
import {HttpClient} from 'utils/http-client'
import $ from 'jquery'

export class FavoriteService extends BaseService {
  constructor () {
    super('ClientFavorite/')
  }

  add (params) {
    return HttpClient.post(`${this.apiContext}add`, {
      body: params
    })
  }

  deleteIt (params) {
    return HttpClient.destroy(`${this.apiContext}deleteByItemId`, {
      body: params
    })
  }

  filterIt (params) {
    let str = $.param(params)
    return HttpClient.get(`${this.apiContext}filterFavoriteList?${str}`)
  }
}
