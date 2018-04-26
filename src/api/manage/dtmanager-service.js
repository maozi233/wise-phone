import {BaseService} from 'api/base-service'
import {HttpClient} from 'utils/http-client'
import $ from 'jquery'

export class DtManagerService extends BaseService {
  constructor () {
    super('mgr/CmsDtManager/')
  }

  list (params) {
    let str = $.param(params)

    return HttpClient.get(`${this.apiContext}list?${str}`)
  }
}
