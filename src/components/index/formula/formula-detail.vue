<template>
  <div>
    <sy-header ref="header" :showSearch='false'></sy-header>
    <div class="goods-detail" v-if="detail">
      <div class="title">
        <img src="~images/back.png" @click="goBack">
        <span>商品详情</span>
      </div>
      <div class="content"  >
        <div class="price">
          <span>¥{{detail.price}}/kg</span>
          <p class="tags" v-if="detail.category">
            <span class="flex-center">{{detail.category.name}}</span>
          </p>
        </div>
        <div class="name single-line">{{detail.name}}</div>
        <div class="des single-line">{{detail.subject || '无简介'}}</div>
        <div class="support">技术支持: {{detail.exContent.teac.join(' ') || '无支持'}}</div>
      </div>
    </div>

    <review-entry v-if="formulaId" :id="formulaId" :shopId="shopId"></review-entry>

    <section v-if="detail">
      <div class="title">商品详情</div>
      <div class="detail-box" v-html="detail.content.content">
      </div>
      <no-data v-show="detail.content.content === ''"></no-data>
    </section>

    <section v-if="detail">
      <div class="title">爬虫详情</div>
      <div class="files">
        <a  v-for="(file, index) in detail.exContent.goodsFile" :key="index"
            :href="file.path">{{file.name}}</a>
      </div>
    </section>

    <section class="explain">
      <div class="title">购买说明</div>
      <div class="content">
        <div class="tip">一、配方交易流程</div>
        <div class="box">
          <img src="~images/explain.png">
        </div>
        <div class="tip">二、关于购销协议说明</div>
        <div class="box">
          <p>1.购销协议签订后，买卖双方不能随意取消订单。</p>
        </div>
        <div class="tip">三、关于配方服务说明</div>
        <div class="box">
          <p>1.寄送样品：在配方交易时配方师会寄送配方样品至采购商。</p>
          <p>2.配方信息交接：配方详情页只呈现部分配方内容，在交易进行到一定阶段后，配方师会将该配方的完整内容给予采购商。</p>
          <p>3.技术支持：在线支持、电话支持、人员外派，以配方师店铺展示的技术支持为准。</p>
        </div>
        <div class="tip">四、关于配方订单说明</div>
        <div class="box">
          <p>1.订单生成后24小时内未付款，系统自动取消订单。</p>
          <p>2.采购商在订单支付之前可取消订单，支付之后如需取消订单需供应商确认才能生效。</p>
          <p>3.配方服务的交易流程需要采供双方确认，否则无效。</p>
          <p>4.订单交付过程中，如有问题，请联系供应商或咨询平台客服。</p>
        </div>
      </div>
    </section>

    <div class="recommend">
      <div class="title">
        推荐商品
      </div>
      <div class="box">
        <div  class="goods"
              v-for="(item, index) in formulationGoods" :key="index"
              @click="onClickRecommend(item.id)">
          <p class="name single-line">{{item.name}}</p>
          <p class="price">¥{{item.price}}</p>
        </div>
        <no-data v-show="formulationGoods.length === 0"></no-data>
      </div>
    </div>

    <flex-popup ref="flexPop">
      <input type="text" v-model="concatForm.name" placeholder="请输入姓名">
      <input type="number" v-model="concatForm.tel" placeholder="请输入手机号">
      <textarea v-model="concatForm.des" placeholder="需求描述"></textarea>
      <p>请填写您的信息, 我们稍后以短信的方式告知您供应商联系方式！</p>
      <button @click="sendConcat" class="flex-center">确认</button>
    </flex-popup>

    <div class="flex-bottom"></div>
    <flex-bottom  v-if="formulaId"
                  :id="formulaId"
                  :shopId="shopId"
                  :rightBtnName="'咨询'"
                  :rightBtnHandle="consult"></flex-bottom>
  </div>
</template>

<script>
import Header from 'comp/index/header'
import FlexBottom from 'comp/index/flex-bottom'
import NoData from 'comp/no-data'
import FlexPopup from 'comp/index/flex-popup'
import { Toast } from 'mint-ui'
import ReviewEntry from 'comp/index/review-entry'
import { GoodsService } from 'api/index/goods-service'
import { InquiryService } from 'api/index/inquiry-service'
import { Reg } from 'utils/validator'

export default {
  components: {
    [Header.name]: Header,
    NoData,
    FlexBottom,
    ReviewEntry,
    FlexPopup
  },

  data () {
    return {
      formulaId: '',
      shopId: '',
      detail: '',
      formulationGoods: [],
      concatForm: {
        name: '',
        tel: '',
        des: ''
      }
    }
  },

  methods: {
    goBack () {
      this.$router.go(-1)
    },
    // 点击咨询按钮
    consult () {
      this.$refs.flexPop.show()
    },

    sendConcat () {
      if (!this.concatForm.name || !this.concatForm.tel || !this.concatForm.des) {
        return Toast('信息未填写完整')
      }

      if (!Reg.phone.test(this.concatForm.tel)) {
        return Toast('请填写正确的手机号')
      }
      this.$refs.flexPop.hide()
      this.inquiryService.add({
        type: 1,
        title: this.detail.name,
        userName: this.concatForm.name,
        mobile: this.concatForm.tel,
        description: this.concatForm.des,
        goodsId: this.formulaId
      }).then(res => {
        if (res) {
          Toast('发送成功')
          this.concatForm.name = ''
          this.concatForm.tel = ''
          this.concatForm.des = ''
        }
      })
    },

    onClickRecommend (id) {
      this.$router.push({
        path: '/producer/detail',
        query: {
          id
        }
      })
    }
  },

  beforeRouteEnter: (to, from, next) => {
    next((vm) => {
      vm.formulaId = to.query.id || ''

      vm.goodsService.get({
        id: vm.formulaId
      }).then(res => {
        if (res) {
          res.exContent = res.extContent.content === '' ? {teac: []} : JSON.parse(res.extContent.content)
          vm.detail = res
          vm.formulationGoods = res.formulationGoods
          vm.shopId = res.dtManager.id

          console.log(vm.detail.exContent.goodsFile)
        }
      })
    })
  },

  created () {
    this.goodsService = new GoodsService()
    this.inquiryService = new InquiryService()
  },

  mounted () {
  }
}
</script>

<style lang="scss">
.detail-box{
    font-size:.3rem;
    overflow-x: auto;

    img {
      max-width: 100%;
    }
  }
</style>

<style lang="scss" scoped>
@import '~scss/shotcut';

.goods-detail {
  background: white;
  margin-bottom: .1rem;

  .title {
    height: .88rem;
    box-sizing: border-box;
    border-bottom: 1px solid $border-french;
    padding: 0 .3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & > img {
      width: .3rem;
      height: .28rem;
    }

    & > span {
      flex-grow: 1;
      margin-left: -.3rem;
      font-size: .36rem;
    }
  }

  .content {
    padding: 0 .3rem;
    text-align: left;

    .price {
      height: .6rem;
      display: flex;
      align-items: center;

      & > span {
        font-size: .3rem;
        color: $text-red;
        margin-right: .25rem;
      }

      .tags {
        flex-grow: 1;
        display: flex;

        & > span {
          font-size: .24rem;
          margin-right: .1rem;
          padding: 0 .1rem;
          height:.3rem;
          border-radius: 5px;
          border: 1px solid #2febbb;
          color: #2febbb;
          box-sizing: border-box;
        }
      }
    }

    .name {
      height: .6rem;
      line-height: .6rem;
      font-size:.3rem;
    }

    .des {
      height: .55rem;
      line-height: .55rem;
      font-size:.24rem;
      color: $text-french;
    }

    .support {
      height: .63rem;
      line-height: .63rem;
      font-size:.24rem;
      color: $text-french;
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

.explain {
  text-align: left;
  padding-bottom: .25rem;

  .tip {
    height: .8rem;
    line-height: .8rem;
    font-size: .28rem;
  }

  .box {
    & > img {
      width: 100%;
      height: 2.4rem;
    }

    & > P {
      line-height: .4rem;
      font-size: .24rem;
      color: $text-french;
      margin-bottom: 0.1rem;
    }
  }
}

.recommend {
  background: white;
  text-align: left;

  & > .title {
    height:.88rem;
    line-height:.88rem;
    font-size: .28rem;
    padding: 0 .3rem;
    position: relative;

    &:before {
      content: '';
      width: 4px;
      height: .3rem;
      position: absolute;
      left: 0 ;
      top: 50%;
      transform: translateY(-50%);
      background: $text-green;
    }
  }

  .box {
    background: #f2f2f2;
    padding: .2rem;
    padding-bottom: .45rem;
    display: flex;
    flex-wrap: wrap;

    .goods {
      flex-grow: 1;
      width: 50%;
      max-width: 50%;
      border-right: .1rem solid #f2f2f2;
      margin-bottom: .1rem;
      height: 1.2rem;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      padding: .2rem .3rem;
      background: white;
      &:nth-child(even) {
        border: none;
      }
      &:nth-last-child(1),&:nth-last-child(2) {
        margin-bottom : 0;
      }

      .name {
        font-size: .28rem;
        line-height: .28rem;
        margin-bottom: .15rem;
      }

      .price {
        font-size: .3rem;
        color : $text-red;
      }

      .subject {
        font-size:.24rem;
        color: $text-french;
      }
    }

  }
}

.flex-bottom{
  height: 1rem;
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

  textarea {
    height: 1.4rem;
    resize: none;
    margin-bottom: 0;
  }

  p {
    line-height: .55rem;
    margin-bottom: .1rem;
    color: $text-french;
  }

  button {
    width: 100%;
    height: .8rem;
    font-size: .36rem;
    color: white;
    background: $text-green;
  }

}

.files {
  padding: .2rem .3rem;
  font-size: 0.36rem;
  text-align: left;
  display: flex;
  flex-direction: column;

  a {
    margin-bottom: 0.2rem;
  }
}
</style>
