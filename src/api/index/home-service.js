import {BaseService} from 'api/base-service'
import {HttpClient} from 'utils/http-client'

export class HomeService extends BaseService {
  constructor () {
    super('Index/')
  }

  data () {
    return HttpClient.get(`${this.apiContext}index`, {mask: true})
  }

  banner () {
    return HttpClient.get(`${this.apiContext}list4Aide`, {mask: true})
  }
}
