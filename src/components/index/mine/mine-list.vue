<template>
  <div>
    <back :title="'我的'"> </back>
    <div class="list">
      <div class="item"
            v-for="(item, index) in infos" :key="index">
        <img :src="item.img" class="left">
        <p>{{item.title}}</p>
        <img src="~images/information-more.png" class="right">
      </div>
    </div>
  </div>
</template>

<script>
import Back from 'comp/index/back'
import icon1 from 'images/mine-icon1.png'
import icon2 from 'images/mine-icon2.png'
import icon3 from 'images/mine-icon3.png'
import icon4 from 'images/mine-icon4.png'
import icon5 from 'images/mine-icon5.png'
import icon6 from 'images/mine-icon6.png'
import icon7 from 'images/mine-icon7.png'

export default {
  components: {
    Back
  },

  data () {
    return {
      infos: [{
        title: '库存订单',
        img: icon1
      }, {
        title: '配方订单',
        img: icon2
      }, {
        title: '我的关注',
        img: icon3
      }, {
        title: '地址管理',
        img: icon4
      }, {
        title: '投诉举报',
        img: icon5
      }, {
        title: '意见反馈',
        img: icon6
      }, {
        title: '集采确认',
        img: icon7
      }]
    }
  },

  methods: {
  }
}
</script>

<style lang="scss" scoped>
@import '~scss/shotcut';

.list{
  padding: 0 .3rem;
  background: white;

  .item {
    height: .9rem;
    box-sizing: border-box;
    border-bottom: 1px solid $border-gray;
    display: flex;
    align-items: center;

    .left {
      width: 0.3rem;
      height: 0.3rem;
      margin-right: 0.2rem;
    }

    p {
      font-size: 0.3rem;
      flex-grow: 1;
    }

    .right {
      width: 0.2rem;
      height: 0.3rem;
    }
  }
}
</style>
