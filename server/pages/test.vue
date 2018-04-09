<template>
  <section class="container">
    <div class="dropdown">
      <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
        Dropdown
        <span class="caret"></span>
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
        <li><a href="#">Action</a></li>
        <li><a href="#">Another action</a></li>
        <li><a href="#">Something else here</a></li>
        <li role="separator" class="divider"></li>
        <li><a href="#">Separated link</a></li>
      </ul>
    </div>
    <div>
      <app-logo/>

      <el-form label-position="left" label-width="100px" :model="model" :rules="rules" :ref="formName">
        <el-form-item label="登录名" prop="name">
          <el-input v-model="model.name" :maxlength="maxLoginId"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" prop="password">
          <el-input v-model="model.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-col :span="12">
            <el-form-item>
              <el-input v-model="model.code" :maxlength="codeLen"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="text-right">
              <img :src="codeUrl" width="70" height="40" class="hand" @click="refreshCode">
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item>
          <button class="btn btn-success flat" @click="login($event)">登录</button>
          <button class="btn btn-default flat" @click="reset()">重置</button>
        </el-form-item>
      </el-form>
      <h1 class="title">
        <nuxt-link to="/posts">test-nuxt</nuxt-link><p></p>
        <nuxt-link to="/user/1234">test-router</nuxt-link><p></p>
        <nuxt-link to="/test/123717289791273">child router</nuxt-link>
      </h1>

      <nuxt-child/>
      <h2 class="subtitle">
        Nuxt.js project
      </h2>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          class="button--green">Documentation</a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey">GitHub</a>
      </div>
    </div>
    <img src="~/assets/images/logo-big.png" id="logo">

    <spinner></spinner>
    <div class="title">Hello world!</div>
    <span class="fa fa-chevron-left banner-icon-left banner-icon" aria-hidden="true"></span>
    <input type="file" class="upload-btn" name="file" ref="upload">
    <el-button @click="test">test</el-button>
    <el-button type="success" @click="test2">test</el-button>
  </section>

</template>

<script>

  import AppLogo from '~/components/AppLogo.vue';
  import _ from "lodash";
  // import "blueimp-file-upload";
  import axios from 'axios';
  import {API_UPLOAD_URL, API_URL} from "../utils/http-client";
  import spinner from "~/components/spinner.vue";
  // import "~/assets/sass/home-element-var.scss";
  import "element-ui/lib/theme-chalk/index.css";
  import {
    Button,
    Form,
    FormItem,
    Row,
    Col,
    Input
  } from "element-ui";
  import {Msg} from "../utils/tools";

  if (process.browser) {
    require('blueimp-file-upload')
  }
  export default {
    data(){
      return{
        refreshTime:new Date().getTime(),
        formName: 'loginForm',
        codeLen:4,
        maxLoginId: 11,
        model: {
          name: "",
          password: "",
          code:""
        },
        rules: {
          name: [
            {required: true, message: '请输入登录名称', trigger: 'blur'},
            {min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur'}
          ],
          password: [{required: true, message: '请输入登录密码', trigger: 'blur'}],
          code: [
            {required: true, message: '请输入验证码', trigger: 'blur'},
            {min: 4, max: 4, message: '长度为4个字符', trigger: 'blur'}
          ],
        }
      }
    },
    async asyncData ({ params }, callback) {
      // console.log(API_URL);
      // let { data } = await axios.get(`${API_URL}Index/index`);
      // let { data2 } = await axios.get(`${API_URL}ClientCategory/listCache?type=2`);
      axios.get(`${API_URL}ClientCategory/listCache?type=2`)
        .then((res) => {
          // console.log(res.data);
          callback(null, { title: res.data })
        });

      axios.get(`${API_URL}Index/index`)
        .then((res) => {
          // console.log(res.data);
          callback(null, { title: res.data })
        });
      // console.log(data.result.supplier,data2);
      // console.log(data2);
      // return { imgSrc: "" }
    },
    components: {
      spinner,
      AppLogo,
      [Button.name]:Button,
      [FormItem.name]:FormItem,
      [Form.name]:Form,
      [Row.name]:Row,
      [Col.name]:Col,
      [Input.name]:Input
    },
    mounted(){
      console.log(process.env.NODE_ENV);
      _.each([1,2,3],i=>{
        console.log(i);
      });

      this.initUpload();

    },
    computed:{
      codeUrl(){
        return `${API_URL}ClientVerifyCode/verify-code?_t=${this.refreshTime}`
      }
    },
    methods:{
      initUpload(){
        $(this.$refs.upload).fileupload({
          dataType: 'json',
          isLocal: true,
          add: (e, data) => {
            data.url = `${API_UPLOAD_URL}&res=false`;
            Msg.loading();
            data.submit();
          },
          done: (e, data) => {
            Msg.hideLoading();
            let result = data.result;
//            console.log(data);
            if (result.code === "0") {
              result.result.name = data.originalFiles[0]["name"];
              this.detail.qualificationsFile.push(result.result);
            } else {
              Msg.alert(result.msg);
            }
          }
        }, {
          xhrFields: {
            withCredentials: true
          }
        });
      },
      test(){
        Msg.alert("123");

      },
      test2(){
        Msg.loading();
        Msg.toast("123");
      },
      reset() {
        this.$refs[this.formName].resetFields();
      },
      refreshCode(){
        this.refreshTime = new Date().getTime();
      },
      login(event) {
        this.$refs[this.formName].validate((valid) => {
          if (valid) {

          }
        });
        event.preventDefault();
        event.stopPropagation();
        return false;
      }
    }
  }
</script>

<style>
  .container {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .title {
    font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
  }

  .subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
  }

  .links {
    padding-top: 15px;
  }
</style>
