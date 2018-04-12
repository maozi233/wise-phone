<template>
  <div>
    <back :title="'库存订单'"> </back>
    <div class="pager-header">
      <div class="flex-center" :class="activePager === 'tab0' ? 'active' : ''" @click="activePager = 'tab0'">待支付</div>
      <div class="flex-center" :class="activePager === 'tab1' ? 'active' : ''" @click="activePager = 'tab1'">待确认</div>
      <div class="flex-center" :class="activePager === 'tab2' ? 'active' : ''" @click="activePager = 'tab2'">进行中</div>
      <div class="flex-center" :class="activePager === 'tab3' ? 'active' : ''" @click="activePager = 'tab3'">已完成</div>
      <div class="flex-center" :class="activePager === 'tab4' ? 'active' : ''" @click="activePager = 'tab4'">全部</div>
    </div>

    <div class="item"
          v-for="(item, index) in orders" :key="index"
          @click="onItemClick(item.id)">
      <div class="top">
        <img src="~images/shop.png" class="shop-icon">
        <span>{{item.dtManager.shopName}}</span>
        <img src="~images/information-more.png" class="shop-detail">
      </div>
      <div class="content">
        <img v-lazy="item.pic" class="left">
        <div class="center">
          <p class="name single-line">{{item.detail.goodsName}}</p>
          <p>{{JSON.parse(item.content.extContent.content).teac.join('、')}}</p>
          <p class="price">¥ {{item.detail.price}}</p>
        </div>
      </div>
    </div>

     <no-data v-show="!orders.length"></no-data>
  </div>
</template>

<script>
import Back from 'comp/index/back'
import NoData from 'comp/no-data'
import {TabContainer, TabContainerItem} from 'mint-ui'
import { FormulationOrderStatus } from 'model/mgt-model'
import { OrderMgrService } from 'api/manage/formulaorder-service'

export default {
  components: {
    TabContainer,
    TabContainerItem,
    Back,
    NoData
  },

  data () {
    return {
      activePager: 'tab0',
      orders: []
    }
  },

  computed: {
    activeTabIndex () {
      return parseInt(this.activePager.replace(/tab/, ''))
    },

    stockStatus () {
      return FormulationOrderStatus[this.activeTabIndex].val
    }
  },

  watch: {
    activePager () {
      // console.log(this.activeTabIndex)
      this.getStockOrders()
    }
  },

  methods: {
    getStockOrders () {
      this.orderMgrService.list({
        start: 0,
        limit: 50,
        orderType: 2,
        formulationStatus: this.stockStatus
      }).then(res => {
        if (res) {
          this.orders = res.list.map(e => {
            e.detail = e.details[0]
            e.content = JSON.parse(e.detail.mirror.content)
            e.pic = e.content.imgs ? JSON.parse(e.content.imgs)[0] : ''
            return e
          })

          console.log(this.orders)
        }
      })
    },

    onItemClick (id) {
      this.$router.push({
        path: '/manage/formula/detail',
        query: {
          id,
          type: 'formula'
        }
      })
    }
  },

  created () {
    this.orderMgrService = new OrderMgrService()
  },

  mounted () {
    this.getStockOrders()
  }
}
</script>

<style lang="scss" scoped>
@import '~scss/shotcut';

.mint-tab-container {
  position: fixed;
  height: 100%;
  width: 100%;
}

.pager-header {
  display: flex;
  border-bottom: 1px solid $border-gray;
  background: white;

  & > div {
    width: 25%;
    font-size: 0.28rem;
    height: .87rem;
    box-sizing: border-box;

    &.active {
      border-bottom: 4px solid;
      color: $text-green;
    }
  }
}

.item {
  background: white;
  margin-bottom: 0.2rem;
  text-align: left;

  & > .top {
    display: flex;
    align-items: center;
    height: .9rem;
    padding: 0 .3rem;

    .shop-icon {
      width: 0.3rem;
      height: 0.28rem;
      margin-right: .1rem;
      flex-shrink: 0;
    }

    & > span {
      font-size: 0.26rem;
      flex-grow: 1;
    }

    .shop-detail {
      width: 0.15rem;
      height: 0.3rem;
      flex-shrink: 0;
    }
  }

  & > .content {
    background: #fafafa;
    padding: .2rem .3rem;
    display: flex;

    & > .left {
      width: 1.4rem;
      height: 1.4rem;
      margin-right: .15rem;
      flex-shrink: 0;
    }

    & > .center {
      overflow: hidden;
      display: flex;
      flex-direction: column;
      flex-grow: 1;

      p {
        font-size: 0.24rem;
        line-height: .4rem;
        color: $text-french;
      }

      p.name {
        color: $text-black;
        font-size: 0.28rem;
        margin-bottom: 0.1rem;
      }

      .price {
        color: $text-red;
      }
    }

  }

}
</style>
