<template>
  <div>
    <back :title="'意见反馈'"> </back>
    <div class="main">
      <textarea class="des" placeholder="请输入您的宝贵意见" v-model="form.des"></textarea>
      <p class="hint">最多选择三张图片</p>
      <div class="img-box">
        <div class="img-content">
          <div class="imgs">
            <div  class="img-container"
                  v-for="(picurl, index) in form.pics" :key="index">
              <img :src="picurl" class="pic">
              <img src="~images/close.png" @click="onDeleteClick(index)" class="close">
            </div>
          </div>
          <label class="uploader" v-show="form.pics.length < 3">
            <input type="file" ref="uploadFile" accept="image/jpeg,image/jpg,image/png" @change="onSelectPic">
          </label>
        </div>
      </div>
      <button class="submit" @click="submitHandle">确定</button>
    </div>
  </div>
</template>

<script>
import Back from 'comp/index/back'
// import $ from 'jquery'
import axios from 'axios'
// import { fileupload } from 'blueimp-file-upload'
import { API_UPLOAD_URL } from 'utils/http-client'
import { Toast } from 'mint-ui'
import { Msg } from 'utils/tools'
import { ComplaintService } from 'api/manage/complaint-service.js'

export default {
  components: {
    Back
  },

  data () {
    return {
      form: {
        pics: [],
        des: ''
      }
    }
  },

  methods: {
    onSelectPic (e) {
      if (this.form.pics.length === 3) return Toast('最多选择三张图片')
      let formData = new FormData()
      let files = this.$refs.uploadFile.files

      console.log(files)
      if (files.length === 0) return
      formData.append('file', files[0])

      let config = {
        headers: {'Content-Type': 'multipart/form-data'}
      }

      Msg.loading()
      axios.post(`${API_UPLOAD_URL}&res=false`, formData, config)
        .then(res => {
          this.form.pics.push(res.path)
          Msg.hideLoading()
        })
    },

    onDeleteClick (index) {
      this.form.pics.splice(index, 1)
    },

    submitHandle () {
      if (!this.form.des) {
        return Toast('描述不能为空')
      }

      let params = {
        des: JSON.stringify(this.form),
        dataType: 2
      }

      this.complaintService.add(params)
        .then(res => {
          if (res) {
            Toast('您的建议我们已经收到')
            this.form.des = ''
            this.form.pics = []
            Msg.hideLoading()
          }
        })
    }
  },

  created () {
    // this.initUpload()
    this.complaintService = new ComplaintService()
  }
}
</script>

<style lang="scss" scoped>
@import '~scss/shotcut';

.main {
  padding: .3rem;
  background: white;

  .des {
    width: 100%;
    height: 2rem;
    border-radius: 4px;
    background: #fafafa;
    border: 1px solid #ccc;
    box-sizing: border-box;
    text-indent: .5em;
    padding: .1rem;
    line-height: 0.4rem;
    font-size: 0.28rem;
    color: $text-french;
    margin-bottom: 0.3rem;
    resize: none;
  }

  .img-box {
    display: flex;
    margin-bottom: 4rem;

    .img-content {
      display: flex;

      .imgs {
        display: flex;
        height: 1rem;

        .img-container{
          // width: 1rem;
          margin-right: 0.2rem;
          position: relative;

          .pic {
            width: 1rem;
            height: 100%;
          }

          .close {
            position: absolute;
            right: 0;
            top: 0;
            width: .25rem;
            height: 0.25rem;
            background: rgba(255, 255, 255, .6)
          }
        }
      }
    }

    .uploader {
      width: 1rem;
      height: 1.43rem;
      background: url('~images/feedback-add.png') no-repeat;
      background-size: 100% 100%;
      position: relative;
      display: inline-flex;
      background-size: cover;
      background-position: center;

      input {
        position: absolute;
        width:100%;
        height:100%;
        opacity: 0;
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

.hint {
  font-size: 0.2rem;
  margin-bottom: 0.1rem;
}
</style>
