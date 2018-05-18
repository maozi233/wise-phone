<template>
  <div>
    <sy-header ref="header"></sy-header>
    <div class="product-container">
      <div  class="item"
            v-for="(item, index) in products" :key="index">
        <div class="top">
          <div class="shop-detail">
            <img v-lazy="item.dtManager.logo">
            <div class="shop-des">
              <p class="shop-name">{{item.dtManager.shopName}}</p>
              <p class="company-name">{{item.dtManager.companyName}}</p>
            </div>
          </div>
          <span class="btn-shop" @click="toShop(item.dtManager.id)">进店</span>
        </div>

        <div class="type">
          经营模式: <span>{{companyTypes[item.dtManager.companyType]}}</span>
        </div>

        <div class="location single-line">
          公司地址: {{item.dtManager.address}}
        </div>

        <div class="products">
          <div  class="item"
                v-for="(item, index) in item.goodsList" :key="index">
            <img :src="item.goodslogo" @click="onProductClick(item.id)">
          </div>
        </div>
      </div>
      <load-more ref="pageloader" :loadmore="loadMoreHandle" v-show="products.length > 0"></load-more>
      <no-data v-show="products.length === 0"></no-data>
    </div>
    <sy-footer></sy-footer>
  </div>
</template>

<script>
import Header from 'comp/index/header'
import Footer from 'comp/index/footer'
import NoData from 'comp/no-data'
import { ShopResultService } from 'api/index/shop-service'
import { PageModel } from 'model/page-model'
import LoadMore from 'comp/loadmore'

export default {
  components: {
    [Header.name]: Header,
    [Footer.name]: Footer,
    NoData,
    LoadMore
  },

  data () {
    return {
      products: [],
      companyTypes: ['', '工厂型', '贸易型', '试剂型', '定制型'],
      pager: new PageModel()
    }
  },

  methods: {
    onProductClick (id) {
      this.$router.push({
        path: 'producer/detail',
        query: {
          id
        }
      })
    },

    toShop (id) {
      this.$router.push({
        path: '/shop',
        query: {
          id
        }
      })
    },

    loadMoreHandle () {
      let hasMore = this.pager.loadMore()
      if (hasMore) {
        this.shopService.search({
          start: this.pager.curPage,
          limit: this.pager.pageSize,
          keyword: '',
          dtManagerIdentityType: 1
        }).then(res => {
          if (res) {
            res.list.map(e => {
              if (e.goodsList) {
                e.goodsList.map(v => {
                  v.goodslogo = JSON.parse(v.imgs)[0]
                  return v
                }).filter(e => {
                  return e.stockAdjustVerifyStatus !== 400
                })

                // 最多只需要3个
                e.goodsList.length = e.goodsList.length > 3 ? 3 : e.goodsList.length
              }
              return e
            }).forEach(e => {
              this.products.push(e)
            })
            this.$refs.pageloader.close()
          }
        })
      } else {
        this.$refs.pageloader.close()
      }
    }
  },

  created () {
    this.shopService = new ShopResultService()
  },

  mounted () {
    this.shopService.search({
      start: 0,
      limit: 10,
      keyword: '',
      dtManagerIdentityType: 1
    }).then(res => {
      if (res) {
        console.log(res)
        this.products = res.list.map(e => {
          if (e.goodsList) {
            e.goodsList.map(v => {
              v.goodslogo = JSON.parse(v.imgs)[0]
              return v
            }).filter(e => {
              return e.stockAdjustVerifyStatus !== 400
            })

            // 最多只需要3个
            e.goodsList.length = e.goodsList.length > 3 ? 3 : e.goodsList.length
          }
          return e
        })
        this.pager.reset()
        this.pager.setTotal(res.total)
      }
    })
  }
}
</script>

<style lang="scss" scoped>
@import '~scss/shotcut';

.product-container {
  margin-bottom: .2rem;

  & > .item {
    background: white;
    margin-bottom: .2rem;
    padding: .3rem;

    .top {
      height: .8rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: .2rem;

      .shop-detail {
        flex-grow: 1;
        display: flex;

        & > img {
          width: .8rem;
          height: .8rem;
          margin-right: .15rem;
          flex-shrink: 0;
        }

        .shop-des {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          align-items: flex-start;

          .shop-name {
            font-size: .24rem;
            line-height: .4rem;
          }

          .company-name {
            color:$text-french;
            font-size: .2rem;
            line-height: .3rem;
          }
        }
      }

      .btn-shop {
        flex-shrink: 0;
        width: 1.2rem;
        height: .48rem;
        line-height: .48rem;
        box-sizing: border-box;
        border: 1px solid $text-green;
        color: $text-green;
        font-size: .24rem;
        border-radius: 2rem;
      }
    }

    .type {
      margin-bottom: .2rem;
      font-size: .2rem;
      text-align: left;
      color: $text-french;

      & > span {
        color: $text-blue
      }
    }

    .location {
      text-align: left;
      font-size: .2rem;
      color: $text-french;
      margin-bottom: .3rem;
    }

    .products {
      display: flex;

      & > .item {
        width: 33.3%;
        height: 2.2rem;
        padding-right: .15rem;
        box-sizing: border-box;

        &:nth-last-child(1) {
          border: none;
        }

        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
