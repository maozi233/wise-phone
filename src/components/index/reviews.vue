<template>
  <div class="bg">
    <sy-header ref="header" :showSearch='false'></sy-header>
    <div class="reviews">
      <div class="title">
        <img src="~images/back.png" @click="goBack">
        <span>商品评价</span>
      </div>

      <div  class="content"
            v-for="(item, index) in reviews" :key="index">
        <p class="name">{{item.realName}}</p>
        <p class="time">{{item.createTime}}</p>
        <p class="comment">{{item.text}}</p>
        <div class="pr" v-if="item.pr">
          <p>卖家回复：{{item.pr.text}}</p>
        </div>
      </div>
    </div>

    <div class="flex-bottom"></div>
    <flex-bottom  v-if="goodsId"
                  :id="goodsId"
                  :shopId="shopId"
                  :rightBtnName="'咨询'"
                  :rightBtnHandle="consult"></flex-bottom>
  </div>
</template>

<script>
import Header from 'comp/index/header'
import FlexBottom from 'comp/index/flex-bottom'
import { ReviewService } from 'api/index/review-service'

export default {
  props: {
    shopId: {
      type: String,
      default: ''
    }
  },

  components: {
    [Header.name]: Header,
    FlexBottom
  },

  data () {
    return {
      goodsId: '',
      reviews: []
    }
  },

  methods: {
    goBack () {
      this.$router.go(-1)
    },

    consult () {
      console.log('咨询')
    }
  },

  created () {
    this.reviewService = new ReviewService()
  },

  beforeRouteEnter: (to, from, next) => {
    next((vm) => {
      vm.goodsId = to.query.goodsId || ''
      console.log(vm.goodsId)
      // vm.getFormulas(vm.cateId)

      vm.reviewService.list({
        goodsId: vm.goodsId,
        start: 0,
        limit: 20
      }).then(res => {
        if (res) {
          vm.reviews = res.list
        }
      })
    })
  }
}
</script>

<style lang="scss" scoped>
@import '~scss/shotcut';
.bg {
  background: #f2f2f2;
}

.reviews {
  background: white;

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

  .content {
    text-align: left;
    padding: 0 .3rem;
    border-bottom: 1px solid $border-gray;

    .name {
      font-size: .28rem;
      height: .8rem;
      line-height: .8rem;
    }

    .time {
      font-size: .24rem;
      height: .32rem;
      line-height: .32rem;
      color: $text-french;
    }
    .comment {
      padding: .2rem 0;
      font-size: .24rem;
      line-height: .4rem;
    }

    .pr {
      padding: .2rem;
      background: #eee;
      color: $text-french;
      font-size: 0.3rem;
      margin-bottom: 0.3rem;

      & > p {
        word-wrap: break-word;
      }
    }
  }
}

.flex-bottom{
  height: 1rem;
  background: white;
}
</style>
