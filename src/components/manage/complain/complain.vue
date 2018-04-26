<template>
  <div>
    <back :title="'投诉举报'" :defaultBack="false" :customBack="goBack"> </back>
    <div class="wrapper" v-show="!targetChooseVisible">

      <div class="box">
        <div class="left">投诉{{target}}</div>
        <div class="right">
          <div class="tags">
            <button class="choose" @click="targetChooseVisible = true">选择</button>
            <p v-show="targetName" class="cancel" @click="onCancelClick">
              <span>{{targetName}}</span>
              <img src="~images/close.png">
            </p>
          </div>
        </div>
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
          <input type="text" v-model="form.mobile">
        </div>
      </div>

      <button class="submit flex-center" @click="submit">确定</button>
    </div>
    <div class="target-container" v-show="targetChooseVisible">
      <div class="target-wrapper">
        <!-- <div class="close"><img src="~images/close.png"></div> -->
        <p>选择投诉对象</p>
        <div class="target-list">
          <p  v-for="(item, index) in targets" :key="index"
              @click="onClickTarget(item)">
            <img v-show="targetId !== item.id" src="~images/unchecked.png">
            <img v-show="targetId === item.id" src="~images/checked.png">
            {{item.targetName}}
          </p>
        </div>
        <load-more  ref="pageloader"
                    :loadmore="loadMoreHandle"
                    v-show="targets.length > 0"
                    style="border:1px solid #666"></load-more>
        <no-data v-show="targets.length === 0"></no-data>
        <!-- <button class="submit flex-center" @click="targetChooseVisible = false">确定</button> -->
      </div>
    </div>
  </div>
</template>

<script>
import Back from 'comp/index/back'
import { Tools } from 'utils/tools'
// import { Reg } from 'utils/validator'
import { UserSyService } from 'api/manage/usersy-service.js'
import { DtManagerService } from 'api/manage/dtmanager-service.js'
import { ComplaintService } from 'api/manage/complaint-service.js'
import { Toast } from 'mint-ui'
import { PageModel } from 'model/page-model'
import LoadMore from 'comp/loadmore'
import NoData from 'comp/no-data'

const BUYER = 2

export default {
  components: {
    Back,
    Toast,
    NoData,
    LoadMore
  },

  data () {
    return {
      roleType: Tools.getRoleType(),
      targetChooseVisible: false,
      targetId: '',
      targetName: '',
      targets: [],
      form: {
        dataType: 1,
        dtManagerId: '',
        buyerId: '',
        reasonIds: [],
        des: '',
        mobile: ''
      },
      pager: new PageModel()
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
    },

    onClickTarget (item) {
      this.targetId = item.id
      this.targetName = item.targetName
      this.targetChooseVisible = false
    },

    onCancelClick () {
      this.targetName = ''
      this.targetId = ''
    },

    submit () {
      if (!this.targetId) {
        return Toast('请选择投诉对象')
      }

      if (this.form.reasonIds.length === 0) {
        return Toast('请选择投诉原因')
      }

      if (!this.form.des) {
        return Toast('请填写详细投诉内容')
      }

      if (!this.form.mobile) {
        return Toast('请填写联系方式')
      }

      // if (!Reg.phone.test(this.form.mobile)) {
      //   return Toast('请填写正确的电话号码')
      // }
      // 为买家时投诉的店铺id
      if (this.roleType === BUYER) {
        this.form.dtManagerId = this.targetId
      } else {
        this.form.buyerId = this.targetId
      }

      this.form.complaintObject = this.roleType === BUYER ? BUYER : 1
      this.form.reasonIds = this.form.reasonIds.join(',')

      this.complaintService.add(this.form)
        .then(res => {
          if (res) {
            Toast('投诉成功')
            this.reset()
          } else {
            this.form.reasonIds = this.form.reasonIds.split(',').map(e => +e)
          }
        })
    },

    reset () {
      this.targetId = ''
      this.targetName = ''

      this.form.buyerId = ''
      this.form.dtManagerId = ''
      this.form.reasonIds = []
      this.form.des = ''
      this.form.mobile = ''
    },

    loadMoreHandle () {
      let hasMore = this.pager.loadMore()
      if (hasMore) {
        let obj = {
          start: this.pager.curPage,
          limit: this.pager.pageSize
        }
        if (this.roleType === BUYER) obj.identityType = 1
        this.targetService.list(obj)
          .then(res => {
            if (res) {
              res.list.map(e => {
                if (this.roleType === BUYER) {
                  e.targetName = e.shopName
                } else {
                  e.targetName = e.companyName
                  e.id = e.buyerId
                }

                return e
              }).forEach(e => {
                this.targets.push(e)
              })
            }
            this.$refs.pageloader.close()
          })
      } else {
        this.$refs.pageloader.close()
      }
    },

    goBack () {
      if (this.targetChooseVisible) {
        this.targetChooseVisible = false
      } else {
        this.$router.go(-1)
      }
    }

  },

  watch: {
    targetChooseVisible () {
      if (this.targetChooseVisible && this.targets.length === 0) {
        let obj = {
          start: 0,
          limit: 10
        }
        if (this.roleType === BUYER) obj.identityType = 1
        this.targetService.list(obj)
          .then(res => {
            if (res) {
              this.targets = res.list.map(e => {
                if (this.roleType === BUYER) {
                  e.targetName = e.shopName
                } else {
                  e.targetName = e.companyName
                  e.id = e.buyerId
                }

                return e
              })
              this.pager.reset()
              this.pager.setTotal(res.total)
            }
          })
      }
    }
  },

  created () {
    // 买家投诉店家
    if (this.roleType === BUYER) {
      // roleType = 2 /mgr/CmsDtManager/list
      this.targetService = new DtManagerService()
    } else {
      // roteType = 4 /mgr/userShangYi/buyerList
      // roteType = 3 /mgr/userShangYi/buyerList
      this.targetService = new UserSyService()
    }
    this.complaintService = new ComplaintService()
  },

  computed: {
    target () {
      return this.roleType === BUYER ? '店铺' : '买家'
    },

    reasons () {
      let supplier = [{name: '商品与描述不符', val: 101}, {name: '商品质量有问题', val: 102}, {name: '订单交期延误', val: 103}, {
        name: '未履行已承诺的服务',
        val: 104
      }, {name: '服务态度差', val: 105}, {name: '其它', val: 106}]
      let buyer = [{name: '恶意下单和投诉', val: 201}, {name: '采购预测不准确', val: 202}, {name: '不按约定退换货', val: 203}, {
        name: '确认收货不及时',
        val: 204
      }, {name: '不按约定付款', val: 205}, {name: '其它', val: 206}]
      return this.roleType === BUYER ? supplier : buyer
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

      .tags {
        display: flex;
        align-items: center;

        .cancel {
          display: flex;
          align-items: center;
          border: 1px solid $text-green;
          color: $text-french;
          padding: .1rem .1rem .1rem .2rem;
          border-radius: 4px;
          font-size: 0.2rem;
          margin-left: 0.1rem;

          img {
            width: 0.26rem;
            height: 0.26rem;
            margin-left: 0.1rem;
          }
        }
      }

      .choose {
        width: 1rem;
        height: 0.46rem;
        color: white;
        background: $text-green;
        font-size: 0.24rem;
        border-radius: 3px;
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
        border: 1px solid #ccc;
        border-radius: 4px;
        background: #fafafa;
        font-size: 0.26rem;
        line-height: .4rem;
        text-indent: 1em;
      }

      input {
        height: 0.4rem;
        line-height: .4rem;
        font-size: 0.3rem;
        box-sizing: border-box;
        border: 1px solid #ccc;
        border-radius: 4px;
        margin-top: 0.05rem;
        margin-bottom: 1rem;
        text-indent: .5em;
      }
    }
  }
}
.target-wrapper {
  padding: .3rem;
  height: 6rem;
  box-sizing: border-box;
  margin-bottom: .2rem;
  text-align: left;
  background: white;

  // .close {
  //   text-align: right;
  //   margin-bottom: 0.2rem;
  //   img {
  //     width: 0.26rem;
  //     height: 0.26rem;
  //   }
  // }

  & > p {
    font-size: 0.3rem;
    margin-bottom: 0.3rem;
  }

  .target-list {
    display: flex;
    flex-direction: column;
    // min-height: 6rem;
    overflow-y: auto;

    & > p {
      display: flex;
      font-size: 0.26rem;
      line-height: 0.5rem;
      align-items: center;

      & > img {
        width: 0.26rem;
        height: 0.26rem;
        margin-right: 0.1rem;
      }
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
</style>
