<template>
  <div class="loadmore" @click="onLoadMoreClick">
    <div v-show="!isLoadmore" class="more-container">
      <span>查看更多</span>
      <img src="~images/more.png" >
    </div>
    <mt-spinner type="snake" v-show="isLoadmore" class="spinner-snake"></mt-spinner>
  </div>
</template>

<script>
import { Spinner } from 'mint-ui'

export default {
  name: 'load-more',

  props: {
    loadmore: {
      type: Function,
      default: () => {}
    }
  },

  components: {
    Spinner
  },

  data () {
    return {
      isLoadmore: false
    }
  },

  methods: {
    onLoadMoreClick () {
      this.isLoadmore = true
      this.loadmore()
    },

    close () {
      this.isLoadmore = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~scss/shotcut.scss';

.loadmore{
  margin: .2rem 0;
  height: .86rem;
  font-size: .24rem;
  color: $text-black;
  background:white;
  display:flex;
  justify-content: center;
  align-items: center;

  .more-container {
    display: flex;
    align-items: center;
  }

  .loadmore {
    display: flex;
    align-items: center;
  }

  span {
    margin-right: .1rem;
  }

  img{
    width: .24rem;
    height: .24rem;
  }
}
</style>
