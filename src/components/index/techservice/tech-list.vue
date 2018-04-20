<template>
  <div>
    <sy-header ref="header"></sy-header>
    <div class="tech-wrapper">
      <div class="title" @click="onFilterClick">
        <span>筛选条件</span>
        <img src="~images/filter.png">
      </div>
      <div class="list-container" v-if="infos.length > 0">
        <div class="list-item"
              v-for="(item, index) in infos" :key="index">
          <p class="name">{{item.name}}</p>
          <p class="from">服务商: <span class="company">{{item.dtManager.companyName}}</span></p>
          <p class="des two-line">{{item.subject}}</p>
          <p class="bottom">
            <span class="price">{{item.extContent.servicePrice}}</span>
            <span class="btn-detail flex-center" @click="onDetailClick(item.id)">查看详情</span>
          </p>
        </div>
      </div>
      <load-more ref="pageloader" :loadmore="loadMoreHandle" v-show="infos.length > 0"></load-more>
      <no-data v-if="infos.length === 0"></no-data>
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
          <div class="item all" @click="getServiceList()"><img src="~images/filter.jpg">全部</div>
          <div class="item" @click="filterType = 0" :class="filterType === 0 ? 'active' : ''">产业分类</div>
        </div>
        <div class="box" >
          <div  class="item"
                v-for="(item, index) in filterData" :key="index"
                @click="getServiceList(item.id)"
                :class="filterCateId === item.id ? 'active' : ''">
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
import LoadMore from 'comp/loadmore'
import NoData from 'comp/no-data'
import { Popup } from 'mint-ui'
import { GoodsService } from 'api/index/goods-service'
import { CategoryService } from 'api/index/category-service'
import { PageModel } from 'model/page-model'

export default {
  components: {
    [Header.name]: Header,
    [Footer.name]: Footer,
    Popup,
    NoData,
    LoadMore
  },

  data () {
    return {
      infos: [],
      filterType: 0,
      filterCateId: '',
      filterPopVisible: false,
      filterData: [],
      pager: new PageModel()
    }
  },

  methods: {
    onFilterClick () {
      this.filterPopVisible = true
      if (this.filterData.length === 0) {
        this.getFilterData()
      }
    },

    getServiceList (cateId = '') {
      if (this.filterPopVisible) {
        this.filterPopVisible = false
      }
      this.filterCateId = cateId
      this.goodsService.search({
        start: 0,
        limit: 10,
        goodsProp: 4,
        keyword: '',
        cateId
      }).then(res => {
        if (res) {
          this.infos = res.list.map(e => {
            e.extContent = JSON.parse(e.extContent.content)
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
        this.goodsService.search({
          start: 0,
          limit: 10,
          goodsProp: 4,
          keyword: '',
          cateId: this.filterCateId
        }).then(res => {
          if (res) {
            res.list.map(e => {
              e.extContent = JSON.parse(e.extContent.content)
              return e
            }).forEache(e => {
              this.infos.push(e)
            })
            this.$refs.pageloader.close()
          }
        })
      } else {
        this.$refs.pageloader.close()
      }
    },

    getFilterData () {
      this.categoryService.listCache(9)
        .then(res => {
          if (res) {
            this.filterData = res
          }
        })
    },

    onDetailClick (id) {
      this.$router.push({
        path: 'techservice/detail',
        query: {
          id
        }
      })
    }
  },

  created () {
    this.goodsService = new GoodsService()
    this.categoryService = new CategoryService()
  },

  mounted () {
    this.getServiceList()
  }
}
</script>

<style lang="scss" scoped>
@import '~scss/shotcut.scss';

.tech-wrapper {
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

  .list-container {
    padding: 0 .3rem;
    text-align: left;
    margin-bottom: .2rem;

    .list-item {
      padding: .35rem 0;
      border-bottom: 1px solid $border-gray;

      &:nth-last-child(1) {
        border: none;
      }

      .name {
        font-size: .3rem;
        margin-bottom: .15rem;
      }

      .from {
        font-size: .24rem;
        color: $text-gray;
        margin-bottom: .15rem;

        .company {
          color: $text-blue;
        }
      }

      .des {
        font-size: .18rem;
        color : $text-french;
        max-width: 5rem;
        margin-bottom: .15rem;
      }

      .bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .price {
          font-size: .26rem;
          color: $text-red;
        }

        .btn-detail {
          width: 1rem;
          height: .36rem;
          background: $text-green;
          color: white;
          border-radius: 3px;
          font-size: .18rem;
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
