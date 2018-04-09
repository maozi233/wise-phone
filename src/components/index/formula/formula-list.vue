<template>
  <div>
    <sy-header ref="header"></sy-header>
    <section class="recommend">
      <div class="title">
        <img src="~images/recommend.png">
        <span>推荐配方师</span>
      </div>
      <div class="content">
        <div  class="box"
              v-for="(item, index) in recommends" :key="index">
          <img :src="item.pic">
          <p class="name">{{item.managerName}}</p>
          <p class="des third-line">{{item.shopDesc || '暂无'}}</p>
        </div>
      </div>
    </section>

    <section class="formula-list">
      <div class="title" @click="onFilterClick">
        <span>筛选条件</span>
        <img src="~images/filter.png">
      </div>
      <div class="list">
        <div  class="box"
              v-for="(item, index) in formulas" :key="index"
              @click="onItemClick(item.id)">
          <p class="title">{{item.name}}</p>
          <p class="name">{{item.dtManager.managerName}}</p>
          <p class="des single-line">{{item.subject}}</p>
          <p class="money">{{item.price}}</p>
        </div>
        <div v-show="formulas.length === 0">暂无数据</div>
      </div>
    </section>

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
          <div class="item all" @click="getFormulas(-1)"><img src="~images/filter.jpg">全部</div>
          <div class="item" @click="filterType = 0" :class="filterType === 0 ? 'active' : ''">产业分类</div>
          <div class="item" @click="filterType = 1" :class="filterType === 1 ? 'active' : ''">服务</div>
        </div>
        <div class="box" v-show="filterType === 0">
          <div  class="item"
                v-for="(item, index) in filterData" :key="index"
                @click="getFormulas(0,item.id)"
                :class="filterCateId === item.id ? 'active' : ''">
            {{item.name}}
          </div>
        </div>
        <div class="box" v-show="filterType === 1">
          <div  class="item"
                v-for="(item, index) in filterTypeData" :key="index"
                @click="getFormulas(1,item.id)"
                :class="teac === item.id ? 'active' : ''">
            {{item.name}}
          </div>
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import Header from 'comp/index/header'
import Footer from 'comp/index/footer'
import { Popup } from 'mint-ui'
import { FormulaService } from 'api/index/formula-service'
import { GoodsService } from 'api/index/goods-service'

// 配方师
const RECOMMEND_TYPE = 2

export default {
  components: {
    [Header.name]: Header,
    [Footer.name]: Footer,
    Popup
  },
  data () {
    return {
      recommends: [],
      formulas: [],
      cateId: '',
      filterType: 0,
      filterData: [],
      filterCateId: 0,
      filterTypeData: [{id: '', name: '不限'}, {id: '1', name: '在线支持'}, {id: '2', name: '电话支持'}, {id: '3', name: '人员外派'}],
      teac: '',
      filterPopVisible: false
    }
  },

  methods: {
    /**
     *  @param {str} type 请求类型 -1不限 0是产品类型 1是服务类型
     *  @param {str} id 配方种类id
     */
    getFormulas (type, id) {
      if (this.filterPopVisible) {
        this.filterPopVisible = false
      }
      if (type === -1) {
        this.filterCateId = ''
        this.teac = ''
      } else if (type === 0) {
        this.filterCateId = id
      } else if (type === 1) {
        this.teac = id
      }
      this.goodsService.search({
        start: 0,
        limit: 1000,
        goodsProp: 2,
        keyword: '',
        cateId: this.filterCateId,
        teac: this.teac
      }).then(res => {
        if (res) {
          // console.log(res)
          this.formulas = res.list
        }
      })
    },
    /**
     *  @param {str} 配方id
     */
    onItemClick (formulaId) {
      this.$router.push({
        path: 'star-formula/detail',
        query: {
          formulaId
        }
      })
    },
    // 点击过滤器
    onFilterClick () {
      this.filterPopVisible = true
      // 为空时去拿一次明星配方的tag数据
      if (this.filterData.length === 0) {
        this.filterData = this.$store.state.formulaTagsCache
      }
    }
  },

  watch: {
    $route (to, from) {
      // 执行ajax请求，但只希望在进入时请求，离开时不希望进行请求。
      this.getFormulas(0, to.query.cateId)
      this.$refs.header.closeServicePop()
    }
  },

  created () {
    this.formulaService = new FormulaService()
    this.goodsService = new GoodsService()
  },

  mounted () {
    this.formulaService.getRecommend({
      identityType: RECOMMEND_TYPE,
      limit: 3
    }).then(res => {
      if (res) {
        this.recommends = res.map(e => {
          // 用户头像
          return Object.assign(e, {
            pic: e.user.head
          })
        })
      }
    })
  },

  beforeRouteEnter: (to, from, next) => {
    next((vm) => {
      vm.cateId = to.query.cateId || ''

      vm.getFormulas(0, vm.cateId)
    })
  }

}
</script>

<style lang="scss" scoped>
@import '~scss/shotcut.scss';

.bg {
  background: #f2f2f2;
}

.recommend {
  background: white;
  margin-bottom: .2rem;

  .title {
    height: .9rem;
    border-bottom: 1px solid #eee;
    font-size: .3rem;
    color: $text-black;
    display: flex;
    align-items: center;
    padding-left: .3rem;

    & > img {
      width: .3rem;
      height: .3rem;
      margin-right: .1rem;
    }
  }

  .content {
    padding: .3rem;
    display: flex;
    & .box:nth-child(3) {
      margin-right: 0;
    }
    .box {
      width: 2.2rem;
      height: 2.9rem;
      display: flex;
      flex-direction: column;
      margin-right: .15rem;

      & > img {
        height: 1.6rem;
        box-sizing: border-box;
        border:  1px solid $border-gray;
        border-radius: 4px;
        margin-bottom: .1rem;
      }

      .name {
        line-height: .4rem;
        font-size: .24rem;
        color: $text-black;
        margin-bottom: .1rem;
      }

      .des {
        line-height: .24rem;
        font-size: .18rem;
        color: $text-french;
      }
    }
  }

}

.formula-list {
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

  .list {
    padding: .2rem .3rem 0;

    .box {
      height: 2.1rem;
      border-bottom: 1px solid $border-french;
      display: flex;
      flex-direction: column;
      text-align: left;

      .title {
        line-height: .65rem;
        font-size: .3rem;
        color: $text-black;
      }

      .name {
        line-height: .24rem;
        font-size: .24rem;
        color: $text-gray;
        margin-bottom: .2rem;
      }

      .des {
        line-height: .25rem;
        font-size: .18rem;
        color: $text-french;
        margin-bottom: .3rem;
      }

      .money {
        font-size: .24rem;
        line-height: .24rem;
        color: #eb522f;

        &:before {
          content: '¥';
          margin-right: 5px;
        }
      }
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
</style>
