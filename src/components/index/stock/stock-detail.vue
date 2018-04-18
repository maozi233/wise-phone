<template>
  <div>
    <sy-header ref="header"></sy-header>
    <div class="goods-detail">
      <div class="title">
        <img src="~images/back.png" @click="goBack">
        <span>商品详情</span>
      </div>
      <div class="content" v-if="detail">
        <p class="price">{{detail.price}}</p>
        <p class="name">{{detail.name}}</p>
        <p class="des single-line">{{detail.subject}}</p>
        <p class="stock">
          <span>库存： <span class="num">{{detail.stock}}{{specs.unit[detail.exContent.spec.unit].title}}</span></span>
          <span>{{detail.dtManager.address}}</span>
        </p>
      </div>
    </div>

    <div class="count-container">
      <span>数量</span>
      <p>
        <img  src="~images/stock-minus.png"
              :style="{opacity: count === 0 ? '0.6' : '1'}"
              @click="onMinusClick">
        <span class="count flex-center">{{count}}</span>
        <img  src="~images/stock-plus.png"
              @click="onPlusClick">
      </p>
    </div>

    <div class="spec" v-if="detail">
      规格 <span>{{detail.exContent.spec.counts}}{{specs.unit[detail.exContent.spec.unit].title}} / {{specs.pack[detail.exContent.spec.pack].title}}</span>
    </div>

    <review-entry v-if="id" :id="id" :shopId="shopId"></review-entry>

    <section v-if="detail">
      <div class="title">商品详情</div>
      <div class="detailbox" v-html="detail.content.content" style="font-size:.3rem;text-align: left;">
      </div>
      <no-data v-show="detail.content.content === ''"></no-data>
    </section>

    <section v-if="detail">
      <div class="title">爬虫详情</div>
    </section>

    <section class="explain">
      <div class="title">购买说明</div>
      <div class="content">
        <div class="tip">一、配方交易流程</div>
        <div class="box">
          <img src="~images/stock-des.png">
        </div>
        <div class="tip">二、关于购销协议说明</div>
        <div class="box">
          <p>1.购销协议签订后，买卖双方不能随意取消订单。</p>
        </div>
        <div class="tip">三、关于库存调剂订单说明</div>
        <div class="box">
          <p>1.订单生成后24小时内未付款，系统自动取消订单。</p>
          <p>2.采购商在订单支付之前可取消订单，支付之后如需取消订单需供应商确认才能生效。</p>
          <p>3.货品已签收后3天内未点击确认收货，系统会自动确认收货。</p>
          <p>4.库存调剂订单暂不支持退货，如有问题，请联系供应商或咨询平台客服。</p>
        </div>
      </div>
    </section>

    <div class="flex-bottom"></div>
    <flex-bottom  v-if="id"
                  :id="id"
                  :shopId="shopId"
                  :showRight="false"></flex-bottom>
  </div>
</template>

<script>
import Header from 'comp/index/header'
import FlexBottom from 'comp/index/flex-bottom'
import NoData from 'comp/no-data'
import ReviewEntry from 'comp/index/review-entry'
import { GoodsService } from 'api/index/goods-service'
import { Specs } from 'model/model-types'

export default {
  components: {
    [Header.name]: Header,
    FlexBottom,
    NoData,
    ReviewEntry
  },

  data () {
    return {
      id: '',
      detail: '',
      specs: Specs,
      count: 0,
      shopId: ''
    }
  },

  methods: {
    goBack () {
      this.$router.go(-1)
    },

    onMinusClick () {
      this.count -= 1
      this.count = Math.max(0, this.count)
    },

    onPlusClick () {
      this.count += 1
      console.log(this.count)
    }
  },

  created () {
    this.goodsService = new GoodsService()
  },

  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      vm.id = to.query.id

      vm.goodsService.get({
        id: vm.id
      }).then(res => {
        if (res) {
          res.exContent = JSON.parse(res.extContent.content)
          vm.detail = res
          vm.shopId = res.dtManager.id
        }
      })
    })
  }
}
</script>

<style lang="scss" scoped>
@import '~scss/shotcut';

.goods-detail {
  background: white;
  margin-bottom: .2rem;
  padding-bottom: .1rem;

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
    font-size: .24rem;
    color: $text-french;

    .price{
      font-size: .3rem;
      color: $text-red;
      line-height: .9rem;

      &:before {
        content: '¥';
        margin-right: .05rem;
      }
    }

    .name {
      font-size: .3rem;
      color: $text-black;
      margin-bottom: .25rem;
    }

    .des {
      margin-bottom: .25rem;
    }

    .stock {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.2rem;

      .num {
        color: $text-blue
      }
    }
  }
}

section {
  padding: 0 .3rem .1rem;
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

.count-container,.spec {
  background: white;
  margin-bottom: .2rem;
  padding: 0 .3rem;
  color: $text-french;
  font-size: .24rem;
  height: .9rem;
  text-align: left;
}

.count-container {
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > p {
    display: flex;

    & > img {
      width: .6rem;
      height: .6rem;
      vertical-align: middle;

      &:nth-of-type(1) {
        margin-right: .1rem;
      }
      &:nth-of-type(2) {
        margin-left: .1rem;
      }
    }
  }

  .count {
    width: .7rem;
    height: .6rem;
    background: #f4f4f4;
    color: $text-black;
  }
}

.spec {
  display: flex;
  align-items: center;

  span{
    margin-left: .24rem;
    color: $text-black;
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
      height: .85rem;
    }

    & > P {
      line-height: .4rem;
      font-size: .24rem;
      color: $text-french;
    }
  }
}

.flex-bottom{
  height: 1rem;
}
</style>
<style lang="scss">
.detail-box{
    font-size:.3rem;
    overflow-x: auto;

    img {
      max-width: 100%;
    }
  }
</style>
