<template>
  <div>
    <back :title="'配方订单'"><span class="new" @click="toDetail('new')">新增</span></back>
    <div  class="address"
          v-if="address"
          v-for="(item, index) in address" :key="index">
      <div class="content">
        <p class="name">
          <span>{{item.recipientName}}</span>
          <span>{{item.mobile}}</span>
        </p>
        <p class="location">
          {{item.location}}
        </p>
      </div>
      <div class="btns">
        <div class="left" @click="onDefaultClick(item)">
          <img src="~images/unchecked.png" v-show="!item.defaul">
          <img src="~images/checked.png" v-show="item.defaul">
          <span>默认地址</span>
        </div>
        <div class="right">
          <span @click="toDetail({target: 'edit', data: item})">编辑</span>
          <span @click="onDeleteClick(item.id)">删除</span>
        </div>
      </div>
    </div>
    <load-more ref="pageloader" :loadmore="loadMoreHandle" v-show="address.length > 0"></load-more>
    <no-data v-show="address.length === 0"></no-data>
  </div>
</template>

<script>
import Back from 'comp/index/back'
import { AddressService } from 'api/manage/address-service'
import { Toast } from 'mint-ui'
import { PageModel } from 'model/page-model'
import LoadMore from 'comp/loadmore'
import NoData from 'comp/no-data'

export default {
  components: {
    Back,
    NoData,
    LoadMore
  },

  data () {
    return {
      address: [],
      pager: new PageModel()
    }
  },

  methods: {
    toDetail ({target = 'new', data = {}} = {}) {
      if (target === 'edit') {
        data = {
          recipientName: data.recipientName,
          mobile: data.mobile,
          id: data.id,
          defaul: data.defaul,
          address: data.address,
          province: {
            name: data.province.name,
            id: data.province.id
          },
          city: {
            name: data.city.name,
            id: data.city.id
          },
          county: {
            name: data.county.name,
            id: data.county.id
          }
        }
      }

      data = JSON.stringify(data)
      console.log(data)
      this.$router.push({
        path: '/manage/address/detail',
        query: {
          target,
          data
        }
      })
    },

    onDefaultClick (item) {
      this.addressService.update({
        id: item.id,
        defaul: !item.defaul,
        recipientName: item.recipientName,
        mobile: item.mobile,
        countyId: item.county.id,
        address: item.address
      }).then(res => res ? this.getAddress('修改成功') : '')
    },

    onDeleteClick (id) {
      this.addressService.delete({
        id
      }).then(res => res ? this.getAddress('删除成功') : '')
    },

    getAddress (hint) {
      this.addressService.list({
        start: 0,
        limit: 10
      }).then(res => {
        if (res) {
          this.address = res.list.map(e => {
            e.location = e.province.name + e.city.name + e.county.name + e.address
            return e
          }).sort(e => {
            return !e.defaul
          })

          hint && Toast(hint)
          this.pager.reset()
          this.pager.setTotal(res.total)
        }
      })
    },

    loadMoreHandle () {
      let hasMore = this.pager.loadMore()
      if (hasMore) {
        this.addressService.list({
          start: this.pager.curPage,
          limit: this.pager.pageSize
        }).then(res => {
          if (res) {
            res.list.map(e => {
              e.location = e.province.name + e.city.name + e.county.name + e.address
              return e
            }).sort(e => {
              return !e.defaul
            }).forEach(e => {
              this.address.push(e)
            })
          }
          this.$refs.pageloader.close()
        })
      } else {
        this.$refs.pageloader.close()
      }
    }
  },

  created () {
    this.addressService = new AddressService()
  },

  mounted () {
    this.getAddress()
  }
}
</script>

<style lang="scss" scoped>
@import '~scss/shotcut';

.new {
  font-size: 0.3rem;
  color: $text-green;
  position: absolute;
  right: .3rem;
}

.address {
  background: white;
  margin-bottom: .2rem;
  text-align: left;

  .content {
    padding: .2rem .3rem;
    border-bottom: 1px solid $border-gray;
    font-size: 0.3rem;

    .name {
      display: flex;
      justify-content: space-between;
      line-height: .6rem;
    }

    .location {
      font-size: 0.26rem;
      line-height: .5rem;
      word-break: break-all;
    }
  }

  .btns {
    height: 0.9rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 .3rem;

    .left {
      font-size: 0.26rem;
      display: flex;
      align-items: center;

      img {
        width: .26rem;
        height: .26rem;
        margin-right: 0.1rem;
      }
    }

    .right {
      font-size: 0.26rem;
      & > span {
        margin-left: .4rem;
      }
    }
  }
}
</style>
