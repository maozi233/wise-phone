<template>
  <div>
    <back :title="'我的关注'"> </back>
    <div class="page-header">
      <div class="page-tab" @click="onClickPager(1)">
        <span class="flex-center" :class="activePager === 'tab1' ? 'active' : '' ">关注商品</span>
      </div>
      <div class="page-tab" @click="onClickPager(2)">
        <span class="flex-center" :class="activePager === 'tab2' ? 'active' : '' ">关注店铺</span>
      </div>
    </div>
    <mt-tab-container class="pager-body" v-model="activePager" :swipeable='true'>
      <mt-tab-container-item id="tab1">
        <div
              v-for="(goods, index) in favoriteGoods" :key="index"
              @click="onGoodsClick(goods.goodsId)">
          <div class="shopName"><img src="~images/shop.png"> {{goods.dtManagerName}}</div>
          <div class="goods">
            <img v-lazy="JSON.parse(goods.goodsImgs)[0]" class="left">
            <p class="name">{{goods.goodsName}}</p>
          </div>
        </div>

        <load-more ref="goodsPageloader" :loadmore="loadMoreHandle" v-show="favoriteGoods.length > 0"></load-more>
        <no-data v-if="!favoriteGoods.length"></no-data>
      </mt-tab-container-item>
      <mt-tab-container-item id="tab2">
        <div class="shop"
              v-for="(shop, index) in favoriteShops" :key="index"
              @click="onShopClick(shop.dtManagerId)">
          <img v-lazy="shop.dtManagerLogo" class="left">
          <p class="name">{{shop.dtManagerName}}</p>
        </div>

        <load-more ref="shopsPageloader" :loadmore="loadMoreHandle" v-show="favoriteShops.length > 0"></load-more>
        <no-data v-if="!favoriteShops.length"></no-data>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
import Back from 'comp/index/back'
import NoData from 'comp/no-data'
import {TabContainer, TabContainerItem} from 'mint-ui'
import { FavoriteService } from 'api/manage/favorite-service'
import { PageModel } from 'model/page-model'
import LoadMore from 'comp/loadmore'
import { GoodsService } from 'api/index/goods-service'

export default {
  components: {
    TabContainer,
    TabContainerItem,
    Back,
    NoData,
    LoadMore
  },

  data () {
    return {
      activePager: '',
      favoriteGoods: [],
      favoriteShops: [],
      pagerGoods: new PageModel(),
      pagerShops: new PageModel()
    }
  },

  methods: {
    onClickPager (index) {
      this.activePager = `tab${index}`
    },

    getFavoriteInfos () {
      this.favoriteService.list({
        start: 0,
        limit: 10,
        type: this.favoriteType
      }).then(res => {
        if (this.favoriteType === 1) {
          this.favoriteGoods = res.list
          this.pagerGoods.reset()
          this.pagerGoods.setTotal(res.total)
        } else {
          this.favoriteShops = res.list
          this.pagerShops.reset()
          this.pagerShops.setTotal(res.total)
        }
      })
    },

    loadMoreHandle () {
      let pager = this.favoriteType === 1 ? this.pagerGoods : this.pagerShops

      let hasMore = pager.loadMore()
      if (hasMore) {
        this.favoriteService.list({
          start: pager.curPage,
          limit: pager.pageSize,
          type: this.favoriteType
        }).then(res => {
          if (this.favoriteType === 1) {
            res.list.forEach(e => {
              this.favoriteGoods.push(e)
            })
          } else {
            res.list.forEach(e => {
              this.favoriteShops.push(e)
            })
          }
          this.$refs.goodsPageloader.close()
          this.$refs.shopsPageloader.close()
        })
      } else {
        this.$refs.goodsPageloader.close()
        this.$refs.shopsPageloader.close()
      }
    },

    onShopClick (id) {
      this.$router.push({
        path: '/shop',
        query: {
          id
        }
      })
    },

    onGoodsClick (id) {
      // 明星配方   prop = 2 VerifyStatus = 300 stockAdjustVerifyStatus = 0
      // 技术服务   prop = 4 VerifyStatus = 300 stockAdjustVerifyStatus = 0
      // 生产商之窗 prop = 1 VerifyStatus = 300 stockAdjustVerifyStatus = 200
      // 销库存     prop = 1 VerifyStatus = 300 stockAdjustVerifyStatus = 400
      this.goodsService.get({
        id
      }).then(res => {
        let path = ''
        if (res.prop === 1) {
          if (res.stockAdjustVerifyStatus === 400) {
            // path = '销库存'
            path = 'stock'
          } else {
            // path = '生产商之窗'
            path = 'producer'
          }
        } else if (res.prop === 2) {
          // path = '明星配方'
          path = 'star-formula'
        } else if (res.prop === 4) {
          // path = '技术服务'
          path = 'techservice'
        }

        console.log(path)
        this.$router.push({
          path: `/${path}/detail`,
          query: {
            id
          }
        })
      })
    }
  },

  computed: {
    // 1 关注商品  2 关注店铺
    favoriteType () {
      return parseInt(this.activePager.replace(/tab/, ''))
    }
  },

  watch: {
    favoriteType () {
      // console.log(this.favoriteType)
      this.getFavoriteInfos()
    }
  },

  created () {
    this.favoriteService = new FavoriteService()
    this.goodsService = new GoodsService()
  },

  mounted () {
    this.activePager = 'tab1'
  }
}
</script>

<style lang="scss" scoped>
@import '~scss/shotcut';

.page-header {
  display: flex;
  background: white;
  border-bottom: 1px solid $border-gray;

  & > div {
    flex-grow: 1;
    font-size: 0.28rem;

    & > span {
      padding: 0 .2rem;
      display: inline-flex;
      height: 0.9rem;
      box-sizing: border-box;

      &.active {
        color: $text-green;
        border-bottom: 1px solid;
      }
    }
  }
}

.shopName {
  background: white;
  height: .88rem;
  padding: 0 .3rem;
  display: flex;
  align-items: center;
  font-size: 0.26rem;

  & > img {
    width: 0.3rem;
    height: 0.3rem;
    margin-right: 0.1rem;
  }
}

.shopName + .goods {
  background: #fafafa;
}

.shop,.goods {
  background: white;
  padding: .2rem .3rem;
  display: flex;
  margin-bottom: 0.2rem;

  .left {
    flex-shrink: 0;
    width: 1.4rem;
    height: 1.4rem;
    margin-right: .2rem;
  }

  .name {
    overflow: hidden;
    display: flex;
    align-items: center;
    font-size: 0.28rem;
    flex-grow: 1;
  }
}
</style>
