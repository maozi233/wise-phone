<template>
  <header class="header">
    <nav class="navbar container top-header">
      <ul class="nav navbar-nav">
        <li class="active"><a href="#">Hi,欢迎来到尙逸网</a></li>
        <li><a href="#">联系电话:12345678</a></li>
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <li class="more">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">入驻认证 <span class="caret"></span></a>
          <ul class="dropdown rz">
            <li><a href="#">Action</a></li>
            <li><a href="#">Another action</a></li>
            <li><a href="#">Something else here</a></li>
            <li role="separator" class="divider"></li>
            <li><a href="#">Separated link</a></li>
          </ul>
        </li>
        <li><a href="#">帮助中心</a></li>
        <li><a href="#">消息</a></li>
        <li><a href="#">登录</a></li>
        <li><a href="#">注册</a></li>
      </ul>
    </nav>
    <nav class="navbar container header-tab">
      <div class="navbar-header">
        <a class="logo" href="#"><img src="~/assets/images/sy_logo.png" alt="" ></a>
      </div>
      <ul class="tab-list">
        <li :class="{active:index==tabIndex}" v-for="(item,index) in tabName"><a href="#">{{item.name}}</a></li>
        <li class="more">
          <a><i class="fa fa-ellipsis-h fa-lg" aria-hidden="true"></i></a>
          <ul class="dropdown" >
            <li><a href="#">行业咨询</a></li>
            <li><a href="#">公开课</a></li>
          </ul>
        </li>
      </ul>
      <!-- Collect the nav links, forms, and other content for toggling -->
    </nav>
  </header>
</template>

<script>
import Vue from 'vue';
export default {
  name: 'sy-header',
  data () {
    return {
      tabIndex: 0,
      name: '',
      tabName: [{
        name: '首页'
      }, {
        name: '明星配方'
      }, {
        name: '技术服务'
      }, {
        name: '生产商之窗'
      }, {
        name: '库存调剂'
      }, {
        name: '集中采购'
      }, {
        name: '共享实验室'
      }],
      data: {
        1: 'test',
        2: 'test2'
      }
    }
  },
  components: {
  },
  computed: {},
  methods: {
    getMap (key) {
      console.log('test')
        return this.data[key]
      }
  },
  created () {

  },

  mounted () {
    // $.material.init();
  }
}
</script>
<style scoped lang="less">
  @import "~assets/less/base";
  .header{
    background-color: @base-color;
    a{
      color: white;
      font-size: @sub-size;
    }
    .more{
      position: relative;
      .rz{
        top:35px !important;
        a{
          text-decoration: none;
        }
        a:hover{
          color: @light-color;
        }
      }
      .dropdown{
        width: 120px;
        background: #252a34;
        position: absolute;
        z-index: 999;
        padding: 0;
        top:59px;
        left:0;
        display: none;
        li{
          width: 120px;
          padding: 5px 0px 5px 20px;
          line-height: 20px;
        }
      }
    }
    .more:hover{
      .dropdown{
        display: block;
      }
    }
    .top-header{
      min-height: 40px!important;
      height: 40px;
      margin-bottom: 0!important;
      .navbar-nav{
        a{
          padding-top: 10px;
          padding-bottom: 10px;
        }
      }
    }
    .nav>li>a:hover {
      text-decoration: none;
      background-color: @base-color;
      color: @light-color;
    }
    .header-tab{
      margin-bottom: 0!important;
      min-height: 60px!important;
      height: 60px;
      .logo{
        width:130px;
        height:40px;
        margin-top: 10px;
        display: inline-block;
        img{
          width:130px;
          height:40px;
        }
      }
      .tab-list{
        width:1000px;
        height:60px;
        display: inline-block;
        li{
          display: inline-block;
          line-height: 58px;
          padding: 0 30px;
          font-size: 14px;
          cursor: pointer;
          a{
            text-decoration: none;
            color: #ffffff;
          }
          a:hover{
            color: @light-color;
          }

        }
        .active{
          background: #262a35;
          a {
            color: @light-color !important;
          }
        }
      }
    }
  }
</style>
