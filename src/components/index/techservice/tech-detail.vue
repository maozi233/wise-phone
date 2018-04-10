<template>
  <div>
    <sy-header ref="header" :showSearch='false'></sy-header>
    <div class="goods-detail">
      <div class="title">
        <img src="~images/back.png" @click="goBack">
        <span>商品详情</span>
      </div>
      <div class="box" v-if="detail">
        <p class="price">{{detail.exContent.servicePrice}}</p>
        <p class="name">{{detail.name}}</p>
        <p class="des single-line">{{detail.subject}}</p>
        <p class="from">
          服务商: <span class="company">{{detail.dtManager.companyName}}</span>
        </p>
      </div>
      <no-data v-if="!detail"></no-data>
    </div>

    <review-entry :id="id" :shopId="shopId"></review-entry>

    <section v-if="detail">
      <div class="title">商品详情</div>
      <div class="box" v-html="detail.content.content" style="font-size:.3rem;text-align: left;">
      </div>
       <no-data v-show="detail.content.content === ''"></no-data>
    </section>

    <mt-popup v-model="contactPopVisible"
              position="top"
              class="pop-contact"
              v-if="detail">
      <p>电话号码: <a :href="detail.dtManager.maptel">{{detail.dtManager.tel}}</a></p>
      <p>电子邮箱: <a :href="detail.dtManager.mapemail">{{detail.dtManager.email}}</a></p>
    </mt-popup>

    <div class="flex-bottom"></div>
    <flex-bottom  v-if="id"
                  :id="id"
                  :shopId="shopId"
                  :rightBtnName="'联系我们'"
                  :rightBtnHandle="contact"></flex-bottom>
  </div>
</template>

<script>
import Header from 'comp/index/header'
import FlexBottom from 'comp/index/flex-bottom'
import NoData from 'comp/no-data'
import ReviewEntry from 'comp/index/review-entry'
import { Popup } from 'mint-ui'
import { GoodsService } from 'api/index/goods-service'

export default {
  components: {
    [Header.name]: Header,
    NoData,
    FlexBottom,
    Popup,
    ReviewEntry
  },

  data () {
    return {
      id: '',
      detail: '',
      contactPopVisible: false,
      shopId: ''
    }
  },

  methods: {
    goBack () {
      this.$router.go(-1)
    },

    contact () {
      this.contactPopVisible = true
    }
  },

  created () {
    this.goodsService = new GoodsService()
  },

  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      vm.id = to.query.id

      vm.goodsService.get({
        id: vm.id
      }).then(res => {
        if (res) {
          res.exContent = JSON.parse(res.extContent.content)
          res.dtManager.maptel = `tel:${res.dtManager.tel}`
          res.dtManager.mapemail = `mailto:${res.dtManager.tel}`
          vm.detail = res

          vm.shopId = res.dtManager.id
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
  margin-bottom: .1rem;

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

  .box {
    background: white;
    padding: .2rem .3rem;
    text-align: left;

    .price {
      color: $text-red;
      font-size: .3rem;
      margin-bottom: .2rem;
    }

    .name {
      font-size: .3rem;
      margin-bottom: .2rem;
    }

    .des {
      font-size: .24rem;
      color: $text-french;
      margin-bottom: .2rem;
    }

    .from {
      font-size: .24rem;
      color: $text-french;
      margin-bottom: .15rem;

      .company {
        color: $text-blue;
      }
    }
  }
}

.pop-contact {
  width: 90%;
  font-size: .4rem;
  left: 50%;
  display: flex;
  top: 50%;
  text-align: left;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  justify-content: space-around;
  flex-direction: column;
  box-sizing: border-box;
  padding: .2rem;
}

</style>
