<template>
  <div class="loading-page bg-opacity" :style="{display:hide?'none':'block'}">
    <div class="dark" @dblclick="close">
      <img src="~/assets/images/ajax-loader.gif">
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        hide: true
      }
    },
    methods: {
      close() {
        document.querySelector(".loading-page").style.display = "none";
        // this.hide = true;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .show {
    display: block;
  }

  .hide {
    display: none;
  }

  .loading-page {
    background: rgba(0, 0, 0, .65);
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    min-height: 100%;
    min-width: 100%;
    transition: all 1s;
    z-index: 20000;
    &.hide {
      display: none;
    }
    &.bg-opacity {
      background: rgba(0, 0, 0, 0);
    }
    .dark {
      width: 100px;
      height: 100px;
      border-radius: 10px;
      background: rgba(0, 0, 0, .65);
      position: absolute;
      top: 40%;
      left: 50%;
      margin-left: -50px;
      text-align: center;
      img{
        width: 70px;
        height: 70px;
        margin-top: 15px;
      }
    }
  }
</style>
