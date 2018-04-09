import {BaseService} from 'api/base-service'
import {HttpClient} from 'utils/http-client'

export class UserService extends BaseService {
  constructor () {
    super('ClientUserLogin/')
  }

  login (params) {
    return HttpClient.post(`${this.apiContext}login`, {
      body: params
    })
  }

  logout () {
    return HttpClient.get(`${this.apiContext}logout`)
  }

  sendRegisterCode (mobile) {
    return HttpClient.post(`ClientUserRegister/sendRegisterAuthCode`, {
      body: {
        mobile
      }
    })
  }

  register (params) {
    return HttpClient.post(`ClientUserRegister/register`, {
      body: params
    })
  }

  sendResetCode (params) {
    return HttpClient.post(`ClientUser/sendResetPwdCode`, {
      body: params
    })
  }

  updatePwdWithCode (params) {
    return HttpClient.post(`ClientUser/updatePwdWithCode`, {
      body: params
    })
  }

  // modifyPassword (params) {
  //   return HttpClient.put(`ClientUser/updatePassword`, {
  //     body: params
  //   })
  // }

  // sendcode (params) {
  //   return HttpClient.post(`${this.apiContext}sendLoginSmsCode`, {
  //     body: params
  //   })
  // }
}
