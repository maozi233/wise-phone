<template>
  <div>
    <sy-header ref="header" :noMargin="true"></sy-header>
    <div>
      <img class="bg-img" src="~images/login.png">

      <div class="list-container" v-if="products.length > 0">
        <div  class="item"
              v-for="(item, index) in products" :key="index"
              @click="onItemClick(item.id)">
          <p class="name single-line">{{item.name}}</p>
          <p class="stock">库存: <span>{{item.stock}}{{specs.pack[item.exContent.spec.pack].title}}</span></p>
          <p class="location">发货地: <span>上海浦东新区</span></p>
          <p class="price"><span>{{item.price}}</span> <span>{{item.price}}</span></p>
        </div>
      </div>
      <load-more ref="pageloader" :loadmore="loadMoreHandle" v-show="products.length > 0"></load-more>
      <no-data v-if="products.length === 0"></no-data>
    </div>
    <sy-footer></sy-footer>
  </div>
</template>

<script>
import Header from 'comp/index/header'
import Footer from 'comp/index/footer'
import NoData from 'comp/no-data'
import { GoodsService } from 'api/index/goods-service'
import { Specs } from 'model/model-types'
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
      specs: Specs,
      pager: new PageModel()
    }
  },

  methods: {
    onItemClick (id) {
      this.$router.push({
        path: 'stock/detail',
        query: {
          id
        }
      })
    },

    loadMoreHandle () {
      let hasMore = this.pager.loadMore()
      if (hasMore) {
        this.goodsService.list4client({
          start: this.pager.curPage,
          limit: this.pager.pageSize,
          stockAdjustVerifyStatus: 400
        }).then(res => {
          if (res) {
            res.list.map(e => {
              e.exContent = JSON.parse(e.extContent.content)

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
    this.goodsService = new GoodsService()
  },

  mounted () {
    this.goodsService.list4client({
      start: 0,
      limit: 10,
      stockAdjustVerifyStatus: 400
    }).then(res => {
      if (res) {
        this.products = res.list.map(e => {
          e.exContent = JSON.parse(e.extContent.content)

          return e
        })
        // console.log(this.products)
        this.pager.reset()
        this.pager.setTotal(res.total)
      }
    })
  }
}
</script>

<style lang="scss" scoped>
@import '~scss/shotcut';

.bg-img {
  width: 100%;
  height: 4rem;
  vertical-align: bottom;
}

.list-container {
  text-align: left;
  background: white;
  padding: 0 .3rem;
  margin-bottom: .2rem;

  .item {
    height: 2.6rem;
    box-sizing: border-box;
    border-bottom:  1px solid $border-gray;
    color: $text-french;
    font-size: .24rem;

    &:nth-last-child(1) {
      border-bottom: 0;
    }

    .name {
      font-size: .3rem;
      color: $text-black;
      padding-top: .35rem;
      margin-bottom: .1rem;
    }

    .stock{
      margin-bottom: .26rem;
      span {
        color: $text-blue;
      }
    }

    .location {
      margin-bottom: .26rem;
      span {
        color: $text-black;
      }
    }

    .price > span:nth-child(1) {
      color: $text-red;
      margin-left : 0;
    }

    .price > span:nth-child(2) {
      text-decoration: line-through
    }

    .price > span:before {
      content: '¥'
    }

    span {
      margin-left : .15rem;
    }
  }
}
</style>
