import {BaseService} from 'api/base-service'
import {HttpClient} from 'utils/http-client'
import $ from 'jquery'

export class HelpCenterService extends BaseService {
  constructor () {
    super('ClientHelpCenter/')
  }

  byId (id) {
    return HttpClient.get(`${this.apiContext}byId?id=${id}`)
  }

  list (params) {
    let str = $.param(params)
    return HttpClient.get(`${this.apiContext}list?start=0&limit=100&${str}`)
  }
}
