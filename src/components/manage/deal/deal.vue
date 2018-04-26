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
      </mt-tab-container>
    </div>
    <div v-show="detailVisible">
      <div>
      <back :title="'绑定的商品'" :defaultBack="false" :customBack="hideDetail"></back>
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
import { PageModel } from 'model/page-model'
import { SupplierProductService } from 'api/manage/supplierproduct-service'
import { MgrService } from 'api/manage/mgrorder-service'

export default {
  components: {
    Back,
    TabContainer,
    TabContainerItem,
    LoadMore,
    NoData
  },

  data () {
    return {
      detailVisible: false,
      infos: [],
      activePager: 'tab0',
      suppliers: [],
      suppliersStatus: ['', '待采购商确认', '待供应商缺', '可用', '拒绝', '禁用'],
      forecast: [],
      forecastStatus: {'100': '待确认', '200': '已拒绝', '300': '审核通过', '400': '已完成'},
      supplierPager: new PageModel(),
      forecastPager: new PageModel()
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
          this.forecastPager.reset()
          this.forecastPager.setTotal(res.total)
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
        this.supplierProductService.verify(params)
          .then(res => res ? this.getSupplierInfos() : '')
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
        this.mgrService.approvePreOrderVerify(item.id)
          .then(res => {
            if (res) {
              Toast('审核通过成功')
              this.getForecastInfos()
            }
          })
      })
    },

    rejuect (item) {
      MessageBox({
        title: '提示',
        message: '确定拒绝该审核？',
        showCancelButton: true
      }).then(action => {
        this.mgrService.rejectPreOrderVerify({id: item.id})
          .then(res => {
            if (res) {
              Toast('拒绝成功')
              this.getForecastInfos()
            }
          })
      })
    }
  },

  watch: {
    activePager () {
      if (this.activePager === 'tab1' && this.forecast.length === 0) {
        this.getForecastInfos()
      }
    }
  },

  created () {
    this.supplierProductService = new SupplierProductService()
    this.mgrService = new MgrService()
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
  padding: .1rem .3rem;
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
  padding: .2rem .3rem;
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
</style>
