import { BaseService } from 'api/base-service'
import { HttpClient } from 'utils/http-client'
import $ from 'jquery'

export class BuyerService extends BaseService {
  constructor () {
    super('ClientOrder/')
  }

  list (params) {
    let str = $.param(params)

    return HttpClient.get(`${this.apiContext}list?${str}`)
  }

  byId (id) {
    return HttpClient.get(`${this.apiContext}byId?id=${id}`)
  }

  /**
   * 确认收货
   * @param {string} id
   */
  received (id) {
    return HttpClient.put(`${this.apiContext}received`, {
      body: {
        orderId: id
      }
    })
  }

  /**
   * 申请退货
   * @param {string} id
   */
  preRefund (id) {
    return HttpClient.put(`${this.apiContext}preRefund`, {
      body: {
        orderId: id
      }
    })
  }

  /**
   * 确定取消
   * @param {string} id
   */
  sureCancel (id) {
    return HttpClient.put(`${this.apiContext}confirmCancel`, {
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
}
