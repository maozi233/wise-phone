<template>
  <div>
    <sy-header ref="header" :showSearch='false'></sy-header>

    <div>
      <div class="top">
        <div class="title">
          <img src="~images/back.png" @click="goBack">
          <span>问题详情</span>
        </div>
      </div>

      <div class="list-container">
        <div class="title">
          <img src="~images/question.png">
          <p class="single-line">{{content}}</p>
        </div>
        <div class="list">
          <div  class="item"
                v-if="replies.length > 0"
                v-for="(item, index) in replies" :key="index">
            <img v-lazy="item.userHead" class="left">
            <div class="right">
              <p class="name">{{item.realName || '无名氏'}}</p>
              <p class="content">{{item.qaReply.content}}</p>
            </div>
          </div>
        </div>
        <no-data v-if="replies.length === 0"></no-data>
      </div>
    </div>

    <div class="flex-bottom"></div>
    <flex-bottom  :rightBtnName="'回复'"
                  :showLeft="false"
                  :rightBtnHandle="reply">
      <input type="text" v-model="inputReply" placeholder="请输入评论内容" class="question-input">
    </flex-bottom>

  </div>
</template>

<script>
import Header from 'comp/index/header'
import FlexBottom from 'comp/index/flex-bottom'
import NoData from 'comp/no-data'
import { QuestionService } from 'api/index/question-service'
import { Toast } from 'mint-ui'

export default {
  components: {
    [Header.name]: Header,
    FlexBottom,
    NoData
  },

  data () {
    return {
      id: '',
      content: '',
      replies: [],
      inputReply: ''
    }
  },

  methods: {
    goBack () {
      this.$router.go(-1)
    },
    reply () {
      if (this.inputReply) {
        this.questionService.answer({
          qaQuestionId: this.id,
          content: this.inputReply
        }).then(res => {
          if (res) {
            Toast('回复成功')
            this.getReplies()
          }
        })
      }
    },

    getReplies () {
      this.questionService.list({
        start: 0,
        limit: 20,
        qaQuestionId: this.id
      }).then(res => {
        if (res) {
          this.replies = res.list
        }
      })
    }
  },

  created () {
    this.questionService = new QuestionService()
  },

  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      vm.id = to.query.id
      vm.content = to.query.content

      vm.getReplies()
    })
  }
}
</script>

<style lang="scss" scoped>
@import '~scss/shotcut';

.flex-bottom {
  height: 1rem;
}

.top {
  background: white;
  margin-bottom: 0.2rem;

  .title {
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
}

.list-container {
  background: white;
  margin-bottom: .2rem;

  .title {
    height: .9rem;
    padding: 0 .3rem;
    display: flex;
    align-items: center;
    margin-bottom: 1px solid $border-gray;
    box-sizing: border-box;

    img {
      width: 0.3rem;
      height: 0.3rem;
      margin-right: 0.1rem;
    }

    p {
      font-size: 0.3rem;
    }
  }

  .list {
    padding: 0 .3rem ;

    .item {
      display: flex;
      border-bottom: 1px solid $border-gray;
      padding: .2rem 0 .3rem;
      &:nth-last-child(1) {
        border-bottom: 0;
      }

      .left {
        flex-shrink: 0;
        width: 0.8rem;
        height: 0.8rem;
        margin-right: .2rem;
        border-radius: 50%;
      }

      .right {
        flex-grow: 1;
        overflow-x: hidden;
        text-align: left;

        .name {
          height: .8rem;
          line-height: .8rem;
          margin-bottom: 0.24rem;
          font-size: 0.24rem;
          color: $text-french
        }

        .content {
          line-height: .4rem;
          font-size: 0.28rem;
        }
      }
    }
  }
}

.flex-bottom-container {
  .question-input {
    background: #f3f3f3;
    position: absolute;
    width: 4.5rem;
    height: .8rem;
    border-radius: 4px;
    text-indent: 1em;
    font-size: .24rem;
  }
}
</style>
