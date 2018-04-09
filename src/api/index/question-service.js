import {BaseService} from 'api/base-service'
import {HttpClient} from 'utils/http-client'
import $ from 'jquery'

export class QuestionService extends BaseService {
  constructor () {
    super('ClientQAQuestion/')
  }

  search (params) {
    let str = $.param(params)
    return HttpClient.get(`${this.apiContext}search?${str}`, {mask: true})
  }

  add (params) {
    return HttpClient.post(`${this.apiContext}add`, {
      body: params,
      mask: true
    })
  }

  // 获取回复列表
  list (params) {
    let str = $.param(params)
    return HttpClient.get(`ClientQAReply/list?${str}`, {mask: true})
  }
  // 添加回复
  answer (params) {
    return HttpClient.post(`ClientQAReply/add?`, {
      body: params,
      mask: true
    })
  }

  tags () {
    return HttpClient.get(`ClientMultiFunTag/list4qa?`, {mask: true})
  }
}
