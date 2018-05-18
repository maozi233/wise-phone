<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
    <spinner></spinner>
    <div class="overlay"  @touchmove.prevent></div>
    <div class="flex-btns">
      <a href="http://chat8.live800.com/live800/chatClient/chatbox.jsp?companyID=927517&configID=152270&jid=2734404684">
        <img class="kefu" src="~images/home-kefu.png">
      </a>
      <img  class="top"
            src="~images/home-top.png"
            @click="top"
            v-show="showTop">
    </div>
  </div>
</template>

<script>
import Spinner from '@/components/spinner'
import {Tools} from 'utils/tools'

export default {
  name: 'App',
  created () {
    // 设置rem  750px像素. 1rem = 100px
    let html = document.documentElement
    let hWidth = html.getBoundingClientRect().width
    html.style.fontSize = `${hWidth / 7.5}px`
  },
  components: {
    Spinner
  },
  data () {
    return {
      scroll: 0
    }
  },
  computed: {
    showTop () {
      return this.scroll > 400
    }
  },
  methods: {
    top () {
      Tools.toTop(500)
    },
    onScroll () {
      this.scroll = document.documentElement.scrollTop || document.body.scrollTop
      console.log(this.scroll)
    },
    debounce (func, wait, immediate) {
      let timeout = ''
      return () => {
        let context = this
        let args = arguments
        var later = () => {
          timeout = null
          if (!immediate) func.apply(context, args)
        }
        var callNow = immediate && !timeout
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
        if (callNow) func.apply(context, args)
      }
    }
  },
  mounted () {
    window.addEventListener('scroll', this.debounce(this.onScroll, 100))
  }
}
</script>

<style>
 #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  body{
    margin:0;
  }
</style>

<style scoped lang="scss">

  .fade-enter-active,.fade-leave-active {
    transition: all .3s linear;
  }
  .fade-enter,.fade-leave-active {
    opacity: 0;
    transform:translateX(100vw);
  }

  .overlay{
    z-index:1000;
    position:fixed;
    left:0;
    top:0;
    right: 0;
    bottom: 0;
    background-color: rgba(50, 50, 50, .3);
    display: none;
  }

  .flex-btns {
    width: 0.8rem;
    height: 2rem;
    position: fixed;
    right: .2rem;
    bottom: 10%;
    display: flex;
    flex-direction: column;
    z-index: 1000;

    .kefu , .top {
      width:.8rem;
      height: 0.8rem;
      margin-bottom: 0.2rem;
      vertical-align: bottom;
    }
  }
</style>
