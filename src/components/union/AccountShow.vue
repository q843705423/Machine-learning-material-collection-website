<template>
  <div>

    <el-form ref="dataForm" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">


      <el-form-item label="账号">
        <el-input v-model="form.username"/>
      </el-form-item>


      <el-form-item label="用户名">
        <el-input v-model="form.nickname"/>
      </el-form-item>


      <el-form-item label="手机号">
        <el-input v-model="form.telephone"/>
      </el-form-item>


      <el-form-item label="开支">
        <el-input v-model="form.budget"/>
      </el-form-item>


      <el-form-item label="邮箱">
        <el-input v-model="form.email"/>
      </el-form-item>


      <el-form-item label="信用度">
        <el-input v-model="form.creditValue"/>
      </el-form-item>

    </el-form>
  </div>
</template>
<style>

</style>
<script>
  import request from '@/utils/Axios'
  import {Message, MessageBox} from 'element-ui'

  export default {
    name: "AccountShow",
    created: function () {
      this.selectUserInfo();

    },
    data: function () {
      return {
        form: {
          id: '',
          username: '',
          password: '',
          nickname: '',
          telephone: '',
          budget: '',
          email: '',
          validTime: '',
          creditValue: '',
        },

      };
    }, methods: {
      selectUserInfo(){
        request({
          url: "user/info",
          method: "POST",
          data: {}
        }).then(res => {
          this.showDialog = false;
          console.log("user/info:---------------------");
          res = res.data;
          console.log(res);
          if (res.code === 0) {
            this.form = res.data;
            Message({message: res.msg, type: "success", duration: 2000,})
          } else {
            Message({message: res.msg, type: "error", duration: 2000,})
          }
          console.log("user/info:|||||||||||||||||||||||||||||||||||||||||||")
        }).catch(res => {
          console.log("!!!!!!!!!!!!");
          console.log(res);
        })

      },
      hello() {

      }
    }, watch: {
      "test": function () {

      }
    }
  }
</script>
