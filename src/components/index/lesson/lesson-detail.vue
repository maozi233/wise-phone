<template>
  <div>
    <sy-header ref="header" :noMargin="true" :showSearch="false"></sy-header>
    <div class="detail">
      <div class="image-container" v-if="detail">
        <div class="logo" :style="{backgroundImage:`url(${detail.imgs})`}"></div>
        <img class="back" src="~images/icon-back.png" @click="goBack">
        <img class="play" src="~images/vedio-play-gray.png">
      </div>
      <p class="price">{{detail.price}}</p>
      <p class="name">{{detail.name}}</p>
      <p class="number">报名人数: <span>{{detail.viewCount}}人</span></p>
    </div>

    <section v-if="detail">
      <div class="title">商品详情</div>
      <div class="box" v-html="detail.extContent.content" style="font-size:.3rem;text-align: left;">
      </div>
      <no-data v-show="detail.extContent.content === ''"></no-data>
    </section>

    <flex-popup ref="flexPop">
      <p class="title">立即报名</p>
      <input type="text" v-model="concatForm.name" placeholder="请输入姓名">
      <input type="number" v-model="concatForm.tel" placeholder="请输入手机号">
      <button @click="sendConcat" class="flex-center">确认</button>
    </flex-popup>

    <flex-popup ref="payPop"
                :closeHandle="clearPaying">
      <div class="flex-center">
        <vue-qr :text="payCode" class="code-img" height="300" width="300"></vue-qr>
        <p class="pay-code">请使用微信扫码付款</p>
      </div>
    </flex-popup>

    <div class="flex-bottom"></div>
    <flex-bottom  :showLeft="false"
                  :rightBtnBg="buyed ? '#999' : '#279b3c'"
                  :rightBtnName="btnText"
                  :rightBtnHandle="enroll">
    </flex-bottom>
  </div>
</template>

<script>
import Header from 'comp/index/header'
import FlexBottom from 'comp/index/flex-bottom'
import NoData from 'comp/no-data'
import FlexPopup from 'comp/index/flex-popup'
import VueQr from 'vue-qr'
import { Toast } from 'mint-ui'
import { OpenCourseService } from 'api/index/oepncourse-service'
import { ClientOrderService } from 'api/index/clientorder-service'
import { PayService } from 'api/index/repay-service'

export default {
  components: {
    [Header.name]: Header,
    NoData,
    FlexBottom,
    FlexPopup,
    VueQr
  },

  data () {
    return {
      id: '',
      detail: '',
      concatForm: {
        name: '',
        tel: ''
      },
      // 是否报名
      isRegister: false,
      orderId: '',
      payCode: '',
      paying: '',
      buyed: false
    }
  },

  computed: {
    btnText () {
      let text = ''
      text = this.isRegister ? '去支付' : '立刻报名'

      if (this.buyed) {
        text = '已报名'
      }

      return text
    }
  },

  methods: {
    enroll () {
      if (this.buyed) return

      if (!this.isRegister) {
        this.$refs.flexPop.show()
      } else {
        // this.pay()
        this.payService.getIp(this.pay)
      }
    },

    goBack () {
      this.$router.go(-1)
    },

    sendConcat () {
      if (!this.isRegister) {
        if (!this.concatForm.name || !this.concatForm.tel) {
          return Toast('信息未填写完整')
        }

        this.$refs.flexPop.hide()
        this.clientOrderService.add({
          courseId: this.id,
          recipientName: this.concatForm.name,
          mobile: this.concatForm.tel
        }).then(res => {
          Toast('报名成功，请支付')
          this.isRegister = true
          // this.pay()
          this.payService.getIp(this.pay)
          this.orderId = res.id
        })
      }
    },

    pay (ip) {
      this.$refs.payPop.show()
      this.payService.wechat({
        orderId: this.orderId,
        payService: 5,
        ip
      }).then(res => {
        if (res) {
          this.payCode = decodeURIComponent(res.payInfo)

          this.paying = setInterval(() => {
            this.isPay()
          }, 10000)
        }
      })
    },

    isPay () {
      this.payService.pay({
        orderId: this.orderId
      }).then(res => {
        if (res) {
          if (res.value === 'paid') {
            clearInterval(this.paying)
            this.$refs.payPop.hide()
            Toast('支付已完成, 可去商家后台查看详情')
          }
        }
      })
    },

    clearPaying () {
      if (this.paying) {
        clearInterval(this.paying)
      }
    },

    getIp () {}
  },

  created () {
    this.openCourseService = new OpenCourseService()
    this.clientOrderService = new ClientOrderService()
    this.payService = new PayService()
  },

  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      vm.id = to.query.id

      vm.openCourseService.get({
        id: vm.id
      }).then(res => {
        if (res) {
          vm.detail = res.goodsSy
          // orderStatus 为0表示已报名， -999未报名
          vm.isRegister = res.orderStatus === 100 || res.orderStatus === 0
          if (vm.isRegister) {
            vm.orderId = res.orderId
          }
          vm.buyed = res.orderStatus === 700
          console.log(vm.detail)
        }
      })
    })
  },

  beforeDestroy () {
    this.clearPaying()
  }
}
</script>

<style lang="scss" scoped>
@import '~scss/shotcut';

.detail{
  text-align: left;
  background: white;
  margin-bottom: .2rem;

  .image-container {
    position: relative;
    font-size: 0;

    .play {
      width: .8rem;
      height: .8rem;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      position: absolute;
    }

    .back {
      position: absolute;
      width: .6rem;
      height: .6rem;
      left: .2rem;
      top: .2rem;
    }

    .logo {
      width: 100%;
      height: 5rem;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
    }
  }

  .price {
    line-height: .9rem;
    color: $text-red;
    font-size: 0.3rem;
    text-indent: .3rem;

    &:before {
      content: '¥';
      margin-right: 5px;
    }
  }

  .name {
    font-size: .3rem;
    margin-bottom: .3rem;
    text-indent: .3rem;
  }

  .number {
    text-indent: .3rem;
    font-size: 0.24rem;
    color: $text-french;
    padding-bottom: .5rem;

    span {
      color: $text-black;
    }
  }
}

section {
  padding: 0 .3rem;
  background: white;
  margin-bottom: .2rem;

  .title {
    height: .9rem;
    box-sizing: border-box;
    border-bottom: 1px solid $border-french;
    display: flex;
    align-items: center;
    font-size: .28rem;
  }
}

.pop-flex-bottom {

  input, textarea {
    width: 100%;
    height: .8rem;
    box-sizing: border-box;
    line-height:.5rem;
    padding: .15rem .2rem;
    border: 1px solid $border-gray;
    background: #f8f8f8;
    margin-bottom: .3rem;
  }

  .title {
    line-height: .75rem;
    font-size: 0.36rem;
    margin-bottom: .1rem;
    text-align: center;
  }

  button {
    width: 100%;
    height: .8rem;
    font-size: .36rem;
    color: white;
    background: $text-green;
    margin-bottom: 0.2rem;
  }

  .code-img {
    border: 1px solid $border-gray;
    box-sizing: border-box;
  }

  .pay-code {
    font-size: 0.24rem;
    color: $text-french;
    padding-top: .25rem;
  }

  .flex-center {
    flex-direction: column;
  }

}
</style>
