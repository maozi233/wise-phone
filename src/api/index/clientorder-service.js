import {BaseService} from 'api/base-service'
import {HttpClient} from 'utils/http-client'
// import $ from 'jquery'

export class ClientOrderService extends BaseService {
  constructor () {
    super('ClientOrder/')
  }

  add (params) {
    return HttpClient.post(`${this.apiContext}addCourseOrder`, {
      body: params
    })
  }
}
