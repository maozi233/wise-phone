<template>
  <div class="detail">
    <div class="title">
      <img src="~images/back.png" @click="goBack">
      <span>问题详情</span>
    </div>
    <div class="des">
      <p class="name">{{detail.title}}</p>
      <p class="time">{{detail.lastModifyTime}}</p>
    </div>
    <div class="content" ref="content" v-html="detail.content.content" style="font-size:.3rem;text-align: left;"></div>

    <mt-popup
              v-model="popVisible"
              position="center"
              class="pop-filter">
      <img :src="imgUrl">
    </mt-popup>
  </div>
</template>

<script>
import { HelpCenterService } from 'api/index/help-service'
import { Popup } from 'mint-ui'

export default {
  components: {
    Popup
  },

  data () {
    return {
      id: '',
      detail: {
        title: '',
        lastModifyTime: '',
        content: {
          content: ''
        }
      },
      popVisible: false,
      imgUrl: ''
    }
  },

  watch: {
    popVisible () {
      document.body.style.overflow = this.popVisible ? 'hidden' : 'auto'
    }
  },

  methods: {
    goBack () {
      this.$router.go(-1)
    }
  },

  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      vm.id = to.query.id

      vm.helpCenterService = new HelpCenterService()
      // console.log(vm.id)
      vm.helpCenterService.byId(vm.id)
        .then(res => {
          if (res) {
            vm.detail = res
            // console.log(vm.detail)

            vm.$nextTick(() => {
              let imgs = vm.$refs.content.getElementsByTagName('img')
              Array.prototype.slice.call(imgs).forEach(e => {
                e.onclick = function () {
                  vm.imgUrl = e.currentSrc
                  vm.popVisible = true
                }
              })
            })
          }
        })
    })
  },

  beforeDestroy () {
    document.body.style.overflow = 'auto'
  }
}
</script>

<style lang="scss" scoped>
@import '~scss/shotcut';

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
    text-align: center;
  }
}

.des {
  text-align: left;
  background: white;
  border-bottom: 1px solid $border-gray;
  height: 1.4rem;
  padding: 0 .3rem;

  .name {
    font-size: .3rem;
    line-height: .85rem;
  }

  .time {
    font-size: 0.24rem;
    color: $text-french;
  }
}

.content{
  background: white;
  padding: .2rem .3rem;

  img {
    max-width: 100%;
  }
}

.mint-popup {
  padding: .2rem;
  background: black;
  width: 100%;
  overflow: auto;
}

</style>
