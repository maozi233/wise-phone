<template>
  <div class="bg">
    <sy-header ref="header" :inputPlaceHolder="inputSmg"></sy-header>
    <div class="result-des">
      <p>全部结果<span>共{{this.goods.length}}个相关原料</span></p>
    </div>
    <div class="result-detail" v-show="fristItem">
      <p>
        <span>化学名</span>
        <span>{{fristItem ? fristItem.chemicalCall : 'N/A'}}</span>
      </p>
      <p>
        <span>CAS号</span>
        <span>{{fristItem ? fristItem.casNo : 'N/A'}}</span>
      </p>
      <p>
        <span>INCI名</span>
        <span>{{fristItem ? fristItem.chemicalName : 'N/A'}}</span>
      </p>
      <p>
        <span>别名</span>
        <span>{{fristItem ? fristItem.name : 'N/A'}}</span>
      </p>
    </div>

    <div class="not-found" v-show="!fristItem">
      <p>抱歉，原料中暂时没有找到{{inputSmg}}商品</p>
      <span>请确认您输入的原料产品名/化学名/INCI名/分类 是否正确</span>
    </div>

    <div class="goods-list">
      <div class="title" @click="onFilterClick">
        <span>筛选条件</span>
        <img src="~images/filter.png">
      </div>
      <div class="list">
        <div  class="box"
              v-for="(item, index) in goods" :key="index"
              @click="onItemClick(item.id)"
              v-if="goods.length > 0">
          <p>产品名:<span>{{item.name}}</span></p>
          <p>供应商:<span class="shop">{{item.dtManager.shopName}}</span></p>
          <p>分类:<span>{{item.primaryCategory ? item.primaryCategory.name : ''}}</span></p>
          <p>规格:
            <span v-if="item.exContent">
              {{`${item.exContent.spec.counts}${specs.unit[item.exContent.spec.unit].title}/${specs.pack[item.exContent.spec.pack].title}`}}
            </span>
          </p>
          <p>所属板块:<span>生产商之窗</span></p>
          <span class="buy flex-center" @click="onItemClick(item.id)">了解详情</span>
        </div>
        <no-data v-show="goods.length === 0"></no-data>
      </div>
      <load-more ref="pageloader" :loadmore="loadMoreHandle" v-show="goods.length > 0"></load-more>
    </div>
    <sy-footer></sy-footer>

    <mt-popup
              v-model="filterPopVisible"
              position="top"
              class="pop-filter">
      <div class="title" @click="filterPopVisible = false">
        <span>筛选条件</span>
        <img src="~images/filter.png">
      </div>

      <div class="filterWrapper">
        <div class="box">
          <div class="item" @click="filterType = 0" :class="filterType === 0 ? 'active' : ''">分类</div>
        </div>
        <div class="box" v-show="filterType === 0">
          <div  class="item"
                @click="getFormulas('')"
                :class="cateId === '' ? 'active' : ''">不限</div>
          <div  class="item"
                v-for="(item, index) in filterData" :key="index"
                @click="onCateClick(item)"
                :class="cateId === item.id ? 'active' : ''">
            {{item.name}}
          </div>
        </div>
        <div class="box" id="child-box" v-show="cateId != ''">
          <div  class="item"
                v-for="(item, index) in activeFilterData" :key="index"
                :class="filterCateId === item.name ? 'active' : ''"
                @click="getFormulas(item.name)">
            {{item.name === cateId ? '全部' : item.name}}
          </div>
        </div>
      </div>
    </mt-popup>
  </div>

</template>
<script>
import Header from 'comp/index/header'
import Footer from 'comp/index/footer'
import NoData from 'comp/no-data'
import {GoodsResultService} from 'api/index/result/goods-result-service'
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
      inputSmg: '',
      goods: [],
      fristItem: '',
      specs: Specs,
      filterType: 0,
      filterPopVisible: false,
      filterData: [],
      cateId: '',
      filterCateId: '',
      activeFilterData: [],
      teac: '',
      pager: new PageModel()
    }
  },
  methods: {
    getGoodsFromKeyWord () {
      this.goodsResultService.search({
        start: 0,
        limit: 10,
        goodsProp: 1,
        keyword: this.inputSmg
      }).then(res => {
        if (res) {
          this.goods = res.list.map(item => {
            return Object.assign(item, {
              exContent: JSON.parse(item.extContent.content)
            })
          })

          this.fristItem = this.goods[0]
          this.pager.reset()
          this.pager.setTotal(res.total)
        }
      })
    },

    onItemClick (id) {
      this.$router.push({
        path: '/producer/detail',
        query: {
          id
        }
      })
    },

    getFormulas (id) {
      if (this.filterPopVisible) {
        this.filterPopVisible = false
      }
      this.filterCateId = id
      this.goodsResultService.search({
        start: 0,
        limit: 10,
        goodsProp: 1,
        keyword: this.inputSmg,
        cateId: this.filterCateId
      }).then(res => {
        if (res) {
          this.goods = res.list.map(item => {
            return Object.assign(item, {
              exContent: item.extContent.content ? JSON.parse(item.extContent.content) : ''
            })
          })

          this.fristItem = this.goods[0]
          this.pager.reset()
          this.pager.setTotal(res.total)
        }
      })
    },

    loadMoreHandle () {
      let hasMore = this.pager.loadMore()
      if (hasMore) {
        this.goodsResultService.search({
          start: this.pager.curPage,
          limit: this.pager.pageSize,
          goodsProp: 1,
          keyword: this.inputSmg,
          cateId: this.filterCateId
        }).then(res => {
          if (res) {
            res.list.map(item => {
              return Object.assign(item, {
                exContent: item.extContent.content ? JSON.parse(item.extContent.content) : ''
              })
            }).forEach(e => {
              this.goods.push(e)
            })
          }
          this.$refs.pageloader.close()
        })
      } else {
        this.$refs.pageloader.close()
      }
    },

    // 点击过滤器
    onFilterClick () {
      this.filterPopVisible = true
      // 为空时去拿一次明星配方的tag数据
      if (this.filterData.length === 0) {
        this.filterData = this.$store.state.materialTagsCache
      }
    },

    onCateClick (item) {
      this.cateId = item.name
      if (item.children) {
        this.activeFilterData = item.children.concat([])
        this.activeFilterData.unshift({name: this.cateId})
      } else {
        this.activeFilterData = [{name: this.cateId}]
      }
    }
  },

  watch: {
    $route (to, from) {
      this.inputSmg = to.query.msg
      this.getGoodsFromKeyWord()
      this.$refs.header.closeSearchPop()
    }
  },
  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      vm.inputSmg = to.query.msg

      vm.goodsResultService = new GoodsResultService()
      vm.getGoodsFromKeyWord()
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

.result-detail {
  color: $text-french;
  text-align: left;
  font-size: 0.3rem;
  background: white;
  line-height: 0.55rem;
  padding: .15rem .28rem 0;
  margin-bottom: 0.2rem;

  & > p > span:nth-child(1) {
    width: 1.3rem;
    display: inline-block;
  }

  & > p > span:nth-child(2) {
    color: $text-black;
  }
}

.goods-list {
  margin-bottom: .2rem;
  background: white;

  & > .title {
    height: .9rem;
    border-bottom: 1px solid $border-gray;
    padding: 0 .3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & > span {
      font-size: .3rem;
      color: $text-black;
    }

    & > img {
      width: .28rem;
      height: .16rem;
    }
  }

  .box {
    text-align: left;
    padding: .1rem .3rem;
    font-size: 0.3rem;
    position: relative;
    border-bottom: 1px solid $border-gray;
    &:nth-last-child(1) {
      border-bottom: 0;
    }

    & > p {
      line-height: .55rem;
      color: $text-french;

      & > span {
        color: $text-black;
        margin-left: .2rem;
      }
    }

    .buy {
      width: 1.2rem;
      height: .5rem;
      color: white;
      background: $text-green;
      font-size: 0.24rem;
      border-radius: 4px;
      position: absolute;
      right: .3rem;
      bottom: .3rem;
    }

    .shop {
      color: $text-blue
    }
  }
}

.pop-filter {
  height: .9rem;
  box-sizing: border-box;
  border-bottom: 1px solid $border-gray;
  width: 100%;

  .title {
    padding: 0 .3rem;
    height: 100%;
    font-size: .3rem;
    color: $text-black;
    display: flex;
    align-items: center;
    justify-content: space-between;

     & > img {
      width: .28rem;
      height: .16rem;
      transform: rotateX(180deg)
    }
  }

  .filterWrapper {
    max-height: 5rem;
    background: #fcfefd;
    display: flex;

    .box {
      display: flex;
      height: 5rem;
      overflow-y: auto;
      flex-direction: column;
      width: 1.65rem;
      background: #f1f2f4;

      .item {
        height: .8rem;
        font-size:.26rem;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;

        &.all {
          color: $text-french;

          & > img {
            margin-right: 10px;
            width: .24rem;
            height: .2rem;
          }
        }

        &.active {
          color: $text-green;
          background: #e7e7e7;
        }
      }
    }

    & .box:nth-child(n + 2) {
      background: #f7f9f8;

      .item.active {
        background: #fcfefd;
        color: $text-black;
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
