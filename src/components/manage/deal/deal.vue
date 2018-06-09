<template>
  <div>
    <div v-show="!detailVisible">
      <back :title="'集采确认'"></back>
      <div class="pager-header">
        <div>
          <span class="flex-center" :class="activePager === 'tab0' ? 'active' : ''" @click="activePager = 'tab0'">协议采购商</span>
        </div>
        <div>
          <span class="flex-center" :class="activePager === 'tab1' ? 'active' : ''" @click="activePager = 'tab1'">预测单</span>
        </div>
        <div>
          <span class="flex-center" :class="activePager === 'tab2' ? 'active' : ''" @click="activePager = 'tab2'">采购单</span>
        </div>
      </div>
      <mt-tab-container class="pager-body" v-model="activePager">
        <mt-tab-container-item id="tab0">
          <div  class="box"
                v-for="(item, index) in suppliers" :key="index">
            <div class="left">
              <p>{{item.buyerCompanyName}}</p>
              <p>状态:&nbsp;{{suppliersStatus[item.overallStatus]}}</p>
              <p>{{item.lastModifyTime}}</p>
            </div>
            <div class="right">
              <p><span @click="onSupplierClick(item.buyerId)">查看</span></p>
              <button v-if="item.overallStatus === 2" @click="verify(item, 3)">通过</button>
            </div>
          </div>
          <load-more ref="pageloader" :loadmore="loadMoreHandle" v-show="suppliers.length > 9"></load-more>
          <no-data v-show="suppliers.length === 0"></no-data>
        </mt-tab-container-item>
        <mt-tab-container-item id="tab1">
          <div  class="box"
                v-for="(item, index) in forecast" :key="index">
            <div class="left">
              <p>{{item.orderName}}</p>
              <p>状态:&nbsp;{{forecastStatus[item.preOrderStatus]}}</p>
              <p>{{item.lastModifyTime}}</p>
            </div>
            <div class="right">
              <p class="no-margin">
                <span @click="onForecastClick(item)">查看</span>
                <span @click="rejuect(item)"
                      v-if="item.preOrderStatus === 100"
                      class="red" >拒绝</span>
              </p>
              <button v-if="item.preOrderStatus === 100" @click="success(item)">通过</button>
            </div>
          </div>
          <load-more ref="pageloader" :loadmore="forecastLoadMoreHandle" v-show="forecast.length > 9"></load-more>
          <no-data v-show="forecast.length === 0"></no-data>
        </mt-tab-container-item>

        <mt-tab-container-item id="tab2">
          <div class="box-purchase">
            <div  class="purchase-order"
                  v-for="(purchaseOrder, index) in purchaseOrderInfos" :key="index">
              <div class="manager">
                <p>公司名称： <span>{{purchaseOrder.user.companyName}}</span></p>
                <p>账号： <span>{{purchaseOrder.user.companyTel}}</span></p>
                <p>联系人： <span>{{purchaseOrder.user.realName}}</span></p>
              </div>

              <p class="order-status">订单状态： {{purchaseStatus[purchaseOrder.centralizedOrderStatus]}}</p>
              <div class="items" v-for="(item, index) in purchaseOrder.details" :key="index">
                <p class="goodsName">{{item.goodsName}}</p>
                <p>规格: <span>{{item.unit}}</span></p>
                <p>化学名: <span>{{item.mirror.formatContent.chemicalCall}}</span></p>
                <p>商品编码：<span>{{item.goodsCode}}</span></p>
              </div>

              <div class="btn-container" v-if="userType == 2">
                <button class="cancel"
                        v-if="purchaseOrder.centralizedOrderStatus == 100 || purchaseOrder.centralizedOrderStatus == 200"
                        @click="cancelPuchaseOrder(purchaseOrder)">取消订单</button>
                <button v-if="purchaseOrder.centralizedOrderStatus == 300">等待取消订单</button>
                <button v-if="purchaseOrder.centralizedOrderStatus == 400"
                        @click="receivePuchaseOrder(purchaseOrder)">确认收货</button>
                <button v-if="purchaseOrder.centralizedOrderStatus == 500"
                        @click="prefoundPuchaseOrder(purchaseOrder)">申请退货</button>
              </div>
              <div class="btn-container" v-if="userType != 2">
                <button v-if="purchaseOrder.centralizedOrderStatus == 100"
                        @click="surePuchaseOrder(purchaseOrder)">确认订单</button>
                <button class="cancel"
                        v-if="purchaseOrder.centralizedOrderStatus == 100"
                        @click="cancelPuchaseOrder(purchaseOrder)">取消订单</button>
                <button v-if="purchaseOrder.centralizedOrderStatus == 200"
                        @click="showDelivery(purchaseOrder)">发货</button>
                <button v-if="purchaseOrder.centralizedOrderStatus == 300"
                        @click="sureCancelPuchaseOrder(purchaseOrder)">确认取消订单</button>
              </div>
            </div>
          </div>

          <flex-popup ref="flexPop">
            <p class="title">物流信息</p>
            <input type="text" v-model="deliveryForm.compName" placeholder="请填写物流公司">
            <input type="number" v-model="deliveryForm.tel" placeholder="请填写物流单号">
            <button @click="deliveryPuchaseOrder" class="flex-center">确认</button>
          </flex-popup>
        </mt-tab-container-item>

      </mt-tab-container>
    </div>
    <div v-show="detailVisible">
      <div>
        <back :title="'绑定的商品'" :defaultBack="false" :customBack="hideDetail"></back>
        <div class="manager">
          <p>公司名称： <span>{{user.companyName}}</span></p>
          <p>账号： <span>{{user.companyTel}}</span></p>
          <p>联系人： <span>{{user.realName}}</span></p>
        </div>
        <div  class="detail-box"
              v-for="(item, index) in infos" :key="index">
          <p>{{item.goodsName}}</p>
          <p>备货周期: <span>{{item.stockDays}}</span></p>
          <p>交货周期: <span>{{item.deliveryDays}}</span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { TabContainer, TabContainerItem, MessageBox, Toast } from 'mint-ui'
import Back from 'comp/index/back'
import LoadMore from 'comp/loadmore'
import NoData from 'comp/no-data'
import FlexPopup from 'comp/index/flex-popup'
import { PageModel } from 'model/page-model'
import { SupplierProductService } from 'api/manage/supplierproduct-service'
import { MgrService } from 'api/manage/mgrorder-service'
import { BuyerService } from 'api/manage/buyerorder-service'
import { Specs } from 'model/model-types'
import { Tools } from 'utils/tools'

export default {
  components: {
    Back,
    TabContainer,
    TabContainerItem,
    LoadMore,
    NoData,
    FlexPopup
  },

  data () {
    return {
      detailVisible: false,
      infos: [],
      activePager: 'tab0',
      suppliers: [],
      suppliersStatus: ['', '待采购商确认', '待供应商缺', '可用', '拒绝', '禁用'],
      forecast: [],
      forecastStatus: { '100': '待确认', '200': '已拒绝', '300': '审核通过', '400': '已完成' },
      purchaseOrderInfos: [],
      purchaseStatus: { '100': '待确认', '200': '待发货', '400': '待收货', '500': '已完成', '-1': '已取消', '501': '已评价' },
      deliveryForm: {
        id: '',
        compName: '',
        tel: ''
      },
      supplierPager: new PageModel(),
      forecastPager: new PageModel(),
      userType: Tools.getRoleType(),
      user: {
        companyName: '',
        companyTel: '',
        realName: ''
      }
    }
  },

  methods: {
    getSupplierInfos () {
      this.supplierProductService.list({
        status: 0,
        start: 0,
        limit: 10
      }).then(res => {
        if (res) {
          this.suppliers = res.list
          if (this.suppliers.length > 0) {
            this.user.companyName = this.suppliers[0].buyerCompanyName || 'N/A'
            this.user.companyTel = this.suppliers[0].buyerMobile || 'N/A'
            this.user.realName = this.suppliers[0].buyerLeader || 'N/A'
          }
          this.supplierPager.reset()
          this.supplierPager.setTotal(res.total)
        }
      })
    },

    getForecastInfos () {
      this.mgrService.list({
        start: 0,
        limit: 10,
        orderType: 4,
        preOrderStatus: '100,200,300,400'
      }).then(res => {
        if (res) {
          this.forecast = res.list
          if (this.forecast.length > 0) {
            this.user = this.forecast[0].user
          }
          this.forecastPager.reset()
          this.forecastPager.setTotal(res.total)
        }
      })
    },

    getPurchaseOrder () {
      this.mgrService.list({
        start: 0,
        limit: 10,
        orderType: 1,
        centralizedOrderStatus: '-1,0,100,200,300,400,500,501'
      }).then(res => {
        if (res) {
          res.list.forEach(e => {
            e.details = e.details.map(item => {
              item.mirror.formatContent = item.mirror.content
                ? JSON.parse(item.mirror.content)
                : ''

              item.mirror.formatContent.formatExtcontent = item.mirror.formatContent.extContent.content
                ? JSON.parse(item.mirror.formatContent.extContent.content)
                : ''

              let spec = item.mirror.formatContent.formatExtcontent.spec
              item.unit = `${spec.counts} ${Specs.unit[spec.unit].title} / ${Specs.pack[spec.pack].title}`

              return item
            })
          })
          this.purchaseOrderInfos = res.list
          console.log(this.purchaseOrderInfos)
        }
      })
    },

    verify (item, status) {
      let params = {
        buyerId: item.buyerId,
        status
      }

      MessageBox({
        title: '提示',
        message: '是否要通过该采购商？',
        showCancelButton: true
      }).then(action => {
        if (action === 'confirm') {
          this.supplierProductService.verify(params)
            .then(res => res ? this.getSupplierInfos() : '')
        }
      })
    },

    onSupplierClick (id) {
      this.detailVisible = true
      this.supplierProductService.getGoodsById(id)
        .then(res => {
          if (res) {
            this.infos = res
          }
        })
    },

    loadMoreHandle () {
      let hasMore = this.supplierPager.loadMore()
      if (hasMore) {
        this.supplierProductService.list({
          status: 0,
          start: this.supplierPager.curPage,
          limit: this.supplierPager.pageSize
        }).then(res => {
          if (res) {
            res.list.map(e => {
              this.suppliers.push(e)
            })
          }
          this.$refs.pageloader.close()
        })
      } else {
        this.$refs.pageloader.close()
      }
    },

    forecastLoadMoreHandle () {
      let hasMore = this.forecastPager.loadMore()
      if (hasMore) {
        this.mgrService.list({
          start: this.forecastPager.curPage,
          limit: this.forecastPager.pageSize,
          orderType: 4,
          preOrderStatus: '100,200,300,400'
        }).then(res => {
          if (res) {
            res.list.map(e => {
              this.forecast.push(e)
            })
            this.$refs.pageloader.close()
          }
        })
      } else {
        this.$refs.pageloader.close()
      }
    },

    hideDetail () {
      this.detailVisible = false
    },

    onForecastClick (item) {
      this.detailVisible = true
      this.infos = item.details.map(e => {
        if (e.mirror) {
          e.goodsName = e.mirror.content ? JSON.parse(e.mirror.content).name : ''
        }

        return e
      })
    },

    success (item) {
      MessageBox({
        title: '提示',
        message: '是否要通过该审核？',
        showCancelButton: true
      }).then(action => {
        if (action === 'confirm') {
          this.mgrService.approvePreOrderVerify(item.id)
            .then(res => {
              if (res) {
                Toast('审核通过成功')
                this.getForecastInfos()
              }
            })
        }
      })
    },

    rejuect (item) {
      MessageBox({
        title: '提示',
        message: '确定拒绝该审核？',
        showCancelButton: true
      }).then(action => {
        if (action === 'confirm') {
          this.mgrService.rejectPreOrderVerify({ id: item.id })
            .then(res => {
              if (res) {
                Toast('拒绝成功')
                this.getForecastInfos()
              }
            })
        }
      })
    },

    // 确认订单
    surePuchaseOrder (order) {
      this.confirmAction('是否通过订单?', this.mgrService.preConfirmOrder, order.id)
        .then(res => res && this.getPurchaseOrder())
    },

    showDelivery (order) {
      this.$refs.flexPop.show()
      this.deliveryForm.id = order.id
    },
    // 发货
    deliveryPuchaseOrder () {
      if (this.deliveryForm.compName === '') return Toast('物流公司不能为空')
      if (this.deliveryForm.tel === '') return Toast('物流单号不能为空')

      // deliveryForm 包括 orderid 物流公司 物流单号
      this.confirmAction('确认发货？', this.mgrService.delivery({
        orderId: this.deliveryForm.orderid,
        company: this.deliveryForm.compName,
        logisticsno: this.deliveryForm.tel
      })).then(res => res && this.getPurchaseOrder())
    },
    // 确认收货
    receivePuchaseOrder (order) {
      this.confirmAction('确认收货?', this.buyerService.received, order.id)
        .then(res => res && this.getPurchaseOrder())
    },
    // 申请退货
    prefoundPuchaseOrder (order) {
      this.confirmAction('确认申请退货吗?', this.buyerService.preRefund, order.id)
        .then(res => res && this.getPurchaseOrder())
    },
    // 取消订单
    cancelPuchaseOrder (order) {
      let service = this.userType === 2 ? this.this.buyerService : this.mgrService
      this.confirmAction('确认申请退货吗?', service.orderCancele, {
        orderId: order.id,
        canceleReason: ''
      }).then(res => res && this.getPurchaseOrder())
    },
    // 确认取消订单
    sureCancelPuchaseOrder (order) {
      this.confirmAction('是否确认取消订单?', this.buyerService.sureCancel, order.id)
        .then(res => res && this.getPurchaseOrder())
    },

    confirmAction (message = 'hint', fn, params) {
      MessageBox({
        title: '提示',
        message,
        showCancelButton: true
      }).then(action => {
        if (action === 'confirm') {
          return fn(params)
        }
      })
    }
  },

  watch: {
    activePager () {
      if (this.activePager === 'tab1' && this.forecast.length === 0) {
        this.getForecastInfos()
      } else if (this.activePager === 'tab2' && this.purchaseOrderInfos.length === 0) {
        this.getPurchaseOrder()
      }
    }
  },

  created () {
    this.supplierProductService = new SupplierProductService()
    this.mgrService = new MgrService()
    this.buyerService = new BuyerService()
  },

  mounted () {
    this.getSupplierInfos()
  }
}
</script>

<style lang="scss" scoped>
@import '~scss/shotcut';

.pager-header {
  display: flex;
  border-bottom: 1px solid $border-gray;
  height: 0.9rem;
  background: white;

  & > div {
    flex-grow: 1;
    display: flex;
    justify-content: center;

    .flex-center {
      display: inline-flex;
      height: 100%;
      color: $text-green;
      font-size: 0.28rem;
      box-sizing: border-box;

      &.active {
        border-bottom: 4px solid;
      }
    }
  }
}

.box {
  display: flex;
  height: 1.9rem;
  margin-bottom: 0.2rem;
  padding: 0.1rem 0.3rem;
  background: white;
  box-sizing: border-box;

  .left {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    text-align: left;
    justify-content: space-around;

    p {
      font-size: 0.24rem;
      color: $text-french;

      &:nth-child(1) {
        font-size: 0.28rem;
        color: $text-black;
      }
    }
  }

  .right {
    display: flex;
    min-width: 2rem;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;

    p {
      font-size: 0.28rem;
      margin-bottom: 0.2rem;
      margin-right: 0.3rem;

      &.no-margin {
        margin-right: 0;
      }

      .red {
        color: $text-red;
      }
    }

    button {
      width: 1.2rem;
      height: 0.5rem;
      background: $text-green;
      color: white;
      border-radius: 4px;
      font-size: 0.24rem;
    }
  }
}

.detail-box {
  background: white;
  margin-bottom: 0.2rem;
  height: 1.9rem;
  text-align: left;
  padding: 0.2rem 0.3rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  p {
    font-size: 0.24rem;
    color: $text-french;

    & > span {
      color: $text-red;
    }

    &:nth-child(1) {
      font-size: 0.28rem;
      margin-bottom: 0.2rem;
      color: $text-black;
    }
  }
}

.manager {
  background: white;
  margin-bottom: 0.2rem;
  text-align: left;
  padding: 0.2rem 0.4rem;
  font-size: 0.26rem;
  line-height: 2;
}

.box-purchase {
  background: white;

  .purchase-order {
    margin-bottom: 0.2rem;
    padding-bottom: 0.2rem;

    .order-status {
      font-size: 0.4rem;
      text-align: left;
      margin-bottom: 0.2rem;
      text-indent: 1em;
    }

    .items {
      padding-left: 0.8rem;
      text-align: left;
      font-size: 0.26rem;
      margin-bottom: 0.1rem;
      padding-right: 0.5rem;

      & > p {
        line-height: 1.5;
        color: $text-french;
        font-size: 0.24rem;
      }

      .goodsName {
        color: $text-black;
        line-height: 2;
        font-size: 0.3rem;
      }
    }
  }
}

.btn-container > button {
  padding: 0.1rem 0.5rem;
  border-radius: 2px;
  color: white;
  background-color: $text-green;

  &.cancel {
    background-color: $text-red;
  }
}

.pop-flex-bottom {
  input,
  textarea {
    width: 100%;
    height: 0.8rem;
    box-sizing: border-box;
    line-height: 0.5rem;
    padding: 0.15rem 0.2rem;
    border: 1px solid $border-gray;
    background: #f8f8f8;
    margin-bottom: 0.3rem;
  }

  .title {
    line-height: 0.75rem;
    font-size: 0.36rem;
    margin-bottom: 0.1rem;
    text-align: center;
  }

  button {
    width: 100%;
    height: 0.8rem;
    font-size: 0.36rem;
    color: white;
    background: $text-green;
    margin-bottom: 0.2rem;
  }

  .flex-center {
    flex-direction: column;
  }
}
</style>
