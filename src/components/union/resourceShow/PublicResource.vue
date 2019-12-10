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
          <i class="el-icon-s-flag" @click="confirmCollection" style="cursor:pointer;margin: 0 0 0 20px">
            收藏
          </i>
        </el-col>
      </el-row>

    </el-card>


    <el-dialog :visible.sync="dialog.show" title="资源详情">
      <el-row>
        <el-col :xs="18" :sm="18" :lg="18" class="card-panel-col">
          <el-button type="success" @click="getDownloadUrl">下载文件路径</el-button>
          <el-button type="warning" @click="getDownloadUrl">请求上传图片</el-button>
          <el-button type="info" @click="cloneConfirm">克隆</el-button>
        </el-col>
        <el-col :xs="6" :sm="6" :lg="6" class="card-panel-col" style="text-align: right">
          <i class="el-icon-star-off" style="font-size:20px;margin:0 20px 0 20px;cursor:pointer" @click="collect">收藏</i>
          <i class="el-icon-s-flag" style="font-size:20px;cursor:pointer" @click="good">点赞</i>

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
    name: "PublicResource",
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
      confirmCollection() {
        MessageBox.confirm(
          '是否收藏该资源?',
          '确定收藏该资源',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then((res) => {
          this.collect();
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
      cloneConfirm() {

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
