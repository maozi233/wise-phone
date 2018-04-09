<template>
  <div class="bg">
    <sy-header ref="header"></sy-header>
    <router-view></router-view>
    <sy-footer></sy-footer>
  </div>
</template>

<script>
import Header from 'comp/index/header'
import Footer from 'comp/index/footer'

export default {
  components: {
    [Header.name]: Header,
    [Footer.name]: Footer
  }
}
</script>

<style lang="scss" scoped>
.bg {
  background: #f2f2f2;
}
</style>
