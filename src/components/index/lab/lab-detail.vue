<template>
  <list-detail :index="index" v-if="index != -1"></list-detail>
</template>

<script>
import ListDetail from 'comp/index/list-detail'
export default {
  data () {
    return {
      index: -1
    }
  },

  components: {
    ListDetail
  },

  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      vm.index = to.query.index
    })
  }
}
</script>
