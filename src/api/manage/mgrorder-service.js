import { BaseService } from 'api/base-service'
import { HttpClient } from 'utils/http-client'
import $ from 'jquery'

export class MgrService extends BaseService {
  constructor () {
    super('mgr/Order/')
  }

  list (params) {
    let str = $.param(params)

    return HttpClient.get(`${this.apiContext}list?${str}`)
  }

  byId (id) {
    return HttpClient.get(`${this.apiContext}byId?id=${id}`)
  }

  /**
   * @param {str} id 集采确认通过
   */
  approvePreOrderVerify (id) {
    return HttpClient.put(`${this.apiContext}approvePreOrderVerify`, {
      body: {
        id: id
      }
    })
  }

  /**
   * @param {obj} params 集采确认拒绝
   */
  rejectPreOrderVerify (params) {
    return HttpClient.put(`${this.apiContext}rejectPreOrderVerify`, {
      body: params
    })
  }

  /**
   * 预测单 确认订单
   * @param {string} id
   */
  preConfirmOrder (id) {
    return HttpClient.put(`${this.apiContext}preConfirmOrder`, {
      body: {
        orderId: id
      }
    })
  }

  /**
  * 取消订单
  * @param {string} params
  */
  orderCancele (params) {
    return HttpClient.put(`${this.apiContext}orderCancele`, {
      body: params
    })
  }

  /**
   * 发货
   * @param {string} params
   */
  delivery (params) {
    return HttpClient.put(`${this.apiContext}delivery`, {
      body: params
    })
  }
}
