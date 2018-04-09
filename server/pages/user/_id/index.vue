<template>
  <p>
    user Id:{{userId}}
  </p>
</template>
<script>
  export default {

    data() {
      return {
        userId:""
      }
    },
    asyncData ({ params }, callback) {
      console.log(params);
      callback(null, {userId:params.id});
    },
    mounted(){
    }
  }
</script>
