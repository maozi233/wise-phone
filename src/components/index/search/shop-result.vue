<template>
  <div class="bg">
    <sy-header ref="header" :inputPlaceHolder="inputSmg"></sy-header>
    <div class="result-des">
      <p>全部结果<span>共{{this.shops.length}}个相关店铺</span></p>
    </div>

    <div class="not-found" v-show="!this.shops.length">
      <p>抱歉，店铺中暂时没有找到{{inputSmg}}店铺</p>
      <span>请确认您输入的供应商名称/店铺名称 是否正确</span>
    </div>

    <div class="product-container">
      <div  class="item"
            v-for="(item, index) in shops" :key="index">
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
    </div>

    <load-more ref="pageloader" :loadmore="loadMoreHandle" v-show="shops.length > 0"></load-more>
    <no-data v-show="shops.length === 0"></no-data>

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
      inputSmg: '',
      shops: [],
      companyTypes: ['', '工厂型', '贸易型', '试剂型', '定制型'],
      pager: new PageModel()
    }
  },
  methods: {
    onItemClick (id) {
    },

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

    getShopsFromKeyWord () {
      this.shopService.search({
        start: 0,
        limit: 10,
        keyword: this.inputSmg,
        dtManagerIdentityType: 1
      }).then(res => {
        if (res) {
          console.log(res)
          this.shops = res.list.map(e => {
            if (e.goodsList) {
              e.goodsList = e.goodsList.map(v => {
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
    },

    loadMoreHandle () {
      let hasMore = this.pager.loadMore()
      if (hasMore) {
        this.shopService.search({
          start: this.pager.curPage,
          limit: this.pager.pageSize,
          keyword: this.inputSmg,
          dtManagerIdentityType: 1
        }).then(res => {
          if (res) {
            res.list.map(e => {
              if (e.goodsList) {
                e.goodsList.map(v => {
                  v.goodslogo = JSON.parse(v.imgs)[0]
                  return v
                })

                // 最多只需要3个
                e.goodsList.length = e.goodsList.length > 3 ? 3 : e.goodsList.length
              }
              return e
            }).forEach(e => {
              this.shops.push(e)
            })
            this.$refs.pageloader.close()
          }
        })
      } else {
        this.$refs.pageloader.close()
      }
    }
  },

  watch: {
    $route (to, from) {
      this.inputSmg = to.query.msg
      this.getShopsFromKeyWord()
      this.$refs.header.closeSearchPop()
    }
  },
  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      vm.inputSmg = to.query.msg

      vm.shopService = new ShopResultService()
      vm.getShopsFromKeyWord()
    })
  },
  mounted () {
  }
}
</script>
<style lang="scss" scoped>
@import '~scss/shotcut.scss';

.bg {
  background: #f2f2f2;
}

.result-des {
  height: .8rem;
  line-height: 0.8rem;
  text-align: left;

  & > p {
    font-size: 0.24rem;
    color: $text-french;
    text-indent: .3rem;

    & > span {
      color: $text-black;
      margin-left: .25rem;
    }
  }
}

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

.not-found {
  background-image: url('~images/notfound.png');
  background-repeat: no-repeat;
  background-size: cover;
  height: 4rem;
  margin-bottom: 0.2rem;

  p {
    color: rgb(102, 102, 102);
    font-size: .3rem;
    padding-top: 1rem;
  }

  span {
    color: rgb(102, 102, 102);
    font-size: 0.2rem;
  }
}
</style>
