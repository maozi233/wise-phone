<template>
  <div>
    <div class="list">
      <div  class="item"
            v-for="(item, index) in infos" :key="index"
            @click="onItemClick(item.id)">
        <div class="left">
          <div class="title single-line">{{item.category.name}}</div>
          <div class="content single-line" >{{item.title}}</div>
          <div class="date">{{item.createTime}}</div>
        </div>
        <img src="~images/information-more.png" class="right">
      </div>
    </div>
    <load-more ref="pageloader" :loadmore="loadMoreHandle" v-show="infos.length > 0"></load-more>
    <no-data v-if="infos.length === 0"></no-data>
  </div>
</template>

<script>
import NoData from 'comp/no-data'
import { InformationService } from 'api/index/information-service'
import { PageModel } from 'model/page-model'
import LoadMore from 'comp/loadmore'

export default {
  components: {
    NoData,
    LoadMore
  },

  data () {
    return {
      infos: [],
      pager: new PageModel()
    }
  },

  methods: {
    onItemClick (id) {
      this.$router.push({
        path: 'information/detail',
        query: {
          id
        }
      })
    },

    loadMoreHandle () {
      let hasMore = this.pager.loadMore()
      if (hasMore) {
        this.informationService.list({
          start: this.pager.curPage,
          limit: this.pager.pageSize
        }).then(res => {
          if (res) {
            res.list.forEach(e => {
              this.infos.push(e)
            })
          }
          this.$refs.pageloader.close()
        })
      } else {
        this.$refs.pageloader.close()
      }
    }
  },

  created () {
    this.informationService = new InformationService()
  },

  mounted () {
    this.informationService.list({
      start: 0,
      limit: 10
    }).then(res => {
      if (res) {
        this.infos = res.list
        this.pager.reset()
        this.pager.setTotal(res.total)
      }
    })
  }
}
</script>

<style lang="scss" scoped>
@import '~scss/shotcut';

.list {
  margin: .1rem 0 .2rem;
  background: white;

  .item {
    padding: 0 .3rem;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid $border-gray;
    text-align: left;
    &:nth-last-child(1) {
      border-bottom: 0;
    }

    .left {
      display: flex;
      flex-direction: column;
      overflow-x: hidden;
      width: 6rem;

      .title {
        line-height: .8rem;
        font-size: 0.3rem;
      }

      .content {
        font-size: 0.24rem;
        color: $text-french;
        margin-bottom: .2rem;
      }

      .date {
        font-size: 0.2rem;
        color: $text-french;
        margin-bottom: .28rem;
      }
    }

    .right {
      width: 0.18rem;
      height: 0.3rem;
    }
  }
}
</style>
