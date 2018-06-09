<template>
  <div>
    <div class="img-container">
      <img class="logo" src="../../assets/images/login.png">
      <img class="return" src="../../assets/images/return-white.png" @click="goBack">
      <div class="page-header">
        <div @click="onRegisterClick">注册</div>
        <div @click="activePager = 'tab2'">登录</div>
      </div>
      <div class="triangle" v-show="register" :class="activePager === 'tab2' ? 'active' : ''"></div>
    </div>
    <div class="wrapper">
      <mt-tab-container class="pager-body" v-model="activePager" :swipeable='true'>
        <mt-tab-container-item id="tab1">
          <div class="input-container">
            <input type="text" placeholder="请输入手机号" v-model="tab1Form.tel">
            <input type="password" placeholder="请输入密码" v-model="tab1Form.pwd">
            <input type="password" placeholder="请再次输入密码" v-model="tab1Form.pwdRep">
            <div class="code-container">
              <input type="text" placeholder="请输入验证码"  v-model="tab1Form.code">
              <div class="btn-send" @click="sendCode" :class="sendMsgDisabled ? 'isSendCode' : ''">
                <span>{{ sendMsgDisabled ? `剩余${time}秒` : '发送验证码'}}</span>
              </div>
            </div>
            <div class="btn" :class="!register ? 'register' : ''" @click="registerHandle">{{!register ? '更改密码'  : '立刻注册'}}</div>
            <p class="hint" v-show="register">已有账号, 马上<span @click="activePager = 'tab2'">登录</span></p>
            <p class="footer-text">Copyright @2018 上海尚逸网络科技有限公司 保留所有权利</p>
            <p class="footer-text">沪ICP备11052906号</p>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="tab2">
          <div class="input-container">
            <input  type="number" v-model="loginForm.tel" placeholder="请输入手机号">
            <input type="password" v-model="loginForm.pwd" placeholder="请输入密码">
            <div class="code-container">
              <input type="text" v-model="loginForm.code" placeholder="请输入验证码">
              <div class="btn-send">
                <img v-if="codeUrl" :src="codeUrl" @click="refreshCode">
                <!-- <img v-if="codeUrl" :src="codeUrl"> -->
              </div>
            </div>
            <!-- <div class="btn" @click="login">登录 请求了{{count}}次</div> -->
            <div class="btn" @click="login">登录</div>
            <p class="btns">
              <span @click="onForgetPwdClick">忘记密码?</span>
              <span @click="activePager = 'tab1'">注册</span>
            </p>
            <p class="footer-text">Copyright @2018 上海尚逸网络科技有限公司 保留所有权利</p>
            <p class="footer-text">沪ICP备11052906号</p>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>

<script>
import { API_URL } from 'utils/http-client'
import { Reg } from 'utils/validator'
import { Toast } from 'mint-ui'
import md5 from 'js-md5'
import { UserService } from 'api/user/user-service'
import { Tools } from 'utils/tools'
// import { Msg } from 'utils/tools'

export default {
  data () {
    return {
      activePager: 'tab1',
      register: true,
      sendMsgDisabled: false,
      time: 60,
      refreshTime: new Date().getTime(),
      loginForm: {
        tel: '',
        pwd: '',
        code: ''
      },
      tab1Form: {
        tel: '',
        pwd: '',
        pwdRep: '',
        code: ''
      },
      backUrl: '/',
      codeUrl: '',
      count: 0
    }
  },

  // computed: {
  //   codeUrl () {
  //     return `${API_URL}ClientVerifyCode/verify-code?_t=${this.refreshTime}`
  //   }
  // },
  methods: {
    login () {
      let tel = this.loginForm.tel.trim()
      let pwd = this.loginForm.pwd.trim()
      let code = this.loginForm.code.trim()

      if (!Reg.phone.test(tel)) {
        return Toast('请输入正确的手机号')
      }
      if (!pwd) {
        return Toast('请输入密码')
      }
      if (!code) {
        return Toast('请输入验证码')
      }

      // alert(encodeURIComponent(code) === code)

      this.userService.login({
        loginId: tel,
        code: this.loginForm.code.trim(),
        password: md5(pwd)
      }).then(res => {
        if (res) {
          let user = res.user
          Tools.setUser(user)
          // 回到上个页面
          this.goBack()
        } else {
          this.refreshCode()
        }
      })
    },

    getCookie (name) {
      // 获取cookie字符串
      let strcookie = document.cookie
      var arrcookie = strcookie.split('; ') // 分割
      // 遍历匹配
      for (let i = 0; i < arrcookie.length; i++) {
        var arr = arrcookie[i].split('=')
        if (arr[0] === name) {
          return arr[1]
        }
      }
      return ''
    },

    refreshCode () {
      // this.refreshTime = new Date().getTime()
      this.count++
      this.codeUrl = `${API_URL}ClientVerifyCode/verify-code?_t=${new Date().getTime()}`
    },

    sendCode () {
      if (this.sendMsgDisabled) return

      let tel = this.tab1Form.tel
      if (!Reg.phone.test(tel)) {
        return Toast('请输入正确的手机号')
      }

      if (this.register) {
        this.userService.sendRegisterCode(`${tel}`).then(res => {
          if (res) {
            this.timer()
          }
        })
      } else {
        this.userService.sendResetCode({ mobile: tel }).then(res => {
          if (res) {
            this.timer()
          }
        })
      }
    },

    timer () {
      this.sendMsgDisabled = true
      let interval = window.setInterval(() => {
        // 注册的倒计时才记录
        if (this.register) {
          window.localStorage.setItem('time', this.time)
        }
        if (this.time-- <= 0) {
          this.time = 60
          this.sendMsgDisabled = false
          window.clearInterval(interval)
        }
      }, 1000)
    },

    registerHandle () {
      let tel = this.tab1Form.tel.trim()
      let pwd = this.tab1Form.pwd.trim()
      let pwdRep = this.tab1Form.pwdRep.trim()
      let code = this.tab1Form.code.trim()

      if (!Reg.phone.test(tel)) {
        return Toast('请输入正确的手机号')
      }
      if (!pwd) {
        return Toast('请输入密码')
      }
      if (!pwdRep) {
        return Toast('请再此输入密码')
      }
      if (pwd !== pwdRep) {
        return Toast('两次输入的密码不一致')
      }

      if (!code) {
        return Toast('请输入验证码')
      }

      // 注册的情况
      if (this.register) {
        this.userService
          .register({
            mobile: tel + '',
            code,
            password: md5(pwd)
          })
          .then(res => {
            if (res) {
              Toast('注册成功')
              let user = res.user
              Tools.setUser(user)

              // 回到上个页面
              this.goBack()
            }
          })
      } else {
        // 修改密码
        this.userService
          .updatePwdWithCode({
            mobile: tel,
            code,
            password: md5(pwd)
          })
          .then(res => {
            if (res) {
              Toast('修改密码成功')
              this.$router.push('/')
            }
          })
      }
    },

    onForgetPwdClick () {
      this.register = false
      this.activePager = 'tab1'
    },

    onRegisterClick () {
      this.register = true
      this.activePager = 'tab1'
    },

    goBack () {
      this.$router.replace({
        path: this.backUrl
      })
    }
  },

  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      // 记录是从哪个路由跳转过来的
      vm.backUrl = from.fullPath
      let isLogin = to.query.target === 'login'
      if (isLogin) {
        vm.activePager = 'tab2'
      }
    })
  },

  created () {
    this.userService = new UserService()
    // alert('created')
    // this.refreshCode()
    console.log(this.getCookie('wises_sessionId'))
  },

  mounted () {
    if (window.localStorage.getItem('time')) {
      this.time = window.localStorage.getItem('time')
      this.timer()
    }
    this.refreshCode()
  }
}
</script>
<style lang="scss" scoped>
@import "../../scss/shotcut.scss";

// body {
//   overflow: hidden;
// }

.img-container {
  position: relative;
  font-size: 0;

  .logo {
    width: 100%;
    height: 4rem;
  }

  .return {
    position: absolute;
    top: 0.3rem;
    left: 0.3rem;
    width: 0.3rem;
    height: 0.3rem;
  }

  .page-header {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0.8rem;
    font-size: 0.36rem;
    color: white;
    display: flex;
    justify-content: space-around;
  }

  .triangle {
    position: absolute;
    bottom: 0;
    left: 25%;
    &.active {
      left: 75%;
    }
    transform: translateX(-50%);
    width: 0;
    height: 0;

    border-top: 0.15rem solid rgba(0, 0, 0, 0);
    border-right: 0.15rem solid rgba(0, 0, 0, 0);
    border-bottom: 0.15rem solid white;
    border-left: 0.15rem solid rgba(0, 0, 0, 0);
  }
}

.wrapper {
  position: absolute;
  bottom: 0;
  top: 4rem;
  width: 100%;
  min-height: 80vh;

  .mint-tab-container {
    height: 100%;
  }
}

.input-container {
  padding: 0.3rem 0.75rem;
  background: white;
  font-size: 0;

  input {
    width: 100%;
    height: 0.9rem;
    box-sizing: border-box;
    border-radius: 3px;
    border: 1px solid $border-gray;
    font-size: 0.28rem;
    text-indent: 1em;
    margin-bottom: 0.2rem;
  }

  .code-container {
    display: flex;
    margin-bottom: 0.4rem;

    .btn-send {
      border: 1px solid $text-green;
      color: $text-green;
      font-size: 0.28rem;
      margin-left: 0.18rem;
      flex-shrink: 0;
      line-height: 0.9rem;
      height: 0.9rem;
      box-sizing: border-box;
      border-radius: 3px;
      width: 2rem;
      & > img {
        width: 100%;
        height: 100%;
      }
      &.sendMsgDisabled {
        border-color: $border-gray;
        color: $border-gray;
      }
    }
  }

  .btn {
    height: 0.9rem;
    line-height: 0.9rem;
    font-size: 0.36rem;
    background: $text-green;
    color: white;
    border-radius: 3px;
    margin-bottom: 0.3rem;

    &.register {
      margin-bottom: 1.2rem;
    }
  }

  .btns {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.7rem;

    span {
      color: $text-gray;
      font-size: 0.24rem;
    }
  }

  .hint {
    font-size: 0.24rem;
    color: $text-french;
    margin-bottom: 0.8rem;

    & > span {
      color: $text-green;
    }
  }

  .footer-text {
    font-size: 0.16rem;
    color: $text-french;
    line-height: 0.26rem;
  }
}
</style>
