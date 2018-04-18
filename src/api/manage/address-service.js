import {BaseService} from 'api/base-service'
import {HttpClient} from 'utils/http-client'
import $ from 'jquery'

export class AddressService extends BaseService {
  constructor () {
    super('ClientDeliveryAddress/')
  }

  list (params) {
    let str = $.param(params)

    return HttpClient.get(`${this.apiContext}list?${str}`)
  }

  add (params) {
    return HttpClient.post(`${this.apiContext}add?`, {
      body: params
    })
  }

  delete (params) {
    return HttpClient.destroy(`${this.apiContext}delete?`, {
      body: params
    })
  }

  update (params) {
    return HttpClient.put(`${this.apiContext}update?`, {
      body: params
    })
  }

  tree (params) {
    let str = $.param(params)

    return HttpClient.get(`mgr/ProvinceCityCounty/tree?${str}`)
  }
}
