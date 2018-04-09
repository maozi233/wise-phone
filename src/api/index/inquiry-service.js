import {BaseService} from 'api/base-service'
import {HttpClient} from 'utils/http-client'

export class InquiryService extends BaseService {
  constructor () {
    super('ClientInquiry/')
  }

  add (params) {
    return HttpClient.post(`${this.apiContext}add`, {
      body: params
    })
  }
}
