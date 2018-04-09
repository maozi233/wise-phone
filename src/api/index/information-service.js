import {BaseService} from 'api/base-service'
import {HttpClient} from 'utils/http-client'
import $ from 'jquery'

export class InformationService extends BaseService {
  constructor () {
    super('ClientEssay/')
  }

  list (params) {
    let str = $.param(params)
    return HttpClient.get(`${this.apiContext}list?${str}`, {mask: true})
  }

  get (params) {
    let str = $.param(params)
    return HttpClient.get(`${this.apiContext}getEssay?${str}`, {mask: true})
  }
}
