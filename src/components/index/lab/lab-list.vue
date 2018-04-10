<template>
  <div>
    <img src="~images/lab1.png" class="logo">
    <div class="list">
      <div class="item" @click="onItemClick(3)">
        <span>实验室环境</span>
        <img src="~images/information-more.png">
      </div>
      <div class="item"  @click="onItemClick(4)">
        <span>实验室仪器设备</span>
        <img src="~images/information-more.png">
      </div>
      <div class="item"  @click="onItemClick(5)">
        <span>原料提供</span>
        <img src="~images/information-more.png">
      </div>
    </div>
    <img src="~images/lab2.png" class="point">
    <div class="des">
      <p class="title">实验室预约流程</p>
      <img src="~images/lab-erweima.png" class="erweima">
      <p class="content">关注公众号，了解预约详情</p>
    </div>

    <div class="stipulate">
      <div class="title">相关法律法规规定及实验室规定</div>
      <table>
        <thead>
          <th style="width:33.3%">名称</th>
          <th style="width:33.4%">简单描述</th>
          <th style="width:33.3%">超链接</th>
        </thead>
        <tbody>
          <tr>
            <td class="blue">《法律名称》</td>
            <td>简单描述</td>
            <td>附件</td>
          </tr>
          <tr>
            <td class="blue">《法律名称》</td>
            <td>简单描述</td>
            <td>附件</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="explain">
      <div class="tip">实验室须知</div>
      <div class="box">
        <p> 1.进入实验室之后需严格遵守实验室管理规定及各项安全规章制度。</p>
        <p> 2.严格遵守实验室人员行为规范，不在实验室区域从事与实验无关的活动。</p>
        <p> 3.进入实验室区域，熟悉实验室仪器设备、防护器材以及实验室相关应急措施。</p>
        <p> 4.未经允许，不可随意携带易燃易爆等受管控试剂和原料至实验室，不私自进行超出实验室范围外的实验活动。</p>
        <p> 5.不擅自改动实验室设施和仪器，不擅自使用未经允许的仪器和试剂，自觉维护实验室及公共区域卫生。</p>
        <p> 6.严格遵守实验室废弃物分类和处置规定，不将废物乱扔乱排，不明确分类的危险废弃物不擅自处理。</p>
        <p> 7.严格遵守实验室样品管理制度，不随意带出实验室资源和样品。</p>
      </div>
    </div>
    <sy-footer></sy-footer>
  </div>
</template>

<script>
import Footer from 'comp/index/footer'

export default {
  components: {
    [Footer.name]: Footer
  },

  methods: {
    onItemClick (index) {
      this.$router.push({
        path: 'lab/detail',
        query: {
          index
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~scss/shotcut';

.list > .item {
  height: .9rem;
  background: white;
  padding: 0 .3rem;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: .2rem;

  & > span {
    font-size: 0.3rem;
  }

  & > img {
    width: 0.15rem;
    height: 0.3rem;
  }
}

img {
  vertical-align: bottom;
  width: 100%;
}

.logo {
  height: 3rem;
}

.point {
  height: 3.6rem;
}

.des {
  background: white;
  text-align: center;
  padding: .15rem 0 .25rem;
  margin-bottom: 0.2rem;

  .title {
    font-size: 0.3em;
    line-height: .6rem;
  }

  .erweima {
    width: 2.4rem;
    height: 2.4rem;
    margin-bottom: 0.2rem;
  }

  .content {
    color: $text-french;
    font-size: 0.2rem;
  }
}

.stipulate {
  background: white;
  margin-bottom: .2rem;
  padding: 0 .3rem .3rem;

  .title {
    line-height: .88rem;
    font-size: 0.3rem;
  }

  table {
    font-size: 0.28rem;
    width: 100%;
    border-left: 1px solid #d4d4d4;
    border-top: 1px solid #d4d4d4;
    border-collapse: collapse;

    thead {
      background: #f3f3f3;
    }

    td {
      font-size: 0.24rem;
      color: $text-french;
    }
    .blue {
      color: $text-blue;
    }

    th,td {
      border-bottom: 1px solid #d4d4d4;
      border-right: 1px solid #d4d4d4;
      line-height: 0.86rem;
      padding: 0;
    }
  }
}

.explain {
  text-align: left;
  margin-bottom: 0.2rem;
  background: white;
  padding: .2rem .3rem;

  .tip {
    height: .8rem;
    line-height: .8rem;
    font-size: .28rem;
  }

  .box {
    & > P {
      line-height: .4rem;
      font-size: .24rem;
      color: $text-french;
      margin-bottom: 0.1rem;
    }
  }
}
</style>
