<template>
  <div>
    <sy-header></sy-header>
    <section clasee="banner">
      <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
        <div class="banner-search">
          <ul>
            <li v-for="(item,index) in searchData" :class="(index == searchIndex)  ? 'active':''" :key="index" @click="changeSearch(index)">{{item}}</li>
          </ul>
          <sy-search :placeholder="searchName"></sy-search>
          <div class="search-hot">
            热门搜索：<a v-for="item in hotSearch" href="#">{{item}}</a>
          </div>
        </div>
        <div class="banner-login">
          <p>
            <img src="~/assets/images/icon_avatar.png" alt="">
          </p>
          <p>Hi,上午好</p>
          <p>欢迎来到尚逸网</p>
          <div class="banner-login-btn">
            <a href="#" class="btn-login">登录</a>
            <a href="#" class="btn-sign">注册</a>
          </div>
        </div>
        <ol class="carousel-indicators">
          <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
          <li data-target="#carousel-example-generic" data-slide-to="1"></li>
          <li data-target="#carousel-example-generic" data-slide-to="2"></li>
        </ol>

        <div class="banner-importitem">
          <div v-for="(item,index) in importItem" class="items" :class="(index == itemIndex)  ? 'items-active':''" :key="index" @click="changeItem(index)">
            <span><img src="" alt=""></span>
            <span>
              <p class="big-title">{{item.title}}</p>
              <p class="samll-word">{{item.word}}</p>
            </span>
          </div>
        </div>
        <div class="carousel-inner" role="listbox">
          <div class="item active">
            <img src="~/assets/images/solution-bg.png" alt="">
            <div class="carousel-word">
              <p class="big-title">的撒的撒大师大师大师大师的撒的撒大师大</p>
              <p class="big-title">1的撒的撒大师大师大师大师的撒的撒大师大师</p>
              <p class="small-title">的撒的撒大师大师大师大师</p>
            </div>
          </div>
          <div class="item">
            <img src="~/assets/images/solution-bg.png" alt="">
            <div class="carousel-caption">
            </div>
          </div>
          <div class="item">
            <img src="~/assets/images/solution-bg.png" alt="">
            <div class="carousel-caption">
            </div>
          </div>
        </div>

        <div class="banner-btn">
          <a class="left carousel-control"  href="#carousel-example-generic" role="button" data-slide="prev">
            <span class="fa fa-chevron-left banner-icon-left banner-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
            <span class="fa fa-chevron-right banner-icon-right banner-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
      </div>
    </section>
    <section class="bestnew">
      <div class="bestnew-header">
        <div class="list-bd">
          <div v-for="(item,index) in newBest" class="list-item" :class="(index == newBestIndex)  ? 'newbest-active':''" :key="index" @click="changeNewBest(index)">
            <div class="best-name">
              <div>
                {{item.name}}
                <div class="best-line"></div>
              </div>
            </div>
            <p class="english-name">{{item.englishName}}</p>
          </div>
        </div>
      </div>
      <div class="bestnew-body">
        <div class="bestnew-list">
          <div id="bestnew-l" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner" role="listbox">
              <div class="item row active">
                <div class="col-md-3 card" v-for="(item,index) in newBestContent">
                  <span><img src="" alt=""></span>
                  <p class="card-name">{{item.name}}</p>
                  <p class="card-content">{{item.content}}</p>
                </div>
              </div>
              <div class="item row">
                <div class="col-md-3 card" v-for="(item,index) in newBestContent">
                  <span><img src="" alt=""></span>
                  <p class="card-name">{{item.name}}</p>
                  <p class="card-content">{{item.content}}</p>
                </div>
              </div>
              <div class="item row">
                <div class="col-md-3 card" v-for="(item,index) in newBestContent">
                  <span><img src="" alt=""></span>
                  <p class="card-name">{{item.name}}</p>
                  <p class="card-content">{{item.content}}</p>
                </div>
              </div>
            </div>

            <a class="left carousel-control bestnew-leftbtn" href="#bestnew-l" role="button" data-slide="prev">
              <span class="bestnew-btn bestnew-btn-left" ><i class="fa fa-angle-left fa-2x" aria-hidden="true"></i></span>
              <span class="sr-only">Previous</span>
            </a>
            <a class="right carousel-control bestnew-rightbtn" href="#bestnew-l" role="button" data-slide="next">
              <span class="bestnew-btn bestnew-btn-right"><i class="fa fa-angle-right fa-2x" aria-hidden="true"></i></span>
              <span class="sr-only">Next</span>
            </a>
          </div>

        </div>
      </div>
    </section>
    <section class="solution">
      <div class="solution-bg" :style="{background: '#000 url('+ img[solutionIndex] +') top center no-repeat'}"></div>
      <div class="container">
        <ul class="sidebar">
          <li class="sidebar-item" :class="{hover:index==solutionIndex}" v-for="(item,index) in solutions" @mouseover="changeIndex(index)">
            <a >
              <h3>{{item.title}}</h3>
              <p>{{item.subTitle}}</p>
            </a>
          </li>
        </ul>
        <ul class="content">
          <li class="content-item" :class="{active:index==solutionIndex}" v-for="(item,index) in solutions">
            <div class="content-header">
              <span><img src="~/assets/images/icon_sy_service.png" alt=""></span>
              <span>尚逸服务</span>
            </div>
            <div class="content-body">
              <p class="title">{{item.title}}</p>
              <div class="forms" v-if="item.title == '找原料' || item.title == '找配方' || item.title == '找服务'">
                <p v-if="item.title == '找原料'"><input  placeholder="请输入产品名称" v-model="product"></p>
                <p><textarea rows="3" v-model="desc" placeholder="请输入需求描述" maxlength="200"></textarea></p>
                <p><input  placeholder="请输入联系人" v-model="person"></p>
                <p><input  placeholder="请输入联系电话" v-model="telephone"></p>
                <p><button type="button" class="btn btn-success">一键提交</button></p>
              </div>
              <div class="forms"  v-if="item.title == '实验室' || item.title == '答疑解惑'">
                <p>伟大时刻大家奥克兰市的卡里的机会卡拉大哭大叫案例空间的卡拉很多科拉和贷款大哭大叫案件打开了加大了空间大了考试</p>
                <a  href="#" class="solution-link" target="_blank" >查看详情</a>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
    <section class="product">
      <div class="container" style="padding: 0;overflow: hidden">
        <div class="product-title">
          <h2>明星配方</h2>
          <h3>STAR FORMULA</h3>
        </div>
        <div class="group-show">
          <div class="group-detail">
            <ul>
              <li class="product-block" :class="{active:index==starIndex}" v-for="(item,index) in starWay" >
                <div class="product-brief brief-promote group" @mouseover="changeStarIndex(index)">
                  <span><img src="" alt=""></span>
                  <div class="product-content">
                    <p class="product-name">{{item.name}}</p>
                    <p class="product-word">{{item.content}}</p>
                  </div>
                </div>
                <div class="product-details details-promote group">
                  <h2>最热配方<span class="font-avenir">HOT PRODUCT</span></h2>
                  <div class="product-details-img"><img src="" alt=""></div>
                  <div class="product-content">
                    <p class="product-name">{{item.name}}</p>
                    <p class="product-word">{{item.content}}</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <section class="advisor">
      <div class="advisor-title">
        <h2>最新专家顾问</h2>
        <h3>THE LATEST EXPERT ADVISOR</h3>
      </div>
      <div class="advisor-body">
        <div class="advisor-list">
          <div id="advisor-l" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner" role="listbox">
              <div class="item row active">
                <div class="card" v-for="item in advisor">
                  <img src="" alt="">
                  <div class="mask">
                    <div class="bg " ></div>
                    <div class="content">
                      <div class="item-img-panel" style="height: 80px;">
                        <img src="https://img.alicdn.com/tps/TB1aivqLXXXXXbwXVXXXXXXXXXX-144-144.png" alt="" class="item-img">
                      </div>
                      <h3 class="item-title">姓名</h3>
                      <p class="line-panel">
                        <i class="item-line"></i>
                      </p>
                      <p class="item-desc">
                        结合大数据能力帮助电商企业快速搭建平台、应对业务高并发，剖析秒杀、视频直播等场景
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="item row ">
                <div class="card" v-for="item in advisor">
                  <img src="" alt="">
                  <div class="mask">
                    <div class="bg " ></div>
                    <div class="content">
                      <div class="item-img-panel" style="height: 80px;">
                        <img src="https://img.alicdn.com/tps/TB1aivqLXXXXXbwXVXXXXXXXXXX-144-144.png" alt="" class="item-img">
                      </div>
                      <h3 class="item-title">姓名</h3>
                      <p class="line-panel">
                        <i class="item-line"></i>
                      </p>
                      <p class="item-desc">
                        结合大数据能力帮助电商企业快速搭建平台、应对业务高并发，剖析秒杀、视频直播等场景
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="item row ">
                <div class="card" v-for="item in advisor">
                  <img src="" alt="">
                  <div class="mask">
                    <div class="bg " ></div>
                    <div class="content">
                      <div class="item-img-panel" style="height: 80px;">
                        <img src="https://img.alicdn.com/tps/TB1aivqLXXXXXbwXVXXXXXXXXXX-144-144.png" alt="" class="item-img">
                      </div>
                      <h3 class="item-title">姓名</h3>
                      <p class="line-panel">
                        <i class="item-line"></i>
                      </p>
                      <p class="item-desc">
                        结合大数据能力帮助电商企业快速搭建平台、应对业务高并发，剖析秒杀、视频直播等场景
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <a class="left carousel-control advisor-btn " href="#advisor-l" role="button" data-slide="prev" >
              <span class="advisor-btn-left" ><i class="fa fa-angle-left fa-2x" aria-hidden="true"></i></span>
              <span class="sr-only">Previous</span>
            </a>
            <a class="right carousel-control advisor-btn " href="#advisor-l" role="button" data-slide="next" >
              <span class="advisor-btn-right"><i class="fa fa-angle-right fa-2x" aria-hidden="true"></i></span>
              <span class="sr-only">Next</span>
            </a>
          </div>

        </div>
      </div>
    </section>
    <section class="swap">
      <div class="swap-title">
        <h2>库存调剂</h2>
        <h3>STOCK SWAP</h3>
      </div>
      <div class="swap-body">
        <div class="swap-mes">
          <div class="swap-mes-title">成交信息</div>
          <div class="swap-mes-content">
            <div class="scroll-body-begin" >
              <span>化工原料于2010/10/12 12:09:09成交了2333乙醇</span>
              <span>化工原料于2010/10/12 12:09:09成交了2333乙醇</span>
              <span>化工原料于2010/10/12 12:09:09成交了2333乙醇</span>
              <span>化工原料于2010/10/12 12:09:09成交了2333乙醇</span>
              <span>化工原料于2010/10/12 12:09:09成交了2333乙醇</span>
            </div>
            <div class="scroll-body-end" >
              <span>化工原料于2010/10/12 12:09:09成交了2333乙醇</span>
              <span>化工原料于2010/10/12 12:09:09成交了2333乙醇</span>
              <span>化工原料于2010/10/12 12:09:09成交了2333乙醇</span>
              <span>化工原料于2010/10/12 12:09:09成交了2333乙醇</span>
              <span>化工原料于2010/10/12 12:09:09成交了2333乙醇</span>
            </div>
          </div>
        </div>
        <div class="swap-list">
          <div class="swap-card" v-for="item in swap">
            <span class="swap-card-img"><img src="" alt=""></span>
            <h2 class="swap-card-title">{{item.name}}</h2>
            <p class="swap-card-price">{{item.price}}</p>
            <p class="swap-card-bot">发货地：{{item.address}}</p>
            <p class="swap-card-bot">库存：{{item.stock}}</p>
          </div>
        </div>
      </div>
    </section>
    <section class="pur">
      <div class="pur-title">
        <h2>集中采购</h2>
        <h3>CENTRALIZED PURCHASING</h3>
      </div>
      <div class="pur-body">
        <div class="pur-introds">
          <img src="~/assets/images/solution-bg.png" alt="">
          <div class="pur-word">
            <h3 class="pur-title">集中采购文字介绍</h3>
            <p class="pur-content">大叔大婶大师大师等等等等等等等等等等打死打伤打死的哒哒哒声奥德赛大叔大婶大大说的大叔大
              婶大师大师等等等等等等等等等等打死打伤打死的哒哒哒声奥德赛大叔大婶大大说的</p>
          </div>
        </div>
        <div class="pur-pic">
          <div class="pur-list" v-for="item in 5">
            <img src="" alt="">
          </div>
        </div>
      </div>
    </section>
    <section class="industry">
      <div class="industry-title">
        <h2>推广服务</h2>
        <h3>INDUSTRY INFORMATION</h3>
      </div>
      <div class="industry-body">
        <div class="industry-list" v-for="item in industry">
          <span><img src="" alt=""></span>
          <p>{{item.name}}</p>
        </div>
      </div>
    </section>
    <div class="hp">
      <div class="top">
        <a href="#">
          <span class="first-img">
            <img src="~/assets/images/online_service.png" alt="">
          </span>
          <span class="first-word">
            在线客服
          </span>
        </a>
        <a href="#" class="second-img">
          <img  src="~/assets/images/icon_FAQ.png" alt="">
        </a>
      </div>
      <div class="back" @click="toTop">
        <img src="~/assets/images/icon_backtotop.png" alt="">
      </div>
    </div>
    <sy-footer></sy-footer>
  </div>
</template>

<script>
  // import "bootstrap/js/carousel"
  import Header from "~/components/header.vue";
  import Footer from "~/components/footer.vue";
  import Search from "~/components/search.vue";
  if (process.browser) {
    require('blueimp-file-upload')
  }
  export default {
    name: 'home',

    components: {
      [Header.name]: Header,
      [Search.name]: Search,
      [Footer.name]: Footer,
    },
    data() {
      return {
        product: '',
        desc: '',
        person:'',
        telephone: '',
        img: ['https://cdn.bdstatic.com/portal/img/index/solution-website_a15a5327.png','https://gw.alicdn.com/tfs/TB11_qAmf6H8KJjy0FjXXaXepXa-1600-880.png','https://cdn.bdstatic.com/portal/img/index/solution-website_a15a5327.png','https://cdn.bdstatic.com/portal/img/index/solution-website_a15a5327.png','https://cdn.bdstatic.com/portal/img/index/solution-website_a15a5327.png'],
        scrollaWidth: 0,
        scrollbWidth: 0,
        industry: [{
          name: '大山大水大'
        },{
          name: '大山大水大'
        },{
          name: '大山大水大'
        },{
          name: '大山大水大'
        },{
          name: '大山大水大'
        },{
          name: '大山大水大'
        }],
        swap: [{
          name:'商品名字',
          price: 123,
          address: '铺东西镇',
          stock: 10
        },{
          name:'商品名字',
          price: 123,
          address: '铺东西镇',
          stock: 10
        },{
          name:'商品名字',
          price: 123,
          address: '铺东西镇',
          stock: 10
        },{
          name:'商品名字',
          price: 123,
          address: '铺东西镇',
          stock: 10
        }],
        advisor: [{
          name:'大大缩短',
          content: '打死打伤打死的哈时间的哈健康和大家看大喊大叫卡还是贷记卡很多看哈就肯定会'
        },{
          name:'大大缩短',
          content: '打死打伤打死的哈时间的哈健康和大家看大喊大叫卡还是贷记卡很多看哈就肯定会'
        },{
          name:'大大缩短',
          content: '打死打伤打死的哈时间的哈健康和大家看大喊大叫卡还是贷记卡很多看哈就肯定会'
        },{
          name:'大大缩短',
          content: '打死打伤打死的哈时间的哈健康和大家看大喊大叫卡还是贷记卡很多看哈就肯定会'
        },{
          name:'大大缩短',
          content: '打死打伤打死的哈时间的哈健康和大家看大喊大叫卡还是贷记卡很多看哈就肯定会'
        }],
        starIndex: 0,
        starWay: [{
          name: '你好',
          content: '点点滴滴大舍大得大叔大婶的大叔大婶的'
        },{
          name: '你好',
          content: '点点滴滴大舍大得大叔大婶的大叔大婶的'
        },{
          name: '你好',
          content: '点点滴滴大舍大得大叔大婶的大叔大婶的'
        }],
        newBest: [{
          name:'最新配方师',
          englishName: 'thw dsds sdsds sd'
        },{
          name:'最新供应商',
          englishName: 'thw dsds sdsds sd'
        },{
          name:'最新技术服务',
          englishName: 'thw dsds sdsds sd'
        }],
        importItem: [{
          title: '明星配方',
          word: '说明文字',
        },{
          title: '生产商之窗',
          word: '说明文字',
        },{
          title: '共享实验室',
          word: '说明文字',
        }],
        newBestContent:[{
          name: '大肚度',
          content: '打扫打扫打扫打扫大大说打死打伤打死打大大是打达到'
        },{
          name: '大肚度',
          content: '打扫打扫打扫打扫大大说打死打伤打死打大大是打达到'
        },{
          name: '大肚度',
          content: '打扫打扫打扫打扫大大说打死打伤打死打大大是打达到'
        },{
          name: '大肚度',
          content: '打扫打扫打扫打扫大大说打死打伤打死打大大是打达到'
        }],
        newBestIndex: 0,
        hotSearch: ['足球','篮球','乒乓'],
        searchIndex: 0,
        searchName: '请输入您想搜索的商品名称',
        searchData: ['商品','配方','供应商'],
        name: "",
        itemIndex: 0,
        solutionIndex: 0,
        solutions: [
          {
            title: "找配方",
            subTitle: "专业配方19年",
          }, {
            title: "找原料",
            subTitle: "专业配方19年",
          }, {
            title: "找服务",
            subTitle: "专业配方19年",
          }, {
            title: "实验室",
            subTitle: "专业配方19年",
          }, {
            title: "答疑解惑",
            subTitle: "专业配方19年",
          }
        ]
      }
    },
    computed: {},
    methods: {
      toTop() {
        $("html,body").animate({scrollTop:0}, 500);
      },
      scrollText () {
        let speed=30;
        let MyMar = null;
        let i=0;
        function Marquee(){
          if($('.scroll-body-end').outerWidth()-$('.swap-mes-content').scrollLeft()<=0){
            i-=$('.scroll-body-begin').outerWidth()
            $('.swap-mes-content').scrollLeft(i);
          }
          else {
            i++
            $('.swap-mes-content').scrollLeft(i);
          }
        }
        MyMar=setInterval(Marquee,speed);
        $('.swap-mes-content').mouseover(()=>{
          clearInterval(MyMar);
        })
        $('.swap-mes-content').mouseout(()=>{
          MyMar = setInterval(Marquee,speed);
        })
      },
      changeSearch (index) {
        this.searchIndex = index;
      },
      changeItem (index) {
        this.itemIndex = index;
      },
      changeNewBest (index) {
        this.newBestIndex = index;
      },
      getMap(key) {
        return this.data[key];
      },
      changeIndex(index){
        this.solutionIndex = index;
      },
      changeStarIndex(index){
        this.starIndex = index;
      }
    },
    created() {

    },

    mounted() {
      $('#carousel-example-generic').carousel({
        interval: 1000
      })
      $('#bestnew-l').carousel({
        interval: 1000
      })
      $('#advisor-l').carousel({
        interval: 1000
      })
      this.scrollaWidth = $('.scroll-content-a').width();
      this.$nextTick(() => {
        this.scrollText()
      });
      // $.material.init();
    }
  }
</script>
<style scoped lang="less">
  @import "~assets/less/base";
  //banner
  .banner{
    height:600px;
  }
  .banner-search{
    position: absolute;
    width:1200px;
    top:15px;
    left:50%;
    margin-left:-600px;
    z-index: 100;
    padding-left: 20px;
    padding-right: 80px;
    ul{
      li{
        padding: 11px 36px;
        display: inline-block;
        background: rgba(255,255,255,.2);
        margin-right:2px;
        border-top-right-radius:5px;
        border-top-left-radius:5px;
        color:#ffffff;
        font-size: 14px;
        cursor: pointer;
      }
      .active{
        background: @light-color;
      }
    }
    .search-hot{
      font-size: 12px;
      color: @light-color;
      margin-left: 20px;
      margin-top: 14px;
      a{
        display: inline-block;
        color: #ffffff;
        margin-left: 10px;
        text-decoration: none;
      }
      a:hover{
        color: @light-color;
      }
    }
  }
  .banner-login{
    position: absolute;
    width:230px;
    height:270px;
    left:50%;
    margin-left:300px;
    background: #343b4b;
    border-radius: 2px;
    text-align: center;
    z-index: 777;
    top:170px;
    p{
      color: #ffffff;
      margin:10px 0;
      img{
        width:75px;
        height:70px;
        margin-top: 30px;
      }
    }
    .banner-login-btn{
      margin-top: 40px;
      width:100%;
      a{
        display: inline-block;
        text-align: center;
        color: #ffffff;
        background: @light-color;
        border:1px solid @light-color;
        padding:8px 20px;
        border-radius: 4px;
        text-decoration: none;
      }
      .btn-login{
        margin-right: 11px;
      }
      .btn-sign{
        margin-left: 11px;
        border:1px solid #ffffff;
        background: rgba(0,0,0,0);
      }
    }
  }
  .banner-importitem{
    z-index: 777;
    position: absolute;
    width:1200px;
    bottom:0;
    left:50%;
    margin-left: -600px;
    .items{
      width:400px;
      padding:20px 20px;
      display: inline-block;
      background: rgba(0,0,0,.2);
      cursor: pointer;
      span{
        display: inline-block;
        vertical-align: middle;
        img{
          width:60px;
          height:60px;
          vertical-align: middle;
        }
        .big-title{
          font-size: 18px;
          margin-left: 20px;
          margin-top: 5px;
          color: #ffffff;
        }
        .samll-word{
          font-size: 14px;
          margin-left: 20px;
          margin-top: 5px;
          color: #ffffff;
        }
      }
    }
    .items-active{
      background: rgba(0,0,0,1);
    }
  }
  .banner-btn{
    width:1200px;
    height:600px;
    position: absolute;
    top:0;
    left:50%;
    margin-left:-600px;
  }
  .banner-icon{
    position: absolute;
    top: 50%;
    z-index: 5;
    display: inline-block;
    width: 30px;
    height: 30px;
    font-size: 30px;
    color: #ffffff;
  }
  .banner-icon-left{
    left:0
  }
  .banner-icon-right{
    right:0
  }
  .carousel-indicators {
    position: absolute;
    bottom: 130px;
    left: 50%;
    z-index: 15;
    width: 60%;
    padding-left: 0;
    margin-left: -30%;
    text-align: center;
    list-style: none;
  }
  .carousel-inner{
    .item{
      img{
        width:100%;
        height:600px;
      }
      .carousel-word{
        left:50%;
        position: absolute;
        width:700px;
        top: 150px;
        margin-left: -520px;
        z-index: 10;
        padding-top: 20px;
        padding-bottom: 20px;
        color: #fff;
        text-shadow: 0 1px 2px rgba(0,0,0,.6);
        .big-title{
          font-size: 36px;
          font-weight: bold;
          color: #ffffff;
          margin-bottom: 10px;
        }
        .small-title{
          font-size: 20px;
          font-weight: bold;
          color: #ffffff;
          margin-top: 10px;
        }
      }
    }
  }
  .carousel-indicators li {
    width: 30px;
    height: 4px;
    background-color: #fff;
    margin: 1px;
    opacity: 0.5;
    border-radius: 0;
  }
  .carousel-indicators .active{
    opacity: 1;
  }
  .carousel-control.right{
    background-image: linear-gradient(to right,rgba(0,0,0,0) 0,rgba(0,0,0,0) 100%);

  }
  .carousel-control.left{
    background-image: linear-gradient(to right,rgba(0,0,0,0) 0,rgba(0,0,0,0) 100%);
  }

  .bestnew-leftbtn{
    width: 50px;
    left:-70px;
  }
  .bestnew-rightbtn{
    width: 50px;
    right:-70px;
  }
  .bestnew-btn{
    position: absolute;
    left:0;
    right:0;
    top: 50%;
    z-index: 5;
    display: inline-block;
    width:50px;
    height:50px;
    border: 1px solid #d4d4d4;
    line-height:50px;
    background: #ffffff;
    margin-top: -25px;
    text-align: center;
    padding-top: 4px;
    i {
      color: #666;
    }
  }
  //service
  .solution {
    position: relative;
    height: 596px;
    .solution-bg {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
    }
    .container {
      width: 1180px;
      position: relative;
      margin: 0 auto;
      z-index: 5
    }
    .sidebar {
      float: left;
      width: 230px;
      height: 596px;
      overflow: hidden;
      background: rgba(0, 0, 0, 0.7);
      .sidebar-item {
        font-weight: normal;
      }
      a {
        color: #fff;
        text-decoration: none;
        display: block;
        border-top: 1px solid #333;
        padding: 30px 0 34px 0
      }
      h3 {
        font-size: 16px;
        line-height: 30px;
        font-weight: normal
      }
      p {
        font-size: 14px;
        line-height: 26px;
        color: #fff;
        opacity: .4;
        filter: alpha(opacity=40)
      }
      li {
        height: 119px;
        padding: 0 15px;
        color: #454545;
        cursor: pointer;
        &:first-child a {
          border-top: none
        }
        a {
          padding-left: 15px;
          transition: padding-left 0.1s ease-out;
          border-top: 1px solid #454545
        }
        &.active, &.hover {
          background-image: -webkit-linear-gradient(-270deg, @light-color2 0, @light-color 97%);
          background-image: -moz-linear-gradient(-270deg, @light-color2 0, @light-color 97%);
          background-image: -o-linear-gradient(-270deg, @light-color2 0, @light-color 97%);
          background-image: linear-gradient(270deg, @light-color2 0, @light-color 97%);
          filter: progid:DXImageTransform.Microsoft.gradient(GradientType=.75, startColorstr=@light-color2, endColorstr=@light-color);
          -ms-filter: "progid:DXImageTransform.Microsoft.gradient (GradientType=0.75, startColorstr=@light-color2, endColorstr=#00A1FF)";
          p {
            opacity: .75;
            filter: alpha(opacity=75)
          }
          a {
            padding-left: 25px;
            border-color: transparent;
            transition: all 0.3s
          }
        }
      }
    }

    .content {
      margin: 20px 0 0px 280px;
      height: 500px;
      position: relative;
      .solution-link {
        font-size: 14px;
        width: 157px;
        height: 36px;
        border: 1px solid #D8D8D8;
        display: block;
        margin-top: 30px;
        text-align: center;
        line-height: 34px;
        color: #FFF;
        text-decoration: none;
        opacity: .8;
        filter: alpha(opacity=80);
      }
      .solution-link:hover{
        background-color: @light-color;
        border-color: @light-color;
        opacity: 1;
        filter: alpha(opacity=100);
        transition: all 0.3s;
      }
      .content-item {
        color: #fff;
        position: absolute;
        top: 20px;
        opacity: 0;
        filter: alpha(opacity=0);
        transition: all 0.15s ease-out 0.05s;
        &.active {
          opacity: 1;
          filter: alpha(opacity=100);
          z-index: 2;
          top: 0;
          transition: all 1s cubic-bezier(0, 0, 0.33, 1.02) 0.25s
        }
        .content-header{
          width:100%;
          padding-left:150px;
          margin-bottom: 20px;
          span{
            display: inline-block;
            font-size: 36px;
            font-weight: bold;
            line-height: 51px;
            img{
              width:100%;
              padding-bottom: 5px;
            }
          }
        }
        .content-body{
          width:100%;
          .title{
            color: #ffffff;
            font-size: 16px;
            margin-bottom: 20px;
          }
          .forms{
            width:800px;
            p{
              margin: 30px 0;
              color: #fff;
              width:800px;
              textarea{
                width:400px;
                resize: none;
                background: rgba(255,255,255,.3);
                outline: none;
                border: none;
                font-size: 14px;
                padding: 6px 12px;
                border-radius: 4px;
                color: #fff;
              }
              input{
                width:400px;
                background: rgba(255,255,255,.3);
                outline: none;
                border: none;
                color: #ffffff;
                font-size: 14px;
                height: 40px;
                padding: 6px 12px;
                border-radius: 4px;
              }
              button{
                margin-left: 160px;
                display: inline-block;
                padding: 10px 15px;
                margin-bottom: 0;
                font-size: 14px;
                font-weight: 400;
                line-height: 1.42857143;
                text-align: center;
                white-space: nowrap;
                vertical-align: middle;
                touch-action: manipulation;
                cursor: pointer;
                user-select: none;
                background-image: none;
                border: none;
                border-radius: 3px;
              }
            }
          }
        }
      }
    }
  }
  //bestNew
  .bestnew{
    width:100%;
    background: #ffffff;
    height:690px;
    .bestnew-header{
      width:1349px;
      margin: 0 auto;
      position: relative;
      height:139px;
      border-bottom: 1px solid #dddddd;
      .list-bd{
        width:1320px;
        margin: 0 auto;
        height:139px;
        .list-item{
          display: inline-block;
          width:440px;
          height:139px;
          text-align: center;
          cursor: pointer;
          .best-name{
            font-size:22px;
            color: #333;
            margin-top: 40px;
            span{
              display: inline-block;
              position: relative;
              .best-line{
                width:120px;
                height:0px;
                background: @light-color;
                position: absolute;
                left: -5px;
                bottom:-68px;
              }
            }
          }
          .english-name{
            font-size:18px;
            margin-top: 10px;
            color: #999;
          }
        }
        .newbest-active{
          .best-name{
            color: @light-color;
            span{
              .best-line{
                height:2px;
              }
            }
          }
        }
      }
    }
    .bestnew-body{
      width:100%;
      height:550px;
      background: #f3f3f3;
      .bestnew-list{
        width:1200px;
        margin: 0 auto;
        height:550px;
        padding-top: 50px;
        .row{
          height:393px;
          width:1200px;
          margin-left: 0px;
        }
        .card{
          width:285px;
          margin-right: 20px;
          height:380px;
          background: #ffffff;
          padding: 40px 25px;
          box-shadow:3px 3px 8px #D1D1D1;
          position: relative;
          span{
            display: inline-block;
            width:100%;
            text-align: center;
            img{
              width:100px;
              height:100px;
              border-radius: 50px;
            }
          }
          .card-name{
            font-size: 18px;
            color: #333;
            text-align: center;
            padding-top:20px;
            padding-bottom: 15px;
          }
          .card-content{
            font-size: 14px;
            color: #999;
          }
        }
        .card:last-of-type{
          margin-right: 0px;
        }
      }
    }
  }
  //product 产品
  .product {
    background: #F3F3F3;
    padding: 50px 0 70px 0;
    height: 681px;
    overflow: hidden;
    box-sizing: content-box;
    .product-title {
      text-align: center
    }
    h2 {
      font-size: 24px;
      line-height: 40px;
      color: #333;
      margin-top: 0;
      margin-bottom: 10px
    }
    h3 {
      font-size: 14px;
      line-height: 26px;
      color: #999;
      font-weight: normal
    }
    .group-show {
      margin-top: 40px;
      *zoom: 1;
      &:before,&:after{
        display: table;
        content: ""
      }
      &:after{
        clear: both
      }
      .active {
        width: 626px;
        height: 572px;
        top: -90px;
        z-index: 7;
        -webkit-transition: top 0.4s cubic-bezier(0.28, -0.01, 0.41, 1);
        -moz-transition: top 0.4s cubic-bezier(0.28, -0.01, 0.41, 1);
        -ms-transition: top 0.4s cubic-bezier(0.28, -0.01, 0.41, 1);
        -o-transition: top 0.4s cubic-bezier(0.28, -0.01, 0.41, 1);
        transition: top 0.4s cubic-bezier(0.28, -0.01, 0.41, 1);
        .product-brief {
          opacity: 0;
          filter: alpha(opacity=0);
          z-index: 2;
          border-left: none;
        }
        .product-details {
          opacity: 1;
          filter: alpha(opacity=100);
          z-index: 5;
          -webkit-transition: opacity 0.3s linear;
          -moz-transition: opacity 0.3s linear;
          -ms-transition: opacity 0.3s linear;
          -o-transition: opacity 0.3s linear;
          transition: opacity 0.3s linear;
          h2 {
            color: #FFF;
            font-size: 19px;
            background-color: #1e1e28;
            line-height: 90px;
            padding-left: 40px;
            margin-bottom: 0;
            display: block;
            width: 626px;
            position: relative;
            top: -1px;
          }
        }
      }
    }
    .product-block {
      position: relative;
      width: 275px;
      height: 388px;
      margin-top: 90px;
      margin-right: -6px;
      -webkit-transition: top 0.4s cubic-bezier(0.28, -0.01, 0.41, 1);
      -moz-transition: top 0.4s cubic-bezier(0.28, -0.01, 0.41, 1);
      -ms-transition: top 0.4s cubic-bezier(0.28, -0.01, 0.41, 1);
      -o-transition: top 0.4s cubic-bezier(0.28, -0.01, 0.41, 1);
      transition: top 0.4s cubic-bezier(0.28, -0.01, 0.41, 1);
      display: inline-block;
      top: 0px;
    }
    .product-details {
      width: 626px;
      height: 569px;
      opacity: 0;
      filter: alpha(opacity=0);
      z-index: 2;
      background-color: #FFF;
      box-shadow: 0 0 20px #b7b7b7;
      position: relative;
      h2 {
        color: #FFF;
        font-size: 19px;
        background-color: #1e1e28;
        line-height: 90px;
        padding-left: 40px;
        margin-bottom: 0;
        display: block;
        width: 626px;
        position: relative;
        top: -1px;
        span {
          color: #a6a6a9;
          margin-left: 16px;
          font-size: 18px;
          line-height: 89px
        }
      }
      .product-details-img{
        width:100%;
        height:240px;
        img{
          width:100%;
          height:240px;
        }
      }
      .product-content{
        width:100%;
        padding:20px 20px;
        .product-name{
          font-size: 18px;
          font-weight: bold;
          color: #333;
          margin-bottom: 5px;
        }
        .product-word{
          font-size: 14px;
          color: #666;
        }
      }
    }
    .product-brief {
      width: 275px;
      height:382px;
      top:0px;
      border-left: 1px solid #ddd;
      z-index: 5;
      background-color: #FFF;
      position: absolute;
      opacity: 1;
      filter: alpha(opacity=100);
      span{
        width: 275px;
        height:191px;
        display: inline-block;
        img{
          width:100%;
          height:191px;
        }
      }
      .product-content{
        width:100%;
        padding:20px 20px;
        .product-name{
          font-size: 16px;
          font-weight: bold;
          color: #333;
          margin-bottom: 5px;
        }
        .product-word{
          font-size: 12px;
          color: #666;
        }
      }
    }
  }
  //advisor 配方师
  .advisor{
    width:100%;
    height:650px;
    background: #ffffff;
    padding: 50px 0 50px 0;
    .advisor-title {
      text-align: center;
      h2 {
        font-size: 24px;
        line-height: 40px;
        color: #333;
        margin-top: 0;
        margin-bottom: 10px
      }
      h3 {
        font-size: 14px;
        line-height: 26px;
        color: #999;
        font-weight: normal
      }
    }
    .advisor-body{
      width:100%;
      height:420px;
      background: #383d41;
      margin-top: 45px;
      .advisor-list{
        width:1349px;
        margin: 0 auto;
        height:420px;
        .row{
          height:420px;
          width:1349px;
          margin: 0 auto;
        }
        .card{
          width:269.2px;
          height:420px;
          position: relative;
          cursor: pointer;
          display: inline-block;
          img{
            width:269.8px;
            height:420px;
          }
          .mask {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            text-align: center;
            .bg {
              position: absolute;
              left: 0;
              right: 0;
              top: 0;
              bottom: 0;
              background: #161a1d;
              opacity: .6;
              filter: alpha(opacity=60);
              transition: all .4s cubic-bezier(.4,0,.2,1);
            }
            .content {
              position: absolute;
              left: 0;
              right: 0;
              top: 100px;
              bottom: 0;
              transition: all .4s cubic-bezier(.4,0,.2,1);
              .item-img-panel {
                position: relative;
                width: 80px;
                height:80px;
                display: inline-block;
                border-radius: 40px;
                .item-img{
                  height:80px;
                  position: absolute;
                  left: 0;
                  right: 0;
                  top: 0;
                  width: 80px;
                  display: inline-block;
                  opacity: 0;
                  filter: alpha(opacity= 0);
                  transition: all .4s cubic-bezier(.4,0,.2,1);
                  border-radius: 40px;
                }
              }
              .line-panel {
                padding: 0;
                margin: 0;
                font-size: 0;
                line-height: 0;
                margin-top: 20px;
                transition: all .4s cubic-bezier(.4,0,.2,1);
                .item-line {
                  width: 70px;
                  height: 1px;
                  background: #fff;
                  display: inline-block;
                  opacity: 1;
                  filter: alpha(opacity=100);
                  transition: all .4s cubic-bezier(.4,0,.2,1);
                }
              }
              .item-title {
                color: #fff;
                font-size: 22px;
                line-height: 24px;
                margin: 0;
                padding: 0;
                margin-top: 0px;
                font-weight: 700;
                transition: all .4s cubic-bezier(.4,0,.2,1);
              }
              .item-desc {
                font-size: 14px;
                color: #fff;
                text-align: center;
                margin-top: 30px;
                padding: 0 23px;
                line-height: 24px;
                height: 144px;
                opacity: 0;
                filter: alpha(opacity=0);
                transition: all .4s cubic-bezier(.4,0,.2,1);
              }
            }
          }
          .mask:hover{
            .bg {
              background: @light-color;
              opacity: .4;
              filter: alpha(opacity=40);
            }
            .content{
              top:50px;
              .item-img-panel{
                .item-img{
                  opacity: 1;
                  filter: alpha(opacity=1);
                }
              }
              .line-panel{
                margin-top: 0px;
                .item-line {
                  opacity: 0;
                  filter: alpha(opacity=0);
                }
              }
              .item-title {
                font-size: 20px;
                margin-top: 5px;
              }
              .item-desc {
                margin-top: 20px;
                opacity: 1;
                filter: alpha(opacity=1);
              }
            }
          }
        }
        .advisor-btn{
          line-height: 420px;
          height:420px;
          width:40px;
          background: rgba(0,0,0,.2);
          z-index:-11;
          opacity: 0;
          filter: alpha(opacity=0);
          transition: all .4s cubic-bezier(.4,0,.2,1);
          i{
            color: #ffffff;
          }
        }
      }
      .advisor-list:hover{
        .advisor-btn{
          opacity: 1;
          filter: alpha(opacity=1);
          z-index:99;
        }
      }
    }
  }
  //stock swap 库存
  .swap {
    width: 100%;
    height: 640px;
    background: #F3F3F3;
    padding: 50px 0 50px 0;
    .swap-title {
      text-align: center;
      margin-bottom: 20px;
      h2 {
        font-size: 24px;
        line-height: 40px;
        color: #333;
        margin-top: 0;
        margin-bottom: 10px
      }
      h3 {
        font-size: 14px;
        line-height: 26px;
        color: #999;
        font-weight: normal
      }
    }
    .swap-body{
      width:1200px;
      margin:0 auto;
      .swap-mes{
        width:100%;
        border:1px solid #d4d4d4;
        height:80px;
        .swap-mes-title{
          font-size: 16px;
          line-height: 78px;
          text-align: center;
          display: inline-block;
          color: #333;
          width:179px;
          border-right:1px solid #d4d4d4;
          background: #eeeeee;
          margin-right: 0px;
          vertical-align: top;
        }
        .swap-mes-content{
          font-size:12px;
          white-space: nowrap;
          color: #333;
          width:975px;
          display: inline-block;
          margin: 0 20px 0 17px;
          overflow: hidden;
          height: 78px;
          .scroll-body-begin, .scroll-body-end{
            display: inline;
            span{
              line-height: 78px;
              margin-right: 20px;
            }
          }
        }
      }
      .swap-list{
        width:1200px;
        margin-top: 10px;
        .swap-card{
          width:285px;
          height:310px;
          margin-right: 20px;
          box-shadow:0px 0px 3px #D1D1D1;
          padding: 20px 20px;
          background: #ffffff;
          display: inline-block;
          cursor: pointer;
          .swap-card-img{
            width:120px;
            height:80px;
            display: block;
            img{
              width:120px;
              height:80px;
            }
          }
          .swap-card-title{
            font-size: 16px;
            color: #333;
            margin: 22px 0;
          }
          .swap-card-price{
            font-size: 20px;
            color: @light-color;
            padding-bottom: 22px;
            border-bottom:1px solid #d4d4d4;
            margin-bottom: 0px;
          }
          .swap-card-bot{
            font-size: 12px;
            margin-top: 22px;
            color: #999;
          }
        }
        .swap-card:last-of-type{
          margin-right: 0px;
          border:1px solid #d4d4d4;
        }
      }
    }
  }
  //CENTRALIZED PURCHASING 集中采购
  .pur {
    width: 100%;
    height: 730px;
    background: #ffffff;
    padding: 50px 0 50px 0;
    .pur-title {
      text-align: center;
      h2 {
        font-size: 24px;
        line-height: 40px;
        color: #333;
        margin-top: 0;
        margin-bottom: 10px
      }
      h3 {
        font-size: 14px;
        line-height: 26px;
        color: #999;
        font-weight: normal
      }
    }
    .pur-body{
      width:1200px;
      margin: 0 auto;
      padding-top: 40px;
      .pur-introds{
        width:1200px;
        height:300px;
        position: relative;
        img{
          width:1200px;
          height:300px;
        }
        .pur-word{
          padding: 50px 170px 0 170px;
          position: absolute;
          height:300px;
          background: rgba(0,0,0,.3);
          top:0;
          .pur-title{
            font-size:20px;
            margin-bottom: 20px;
            color: #ffffff;
          }
          .pur-content{
            font-size:14px;
            line-height: 25px;
            color: #ffffff;
          }
        }
      }

      .pur-pic{
        width:1200px;
        margin-top: 30px;
        .pur-list{
          width:224px;
          margin-right:20px;
          border:1px solid #d4d4d4;
          height:170px;
          line-height: 170px;
          display: inline-block;
          img{
            width:220px;
          }
        }
        .pur-list:last-of-type{
          margin-right: 0;
        }
      }
    }
  }
  //industry  推广
  .industry {
    width: 100%;
    height: 465px;
    background: #F3F3F3;
    padding: 50px 0 50px 0;
    .industry-title {
      text-align: center;
      h2 {
        font-size: 24px;
        line-height: 40px;
        color: #333;
        margin-top: 0;
        margin-bottom: 10px
      }
      h3 {
        font-size: 14px;
        line-height: 26px;
        color: #999;
        font-weight: normal
      }
    }
    .industry-body{
      width:1200px;
      margin: 0 auto;
      padding-top: 60px;
      height:200px;
      .industry-list{
        width:200px;
        height:200px;
        border-top:1px solid #d4d4d4;
        border-bottom:1px solid #d4d4d4;
        border-left:1px solid #d4d4d4;
        text-align: center;
        display: inline-block;
        background: #ffffff;
        span{
          margin-top: 40px;
          margin-bottom:30px;
          display: inline-block;
          img{
            width:60px;
            height:60px;
          }
        }
        p{
          font-size: 14px;
          color: #333;
        }
      }
      .industry-list:last-of-type{
        border-right:1px solid #d4d4d4;
      }
    }
  }
  //右侧客服帮助
  .hp{
    width:40px;
    position: fixed;
    top:50%;
    right:2%;
    z-index: 1000;
    .top{
      width:40px;
      text-align: center;
      cursor: pointer;
      background: #ffffff;
      box-shadow: 0px 0px 3px #D1D1D1;
      a {
        display: block;
        .first-img {
          padding-top: 15px;
          margin-bottom: 5px;
          display: block;
          img {
            width: 24px;
          }
        }
        .first-word {
          font-size: 12px;
          line-height: 14px;
          width: 30px;
          color: #666;
          margin: 0 5px;
          padding-bottom: 15px;
          border-bottom: 1px solid #d4d4d4;
          display: block;
          text-decoration: none !important;
        }
      }
      .second-img {
        padding: 15px 0;
        img{
          width: 24px;
        }
      }
    }
    .back {
      width:40px;
      height:40px;
      line-height: 40px;
      text-align: center;
      margin-top: 15px;
      background: @light-color;
      cursor:pointer;
    }
  }
  input:-moz-placeholder, textarea:-moz-placeholder {
    color:#fff;
  }
  input::-moz-placeholder, textarea::-moz-placeholder {
    color:#fff;
  }
  input:-ms-input-placeholder, textarea:-ms-input-placeholder {
    color:#fff;
  }
  input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
    color: #fff;
  }
</style>
