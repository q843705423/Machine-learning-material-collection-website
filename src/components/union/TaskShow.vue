<template>
  <div>
    <h1 style="margin:20px 0 0 20px">任务</h1>
    <div style="padding:10px 0 0 10px">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="任务列表" name="first">
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
                    <el-button type="primary">
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
                    <el-progress :text-inside="true" :stroke-width="16" :percentage="item.taskAcceptNumber * 100 /item.taskNumber"></el-progress>
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
        </el-tab-pane>
        <el-tab-pane label="待完成任务" name="second">
          待完成任务
        </el-tab-pane>
        <el-tab-pane label="已接受任务" name="third">
          已接受任务
        </el-tab-pane>
        <el-tab-pane label="发布任务" name="four">
          <div>
            <el-form ref="form" label-position="left" label-width="100px" style="width: 600px; margin-left:20px;"
                     :rules="myRule" :model="form">

              <el-form-item label="任务名" prop="title">
                <el-input placeholder="请一句话描述你需要搜集的图片" v-model="form.title"></el-input>
              </el-form-item>

              <el-form-item label="详细信息" prop="content">
                <el-input type="textarea" :rows="8" placeholder="请详细描述图片的具体需求" v-model="form.content"></el-input>
              </el-form-item>
              <el-form-item label="需求量" prop="pictureNumber">
                <el-input type="number" placeholder="请输入所需要的图片张数" v-model="form.pictureNumber"></el-input>
              </el-form-item>
              <el-form-item label="划分子任务" prop="taskNumber">
                <el-input type="number" placeholder="划分成多少个子任务个数" v-model="form.taskNumber"></el-input>
              </el-form-item>
              <el-form-item label="最低信用限制" prop="lowerCreditLimit">
                <el-input type="number" placeholder="划分成多少个子任务个数" v-model="form.lowerCreditLimit"></el-input>
              </el-form-item>
              <el-form-item label="每份积分" prop="eachTaskScore">
                <el-input type="number" placeholder="" v-model="form.eachTaskScore"></el-input>
              </el-form-item>
              <el-form-item label="总积分数">
                <el-input placeholder="" v-model="allTaskValue" readonly></el-input>
              </el-form-item>
              <el-form-item label="开始时间" prop="beginTime">
                <el-date-picker v-model="form.beginTime" type="datetime" placeholder="选择起始时间"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                @change="beginTimeChange"></el-date-picker>
              </el-form-item>

              <el-form-item label="结束时间" prop="endTime">
                <el-date-picker v-model="form.endTime" type="datetime" placeholder="选择结束时间" @change="endTimeChange"
                                value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
              </el-form-item>

              <el-form-item label="">
                <el-button type="success" @click="insert">
                  确定
                </el-button>
                <el-button type="info" @click="clearForm">
                  清空
                </el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<style scoped>

</style>
<script>
  import {Message} from 'element-ui'
  import request from '@/utils/Axios'
  import Pagination from '@/views/Pagination'

  export default {
    name: "TaskShow",
    components: { Pagination},
    created: function () {
      this.selectData();
    },
    data: function () {
      return {
        cardLoading: false,
        keyword: "",
        list: [],
        listQuery: {
          current: 1,
          limit: 10,
          total: 0,
          loading: false
        },
        myRule: {
          title: [{required: true, message: '请输入任务名', trigger: 'blur'}],
          content: [{required: true, message: '详细内容不能为空', trigger: 'blur'}],
          pictureNumber: [{required: true, message: '任务总量不能为空', trigger: 'blur'}],
          taskNumber: [{required: true, message: '划分任务量不能为空', trigger: 'blur'}],
          eachTaskScore: [{required: true, message: '积分不能为空', trigger: 'blur'}],
          beginTime: [{required: true, message: '开始时间不能为空', trigger: 'blur'}],
          endTime: [{required: true, message: '结束时间不能为空', trigger: 'blur'}],

        },
        activeName: "first",
        allTaskValue: 0,
        form: {
          title: "",
          content: "",
          pictureNumber: "",
          taskNumber: "",
          eachTaskScore: "",
          beginTime: "",
          endTime: "",
          lowerCreditLimit:"",

        }
      }
    }, methods: {
      handleClick() {

      },
      beginTimeChange() {

      }, endTimeChange() {

      }, clearForm() {
        for (let key in this.form) {
          this.form[key] = ''
        }
      }, insert() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.insertData();
          }
        })
      }, insertData() {
        request({
          url: "task/insert",
          method: "POST",
          data: this.form
        }).then(res => {
          res = res.data;
          if (res.code === 0) {
            Message({message: '创建任务成功', type: "success", duration: 2000})
          } else {
            Message({message: res.msg, type: "error", duration: 2000})
          }

        }).catch(res => {
          if (res.indexOf("404") !== -1) {
            Message({message: '请求不存在', type: "error", duration: 2000,})
          }

        })
      }, selectData() {
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
            this.listQuery.total = res.data.total
            console.log(this.listQuery.total)
            this.list = res.data.records;
          } else {
            Message({
              message: res.msg,
              type: "error",
              duration: 2000,
            })
          }
        }).catch(res => {
          this.cardLoading = false

        })

      },
    },
    filters: {}
  }

</script>
