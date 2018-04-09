<template>
  <div style="margin-top: -1px;">
    <input class="form-control"  :placeholder="placeholder">
    <button type="button" class="btn btn-success">
      {{btnWord}}<span v-if="btnWord != ''"><i class="fa fa-search fa-lg" aria-hidden="true"></i></span>
    </button>
  </div>
</template>

<script>
  export default {
    name: 'sy-search',
    props: ['btnWord','placeholder'],
    components: {},
    data () {
      return {
      }
    },
    methods: {},
    mounted() {

    },
    created() {

    }
  }
</script>

<style lang="less"  scoped>
  @import "~assets/less/base";
  input{
    display: inline-block;
    width:90%;
    border-top-right-radius:0px;
    border-top-left-radius:0px;
    border-bottom-right-radius:0px;
    outline: none;
    border:none;
    height:60px;
    background: rgba(255,255,255,.2);
  }
  button{
    margin-left:-4px;
    border-top-left-radius:0px;
    border-bottom-left-radius:0px;
    height:60px;
    padding-left: 35px;
    padding-right: 35px;
    background: @light-color;
  }
</style>
