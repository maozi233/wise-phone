<template>
  <div>
    <p>{{username}}</p>
    <p>{{password}}</p>
    <button @click="logout">logout</button>
  </div>
</template>

<script>
const ENV = process.env

export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    logout () {
      localStorage.removeItem(ENV.USER_KEY)
    }
  },
  mounted () {
    let userInfo = JSON.parse(localStorage.getItem(ENV.USER_KEY))

    this.username = userInfo.username
    this.password = userInfo.password
  }
}
</script>
<style lang="scss" scoped>

</style>
