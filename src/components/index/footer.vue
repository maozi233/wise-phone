<template>
   <footer id="footer">
      <div class="top-list">
        <div class="icon-box">
          <img src="../../assets/images/icon_solution.png" >
          <span class="content">解决方案</span>
        </div>
        <div class="icon-box">
          <img src="../../assets/images/icon_pay.png" >
          <span class="content">支付保障</span>
        </div>
        <div class="icon-box">
          <img src="../../assets/images/icon_expertconsultant.png" >
          <span class="content">专家顾问</span>
        </div>
        <div class="icon-box">
          <img src="../../assets/images/icon_service.png" >
          <span class="content">第三方服务</span>
        </div>
      </div>

      <div class="links">
        <p class="tab">
          <span :class="linksIndex === 0 ? 'active' : ''" @click="linksIndex = 0">友情链接</span>
          <span :class="linksIndex === 1 ? 'active' : ''" @click="linksIndex = 1">战略合作伙伴</span>
        </p>
        <p class="link-items">
          <a v-for="(item, index) in linkData" :key="index" :href="item.link">{{item.name}}</a>
        </p>
        <p class="user-login">
          <router-link :to="{path:'/login', query: {target: 'login'}}" query>登录</router-link>
          <router-link to="/login">注册</router-link>
        </p>
        <p class="btns">
          <router-link to="/login" >常见问题</router-link>
          <router-link to="/login" >关于我们</router-link>
          <router-link to="/login" >服务条款</router-link>
          <router-link to="/login" >法律声明</router-link>
          <router-link to="/login" >隐私策略</router-link>
        </p>
        <p class="footer-text">Copyright  © 2006-2017 尚逸网络科技有限公司  保留所有权利</p>
        <p class="footer-text">沪ICP备11052906号</p>
      </div>
    </footer>
</template>

<script>
import {SysPropsService} from 'api/index/sysprops-service'
import {mapMutations} from 'vuex'

export default {
  name: 'sy-footer',
  data () {
    return {
      linksIndex: 0

    }
  },

  methods: {
    ...mapMutations({
      setLinks: 'setLinks',
      setCoopers: 'setCoopers'
    })
  },
  computed: {
    linkData () {
      return this.linksIndex === 0 ? this.links : this.cooper
    },

    links () {
      return this.$store.state.linksCache
    },

    cooper () {
      return this.$store.state.cooperCache
    }
  },

  created () {
    this.sysPropsService = new SysPropsService()
  },

  mounted () {
    // footer 友情链接的数据
    if (!this.links.length || !this.cooper.length) {
      this.sysPropsService.get({propName: 'links,cooper'}).then(res => {
        if (res) {
          res.forEach(e => {
            if (e.propName === 'links') {
              this.setLinks(JSON.parse(e.propValue).content)
            }
            if (e.propName === 'cooper') {
              this.setCoopers(JSON.parse(e.propValue).content)
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../scss/shotcut.scss';

#footer {
  padding: 0 .3rem .2rem;
  background: white;

  .top-list{
    height: .9rem;
    border-bottom: 1px solid #c9c9c9;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: .2rem;

    .icon-box{
      height: .4rem;
      text-align: left;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      & > img {
        height: 100%;
        width: .4rem;
        margin-right: .1rem;
        vertical-align: bottom;
      }

      .content {
        font-size: .18rem;
        color: $text-black;
      }
    }
  }

  .links{
    font-size: .18rem;
    .tab {
      line-height:.4rem;
      text-align: left;
      & > span{
        margin-right: .3rem;
        color: $text-black;
        &.active{
          color : $text-green;
        }
      }
    }

    .link-items {
      line-height: .5rem;
      text-align: left;
      &>a{
        margin-right:.2rem;
        color: $text-gray;
      }
    }

    .user-login,.btns{
      text-align: left;
      padding-top: .1rem;
      font-size: .18rem;
      color: $text-black;
      &>a{
        padding-right: .1rem;
        position: relative;
        box-sizing: border-box;
        margin-left: .05rem;
        color: $text-black;
        &:nth-child(1){
          margin-left: 0
        }

        &:nth-last-child(1):after{
          height: 0;
        }
        &:after{
          content:'';
          height: 95%;
          width: 1px;
          background: $text-black;
          position: absolute;
          right:0;
          top:0
        }
      }
    }

    .btns{
      padding-top: .1rem;
      padding-bottom: .2rem;
      &>a{
        color : $text-gray;
      }
    }

    .footer-text{
      text-align: center;
      color: $text-french;
      font-size: .16rem;
      line-height: .3rem;
    }
  }
}
</style>
