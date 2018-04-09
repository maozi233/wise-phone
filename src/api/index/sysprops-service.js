import {BaseService} from 'api/base-service'
import {HttpClient} from 'utils/http-client'
import $ from 'jquery'

export class SysPropsService extends BaseService {
  constructor () {
    super('ClientSysProp/')
  }

  get (params) {
    let str = $.param(params)
    return HttpClient.get(`${this.apiContext}byName?${str}`, {mask: false})
  }
}
