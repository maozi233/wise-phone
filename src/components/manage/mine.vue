<template>
  <div class="bg">
    <sy-header ref="header" :showSearch="false"></sy-header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from 'comp/index/header'

export default {
  components: {
    [Header.name]: Header
  }
}
</script>

<style lang="scss" scoped>
.bg {
  background: #f2f2f2;
}
</style>
