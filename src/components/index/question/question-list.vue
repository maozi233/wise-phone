<template>
  <div>
    <sy-header ref="header"></sy-header>

    <div class="tags"
        :style="{maxHeight: pullDownActive ? '10rem' : '1.9rem'}">
      <span class="tag flex-center single-line"
            v-for="(item, index) in tags" :key="index"
            @click="onClickTag(item.tagName)"
            :class="activeTagName === item.tagName ? 'active' : ''">
        {{item.tagName}}
      </span>
    </div>
    <div  class="flex-center tags-pulldown"
          @click="onPullDownClick"
          v-show="tags.length > 8"
          :class="pullDownActive ? 'active' : ''">
      <img src="~images/filter.png" >
    </div>

    <div class="list">
      <div  class="item"
            v-for="(item, index) in questions" :key="index"
            @click="onItemClick(item.qaQuestion.id, item.qaQuestion.content.content)">
        <img src="~images/question.png">
        <p class="des single-line">{{item.qaQuestion.title}}</p>
        <img src="~images/information-more.png">
      </div>
      <no-data v-if="questions.length === 0"></no-data>
    </div>

    <load-more ref="pageloader" :loadmore="loadMoreHandle" v-show="questions.length > 0"></load-more>

    <flex-popup ref="flexPop">
      <p class="title">发布问题</p>
      <input type="text" v-model="concatForm.name" placeholder="请输入标题">
      <textarea v-model="concatForm.des" placeholder="需求描述" maxlength="100"></textarea>
      <p class="des">描述最多100字</p>
      <button @click="sendRelease" class="flex-center">确认</button>
    </flex-popup>

    <div class="flex-bottom"></div>
    <flex-bottom  :showLeft="false"
                  :rightBtnName="'发布问题'"
                  :rightBtnHandle="release"></flex-bottom>
  </div>
</template>

<script>
import Header from 'comp/index/header'
import FlexBottom from 'comp/index/flex-bottom'
import FlexPopup from 'comp/index/flex-popup'
import NoData from 'comp/no-data'
import { Toast } from 'mint-ui'
import { QuestionService } from 'api/index/question-service'
import { PageModel } from 'model/page-model'
import LoadMore from 'comp/loadmore'

export default {
  components: {
    [Header.name]: Header,
    FlexBottom,
    FlexPopup,
    NoData,
    LoadMore
  },

  data () {
    return {
      questions: [],
      concatForm: {
        name: '',
        des: ''
      },
      tags: [],
      activeTagName: '',
      pager: new PageModel(),
      pullDownActive: false
    }
  },

  methods: {
    release () {
      this.$refs.flexPop.show()
    },

    sendRelease () {
      if (!this.concatForm.name || !this.concatForm.des) {
        return Toast('请填写完整')
      }
      this.$refs.flexPop.hide()
      this.questionService.add({
        title: this.concatForm.name,
        content: this.concatForm.des
      }).then(res => {
        Toast('发布成功,请等待后台审核')
      })
    },

    onItemClick (id, content) {
      this.$router.push({
        path: 'question/detail',
        query: {
          id,
          content
        }
      })
    },

    getQesList (tagName = '') {
      this.questionService.search({
        start: 0,
        limit: 10,
        tagName
      }).then(res => {
        if (res) {
          this.questions = res.list
          this.pager.reset()
          this.pager.setTotal(res.total)
        }
      })
    },

    loadMoreHandle () {
      let hasMore = this.pager.loadMore()
      if (hasMore) {
        this.questionService.search({
          start: this.pager.curPage,
          limit: this.pager.pageSize,
          tagName: this.activeTagName
        }).then(res => {
          if (res) {
            res.list.forEach(e => {
              this.questions.push(e)
            })
          }
          this.$refs.pageloader.close()
        })
      } else {
        this.$refs.pageloader.close()
      }
    },

    getTags () {
      this.questionService.tags()
        .then(res => {
          if (res) {
            this.tags = res
          }
        })
    },

    onClickTag (tagName) {
      this.getQesList(this.activeTagName = tagName)
    },

    onPullDownClick () {
      this.pullDownActive = !this.pullDownActive
    }
  },

  created () {
    this.questionService = new QuestionService()
  },

  mounted () {
    this.getQesList()
    this.getTags()
  }
}
</script>

<style lang="scss" scoped>
@import '~scss/shotcut';

.flex-bottom{
  height: 1rem;
}

.list{
  background: white;
  margin-bottom: 0.2rem;

  .item {
    text-align:left;
    font-size: 0.3rem;
    padding: 0 .3rem;
    height:.9rem;
    box-sizing: border-box;
    border-bottom: 1px solid $border-gray;
    display: flex;
    align-items: center;

    & > p {
      flex-grow: 1;
      padding-left: 0.1rem;
    }

    img:nth-child(1) {
      width: 0.3rem;
      height: 0.3rem;
    }

    img:nth-child(3) {
      width: 0.15rem;
      height: 0.28rem;
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
    margin-bottom:0;
  }

  p.des {
    line-height: .55rem;
    margin-bottom: .1rem;
    color: $text-french;
    text-indent: .5em;
  }

  p.title {
    font-size: .3rem;
    margin-bottom: .3rem;
    text-align: center;
  }

  button {
    width: 100%;
    height: .8rem;
    font-size: .36rem;
    color: white;
    background: $text-green;
  }

}

.tags {
  background: white;
  margin-top: 0.2rem;
  padding: .3rem .3rem .1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  box-sizing: border-box;
  max-height: 1.9rem;
  overflow-y: auto;
  transition: .3s all ;

  .tag {
    width: 21%;
    height: .6rem;
    padding: 0 .1rem;
    color: $text-french;
    border: 1px solid $text-french;
    font-size: 0.24rem;
    margin-bottom: 0.2rem;
    display: inline-flex;
    border-radius: .4rem;

    &.active {
      color: $text-green;
      border: 1px solid $text-green;
    }

    &:last-child(1) {
      margin-left:0;
    }
  }
}

.tags-pulldown {
  height: .6rem;
  background: white;
  margin-bottom: 0.2rem;

  &.active img{
    transform: rotateZ(180deg);
  }
}
</style>
