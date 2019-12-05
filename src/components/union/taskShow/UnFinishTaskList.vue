<template>
  <div>
    <el-dialog title="查询详情" :visible.sync="dialog.show">
      <el-form ref="dataForm" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">

        <el-form-item label="id">
          <el-input v-model="form.id" readonly/>
        </el-form-item>

        <el-form-item label="标题">
          <el-input v-model="form.title" readonly/>
        </el-form-item>

        <el-form-item label="内容">
          <el-input v-model="form.content" readonly/>
        </el-form-item>

        <el-form-item label="类型">
          <el-input v-model="form.type" readonly/>
        </el-form-item>

        <el-form-item label="状态">
          <el-input v-model="form.status" readonly/>
        </el-form-item>

        <el-form-item label="开始时间">
          <el-input v-model="form.beginTime" readonly/>
        </el-form-item>

        <el-form-item label="结束时间">
          <el-input v-model="form.endTime" readonly/>
        </el-form-item>

        <el-form-item label="创建时间">
          <el-input v-model="form.createTime" readonly/>
        </el-form-item>

        <el-form-item label="每个任务的图片编号">
          <el-input v-model="form.pictureNumberEachTask" readonly/>
        </el-form-item>

        <el-form-item label="每项任务得分">
          <el-input v-model="form.eachTaskScore" readonly/>
        </el-form-item>

        <el-form-item label="任务数量">
          <el-input v-model="form.taskNumber" readonly/>
        </el-form-item>

        <el-form-item label="用户id">
          <el-input v-model="form.userId" readonly/>
        </el-form-item>

        <el-form-item label="任务完成数">
          <el-input v-model="form.taskFinishNumber" readonly/>
        </el-form-item>

        <el-form-item label="信用下限">
          <el-input v-model="form.lowerCreditLimit" readonly/>
        </el-form-item>

        <el-form-item label="任务接受量">
          <el-input v-model="form.taskAcceptNumber" readonly/>
        </el-form-item>

        <el-form-item label="资源id">
          <el-input v-model="form.resourceId" readonly/>
        </el-form-item>

        <el-form-item label="审核用户id">
          <el-input v-model="form.auditUserId" readonly/>
        </el-form-item>

        <el-form-item label="拒绝原因">
          <el-input v-model="form.rejectCause" readonly/>
        </el-form-item>

        <el-form-item label="资源名称">
          <el-input v-model="form.resourceName" readonly/>
        </el-form-item>

        <el-form-item label="插入时间">
          <el-input v-model="form.insertTime" readonly/>
        </el-form-item>

        <el-form-item label="更新时间">
          <el-input v-model="form.updateTime" readonly/>
        </el-form-item>
        <el-button type="info" @click="dialog.show = false">取消</el-button>
      </el-form>
    </el-dialog>
    <el-table
      v-loading="false"
      :data="list"
      element-loading-text="正在加载"
      border="" fit="" highlight-current-row="">
      <el-table-column align="center" label="ID">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>


      <el-table-column align="center" label="标题">
        <template slot-scope="scope">
          {{ scope.row.title}}
        </template>
      </el-table-column>

      <el-table-column align="center" label="内容">
        <template slot-scope="scope">
          {{ scope.row.content}}
        </template>
      </el-table-column>

      <el-table-column align="center" label="类型">
        <template slot-scope="scope">
          {{ scope.row.type}}
        </template>
      </el-table-column>

      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          {{ scope.row.status}}
        </template>
      </el-table-column>


      <el-table-column align="center" label="结束时间">
        <template slot-scope="scope">
          {{ scope.row.endTime}}
        </template>
      </el-table-column>

      <el-table-column align="center" label="创建时间">
        <template slot-scope="scope">
          {{ scope.row.createTime}}
        </template>
      </el-table-column>


      <el-table-column align="center" label="每项任务得分">
        <template slot-scope="scope">
          {{ scope.row.eachTaskScore}}
        </template>
      </el-table-column>


      <el-table-column align="center" label="任务完成数">
        <template slot-scope="scope">
          {{ scope.row.taskFinishNumber}}
        </template>
      </el-table-column>


      <el-table-column align="center" label="resourceName">
        <template slot-scope="scope">
          {{ scope.row.resourceName}}
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="200px">
        <template slot-scope="scope">
          <el-button type="primary" @click="detail(scope.row)">
            详情
          </el-button>
          <el-button type="primary" @click="hello">
            完成
          </el-button>

        </template>
      </el-table-column>

    </el-table>

  </div>
</template>
<style>

</style>
<script>
  import request from '@/utils/Axios'
  import {Message, MessageBox} from 'element-ui'
  import Cookies from 'js-cookie'

  export default {
    created: function () {
      this.selectData()

    },
    data: function () {
      return {
        dialog:{
          show:false,
        },
        list: [],

        form: {
          id: '',
          title: '',
          content: '',
          type: '',
          status: '',
          beginTime: '',
          endTime: '',
          createTime: '',
          pictureNumberEachTask: '',
          eachTaskScore: '',
          taskNumber: '',
          userId: '',
          taskFinishNumber: '',
          lowerCreditLimit: '',
          taskAcceptNumber: '',
          resourceId: '',
          auditUserId: '',
          rejectCause: '',
          resourceName: '',
          insertTime: '',
          updateTime: '',
        },

      };
    }, methods: {
      detail(row) {
        this.dialog.show =true
        this.form = row

      },
      hello() {

      },
      selectData() {
        request({
          url: "task/userPublicTaskList",
          method: "POST",
          data: {
            current: 1,
            size: 10,
          }
        }).then(res => {
          console.log("task/userPublicTaskList:---------------------");
          res = res.data;
          console.log(res);
          if (res.code === 0) {
            this.list = res.data.records;
          } else {
            Message({message: res.msg, type: "error", duration: 2000,})
          }
          console.log("task/userPublicTaskList:|||||||||||||||||||||||||||||||||||||||||||")
        }).catch(res => {
          console.log("!!!!!!!!!!!!");
          console.log(res);
        })

      }
    }, watch: {
      "test": function () {

      }
    }
  }
</script>
