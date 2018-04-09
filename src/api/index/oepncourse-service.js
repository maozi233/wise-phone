import {BaseService} from 'api/base-service'
import {HttpClient} from 'utils/http-client'
import $ from 'jquery'

export class OpenCourseService extends BaseService {
  constructor () {
    super('ClientOpenCourse/')
  }

  get (params) {
    let str = $.param(params)
    return HttpClient.get(`${this.apiContext}byId?${str}`)
  }

  list (params) {
    let str = $.param(params)
    return HttpClient.get(`${this.apiContext}list?${str}`)
  }
}
