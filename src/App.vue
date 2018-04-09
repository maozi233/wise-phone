<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
    <spinner></spinner>
    <div class="overlay"  @touchmove.prevent></div>
  </div>
</template>

<script>
import Spinner from '@/components/spinner'

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
  }
}
</script>

<style >

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
</style>
