<template>
  <mt-popup v-model="popupVisible"
            position="top"
            class="pop-flex-bottom">
    <slot></slot>
    <img src="~images/pop-close.png" @click="closePop">
  </mt-popup>
</template>

<script>
import { Popup } from 'mint-ui'

export default {
  props: {
    closeHandle: {
      type: Function,
      default: () => {}
    }
  },

  components: {
    Popup
  },

  data () {
    return {
      popupVisible: false
    }
  },

  methods: {
    show () {
      this.popupVisible = true
    },

    hide () {
      this.popupVisible = false
    },

    closePop () {
      this.popupVisible = false
      this.closeHandle()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~scss/shotcut';

.pop-flex-bottom {
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 6.6rem;
  text-align: left;
  background: white;
  border-radius: 4px;
  padding: .4rem .5rem .3rem;
  box-sizing: border-box;
  font-size: .18rem;

  img {
    width: .5rem;
    height: .8rem;
    position: absolute;
    bottom: -.7rem;
    left: 50%;
    transform: translateX(-50%);
  }

}

</style>
