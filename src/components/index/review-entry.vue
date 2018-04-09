<template>
  <div class="comment-container" v-if="id">
    <div class="title">
      <p>商品评价 ({{reviews.length}})</p>
      <p v-show="reviews.length != 0" class="more" @click="getMoreCommont">查看全部 <img src="~images/more.jpg"></p>
    </div>
    <div  class="content" v-if="reviews.length > 0">
      <p class="name">{{reviews[0].realName}}</p>
      <p class="time">{{reviews[0].createTime}}</p>
      <p class="comment">{{reviews[0].text}}</p>
    </div>
    <no-data v-show="reviews.length === 0"></no-data>
  </div>
</template>

<script>
import { ReviewService } from 'api/index/review-service'
import NoData from 'comp/no-data'

export default {
  props: {
    id: {
      type: String,
      default: ''
    }
  },

  components: {
    NoData
  },

  data () {
    return {
      reviews: []
    }
  },

  methods: {
    getMoreCommont () {
      this.$router.push({
        path: '/reviews',
        query: {
          goodsId: this.id
        }
      })
    }
  },

  created () {
    this.reviewService = new ReviewService()
  },

  mounted () {
    this.reviewService.list({
      goodsId: this.id,
      start: 0,
      limit: 100
    }).then(res => {
      if (res) {
        this.reviews = res.list
      }
    })
  }
}
</script>

<style lang="scss" scoped>
@import '~scss/shotcut';

.comment-container {
  padding: 0 .3rem;
  background: white;
  margin-bottom: .1rem;

  .title {
    height: .87rem;
    border-bottom: 1px solid $border-french;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & > p {
      font-size: .28rem;
    }

    .more {
      color: $text-red;

      & > img {
        width : .12rem;
        height: .22rem;
      }
    }
  }

  .content {
    text-align: left;

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
      font-size: .24rem;
      height: .75rem;
      line-height: .75rem;
    }
  }
}
</style>
