<template>
  <div>
    <img src="~images/purchase1.png" class="logo">
    <div class="list">
      <div class="item" @click="onItemClick(0)">
        <span>采购商可以享受到的服务</span>
        <img src="~images/information-more.png">
      </div>
      <div class="item"  @click="onItemClick(1)">
        <span>供应商可以享受到的服务</span>
        <img src="~images/information-more.png">
      </div>
      <div class="item"  @click="onItemClick(2)">
        <span>平台服务</span>
        <img src="~images/information-more.png">
      </div>
    </div>
    <img src="~images/purchase2.png" class="point">
    <img src="~images/purchase3.png" class="liucheng">
    <sy-footer></sy-footer>
  </div>
</template>

<script>
import Footer from 'comp/index/footer'

export default {
  components: {
    [Footer.name]: Footer
  },

  methods: {
    onItemClick (index) {
      this.$router.push({
        path: 'purchase/detail',
        query: {
          index
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~scss/shotcut';

.logo {
  width: 100%;
  height: 3.9rem;
}

.list > .item {
  height: .9rem;
  background: white;
  padding: 0 .3rem;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: .2rem;

  & > span {
    font-size: 0.3rem;
  }

  & > img {
    width: 0.15rem;
    height: 0.3rem;
  }
}

.point {
  width: 100%;
  height: 2.8rem;
}

.liucheng {
  width: 100%;
  height: 4.35rem;
  margin-bottom: 0.2rem;
}

img {
  vertical-align: bottom;
}
</style>
