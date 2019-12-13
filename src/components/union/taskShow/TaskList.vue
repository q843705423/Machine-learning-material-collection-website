<template>
  <div>
    <el-dialog :visible.sync="showDialog">
      <el-row>
        <el-col>
          <div style="text-align:center">
            <span style="font-size:16px">
              {{dialog.title}}
            </span>
          </div>
        </el-col>
      </el-row>
      <el-row style="margin: 20px 0 0 0 ">
        <el-col>
          <el-input type="textarea" readonly v-model="dialog.content"></el-input>
        </el-col>
      </el-row>
      <el-row style="font-size:20px;margin: 20px 0 0 20px">
        <el-col :xs="12" :sm="12" :lg="12" class="card-panel-col">
          <i class="el-icon-postcard">
            <span style="color:#409EFF"> {{dialog.lowerCreditLimit}} </span>
          </i>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="12" class="card-panel-col">
          <i class="el-icon-coin">
            <span style="color:#E6A23C">{{dialog.eachTaskScore}}</span>
          </i>
        </el-col>
      </el-row>
      <el-row style="font-size:20px;margin: 20px 0 0 20px">
        <el-col :xs="12" :sm="12" :lg="12" class="card-panel-col">
          <i class="el-icon-picture">
            {{dialog.pictureNumberEachTask}}
          </i>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="12" class="card-panel-col">
          <i class="el-icon-timer">
            {{dialog.endTime}}
          </i>
        </el-col>
      </el-row>
      <el-row style="font-size:20px;margin: 20px 0 0 20px">
        <el-col style="text-align:center">
          <el-button @click="acceptConfirm(dialog.id)" type="primary">
            接受任务
          </el-button>
        </el-col>
      </el-row>
    </el-dialog>

    <div style="margin: 0 0 20px 0">

      <el-input v-model="keyword" placeholder="请输入要搜索的关键词" style="width:400px"></el-input>
      <el-button type="primary" @click="selectData">搜索</el-button>
    </div>

    <el-row v-if="list.size == 0">
      抱歉，没有找到任何有关的数据
    </el-row>
    <el-row v-else v-loading="cardLoading" style="min-height: 570px">
      <el-col :xs="8" :sm="8" :lg="8" class="card-panel-col" v-for="item in list">
        <el-card>
          <el-row>
            <el-col :xs="18" :sm="18" :lg="18" class="card-panel-col">
              <i class="el-icon-s-opportunity">
                {{item.title}}
              </i>
            </el-col>
            <el-col :xs="6" :sm="6" :lg="6" class="card-panel-col">
              <el-button type="primary" @click="viewDetails(item)">
                查看详情
              </el-button>
            </el-col>

          </el-row>
          <el-row>
            <el-col :xs="8" :sm="8" :lg="8" class="card-panel-col">
              <i class="el-icon-s-custom">
                <span>{{item.nickName}}</span>
              </i>
            </el-col>
            <el-col :xs="8" :sm="8" :lg="8" class="card-panel-col">
              <i class="el-icon-postcard">
                <span style="color:#409EFF"> {{item.lowerCreditLimit}} </span>
              </i>
            </el-col>
            <el-col :xs="8" :sm="8" :lg="8" class="card-panel-col">
              <i class="el-icon-coin">
                <span style="color:#E6A23C">{{item.eachTaskScore}}</span>
              </i>
            </el-col>

          </el-row>
          <el-row>
            <el-col :xs="16" :sm="16" :lg="16" class="card-panel-col" style="margin: 10px 0 0 0">
              <el-progress :text-inside="true" :stroke-width="16"
                           :percentage="item.taskAcceptNumber * 100 /item.taskNumber"></el-progress>
            </el-col>
            <el-col :xs="8" :sm="8" :lg="8" class="card-panel-col" style="margin: 10px 0 0 0">
              <i class="el-icon-pie-chart">
                <span style="font-size:8px">{{item.hint}}</span>
              </i>
            </el-col>

          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <pagination v-show="listQuery.total>0" :total="listQuery.total" :page.sync="listQuery.current"
                :limit.sync="listQuery.limit" @pagination="selectData"/>
  </div>
</template>

<style scoped></style>
<script>
  import Pagination from '@/views/Pagination'
  import {Message, MessageBox} from 'element-ui'
  import request from '@/utils/Axios'
  export default {
    name:"TaskList",
    components: {Pagination},
    created: function () {
      this.selectData();

    },
    data: function () {
      return {
        keyword: "",
        cardLoading: false,
        list: [],
        dialog: {
          id: 1,
          title: "猫的图片",
          content: "收收收集10张猫的图片收集10张猫的图片收集10张猫的图片收集10张猫的图片收集10张猫的图片收集10张猫的图片收集10张猫的图片收集10张猫的图片收集10张猫的图片集10张猫的图片收收集10张猫的图片收集10张猫的图片收集10张猫的图片收集10张猫的图片收集10张猫的图片收集10张猫的图片收集10张猫的图片收集10张猫的图片收集10张猫的图片集10张猫的图片收收集10张猫的图片收集10张猫的图片收集10张猫的图片收集10张猫的图片收集10张猫的图片收集10张猫的图片收集10张猫的图片收集10张猫的图片收集10张猫的图片集10张猫的图片收收集10张猫的图片收集10张猫的图片收集10张猫的图片收集10张猫的图片收集10张猫的图片收集10张猫的图片收集10张猫的图片收集10张猫的图片收集10张猫的图片集10张猫的图片收收集10张猫的图片收集10张猫的图片收集10张猫的图片收集10张猫的图片收集10张猫的图片收集10张猫的图片收集10张猫的图片收集10张猫的图片收集10张猫的图片集10张猫的图片收收集10张猫的图片收集10张猫的图片收集10张猫的图片收集10张猫的图片收集10张猫的图片收集10张猫的图片收集10张猫的图片收集10张猫的图片收集10张猫的图片集10张猫的图片收收集10张猫的图片收集10张猫的图片收集10张猫的图片收集10张猫的图片收集10张猫的图片收集10张猫的图片收集10张猫的图片收集10张猫的图片收集10张猫的图片集10张猫的图片收集10张猫的图片收集10张猫的图片收集10张猫的图片收集10张猫的图片收集10张猫的图片收集10张猫的图片收集10张猫的图片收集10张猫的图片收集10张猫的图片集10张猫的图片",
          nickname: "其乐无穷",
          eachTaskScore: 0,
          pictureNumber: 0,
          lowerCreditLimit: 0,
          taskNumber: 0,

        },
        listQuery: {
          current: 1,
          limit: 10,
          total: 0,
          loading: false
        },
        showDialog: false,

      };
    }, methods: {
      closeDialog() {
        this.showDialog = false;
      },
      accept(taskId) {
        request({
          url: "task/accept",
          method: "POST",
          data: {
            taskId:taskId,
          }
        }).then(res => {
          this.showDialog = false;
          console.log("task/accept:---------------------");
          res = res.data;
          console.log(res);
          if (res.code === 0) {
            Message({message: res.msg, type: "success", duration: 2000,})
          } else {
            Message({message: res.msg, type: "error", duration: 2000,})
          }
          console.log("task/accept:|||||||||||||||||||||||||||||||||||||||||||")
        }).catch(res => {
          console.log("!!!!!!!!!!!!");
          console.log(res);
        })

      },
      acceptConfirm(taskId) {
        MessageBox.confirm(
          '是否接受[' + this.dialog.title + ']任务?',
          '确定接受该任务',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          this.accept(taskId)
        })

      },
      viewDetails(item) {
        this.dialog.id = item.id;
        this.dialog.title = item.title;
        this.dialog.content = item.content;
        this.dialog.nickname = item.nickname;
        this.dialog.eachTaskScore = item.eachTaskScore;
        this.dialog.pictureNumberEachTask = item.pictureNumberEachTask ;
        this.dialog.endTime = item.endTime ;
        this.dialog.lowerCreditLimit = item.lowerCreditLimit;
        this.dialog.taskNumber = item.taskNumber;
        this.showDialog = true;
      },
      selectData() {
        this.cardLoading = true;
        request({
          url: "task/list",
          method: "POST",
          data: {
            current: this.listQuery.current,
            size: this.listQuery.limit,
            keyword: this.keyword,
          }
        }).then(res => {
          this.cardLoading = false;
          res = res.data;
          if (res.code === 0) {
            this.listQuery.total = res.data.total;
            this.list = res.data.records;
          } else {
            Message({
              message: res.msg,
              type: "error",
              duration: 2000,
            })
          }
        }).catch(() => {
          this.cardLoading = false

        })

      },
    }, watch: {
      "test": function () {

      }
    }
  }
</script>

