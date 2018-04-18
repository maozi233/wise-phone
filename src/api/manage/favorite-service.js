import {BaseService} from 'api/base-service'
import {HttpClient} from 'utils/http-client'
import $ from 'jquery'

export class FavoriteService extends BaseService {
  constructor () {
    super('ClientFavorite/')
  }

  list (params) {
    let str = $.param(params)

    return HttpClient.get(`${this.apiContext}list?${str}`)
  }

  delete (params) {
    return HttpClient.destroy(`${this.apiContext}delete?`, {
      body: params
    })
  }
}
