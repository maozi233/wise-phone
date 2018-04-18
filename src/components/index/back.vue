<template>
  <div class="back">
    <img src="~images/back.png" @click="goBack">
    <span class="title">{{title}}</span>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'title'
    }
  },

  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~scss/shotcut';
.back {
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

  & > .title {
    flex-grow: 1;
    margin-left: -.3rem;
    font-size: .36rem;
  }
}
</style>
