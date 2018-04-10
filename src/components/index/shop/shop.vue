<template>
  <div class="bg">
    <sy-header></sy-header>
    <div class="top">
      <img src="~images/back.png" class="back" @click="goBack">
      <div class="container">
        <img :src="detail.logo" class="left">
        <div class="right">
          <p class="shopName single-line">{{detail.shopName}}</p>
          <p class="companyName single-line">{{detail.companyName}}</p>
        </div>
      </div>
      <span class="favorite flex-center" @click="onFavoriteClick">{{detail.favorite ? '取消关注' : '关注店铺'}} </span>
    </div>
    <div class="nav">
      <img class="search" src="~images/shop-search.png" @click="searchVisible = true">
      <span class="btn-home" @click="onClickPager(1)" :class="activePager === 'tab1' ? 'active' : '' ">首页</span>
      <span class="btn-type flex-center" @click="onClickPager(2)" :class="activePager === 'tab2' ? 'active' : '' ">
        分类
        <img v-show="activePager === 'tab2'" src="~images/shop-type.png">
        <img v-show="activePager !== 'tab2'" src="~images/filter.png">
      </span>
      <span @click="onClickPager(3)" :class="activePager === 'tab3' ? 'active' : '' ">公司档案</span>
    </div>

    <mt-tab-container class="pager-body" v-model="activePager">
        <mt-tab-container-item id="tab1">
          <section class="banner swiper-container" v-if="banners.length > 0">
            <div class="swiper-wrapper">
              <div  class="swiper-slide"
                    v-for="(item, index) in banners" :key="index">
                <img :src="item" alt="">
              </div>
            </div>
            <div class="swiper-pagination"></div>
          </section>

          <div class="recommend">
            <div  class="goods"
                  v-for="(item, index) in recommends" :key="index"
                  @click="onRecommendClick(item.id)">
              <p class="name single-line">{{item.name}}</p>
              <p class="price">¥{{item.price}}</p>
            </div>
            <no-data v-show="recommends.length === 0"></no-data>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="tab2">
          <div class="tags">
            <div class="tag flex-center"
                  v-for="(item, index) in tags" :key="index" @click="onClickTag(item.id)"
                  :class="activeTagId === item.id ? 'active' : ''">{{item.name}}</div>
          </div>
          <div class="recommend">
            <div  class="goods"
                  v-for="(item, index) in goods" :key="index"
                  @click="onRecommendClick(item.id)">
              <p class="name single-line">{{item.name}}</p>
              <p class="price">¥{{item.price}}</p>
            </div>
            <no-data v-show="goods.length === 0"></no-data>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="tab3">
          <div class="com-box">
            <div class="title">公司简介</div>
            <div class="content">
              <img class="logo" :src="detail.logo">
              <p>{{detail.shopDesc}}</p>
            </div>
          </div>
          <div class="com-box">
            <div class="title">公司证书</div>
            <div class="content">
              <img v-if="imgZs" class="zs" :src="imgZs">
              <no-data v-if="!imgZs"></no-data>
            </div>
          </div>
        </mt-tab-container-item>
    </mt-tab-container>

    <mt-popup class="popup-search"
            position="top"
            v-model="searchVisible"
            modal="false"
            closeOnClickModal="false">
    <div class="hr"></div>
    <div class="content">
      <img src="~images/back.png" @click="searchVisible = false">
      <form action="#" ref="form">
        <input type="text" v-model="keyword" placeholder="请输入商品名称">
      </form>
      <span @click="onCancelClick">取消</span>
    </div>
  </mt-popup>
  </div>
</template>

<script>
import Header from 'comp/index/header'
import Swiper from 'swiper'
import {TabContainer, TabContainerItem, Toast, Popup} from 'mint-ui'
import NoData from 'comp/no-data'
import { ShopResultService } from 'api/index/shop-service'
import { FavoriteService } from 'api/index/favorite-service'
import { GoodsService } from 'api/index/goods-service'
import { GroupIdService } from 'api/index/groupid-service'

export default {
  components: {
    TabContainer,
    TabContainerItem,
    [Header.name]: Header,
    NoData,
    Popup
  },

  data () {
    return {
      shopId: '',
      detail: {},
      activePager: 'tab1',
      banners: [],
      banner: '',
      recommends: [],
      tags: [],
      activeTagId: '',
      goods: [],
      searchVisible: false,
      keyword: '',
      imgZs: ''
    }
  },

  methods: {
    goBack () {
      this.$router.go(-1)
    },

    onClickPager (index) {
      this.activePager = `tab${index}`
    },

    onRecommendClick (id) {
      this.$router.push({
        path: 'producer/detail',
        query: {
          id
        }
      })
    },

    onFavoriteClick () {
      if (this.detail.favorite) {
        // 取消收藏
        this.favoriteService.deleteIt({
          type: 2,
          itemId: this.shopId
        })
          .then(res => {
            if (res) {
              this.detail.favorite = false
              Toast('已取消收藏')
            }
          })
      } else {
        this.favoriteService.add({
          type: 2,
          itemId: this.shopId
        })
          .then(res => {
            if (res) {
              this.detail.favorite = true
              Toast('收藏成功')
            }
          })
      }
    },

    getGoods () {
      this.goodsService.search({
        start: 0,
        limit: 50,
        dtmId: this.shopid,
        groupId: this.activeTagId,
        goodsProp: 1,
        keyword: this.keyword
      }).then(res => {
        if (res) {
          this.goods = res.list
        }
      })
    },

    onClickTag (id) {
      this.activeTagId = id
      this.getGoods()
    },

    onCancelClick () {
      this.searchVisible = false
      this.keyword = ''
      this.getGoods()
    }
  },

  watch: {
    searchVisible () {
      document.body.style.overflow = this.searchVisible ? 'hidden' : 'auto'
    }
  },

  created () {
    this.favoriteService = new FavoriteService()
    this.goodsService = new GoodsService()
    this.groupIdService = new GroupIdService()
    this.shopResultService = new ShopResultService()
  },

  mounted () {
    this.$refs.form.onsubmit = () => {
      this.searchVisible = false
      this.activePager = 'tab2'
      this.getGoods()
      return false
    }
  },

  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      vm.shopId = to.query.id

      vm.shopResultService.getShop(vm.shopId)
        .then(res => {
          if (res) {
            vm.detail = res

            vm.banners = res.certifications.map(e => {
              return JSON.parse(e.document.content).imgs ? JSON.parse(e.document.content).imgs[0] : false
            }).filter(e => e)

            // console.log(vm.banners)
            vm.imgZs = JSON.parse(res.user.extContent.content).imgs ? JSON.parse(res.user.extContent.content).imgs[0] : ''

            vm.$nextTick(() => {
              vm.banner = new Swiper('.banner', {
                pagination: {
                  el: '.swiper-pagination',
                  type: 'bullets'
                },
                autoplay: true
              })
            })
          }
        })

      // 获取tab1的推荐商品
      vm.goodsService.search({
        start: 0,
        limit: 50,
        dtmId: vm.shopId,
        goodsProp: 1,
        recommender: true
      }).then(res => {
        if (res) {
          vm.recommends = res.list
        }
      })
      // 获取产品分类
      vm.groupIdService.list({
        dtmId: vm.shopId
      }).then(res => {
        if (res) {
          vm.tags = [{name: '全部', id: ''}].concat(res)
        }
      })

      vm.getGoods()
    })
  }
}
</script>

<style lang="scss">
@import 'swiper/dist/css/swiper.min.css';
.banner{
  .swiper-pagination{
    bottom: 0;
  }
  .swiper-pagination-bullet{
    width: .4rem;
    height: 4px;
    margin: 0 5px !important;
    background: white;
    border-radius: 0;
    opacity: .5;
  }

  .swiper-pagination-bullet-active {
    opacity: 1;
  }
}

.popup-search + .v-modal {
  top: 1.1rem;
}
</style>

<style lang="scss" scoped>
@import '~scss/shotcut';

.bg {
  background: #f2f2f2;
}

.top {
  display: flex;
  align-items: center;
  padding: .2rem .3rem;
  border-bottom: 1px solid $border-gray;
  margin-top: .2rem;
  background: white;

  .back {
    width: 0.3rem;
    height: 0.3rem;
    align-self: flex-start;
    margin-top: .1rem;
    margin-right: 0.1rem;
    flex-shrink: 0;
  }

  .container {
    display: flex;
    flex-grow: 1;
    .left {
      width: 1.2rem;
      height: 1.2rem;
      margin-right: 0.2rem;
      flex-shrink: 0
    }

    .right {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      text-align: left;

      .shopName {
        font-size: 0.3rem;
        line-height: .6rem;
      }

      .companyName {
        font-size: 0.24rem;
        line-height: .5rem;
        color: $text-french;
      }
    }
  }

  .favorite {
    font-size: 0.24rem;
    border: 1px solid;
    color: $text-green;
    width: 1.2rem;
    height: 0.5rem;
    border-radius: .5rem;
  }
}

.nav {
  display: flex;
  padding: .3rem;
  background: white;
  border-bottom: 1px solid $border-gray;

  .search {
    width: 1.6rem;
    height: 0.6rem;
    margin-right: 0.45rem;
  }

  span {
    font-size: 0.3rem;
    display: flex;
    justify-content: center;
    align-items: center;

    &.active {
      color: $text-green;
    }

    & > img {
      width: 0.2rem;
      height: 0.1rem;
      margin-left: .1rem;
    }
  }

  .btn-home {
    margin-right: 0.8rem;
  }

  .btn-type {
    margin-right: 0.75rem;
  }
}

.banner {
  height: 4rem;
  margin-bottom: 0;

  .swiper-slide > img {
    width: 100%;
    height: 100%;
  }
}

.recommend {
  background: #f2f2f2;
  padding: .2rem;
  padding-bottom: .15rem;
  display: flex;
  flex-wrap: wrap;
  text-align: left;

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

.tags {
  height: 0.8rem;
  display: flex;
  padding-left: 0.3em;
  background: white;
  overflow-x: auto;
  align-items: center;

  .tag {
    border: 1px solid ;
    border-radius: 1rem;
    color: $text-french;
    padding: 0 .2rem;
    height: .5rem;
    box-sizing: border-box;
    margin-right: .1rem;
    font-size: 0.26rem;
    flex-shrink: 0;

    &.active {
      color: $text-green;
    }
  }
}

.popup-search {
  background: #f2f2f2;
  width: 100%;
  height: 100%;
  top: 1.1rem;

  .content {
    display: flex;
    padding: .15rem .3rem;
    background: white;
    height:.9rem;
    align-items: center;
    box-sizing: border-box;

    & > img {
      width: 0.22rem;
      height: 0.3rem;
      margin-right: 0.3rem;
      flex-shrink: 0;
    }

    form {
      flex-grow: 1;
      font-size: 0.3rem;
      height: 100%;

      input {
        width: 100%;
        height: 100%;
        background: #e8e8e8;
        border-radius: 1rem;
        text-indent: 2em;
      }
    }

    & > span {
      margin-left: 0.3rem;
      font-size: 0.36rem;
      flex-shrink: 0;
    }
  }

  .hr {
    height: 3px;
    background: #f2f2f2;
  }
}

.com-box{
  padding: .3rem;
  margin-top: .2rem;
  text-align: left;
  background: white;

  .title {
    font-size: 0.36rem;
    position: relative;
    text-indent: 1em;
    margin-bottom: 0.3rem;

    &:before {
      content: '';
      position: absolute;
      left:0;
      top: 0;
      width: 6px;
      height: 100%;
      background: $text-green;
    }
  }

  .content {
    display: flex;
    justify-content: flex-start;

    .logo {
      width: 2rem;
      height: 1.6rem;
      margin-right: 0.15rem;
      flex-shrink: 0;
    }

    .zs {
      width: 2.6rem;
      height: 3.5rem;
    }

    & > p {
      font-size: 0.18rem;
      color: $text-french;
      line-height: .4rem;
    }
  }
}
</style>
