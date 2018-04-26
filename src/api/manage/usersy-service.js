import {BaseService} from 'api/base-service'
import {HttpClient} from 'utils/http-client'
import $ from 'jquery'

export class UserSyService extends BaseService {
  constructor () {
    super('mgr/userShangYi/')
  }

  list (params) {
    let str = $.param(params)

    return HttpClient.get(`${this.apiContext}buyerList?${str}`)
  }
  // data (params) {
  //   let str = $.param(params)

  //   return HttpClient.get(`${this.apiContext}pAccountInfo?${str}`)
  // }

  // updateBase (params) {
  //   return HttpClient.put(`${this.apiContext}updateAccountInfo?`, {
  //     body: params
  //   })
  // }

  // updateCompany (params) {
  //   return HttpClient.put(`${this.apiContext}updateCompanyInfo?`, {
  //     body: params
  //   })
  // }

  // updateBank (params) {
  //   return HttpClient.put(`${this.apiContext}updateBankInfo?`, {
  //     body: params
  //   })
  // }
}
