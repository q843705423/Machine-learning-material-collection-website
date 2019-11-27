<template>
  <div style='' class="body">

    <br>
    <div class="magicBox">

    </div>
    <div class='loginBox'>
      <!-- 用户: <el-input style="width:200px" /> -->
      <el-row style='margin:0 auto 0 auto'>
        <div style="margin:0 auto 0 auto;color:#142149;font-size:40px;width:200px">
          欢迎回来
        </div>
      </el-row>

      <el-row>
        <el-input prefix-icon="el-icon-user" v-model='username' placeholder='用户名' class="inputClass"/>
      </el-row>
      <el-row>
        <el-input prefix-icon="el-icon-key" type='password' v-model='password' placeholder='密码' class="inputClass"/>
      </el-row>
      <el-row>
        <div class="forgetPasswordClass">
          <a href="forgetPassword">忘记密码</a>
        </div>
      </el-row>

      <el-row>
        <el-button type='primary' @click='login()' class="buttonClass"
                   v-loading="loginButtonLoading">登录
        </el-button>
      </el-row>

      <el-row style="">

        <!--
                <el-row style='margin-top:20px'>
                  <span>求救,我<router-link to='Forget' style='color:blue'>忘记了密码</router-link></span>
                </el-row>
                <el-row style='margin-top:20px'>
                  <span>我想要<router-link to='Login' style='color:blue'>注册账号</router-link></span>
                </el-row>
        -->
        <!-- <el-button  type='warning' @click='hello()' style="width:300px" class="button" >注册</el-button> -->
      </el-row>

    </div>
  </div>
</template>
<style scoped>
  a {
    text-decoration: none;
    color: #303133;
  }

  .forgetPasswordClass {
    width: 90%;
    text-align: right;
  }

  a:hover {
    color: #007bfc;
    transition: color .3s;
  }

  input {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .inputClass {
    margin: 0 5% 0 5%;
    width: 90%;
  }

  .buttonClass {
    margin: 5% 5% 10% 5%;
    width: 90%;;
  }

  .body {
    background: linear-gradient(90deg, #409EFF, #abcdef);
    position: absolute;
    z-index: 10;
    width: 100%;
    height: 100%;
    /*user-select: none;*/
    border-width: 10px;
    border-color: red;
  }

  .magicBox {
    /*border-radius: 50px;*/
    /*position:absolute;*/
    margin: auto;
    z-index: -1;
    border-style: solid;
    border-width: 100px;
    border-bottom-color: #409EFF;
    border-left-color: white;
    border-right-color: white;
    border-top-color: white;
    height: 0;
    width: 0;
    /*-webkit-transform: rotate(45deg);*/
    /*-moz-transform: rotate(45deg);*/
    /*-ms-transform: rotate(45deg);*/
    /*-o-transform: rotate(45deg);*/
    /*transform: rotate(45deg);*/
  }

  .loginBox {
    width: 360px;
    padding: 10px 10px;
    border-radius: 2px;
    margin-left: auto;
    margin-right: auto;
    background: white;
    /*border-width: 50px 50px 50px 50px;*/
    /*border-color: red blue yellow green;*/
  }
</style>
<script>

  import request from '@/utils/Axios'
  import {Message, MessageBox} from 'element-ui'

  export default {
    name: 'Login',
    created() {
      // this.hello();
    },
    data() {
      return {
        loginButtonLoading: false,
        username: "",
        password: "",

      }
    },
    methods: {
      login() {
        if (this.loginButtonLoading) {
          return;
        }
        this.loginButtonLoading = true;
        request({
          url: "user/login",
          method: 'POST',
          data: {
            username: this.username,
            password: this.password,
          },

        }).then(res => {
          this.loginButtonLoading = false;
          res = res.data;
          if (res.code === 0) {
            Message({message: '登录成功', type: "success", duration: 1000,})
            localStorage.setItem("ks", res.data.token);
            this.$router.push({path: this.redirect || '/main'})
          } else {
            Message({message: res.msg, type: "error", duration: 1000,})
          }
        }).catch(res => {
          this.loginButtonLoading = false;
        })
      },
    }


  }
</script>


