<template>
  <div>
    <el-dialog :visible.sync="dialog.show">
      <el-row>
        <el-row>
          <el-col style="text-align: center;font-size:20px;padding:10px 10px">
            审核任务
          </el-col>
        </el-row>
        <el-row>
          <el-col>

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

              <el-form-item label="图片总数">
                <el-input v-model="form.pictureNumber" readonly/>
              </el-form-item>

              <el-form-item label="每个子任务得分">
                <el-input v-model="form.eachTaskScore" readonly/>
              </el-form-item>

              <el-form-item label="子任务数">
                <el-input v-model="form.taskNumber" readonly/>
              </el-form-item>

              <el-form-item label="用户">
                <el-input v-model="form.userId" readonly/>
              </el-form-item>


              <el-form-item label="限制最低积分">
                <el-input v-model="form.lowerCreditLimit" readonly/>
              </el-form-item>

              <el-form-item label="任务接受量">
                <el-input v-model="form.taskAcceptNumber" readonly/>
              </el-form-item>

              <el-form-item label="">
                <el-button type="success" @click="agreeConfirm">
                  同意
                </el-button>
                <el-button type="danger" @click="rejectConfirm">
                  拒绝
                </el-button>
              </el-form-item>


            </el-form>

          </el-col>
          <el-col>

          </el-col>
          <el-col>

          </el-col>
        </el-row>

      </el-row>

    </el-dialog>
    <el-table
      style="margin: 20px 1%;width:98%;"
      v-loading="listQuery.loading"
      :data="list"
      :header-row-style="{background:'#000',color:'#000'}"
      element-loading-text="正在加载"
      :cell-style="cellStyle"
      border="" fit="">

      <el-table-column align="center" label="序号" type="index">
      </el-table-column>
      <el-table-column align="center" label="标题">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="内容">
        <template slot-scope="scope">
          {{ scope.row.content }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="开始时间">
        <template slot-scope="scope">
          {{ scope.row.beginTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="结束时间">
        <template slot-scope="scope">
          {{ scope.row.endTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="audit(scope.row)">审核</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="listQuery.total>0" :total="listQuery.total" :page.sync="listQuery.current"
                :limit.sync="listQuery.limit" @pagination="selectData"/>

  </div>
</template>
<style>

</style>
<script>
  import Pagination from '@/views/Pagination'
  import request from '@/utils/Axios'
  import {Message, MessageBox} from 'element-ui'

  export default {
    created: function () {
      this.selectData();

    },
    components: {Pagination},
    data: function () {
      return {
        form: {
          id: "",
          title: "",
          content: "",
          type: "",
          status: "",
          beginTime: "",
          endTime: "",
          createTime: "",
          pictureNumber: "",
          eachTaskScore: "",
          taskNumber: "",
          userId: "",
          taskFinishNumber: "",
          lowerCreditLimit: "",
          taskAcceptNumber: "",
          resourceId: "",
          auditUserId: "",
          rejectCause: "",
        },
        dialog: {
          show: false,
        },
        list: [],
        listQuery: {
          loading: false,
          current: 1,
          limit: 10,
          total: 0,
        },

      };
    }, methods: {
      agreeConfirm(){
        MessageBox.confirm(
          '是否?',
          '确定',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then((res) => {
        })

      },agree(){

      },
      rejectConfirm(){

      },reject(){

      },
      audit(row) {
        this.form = row
        this.dialog.show = true;


      },
      cellStyle({row, column, rowIndex, columnIndex}) {
        if (rowIndex % 2 === 0) {
          return 'background:#f3f7fd;'
        } else {
          return 'background:#FFF;'
        }
      },
      selectData() {
        console.log("selectData")
        request({
          url: "task/unAuditList",
          method: "POST",
          data: {
            current: this.listQuery.current,
            size: this.listQuery.limit,

          }
        }).then(res => {
          console.log("selectData");
          res = res.data;
          console.log(res);
          if (res.code === 0) {
            this.list = res.data.records;
            this.listQuery.total = res.data.total

          } else {
            Message({message: res.msg, type: "error", duration: 2000,})
          }

        }).catch(res => {
          console.log(res)

        })

      }
    }, watch: {
      "test": function () {

      }
    }
  }
</script>
