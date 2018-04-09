<template>
  <div>
    <sy-header ref="header" :showSearch='false'></sy-header>
    <div class="goods-detail">
      <div class="title">
        <img src="~images/back.png" @click="goBack">
        <span>商品详情</span>
      </div>
      <div class="name-detail" v-if="detail != ''">
        <p class="name-cn">{{detail.name}}</p>
        <p class="name-eng">{{detail.exContent.englishName}}</p>
        <p class="name-alias">商品别名: <span>{{detail.exContent.otherName}}</span></p>
        <p class="name-inci">inci名: <span>{{detail.chemicalName}}</span></p>
      </div>
    </div>

    <div class="des" v-if="detail">
      <div class="left">
        <p>分类</p>
        <p>规格</p>
      </div>
      <div class="right">
        <p>{{detail.category.name}}</p>
        <p>{{`${detail.exContent.spec.counts}${specs.unit[detail.exContent.spec.unit].title}/${specs.pack[detail.exContent.spec.pack].title}`}}</p>
      </div>
    </div>

    <div class="des" v-if="detail">
      <div class="left">
        <p>是否提供样品</p>
        <p>是否危险品</p>
      </div>
      <div class="right">
        <p>{{detail.exContent.sample ? '是' : '否'}}</p>
        <p>{{detail.exContent.danger ? '是' : '否'}}</p>
      </div>
    </div>

    <review-entry :id="id"></review-entry>

    <section v-if="detail">
      <div class="title">商品详情</div>
      <div class="box" v-html="detail.content.content" style="font-size:.3rem;text-align: left;">
      </div>
       <no-data v-show="detail.content.content === ''"></no-data>
    </section>

    <div class="recommend">
      <div class="title">
        推荐配方
      </div>
      <div class="box">
        <div  class="goods"
              v-for="(item, index) in formulationGoods" :key="index">
          <p class="name single-line">{{item.name}}</p>
          <p class="subject single-line">{{item.subject || '暂无介绍'}}</p>
        </div>
        <no-data v-show="formulationGoods.length === 0"></no-data>
      </div>
    </div>

    <flex-popup ref="flexPop">
      <input type="text" v-model="concatForm.name" placeholder="请输入姓名">
      <input type="number" v-model="concatForm.tel" placeholder="请输入手机号">
      <textarea v-model="concatForm.des" placeholder="需求描述"></textarea>
      <p>请填写您的信息, 我们稍后以短信的方式告知您供应商联系方式！</p>
      <button @click="sendConcat" class="flex-center">确认</button>
    </flex-popup>

    <div class="flex-bottom"></div>
    <flex-bottom  v-if="id"
                  :id="id"
                  :rightBtnName="'询盘'"
                  :rightBtnHandle="enquiry"></flex-bottom>
  </div>
</template>

<script>
import Header from 'comp/index/header'
import FlexBottom from 'comp/index/flex-bottom'
import NoData from 'comp/no-data'
import ReviewEntry from 'comp/index/review-entry'
import FlexPopup from 'comp/index/flex-popup'
import { Popup, Toast } from 'mint-ui'
import { GoodsService } from 'api/index/goods-service'
import { InquiryService } from 'api/index/inquiry-service'
import { Specs } from 'model/model-types'

export default {
  components: {
    [Header.name]: Header,
    NoData,
    FlexBottom,
    Popup,
    ReviewEntry,
    FlexPopup
  },

  data () {
    return {
      id: '',
      detail: '',
      formulationGoods: [],
      concatForm: {
        name: '',
        tel: '',
        des: ''
      },
      specs: Specs
    }
  },

  methods: {
    goBack () {
      this.$router.go(-1)
    },

    sendConcat () {
      if (!this.concatForm.name || !this.concatForm.tel || !this.concatForm.des) {
        return Toast('信息未填写完整')
      }
      this.$refs.flexPop.hide()
      this.inquiryService.add({
        type: 1,
        title: this.detail.name,
        userName: this.concatForm.name,
        mobile: this.concatForm.tel,
        description: this.concatForm.des,
        goodsId: this.id
      }).then(res => {
        if (res) {
          Toast('发送成功')
          this.concatForm.name = ''
          this.concatForm.tel = ''
          this.concatForm.des = ''
        }
      })
    },

    enquiry () {
      this.$refs.flexPop.show()
    }
  },

  created () {
    this.goodsService = new GoodsService()
    this.inquiryService = new InquiryService()
  },

  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      vm.id = to.query.id

      vm.goodsService.get({
        id: vm.id
      }).then(res => {
        if (res) {
          res.exContent = JSON.parse(res.extContent.content)
          vm.detail = res

          vm.formulationGoods = res.goodsFormulationList
        }
      })
    })
  }
}
</script>

<style lang="scss" scoped>
@import '~scss/shotcut';

.flex-bottom{
  height: 1rem;
}

section {
  padding: 0 .3rem;
  background: white;
  margin-bottom: .2rem;

  .title {
    height: .9rem;
    box-sizing: border-box;
    border-bottom: 1px solid $border-french;
    display: flex;
    align-items: center;
    font-size: .28rem;
  }
}

.goods-detail {
  background: white;
  margin-bottom: .2rem;
  padding-bottom: .1rem;

  .title {
    height: .88rem;
    box-sizing: border-box;
    border-bottom: 1px solid $border-french;
    padding: 0 .3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & > img {
      width: .3rem;
      height: .28rem;
    }

    & > span {
      flex-grow: 1;
      margin-left: -.3rem;
      font-size: .36rem;
    }
  }

  .name-detail {
    padding: 0 .3rem;
    text-align: left;

    .name-cn {
      line-height: .9rem;
      font-size: .3rem;
    }

    .name-eng,.name-alias,.name-inci {
      font-size: .24rem;
      margin-bottom: .2rem;
      color: $text-french;
    }

    .name-alias > span,.name-inci > span {
      color: $text-black;
    }
  }
}

.des {
  display: flex;
  background: white;
  margin-bottom: .2rem;
  padding: .1rem .3rem;
  text-align:left;

  .left,.right {
    display: flex;
    flex-direction: column;
    font-size: .3rem;

    & > p {
      line-height: .6rem
    }
  }

  .left {
    color: $text-french;
    margin-right: .3rem;
  }
}

.recommend {
  background: white;
  text-align: left;

  & > .title {
    height:.88rem;
    line-height:.88rem;
    font-size: .28rem;
    padding: 0 .3rem;
    position: relative;

    &:before {
      content: '';
      width: 4px;
      height: .3rem;
      position: absolute;
      left: 0 ;
      top: 50%;
      transform: translateY(-50%);
      background: $text-green;
    }
  }

  .box {
    background: #f2f2f2;
    padding: .2rem;
    padding-bottom: .45rem;
    display: flex;
    flex-wrap: wrap;

    .goods {
      flex-grow: 1;
      width: 50%;
      max-width: 50%;
      border-right: .1rem solid #f2f2f2;
      margin-bottom: .1rem;
      height: 1.2rem;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      padding: .2rem .3rem;
      background: white;
      &:nth-child(even) {
        border: none;
      }
      &:nth-child(n + 2) {
        margin-bottom : 0;
      }

      .name {
        font-size: .28rem;
        line-height: .28rem;
        margin-bottom: .15rem;
      }

      .price {
        font-size: .3rem;
        color : $text-red;
      }

      .subject {
        font-size:.24rem;
        color: $text-french;
      }
    }

  }
}

.pop-flex-bottom {

  input, textarea {
    width: 100%;
    height: .8rem;
    box-sizing: border-box;
    line-height:.5rem;
    padding: .15rem .2rem;
    border: 1px solid $border-gray;
    background: #f8f8f8;
    margin-bottom: .3rem;
  }

  textarea {
    height: 1.4rem;
    resize: none;
    margin-bottom: 0;
  }

  p {
    line-height: .55rem;
    margin-bottom: .1rem;
    color: $text-french;
  }

  button {
    width: 100%;
    height: .8rem;
    font-size: .36rem;
    color: white;
    background: $text-green;
  }

}
</style>
