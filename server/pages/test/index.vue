<template>
  <p>
    posts sub router index
  </p>
</template>
<script>
  export default {
    name:"test",
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
