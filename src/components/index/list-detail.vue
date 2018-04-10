<template>
  <div>
    <div class="title">
      <img src="~images/back.png" @click="goBack">
      <span>{{title}}</span>
    </div>
    <div class="list">
      <div  class="item"
            v-for="(item, index) in dataList" :key="index"
            v-if="dataList.length > 0">
        <img :src="item.img" class="left">
        <div class="right">
          <p>{{item.nickName}}</p>
          <p>{{item.content}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import get1 from 'images/get1.jpg'
import get2 from 'images/get2.jpg'
import get3 from 'images/get3.jpg'
import get4 from 'images/get4.jpg'
import give1 from 'images/give1.jpg'
import give2 from 'images/give2.jpg'
import give3 from 'images/give3.jpg'
import give4 from 'images/give4.jpg'
import pt1 from 'images/pt1.jpg'
import pt2 from 'images/pt2.jpg'
import pt3 from 'images/pt3.jpg'
import pt4 from 'images/pt4.jpg'
import lab1 from 'images/lab1.jpg'
import lab2 from 'images/lab2.jpg'
import lab3 from 'images/lab3.jpg'
import lab4 from 'images/lab4.jpg'
import sb1 from 'images/sb1.jpg'
import sb2 from 'images/sb2.jpg'
import sb3 from 'images/sb3.jpg'
import sb4 from 'images/sb4.jpg'
import tg from 'images/tg.jpg'

export default {
  props: {
    index: {
      type: Number,
      default: 0
    }
  },

  data () {
    return {
      infos: [{
        title: '采购商可以享受到的服务',
        list: [{
          nickName: '科学寻源',
          content: '在线询盘，将企业的供应商资源进行统筹安排和控制。',
          img: get1
        }, {
          nickName: '采购自动化',
          content: '全流程和自动化的在线交易协同，更高效地达到信息互通和业务互动。',
          img: get2
        }, {
          nickName: '智慧管控',
          content: '采购战略和策略的全面智慧管控，持续进行供应商管理。',
          img: get3
        }, {
          nickName: '成本控制',
          content: '在采购需求规划、订单管理、物流跟踪等关键环节上提供业务协同，降低采购成本提高采购效率。',
          img: get4
        }]
      }, {
        title: '供应商可以享受到的服务',
        list: [{
          nickName: '公平公开',
          content: '诚信机制保障，您可以放心和平台上的所有采购商进行在线协同交易。',
          img: give1
        }, {
          nickName: '协同采购',
          content: '根据协议采购商的需求规划可相应调整供应计划，真正意义上达到信息互通。',
          img: give2
        }, {
          nickName: '节能高效',
          content: '协同管理采购订单和物流跟踪等业务，互动方便快捷。',
          img: give3
        }, {
          nickName: '供应商评级',
          content: '品牌推广，产品推广和个性化店铺展示，助您成为更多采购商的核心供应商 ,由采购商发起评级，供应商的服务 水平和专业资质，一目了然，优质供应商将会得到更多的资源信息。',
          img: give4
        }]
      }, {
        title: '平台服务',
        list: [{
          nickName: '金融支付',
          content: '通过合作银行的空中分账业务，用户不用实际开户，通过虚拟账户的方式实现资金的监控和流转，安全可靠。',
          img: pt1
        }, {
          nickName: '物流服务',
          content: '物流公司在线报价，在线分装，实时通过平台查询化学品状态，避免重复沟通。',
          img: pt2
        }, {
          nickName: '推广服务',
          content: '优质，等级高的采购商或供应商将得到平台免费的推广。',
          img: pt3
        }, {
          nickName: '线上线下活动',
          content: '组织线上及线下的研讨会，开放思维，共同优化互联网协同采购。',
          img: pt4
        }]
      }, {
        title: '实验室环境',
        list: [{
          nickName: '标准化管理',
          content: '实验室通过了ISO9001的认证体系和日化环评，通过严格的实验室管理，保证实验有条不紊的进行。',
          img: lab1
        }, {
          nickName: '交通便利',
          content: '实验室地处市区的漕河泾开发区，轨道交通9，12 号线，方便快捷。',
          img: lab2
        }, {
          nickName: '共享概念',
          content: '通过共享理念解决配方师实验场所的问题，网上预约登记，现场扫码确认，一键完成。',
          img: lab3
        }, {
          nickName: '生态圈',
          content: '相同的理想，不同的技术背景，共享实验室将创造一个配方师沟通和交流的沙龙，共同进步。',
          img: lab4
        }]
      }, {
        title: '实验室仪器设备',
        list: [{
          nickName: 'pH计',
          content: '精密测量液体介质的酸碱度值，配上相应的离子选择电极，能够测量离子电极电位MV值 。',
          img: sb1
        }, {
          nickName: '精密天平',
          content: '精密天平是定量分析工作中不可缺少的重要仪器，是获得可靠分析结果的保证。',
          img: sb2
        }, {
          nickName: '粘度计',
          content: '粘度是表示流体在流动时，流体内部发生内摩擦的物理量，是流体反抗形变的能力，配方测试中的一项重要指标。',
          img: sb3
        }, {
          nickName: '稳定性测试环境',
          content: '提供不同的温度环境及极端测试，保证配方稳定性评估的完整性。',
          img: sb4
        }]
      }, {
        title: '原料提供',
        list: [{
          nickName: 'Cetiol CC',
          content: 'BASF 碳酸二辛酯，一款经典的润肤剂，快速铺展，干爽肤感，媲美挥发性硅油，帮助溶解结晶型紫外线过滤 剂，有效分散无机色粉，植物来源，低刺激性。',
          img: tg
        }, {
          nickName: 'Solagum AX',
          content: 'SEPPIC 阿拉伯胶树胶(和)黄原胶，市场接受度高的流变调节剂，天然来源的增稠剂，增稠能力中等，水 溶液不透明，肤感柔滑，可明显改善配方的肤感，无拉丝现象。',
          img: tg
        }, {
          nickName: 'Euxyl PE9010',
          content: 'SCHÜKLE 杀菌防腐剂，配方中不可缺少的重要拼图 。',
          img: tg
        }, {
          nickName: 'Shea Butter pressed and refined',
          content: 'OLIVA 牛油果树果脂，天然润肤剂：保湿、润养肌肤，富含多种非皂化物，抗氧 化、抗炎、修复，天然植物防晒剂，协同增效提高防晒霜的SPF值。',
          img: tg
        }]
      }]
    }
  },

  computed: {
    title () {
      return this.infos[this.index].title
    },

    dataList () {
      return this.infos[this.index].list
    }
  },

  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }

  // beforeRouteEnter: (to, from, next) => {
  //   next(vm => {
  //     vm.index = to.query.index
  //     let info = vm.infos[vm.index]
  //     vm.dataList = info.list
  //     vm.title = info.title
  //     console.log(vm.index)
  //   })
  // }
}
</script>

<style lang="scss" scoped>
@import '~scss/shotcut';

.title {
  margin: .2rem 0;
  background: white;
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

.list {
  padding: .3rem;
  background: white;
  text-align: left;

  .item {
    display: flex;
    justify-content: space-between;
    padding-bottom: 0.3rem;
    border-bottom: 1px solid $border-gray;
    &:nth-last-child(1) {
      border-bottom: 0;
    }

    .left {
      width: 2.4rem;
      height: 1.8rem;
      vertical-align: bottom;
      flex-shrink: 0;
      margin-right: .2rem;
    }

    .right {
      display: flex;
      flex-direction: column;
      flex-grow: 1;

      & > p:nth-of-type(1) {
        font-size: 0.28rem;
        line-height: .75rem;
      }

      & > p:nth-of-type(2) {
        font-size: 0.22rem;
        color: $text_french;
      }
    }
  }
}
</style>
