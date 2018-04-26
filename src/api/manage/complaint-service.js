import {BaseService} from 'api/base-service'
import {HttpClient} from 'utils/http-client'
import $ from 'jquery'

export class ComplaintService extends BaseService {
  constructor () {
    super('mgr/ClientComplaint/')
  }

  add (params) {
    let str = $.param(params)

    return HttpClient.post(`${this.apiContext}add?${str}`)
  }

  // list(params, pageModel) {
  //   let str = $.param(params);
  //
  //   return HttpClient.get(`${this.apiContext}list?start=${Tools.getPageStart(pageModel.curPage, pageModel.pageSize)}&limit=${pageModel.pageSize}&${str}`);
  // }
}
