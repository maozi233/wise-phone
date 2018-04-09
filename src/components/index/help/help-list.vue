<template>
  <div>
    <div class="help-list">
      <div class="title">
        <img src="~images/back.png" @click="goBack">
        <span>帮助中心</span>
      </div>
      <div class="list">
        <div  class="box"
              v-for="(item, index) in infos" :key="index"
              @click="onClickInfo(item)">
          <div  class="item">
            <span>{{item.title}}</span>
            <img src="~images/filter.png">
          </div>
          <div  class="child"
                :style="{maxHeight : item.childVisible ? '1000px' : '0'}">
            <div  class="child-item"
                  v-for="(child, i) in item.childs" :key="i"
                  @click.stop="onChildClick(child.id)">
              <span>{{child.title}}</span>
              <img src="~images/information-more.png">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { HelpCenterService } from 'api/index/help-service'

export default {

  data () {
    return {
      infos: []
    }
  },

  methods: {
    goBack () {
      this.$router.go(-1)
    },

    onClickInfo (item) {
      if (item.childs.length === 0) {
        // this.getChilds(item.childs, item.id)
        this.helpService.list({
          pId: item.id
        }).then(res => {
          if (res) {
            item.childs = res.list
            console.log(item.childs)
            item.childVisible = true
          }
        })
      } else {
        item.childVisible = !item.childVisible
      }
    },

    onChildClick (id) {
      this.$router.push({
        path: 'help/detail',
        query: {
          id
        }
      })
    }
  },

  created () {
    this.helpService = new HelpCenterService()
  },

  mounted () {
    this.helpService.list({
      pId: ''
    }).then(res => {
      if (res) {
        this.infos = res.list.map(e => {
          return Object.assign(e, {
            childs: [],
            childVisible: false
          })
        })
      }
    })
  }
}
</script>

<style lang="scss" scoped>
@import '~scss/shotcut';

.help-list {
  background: white;
  text-align: left;

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
      text-align: center;
    }
  }

  .list {
    text-align: left;

    .item {
      height: 0.9rem;
      padding: 0 .3rem;
      display: flex;
      justify-content: space-between;
      font-size: 0.3rem;
      align-items: center;
      border-bottom: 1px solid $border-gray;
      &:nth-last-child(1) {
        border-bottom: 0;
      }

      &.active > img {
        transform: rotateX(180deg)
      }

      & > img {
        width: 0.26rem;
        height: 0.15rem;
      }
    }

    .child {
      padding: 0 .3rem;
      background: #f8f8f8;
      &:nth-last-child(1) .child-item{
        border-bottom: 0;
      }
      transition: .3s all ease-in;
      overflow: hidden;

      .child-item {
        display: flex;
        justify-content: space-between;
        font-size: 0.26rem;
        align-items: center;
        color: $text-french;
        border-bottom: 1px solid $border-gray;
        height: 0.88rem;
        text-indent: .5em;

        & > img {
          width: 0.15rem;
          height: 0.24rem;
        }
      }
    }
  }
}
</style>
