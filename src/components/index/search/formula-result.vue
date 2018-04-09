<template>
  <div class="bg">
    <sy-header ref="header"></sy-header>
    <div class="result-des">
      <p>全部结果<span>共{{this.goods.length}}个相关配方</span></p>
    </div>

    <div class="goods-list">
      <div class="title" @click="onFilterClick">
        <span>筛选条件</span>
        <img src="~images/filter.png">
      </div>
      <div class="box">
        <div  class="goods"
              v-for="(item, index) in goods" :key="index"
              @click="onItemClick(item.id)">
          <p class="name single-line">{{item.name}}</p>
          <p class="price">{{item.price}}</p>
        </div>
      </div>
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
          <div class="item all" @click="getFormulas(-1)"><img src="~images/filter.jpg">全部</div>
          <div class="item" @click="filterType = 0" :class="filterType === 0 ? 'active' : ''">产业分类</div>
          <div class="item" @click="filterType = 1" :class="filterType === 1 ? 'active' : ''">服务</div>
        </div>
        <div class="box" v-show="filterType === 0">
          <div  class="item"
                @click="getFormulas(0, '')"
                :class="filterCateId === '' ? 'active' : ''">不限</div>
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
import NoData from 'comp/no-data'
import {GoodsResultService} from 'api/index/result/goods-result-service'

export default {
  components: {
    [Header.name]: Header,
    [Footer.name]: Footer,
    NoData
  },

  data () {
    return {
      inputSmg: '',
      goods: [],
      filterType: 0,
      filterPopVisible: false,
      filterData: [],
      filterCateId: '',
      filterTypeData: [{id: '', name: '不限'}, {id: '1', name: '在线支持'}, {id: '2', name: '电话支持'}, {id: '3', name: '人员外派'}],
      teac: ''
    }
  },
  methods: {
    getGoods () {
    },

    // 点击过滤器
    onFilterClick () {
      this.filterPopVisible = true
      // 为空时去拿一次明星配方的tag数据
      if (this.filterData.length === 0) {
        this.filterData = this.$store.state.formulaTagsCache
      }
    },

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
      this.goodsResultService.search({
        start: 0,
        limit: 1000,
        goodsProp: 2,
        keyword: '',
        cateId: this.filterCateId,
        teac: this.teac
      }).then(res => {
        if (res) {
          this.goods = res.list.map(item => {
            return Object.assign(item, {
              exContent: item.extContent.content ? JSON.parse(item.extContent.content) : ''
            })
          })
        }
      })
    },

    getGoodsFromKeyWord () {
      this.goodsResultService.search({
        start: 0,
        limit: 50,
        goodsProp: 2,
        keyword: this.inputSmg
      }).then(res => {
        if (res) {
          this.goods = res.list.map(item => {
            return Object.assign(item, {
              exContent: item.extContent.content ? JSON.parse(item.extContent.content) : ''
            })
          })
        }
      })
    },

    onItemClick (formulaId) {
      this.$router.push({
        path: 'star-formula/detail',
        query: {
          formulaId
        }
      })
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

.goods-list {
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
    background: #f2f2f2;
    padding: .2rem;
    display: flex;
    flex-wrap: wrap;

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
      text-align: left;
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

        &::before {
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
      text-align:left;
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
