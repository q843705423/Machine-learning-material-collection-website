<template>
  <div>

    <el-form ref="dataForm" label-position="left" label-width="70px" style="width: 400px; padding:20px 20px;">


      <el-form-item label="账号">
        <el-input v-model="form.username" readonly/>
      </el-form-item>


      <el-form-item label="用户名">
        <el-input v-model="form.nickname" readonly/>
      </el-form-item>

      <el-form-item label="信用度">
        <el-input v-model="form.creditValue" readonly/>
      </el-form-item>



      <el-form-item label="余额">
        <el-input v-model="form.budget" readonly/>
      </el-form-item>


      <el-form-item label="邮箱">
        <el-input v-model="form.email" readonly/>
      </el-form-item>

      <el-form-item label="手机号">
        <el-input v-model="form.telephone" readonly/>
      </el-form-item>


      <el-button type="primary" @click="updateUserConfirm">更新信息</el-button>

      <el-dialog title="修改用户信息" :visible.sync="dialog.show">
        <el-form ref="dataForm" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">

          <el-form-item label="电话">
            <el-input v-model="dataForm.telephone"/>
          </el-form-item>

          <el-form-item label="电子邮件">
            <el-input v-model="dataForm.email"/>
          </el-form-item>

        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button type="success" @click="update">确定</el-button>
          <el-button type="info" @click="dialog.show = false">取消</el-button>
        </span>
      </el-dialog>

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
        }, dialog: {
          show: false,
        }, dataForm: {
          telephone: '',
          email: '',
        },

      };
    }, methods: {
      update() {
        request({
          url: "user/updateInfo",
          method: "POST",
          data: {
            telephone: this.dataForm.telephone,
            email: this.dataForm.email,

          }
        }).then(res => {
          this.dialog.show = false;
          this.selectUserInfo();
          console.log("user/updateInfo:---------------------");
          res = res.data;
          console.log(res);
          if (res.code === 0) {
            Message({message: res.msg, type: "success", duration: 2000,})
          } else {
            Message({message: res.msg, type: "error", duration: 2000,})
          }
          console.log("user/updateInfo:|||||||||||||||||||||||||||||||||||||||||||")
        }).catch(res => {
          console.log("!!!!!!!!!!!!");
          console.log(res);
        })
      },
      updateUserConfirm() {
        this.dialog.show = true;
        this.dataForm.telephone = this.form.telephone;
        this.dataForm.email = this.form.email;
      },
      selectUserInfo() {
        request({
          url: "user/newInfo",
          method: "POST",
          data: {}
        }).then(res => {
          this.showDialog = false;
          console.log("user/info:---------------------");
          res = res.data;
          console.log(res);
          if (res.code === 0) {
            this.form = res.data;

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
