<template>
  <div>
    <el-input v-model="keyword" placeholder="请输入关键字"/>
    <el-card v-for="item in list" class="box-card">

      <el-row>
        <el-col :xs="18" :sm="18" :lg="18" class="card-panel-col">
          <i class="el-icon-picture-outline" style="font-size:20px">
          <span style="color:blue;cursor:pointer;font-size:20px;" @click="showDialog(item)">
          {{ item.name }}
          </span>
          </i>
        </el-col>
        <el-col :xs="6" :sm="6" :lg="6" class="card-panel-col" style="text-align: right">
          <i class="el-icon-star-on">
            {{item.collectNumber}}
          </i>

        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="24" :lg="24" class="card-panel-col" style="margin: 10px 0 0 0 ">
          {{item.desc}}
        </el-col>
      </el-row>
      <el-row style="margin:20px 0 0 0 ">
        <el-col :xs="24" :sm="24" :lg="24" class="card-panel-col">
          更新于{{item.updateTime}}
        </el-col>

      </el-row>
      <el-row>

      </el-row>

    </el-card>


    <el-dialog :visible.sync="dialog.show" title="资源详情">
      <el-row>
        <el-col :xs="18" :sm="18" :lg="18" class="card-panel-col">
          <el-button type="success" @click="getDownloadUrl">下载文件路径</el-button>
          <el-button type="warning" @click="uploadPic">上传图片</el-button>
          <el-button type="primary" @click="audit">审核</el-button>

        </el-col>
        <el-col :xs="6" :sm="6" :lg="6" class="card-panel-col" style="text-align: right">
          <i class="el-icon-info" @click="openAndReadOnlyConfirm">开源只读</i>
          <i class="el-icon-info" @click="openAndCanChangeConfirm">开源可改</i>
          <!--          <el-button type="success" @click="openConfirm">开源且可修改</el-button>-->
        </el-col>

      </el-row>
      <el-row>
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="date"
            label="日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
          </el-table-column>
        </el-table>

      </el-row>
    </el-dialog>
  </div>

</template>
<style scoped>

  .box-card {
    /*height: 194px;*/
    /*width: 30%;*/
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 2px rgba(10, 16, 20, .24), 0 0 2px rgba(10, 16, 20, .12);
    box-sizing: border-box;
    transition: box-shadow .5s;
    /*max-width: 340px;*/
    /*min-width: 262px;*/
    margin: 24px 8px;
    /*padding-bottom: 48px;*/
    position: relative;

  }
</style>
<script>
  import axios from "axios";
  import {Message, MessageBox} from 'element-ui'
  import Cookies from 'js-cookie'

  export default {
    name: "MyResourceRepository",
    components: {Message, MessageBox},

    created: function () {

    },
    data: function () {
      return {
        dialog: {
          show: false,
        },
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        keyword: '',
        list: [
          {
            "name": "MengTo/Spring",
            "desc": "A library to simplify iOS animations in Swift.",
            "goodNumber": 12,
            "collectNumber": 1,
            "updateTime": "2019-12-10"
          },
        ],
      };
    }, methods: {
      openAndCanChangeConfirm() {
        MessageBox.confirm(
          '是否设置为开源可改?',
          '确定设置为开源可改',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then((res) => {
          this.openAndCanChange();
        })


      }, openAndCanChange() {
        Message({
          message: '设置成功',
          type: "success",
          duration: 2000,
        })
      },
      openAndReadOnlyConfirm() {
        MessageBox.confirm(
          '是否设置为开源只读?',
          '确定设置为开源只读',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then((res) => {
          this.openAndReadOnly();
        })
      }, openAndReadOnly() {
        Message({
          message: '设置为开源只读成功',
          type: "success",
          duration: 2000,
        })

      },
      openConfirm() {
        MessageBox.confirm(
          '是否将该资源集合开源?',
          '确定将该资源集合开源',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then((res) => {
        })

      },
      audit(){

      },
      uploadPic() {

      },
      cancelCollection() {
        Message({
          message: '取消收藏成功',
          type: "success",
          duration: 2000,
        })

      },
      collect() {
        Message({
          message: '收藏成功',
          type: "success",
          duration: 2000,
        })
      }, good() {
        Message({
          message: '点赞成功',
          type: "success",
          duration: 2000,
        })

      },

      getDownloadUrl() {
        Message({
          message: '已经将路径复制于剪切板',
          type: "success",
          duration: 2000,
        })

      },
      showDialog(row) {
        this.dialog.show = true;

      },
      hello() {

      }
    }, watch: {
      "test": function () {

      }
    }
  }
</script>
