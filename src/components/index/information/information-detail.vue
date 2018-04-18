<template>
  <div class="detail-container" v-if="detail">
    <div class="header">
      <p class="title single-line">{{detail.title}}</p>
      <p class="des">
        <span><img src="~images/info-date.png" style="margin-left: 0"><span></span>{{detail.createTime.split(' ')[0]}}</span>
        <span><img src="~images/info-source.png"><span></span>{{detail.source}}</span>
        <span><img class="view" src="~images/info-view.png"><span></span>1000</span>
      </p>
    </div>

    <div class="content" v-html="detail.content.content" style="font-size:.3rem;text-align: left;"></div>
    <no-data v-show="detail === ''"></no-data>
  </div>
</template>

<script>
import { InformationService } from 'api/index/information-service'
import NoData from 'comp/no-data'

export default {
  components: {
    NoData
  },

  data () {
    return {
      detail: ''
    }
  },

  created () {
    this.informationService = new InformationService()
  },

  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      vm.id = to.query.id

      vm.informationService.get({
        id: vm.id
      }).then(res => {
        if (res) {
          vm.detail = res
          console.log(vm.detail)
        }
      })
    })
  }
}

</script>

<style lang="scss" scoped>
@import '~scss/shotcut';

.detail-container {
  margin-bottom: 0.2rem;

  .header {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #fcfcfc;
    height: 2rem;
    background: url('~images/information-bg.png') no-repeat 100%/100%;

    .title {
      font-size: 0.36rem;
      margin-bottom: .3rem;
    }

    .des {
      font-size: 0.24rem;
      display: flex;
      justify-content: center;

      & > span {
        display: flex;
        align-items: center;
        margin-left: .2rem;
        border-left: 1px solid #fcfcfc;

        &:nth-of-type(1) {
          border-left: 0;
          margin-left: 0;
        }
      }

      img {
        width: .26rem;
        height: .26rem;
        margin-right: .1rem;
        margin-left: .2rem;
      }

      .view {
        width: 0.34rem;
        height: 0.24rem;
      }
    }
  }

  .content {
    background: white;
    padding: 0.2rem;
  }
}
</style>
