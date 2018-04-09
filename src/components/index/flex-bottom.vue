<template>
  <div class="flex-bottom-container">
    <div class="btns" :class="showLeft ? '' : 'gone'">
      <div class="box">
        <img src="~images/icon_shop_symbol.png">
        <span>店铺</span>
      </div>
      <div class="box" @click="onCollectClick">
        <img v-show="!isCollect" src="~images/icon_collection_commodity_off.png">
        <img v-show="isCollect" src="~images/icon_collection_commodity_on.png">
        <span>{{isCollect ? '取消收藏' : '收藏'}}</span>
      </div>
    </div>

    <slot></slot>

    <div  class="right-btn flex-center"
          :style="{backgroundColor:rightBtnBg}"
          @click="onRightBtnClick"
          :class="showRight ? '' : 'gone'">
      {{rightBtnName}}
    </div>
  </div>
</template>

<script>
import { FavoriteService } from 'api/index/favorite-service'
import { Toast } from 'mint-ui'

export default {
  components: {
    Toast
  },

  props: {
    id: {
      type: String,
      default: ''
    },
    rightBtnHandle: {
      type: Function,
      default: () => {}
    },
    rightBtnName: {
      type: String,
      default: '确认'
    },
    showLeft: {
      type: Boolean,
      default: true
    },
    showRight: {
      type: Boolean,
      default: true
    },
    rightBtnBg: {
      type: String,
      default: '#279b3c'
    }
  },

  data () {
    return {
      isCollect: false
    }
  },

  methods: {
    onCollectClick () {
      if (this.isCollect) {
        // 取消收藏
        this.favoriteService.deleteIt({
          type: 1,
          itemId: this.id
        })
          .then(res => {
            if (res) {
              this.isCollect = false
              Toast('已取消收藏')
            }
          })
      } else {
        // 添加收藏
        this.favoriteService.add({
          type: 1,
          itemId: this.id
        })
          .then(res => {
            if (res) {
              this.isCollect = true
              Toast('收藏成功')
            }
          })
      }
    },

    onRightBtnClick () {
      this.rightBtnHandle()
    }
  },

  created () {
    this.favoriteService = new FavoriteService()
  },

  mounted () {
    this.favoriteService.filterIt({
      ids: this.id
    }).then(res => {
      if (res) {
        this.isCollect = res.length > 0
      }
    })
  }
}
</script>

<style lang="scss" scoped>
@import '~scss/shotcut';

.flex-bottom-container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 .3rem;
  background: white;
  box-shadow: -1px 0 1px rgba(0,0,0,.2);

  .btns {
    height: 100%;
    display: flex;
    align-items: center;

    .box {
      display: flex;
      flex-direction: column;
      margin-right: .3rem;
      align-items: center;

      & > img {
        width :.32rem;
        height :.32rem;
        margin-bottom: 5px;
      }

      & > span {
        font-size: .2rem;
        color: $text-french;
      }
    }
  }

  .right-btn {
    width: 2rem;
    height: .8rem;
    // background: $text-green;
    color: white;
    font-size: .3rem;
    border-radius: 5px;
  }

  .gone {
    visibility: hidden;
  }
}
</style>
