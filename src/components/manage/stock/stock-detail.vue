<template>
  <div>detail</div>
</template>

<script>
export default {

  data () {
    return {
      id: ''
    }
  },
  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      vm.id = to.query.id
      console.log(vm.id)
    })
  }
}
</script>
