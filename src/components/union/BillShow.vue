<template>
  <div>
    <el-row>
      <el-col :xs="12" :sm="12" :md="12" :lg="12">
        账单信息
      </el-col>
      <el-col :xs="12" :sm="12" :md="12" :lg="12">
        <el-table
          v-loading="vLoading"
          :data="billList"
          element-loading-text="正在加载"
          border="" fit="" highlight-current-row="">
          <el-table-column align="center" label="ID" width="95">
            <template slot-scope="scope">
              {{ scope.$index }}
            </template>
          </el-table-column>
        </el-table>
        <pagination v-show="listQuery.total>0"
                    :total="listQuery.total"
                    :page.sync="listQuery.current"
                    :limit.sync="listQuery.limit"
                    @pagination="selectData"/>

      </el-col>
    </el-row>
  </div>
</template>
<style>

</style>
<script>
  import axios from "axios";
  import {Message, MessageBox} from 'element-ui'

  export default {
    name: "BillShow",
    created: function () {

    },
    data: function () {
      return {
        listQuery: {},
        billList: [],
        vLoading: false,
      };
    }, methods: {
      selectData() {
        this.vLoading = true;
        request({
          url: "bill/list",
          method: "POST",
          data: {}
        }).then(res => {
          console.log("bill/list:---------------------");
          res = res.data;
          console.log(res);
          if (res.code === 0) {
            this.billList = res.data.records;
            this.listQuery.total = res.data.total;
            this.vLoading = false;
          } else {
            Message({message: res.msg, type: "error", duration: 2000,})
          }
          console.log("bill/list:|||||||||||||||||||||||||||||||||||||||||||")
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
