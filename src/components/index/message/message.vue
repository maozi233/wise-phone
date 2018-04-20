<template>
  <div class="bg">
    <div class="title">
      <img src="~images/back.png" @click="goBack">
      <span>消息</span>
    </div>
    <div class="list">
      <div  class="item"
            v-for="(item, index) in messages" :key="index">
            {{item.privateMessage.content}}
      </div>
    </div>
    <load-more ref="pageloader" :loadmore="loadMoreHandle" v-show="messages.length > 0"></load-more>
    <no-data v-show="messages.length === 0"></no-data>
  </div>
</template>

<script>
import { MessageService } from 'api/index/message-service'
import { mapMutations } from 'vuex'
import { PageModel } from 'model/page-model'
import LoadMore from 'comp/loadmore'
import NoData from 'comp/no-data'

export default {
  components: {
    LoadMore,
    NoData
  },
  data () {
    return {
      // messages: this.$store.state.messages.list
      messages: this.$store.state.messages.list || [],
      pager: new PageModel()
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },

    ...mapMutations({
      setMessages: 'setMessages'
    }),

    loadMoreHandle () {
      let hasMore = this.pager.loadMore()
      if (hasMore) {
        this.messageService.get({
          start: this.pager.curPage,
          limit: this.pager.pageSize
        }).then(res => {
          if (res) {
            res.list.forEach(e => {
              this.messages.push(e)
            })
          }
          this.$refs.pageloader.close()
        })
      } else {
        this.$refs.pageloader.close()
      }
    }
  },

  mounted () {
    if (!this.messages.length) {
      this.messageService = new MessageService()
      this.messageService.get({
        start: 0,
        limit: 10
      }).then(res => {
        if (res) {
          this.messages = res.list
          // 存了个消息条数
          this.setMessages(res)
          this.pager.reset()
          this.pager.setTotal(res.total)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~scss/shotcut';

.bg {
  background: #f2f2f2;
  min-height: 100vh;
}

.title {
  background: white;
  height: .88rem;
  box-sizing: border-box;
  border-bottom: 1px solid $border-french;
  padding: 0 .3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > img {
    width: .3rem;
    height: .28rem;
  }

  & > span {
    flex-grow: 1;
    margin-left: -.3rem;
    font-size: .36rem;
  }
}

.list {
  text-align: left;

  .item {
    margin-bottom: 0.2rem;
    line-height: .5rem;
    padding: .2rem .3rem;
    font-size: 0.28rem;
    background: white;
  }
}
</style>
