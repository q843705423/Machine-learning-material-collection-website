<template>
  <div>
    <el-dialog title="图片上传" :visible.sync="continueFinishDialog.show">
      <el-row>
        <el-col :xs="24" :sm="24" :lg="24" class="card-panel-col">
          <el-upload
            :action="uploadActionUrl"
            ref="upload"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :http-request="uploadImg"
            :auto-upload="false">
            <el-button size="small" type="primary">选择图片</el-button>
          </el-upload>
          <el-button size="small" style="margin-left: 10px;" type="success" @click="submitUpload">
            上传到服务器
          </el-button>

        </el-col>
      </el-row>
    </el-dialog>
    <el-dialog title="查询详情" :visible.sync="viewDetailDialog.show">
      <el-form ref="dataForm" label-position="left" label-width="150px" style="width: 400px;margin-left:10px ">

        <el-form-item label="id">
          <el-input v-model="viewDetailForm.id" readonly/>
        </el-form-item>

        <el-form-item label="用户名">
          <el-input v-model="viewDetailForm.nickname" readonly/>
        </el-form-item>


        <el-form-item label="接受时间">
          <el-input v-model="viewDetailForm.acceptTime" readonly/>
        </el-form-item>


        <el-form-item label="开始时间">
          <el-input v-model="viewDetailForm.beginTime" readonly/>
        </el-form-item>

        <el-form-item label="结束时间">
          <el-input v-model="viewDetailForm.endTime" readonly/>
        </el-form-item>

        <el-form-item label="标题">
          <el-input v-model="viewDetailForm.title" readonly/>
        </el-form-item>

        <el-form-item label="内容">

          <el-input v-model="viewDetailForm.content" readonly type="textarea" :rows="10"/>
          <!--<el-input v-model="viewDetailForm.content" readonly/>-->
        </el-form-item>


        <el-form-item label="创建时间">
          <el-input v-model="viewDetailForm.createTime" readonly/>
        </el-form-item>

        <el-form-item label="任务所需图片数">
          <el-input v-model="viewDetailForm.pictureNumberEachTask" readonly/>
        </el-form-item>

        <el-form-item label="任务奖励">
          <el-input v-model="viewDetailForm.eachTaskScore" readonly/>
        </el-form-item>

        <el-form-item label="完成数量">
          <el-input v-model="viewDetailForm.finishNumber" readonly/>
        </el-form-item>

        <el-form-item label="任务数量">
          <el-input v-model="viewDetailForm.taskNumber" readonly/>
        </el-form-item>
        <el-form-item label="">
          <el-button type="info" @click="viewDetailDialog.show =false">关闭</el-button>

        </el-form-item>
      </el-form>
    </el-dialog>
    <el-table
      style="margin: 20px 1%;width:98%;"
      v-loading="listQuery.condition.loading"
      :data="listQuery.records"
      :header-row-style="{background:'#000',color:'#000'}"
      element-loading-text="正在加载"
      border="" fit="">

      <el-table-column align="center" label="序号" type="index">
      </el-table-column>
      <el-table-column align="center" label="标题">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>


      <el-table-column align="center" label="接受任务时间">
        <template slot-scope="scope">
          {{ scope.row.acceptTime}}
        </template>
      </el-table-column>


      <el-table-column align="center" label="完成量">
        <template slot-scope="scope">
          {{ scope.row.finishNumber}} / {{ scope.row.pictureNumberEachTask}}
        </template>
      </el-table-column>

      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.subStatus | subStatusToTagTypeFilter">

            {{ scope.row.subStatus | subStatusFilter}}
          </el-tag>
        </template>
      </el-table-column>


      <el-table-column align="center" label="结束时间">
        <template slot-scope="scope">
          {{ scope.row.endTime}}
        </template>
      </el-table-column>


      <el-table-column align="center" label="类型">
        <template slot-scope="scope">
          {{ scope.row.type | taskTypeFilter}}
        </template>
      </el-table-column>


      <el-table-column align="center" label="任务积分">
        <template slot-scope="scope">
          {{ scope.row.eachTaskScore}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="400px">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="viewDetail(scope.row)" >
            详情
          </el-button>
          <el-button size="mini" type="warning" @click="continueFinish(scope.row)" v-show="scope.row.subStatus===0">
            继续完成
          </el-button>
          <el-button size="mini" type="success" @click="finishTaskConfirm(scope.row)" v-show="scope.row.subStatus===0">
            完成任务
          </el-button>

          <el-button size="mini" type="danger" @click="abandonMission(scope.row)" v-show="scope.row.subStatus===0">
            放弃任务
          </el-button>

        </template>
      </el-table-column>


    </el-table>
    <div v-if="ok">
      <pagination :v-if="ok" v-show="listQuery.condition.total>0" :total="listQuery.condition.total"
                  :page.sync="listQuery.condition.current"
                  :limit.sync="listQuery.condition.limit" @pagination="selectAcceptList"/>
    </div>
  </div>
</template>
<style>

</style>
<script>
  import axios from 'axios'
  import {Message, MessageBox} from 'element-ui'
  import request from '@/utils/Axios'
  import Pagination from '@/views/Pagination'

  export default {
    name: "AcceptList",
    components: {Pagination},
    created: function () {
      this.selectAcceptList()
      this.ok = true;

    },
    data: function () {
      return {
        continueFinishDialog: {
          show: false
        },

        uploadActionUrl: 'api/resource/upload',
        ok: false,
        viewDetailDialog: {
          show: false,
        },
        viewDetailForm: {
          id: '',
          nickname: '',
          resourceId: '',
          acceptTime: '',
          userId: '',
          taskId: '',
          finishNumber: '',
          subStatus: '',
          beginTime: '',
          endTime: '',
          title: '',
          content: '',
          type: '',
          createTime: '',
          pictureNumber: '',
          eachTaskScore: '',
          taskNumber: '',
        },
        listQuery: {
          condition: {
            current: 1,
            limit: 10,
            total: 0,
            loading: false
          }, records: [],

        },
      };
    }, methods: {
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleExceed() {

      },
      uploadImg(val) {
        // alert("hello world");
        //RenameFileWithSuffixReserved
        let fd = new FormData();
        fd.append('subTaskId', this.viewDetailForm.id);
        fd.append('file', val.file);
        axios.post('api/resource/upload', fd, {
          headers: {
            'token': localStorage.getItem("ks")
          }
        }).then(res => {
          this.continueFinishDialog.show = false;
          res = res.data;
          if (res.code === 0) {
            Message({message: "上传图片成功", type: "success", duration: 2000})
          } else {
            Message({message: res.msg, type: "error", duration: 2000});
          }
          this.selectAcceptList();
        })
      },
      handleExceed() {
        console.log("handleExceed");

      },
      abandonMission(row) {

      },
      finishTaskConfirm(row) {
        MessageBox.confirm(
          '是否完成该任务?',
          '确定完成该任务',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then((res) => {
          this.finishsubTask(row.id)
        })

      }, finishsubTask(subTaskId) {
        request({
          url: "subTask/userFinishTask",
          method: "POST",
          data: {
            subTaskId: subTaskId
          }
        }).then(res => {
          this.selectAcceptList();
          console.log(":---------------------");
          res = res.data;
          console.log(res);
          if (res.code === 0) {
            Message({message: "任务完成成功", type: "success", duration: 2000,})

          } else {
            Message({message: res.msg, type: "error", duration: 2000,})
          }
          console.log(":|||||||||||||||||||||||||||||||||||||||||||");
        }).catch(res => {
          console.log("!!!!!!!!!!!!");
          console.log(res);
        })

      },
      continueFinish(row) {
        this.continueFinishDialog.show = true;
        this.viewDetailForm = row

      },
      viewDetail(row) {
        this.viewDetailDialog.show = true;
        this.viewDetailForm = row;
      },
      selectAcceptList() {
        console.log("task/acceptList:---------------------");
        request({
          url: "subTask/acceptList",
          method: "POST",
          data: {
            current: this.listQuery.condition.current,
            size: this.listQuery.condition.limit,
          }
        }).then(res => {
          console.log("task/acceptList:---------------------");
          res = res.data;
          console.log(res);
          if (res.code === 0) {
            this.listQuery.records = res.data.records;
            this.listQuery.condition.total = res.data.total;
          } else {
            Message({message: res.msg, type: "error", duration: 2000,})
          }
          console.log("task/acceptList:|||||||||||||||||||||||||||||||||||||||||||");
        }).catch(res => {
          console.log("!!!!!!!!!!!!");
          console.log(res);
        })
      },
      hello() {

      }
    }, watch: {
      "test": function () {

      },
    }, filters: {
      subStatusFilter(subStatus) {
        console.log("subStatus");
        console.log(subStatus);
        return subStatus === 0 ? '待完成' : '完成';
      },
      statusFilter(status) {

      },
      typeFilter(type) {

      }, subStatusToTagTypeFilter(subStatus) {
        return subStatus === 0 ? 'info' : 'success';
      }, taskTypeFilter(type) {
        return type;
        // return type === 0 ? "收集任务" : "分类任务"
        return "收集任务"
      }
    }
  }
</script>
