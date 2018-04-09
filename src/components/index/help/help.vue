<template>
  <div class="bg">
    <sy-header ref="header" :showSearch='false'></sy-header>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
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
@import '~scss/shotcut';

.bg {
  background: #f2f2f2;
}
</style>
