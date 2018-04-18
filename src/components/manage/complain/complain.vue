<template>
  <div>
    <back :title="'投诉举报'"> </back>
    <div class="wrapper" v-show="!targetChooseVisible">

      <div class="box">
        <div class="left">投诉{{targetName}}</div>
        <div class="right"><button class="choose">选择</button></div>
      </div>

      <div class="box">
        <div class="left">投诉原因</div>
        <div class="right">
          <p class="item"
              v-for="(item, index) in reasons" :key="index"
              @click="onClickReason(item)">
            <img v-show="form.reasonIds.indexOf(item.val) != -1" src="~images/checked.png" >
            <img v-show="form.reasonIds.indexOf(item.val) == -1" src="~images/unchecked.png">
            <span>{{item.name}}</span>
          </p>
        </div>
      </div>

      <div class="box">
        <div class="left">投诉描述</div>
        <div class="right">
          <textarea v-model="form.des" maxlength="150"></textarea>
        </div>
      </div>

      <div class="box">
        <div class="left">联系方式</div>
        <div class="right">
          <input type="text">
        </div>
      </div>

      <button class="submit flex-center">确定</button>
    </div>
  </div>
</template>

<script>
import Back from 'comp/index/back'
import { Tools } from 'utils/tools'
// import { Picker, Popup, Toast } from 'mint-ui'
// import { AddressService } from 'api/manage/address-service'

export default {
  components: {
    Back
  },

  data () {
    return {
      roleType: Tools.getRoleType(),
      targetChooseVisible: false,
      form: {
        reasonIds: [],
        des: ''
      }
    }
  },

  methods: {
    onClickReason (item) {
      let choosedIndex = this.form.reasonIds.indexOf(item.val)

      if (choosedIndex !== -1) {
        this.form.reasonIds.splice(choosedIndex, 1)
      } else {
        this.form.reasonIds.push(item.val)
      }
      console.log(this.form.reasonIds)
    }
  },

  computed: {
    targetName () {
      return this.roleType === 2 ? '店铺' : '买家'
    },

    reasons () {
      let buyer = [{name: '商品与描述不符', val: 101}, {name: '商品质量有问题', val: 102}, {name: '订单交期延误', val: 103}, {
        name: '未履行已承诺的服务',
        val: 104
      }, {name: '服务态度差', val: 105}, {name: '其它', val: 106}]
      let supplier = [{name: '恶意下单和投诉', val: 201}, {name: '采购预测不准确', val: 202}, {name: '不按约定退换货', val: 203}, {
        name: '确认收货不及时',
        val: 204
      }, {name: '不按约定付款', val: 205}, {name: '其它', val: 206}]
      return this.roleType === 2 ? supplier : buyer
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~scss/shotcut';

.wrapper {
  background: white;

  .box {
    margin-bottom: .1rem;
    display: flex;
    padding-top: .3rem;
    &:nth-last-child(1) {
      margin-bottom: 2px;
    }

    .left {
      width: 1.8rem;
      flex-shrink: 0;
      font-size: 0.3rem;
    }

    .right {
      flex-grow: 1;
      text-align: left;
      display: flex;
      flex-direction: column;
      padding-right: 0.3rem;

      .choose {
        width: 1rem;
        height: 0.46rem;
        color: white;
        background: $text-green;
        font-size: 0.24rem;
      }

      .item {
        display: flex;
        margin-bottom: 0.2rem;
        font-size: 0.26rem;
        align-items: center;

        img {
          width: 0.26rem;
          height: 0.26rem;
          margin-right: 0.1rem;
          vertical-align: middle;
        }
      }

      textarea {
        resize: none;
        height: 2rem;
        box-sizing: border-box;
        border: 1px solid $text-gray;
        border-radius: 4px;
        background: #fafafa;
        font-size: 0.26rem;
        line-height: .4rem;
        text-indent: 2em;
      }

      input {
        height: 0.4rem;
        line-height: .4rem;
        font-size: 0.3rem;
        box-sizing: border-box;
        border: 1px solid $text-gray;
        border-radius: 4px;
        margin-top: 0.05rem;
        margin-bottom: 1rem;
      }
    }
  }

  .submit {
    margin: 0 auto;
    width: 6rem;
    height: 0.9rem;
    border-radius: 4px;
    background: $text-green;
    color: white;
    font-size: 0.36rem;
  }
}
</style>
