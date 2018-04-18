<template>
  <div>
    <back :title="'库存订单'"> </back>
    <div class="pager-header">
      <div class="flex-center" :class="activePager === 'tab0' ? 'active' : ''" @click="activePager = 'tab0'">待支付</div>
      <div class="flex-center" :class="activePager === 'tab1' ? 'active' : ''" @click="activePager = 'tab1'">待发货</div>
      <div class="flex-center" :class="activePager === 'tab2' ? 'active' : ''" @click="activePager = 'tab2'">待确认</div>
      <div class="flex-center" :class="activePager === 'tab3' ? 'active' : ''" @click="activePager = 'tab3'">待收货</div>
      <div class="flex-center" :class="activePager === 'tab4' ? 'active' : ''" @click="activePager = 'tab4'">全部</div>
    </div>
    <!-- <mt-tab-container class="pager-body" v-model="activePager">
      <mt-tab-container-item id="tab0">
      </mt-tab-container-item>
      <mt-tab-container-item id="tab1">
        待发货
      </mt-tab-container-item>
      <mt-tab-container-item id="tab2">
        待确认
      </mt-tab-container-item>
      <mt-tab-container-item id="tab3">
        待收货
      </mt-tab-container-item>
      <mt-tab-container-item id="tab4">
        全部
      </mt-tab-container-item>
    </mt-tab-container> -->

    <div class="item"
          v-for="(item, index) in orders" :key="index"
          @click="onItemClick(item.id)">
      <div class="top">
        <img src="~images/shop.png" class="shop-icon">
        <span>{{item.dtManager.shopName}}</span>
        <img src="~images/information-more.png" class="shop-detail">
      </div>
      <div class="content">
        <img v-lazy="JSON.parse(item.content.imgs)[0]" class="left">
        <div class="center">
          <p class="name">{{item.content.name}}</p>
          <p>化学名称: {{item.content.chemicalCall}}</p>
          <p>规格: {{`${item.spec.counts}${specs.unit[item.spec.unit].title} / ${specs.pack[item.spec.pack].title}`}}</p>
        </div>
        <div class="right">
          <p class="price">¥{{item.content.price}}</p>
          <p class="count">x{{item.detail.quantity}}</p>
        </div>
      </div>
      <div class="bottom">
        <div class="left">
          商品编号:&nbsp;<span>{{item.content.code}}</span>
        </div>
        <div class="right">
          合计:&nbsp;¥&nbsp;<span>{{item.content.price * item.detail.quantity}}</span>
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
import { BuyerService } from 'api/manage/buyerorder-service'
import { SupplierService } from 'api/manage/supplierorder-service'
import { StockAdjustOrderStatus, roleType } from 'model/mgt-model'
import { Specs } from 'model/model-types'
import { Tools } from 'utils/tools'

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
      orders: [],
      specs: Specs
    }
  },

  computed: {
    activeTabIndex () {
      return parseInt(this.activePager.replace(/tab/, ''))
    },

    stockStatus () {
      return StockAdjustOrderStatus[this.activeTabIndex].val
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
        orderType: 5,
        stockAdjustStatus: this.stockStatus
      }).then(res => {
        if (res) {
          this.orders = res.list.map(e => {
            e.detail = e.details[0]
            e.content = JSON.parse(e.detail.mirror.content)
            e.spec = JSON.parse(e.content.extContent.content).spec
            return e
          })

          console.log(this.orders)
        }
      })
    },

    onItemClick (id) {
      this.$router.push({
        path: '/manage/stock/detail',
        query: {
          id
        }
      })
    }
  },

  created () {
    if (Tools.getRoleType() === roleType.Buyer) {
      this.orderMgrService = new BuyerService()
    } else if (Tools.getRoleType() === roleType.Supplier) {
      this.orderMgrService = new SupplierService()
    }
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
    }

    & > .right {
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      text-align: right;

      .price {
        font-size: 0.28rem;
        color:$text-red;
        margin-bottom: 0.2rem;
      }

      .count {
        font-size: 0.24rem;
        color: $text-french;
      }

    }
  }

  & > .bottom {
    height: 0.8rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 .3rem;

    .left {
      color: $text-french;
      font-size: 0.24rem;

      span {
        color: $text-black;
      }
    }

    .right  {
      font-size: 0.24rem;

      & > span {
        font-size: 0.26rem;
      }
    }
  }
}
</style>
