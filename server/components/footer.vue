<template>
  <div class="footer">
    <div class="footer-body">
      <div class="footer-point">
        <div class="footer-point-list">
          <div class="pic">
            <img src="~/assets/images/icon_mall.png" alt="">
          </div>
          <div class="word">
            <p class="title">自营商城</p>
            <p class="desi">种类齐全 交易方便</p>
          </div>
        </div>
        <div  class="footer-point-list">
          <div class="pic">
            <img src="~/assets/images/icon_pay.png" alt="">
          </div>
          <div class="word">
            <p class="title">支付保障</p>
            <p class="desi">专业安全 快速便利</p>
          </div>
        </div>
        <div class="footer-point-list">
          <div class="pic">
            <img src="~/assets/images/icon_quote.png" alt="">
          </div>
          <div class="word">
            <p class="title">询盘报价</p>
            <p class="desi">高效真实 免费准确</p>
          </div>
        </div>
        <div class="footer-point-list">
          <div class="pic">
            <img src="~/assets/images/icon_supplychain.png" alt="">
          </div>
          <div class="word">
            <p class="title">供应链服务</p>
            <p class="desi">灵活便捷 高额低息</p>
          </div>
        </div>
      </div>
      <div class="footer-link">
        <div class="title">
          <span class="friend-link">友情连接</span>
          <span>战略合作伙伴</span>
        </div>
        <div class="link-list">
          <a :href="item.link" v-for="item in linkData">{{item.name}}</a>
        </div>
      </div>
      <div class="footer-item">
        <div class="first-item">
          <a href="#">注册</a>
          <span>|</span>
          <a href="#">登录</a>
        </div>
        <div class="first-item">
          <div class="list-left">
            <a href="#">常见问题</a>
            <span>|</span>
            <a href="#">关于我们</a>
            <span>|</span>
            <a href="#">服务条款</a>
            <span>|</span>
            <a href="#">法律声明</a>
            <span>|</span>
            <a href="#">隐私策略</a>
          </div>
          <div class="list-right">
            <a href="#">在线客服</a>
            <span>|</span>
            <a href="#">联系我们：400-118-5278</a>
          </div>
        </div>
      </div>
      <p>Copyright @2018 上海尚逸网络科技有限公司 保留所有权利</p>
      <p>沪ICP备11052906号</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'sy-footer',
    components: {},
    data () {
      return {
        linkData: [{
          name: '马后炮化工',
          link: '#'
        },{
          name: '化工技术论坛',
          link: '#'
        },{
          name: '化工网',
          link: '#'
        },{
          name: '耐耐网',
          link: '#'
        },{
          name: '药渡导购',
          link: '#'
        },{
          name: '话梅糖工程',
          link: '#'
        },{
          name: '众包易塑网',
          link: '#'
        },{
          name: '我的塑料网',
          link: '#'
        },{
          name: '摩帆网',
          link: '#'
        },{
          name: '精细化工厂',
          link: '#'
        },{
          name: '买化塑高客制药网',
          link: '#'
        },{
          name: '危司机',
          link: '#'
        }]
      }
    },
    methods: {},
    mounted() {

    },
    created() {

    }
  }
</script>

<style lang="less" scoped>
  .footer{
    width: 100%;
    height: 375px;
    background: #2e3033;
    .footer-body{
      width:1200px;
      margin: 0 auto;
      height: 375px;
      .footer-point{
        width:1200px;
        padding-top: 50px;
        .footer-point-list{
          width:300px;
          display: inline-block;
          margin-left: -3px;
          .pic{
            display: inline-block;
            vertical-align: middle;
          }
          .word{
            display: inline-block;
            color: #ffffff;
            vertical-align: middle;
            margin-left: 10px;
            .title{
              font-size: 18px;
              margin-bottom: 5px;
            }
            .desi{
              font-size: 12px;
              color: #999;
              margin-bottom: 0;
            }
          }
        }
      }
      .footer-link{
        width:1200px;
        padding-top: 50px;
        .title{
          width:1200px;
          span{
            display: inline-block;
            font-size: 12px;
            margin-right: 30px;
            color: #ffffff;
          }
          .friend-link{
            color: #289b3c;
          }
        }
        .link-list{
          width:1200px;
          padding: 20px 0;
          border-bottom: 2px solid #999;
          a{
            cursor: pointer;
            color: #999;
            padding-right: 38px;
            font-size: 14px;
            text-decoration: none;
          }
          a:hover{
            color: #289b3c;
          }
        }
      }
      .footer-item{
        width:1200px;
        margin-top:20px;
        margin-bottom: 50px;
        .first-item{
          width:1200px;
          .list-left{
            float: left;
            margin-top: 10px;
           }
          .list-right{
            float: right;
            margin-top: 10px;
          }
          a{
            display: inline-block;
            cursor: pointer;
            text-decoration: none;
            color: #999;
            padding-right: 5px;
          }
          a:hover{
            color: #289b3c;
          }
          span{
            display: inline-block;
            color: #999;
            padding-right: 5px;
            font-size: 16px;
          }
        }
      }
      p{
        color: #999;
        text-align: center;
        font-size: 12px;
        margin-bottom: 5px;
      }
    }
  }
</style>
