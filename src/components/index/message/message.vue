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
  </div>
</template>

<script>
import { MessageService } from 'api/index/message-service'
export default {
  data () {
    return {
      messages: this.$store.state.messages.list || []
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  },

  mounted () {
    if (!this.messages.length) {
      this.messageService = new MessageService()
      this.messageService.get({
        start: 0,
        limit: 50
      }).then(res => {
        if (res) {
          this.messages = res.list
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
