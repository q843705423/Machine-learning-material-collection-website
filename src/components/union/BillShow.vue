<template>
  <div>
    <el-row style="padding:20px 20px">
      <h2>账单信息</h2>
    </el-row>
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="24">
        <el-table
          v-loading="vLoading"
          :data="billList"
          style="padding:  20px 20px"
          element-loading-text="正在加载"
          border="" fit="" highlight-current-row="">
          <el-table-column align="center" label="ID" width="95">
            <template slot-scope="scope">
              {{ scope.$index }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="条目">
            <template slot-scope="scope">
              {{ scope.row.item}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="金额">
            <template slot-scope="scope">
              {{ scope.row.amount}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="类型">
            <template slot-scope="scope">
              <!--              {{ scope.row.type}}-->
              <el-tag :type="scope.row.type | typeShowFilter">
                {{ scope.row.type | typeFilter}}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="创建时间">
            <template slot-scope="scope">
              {{ scope.row.createTime}}
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
  import Pagination from '@/views/Pagination'
  import request from '@/utils/Axios'
  import axios from "axios";
  import {Message, MessageBox} from 'element-ui'

  export default {
    name: "BillShow",
    components: {Message, MessageBox, Pagination},
    created: function () {
      this.selectData();

    },
    data: function () {
      return {
        listQuery: {
          current: 1,
          size: 10,
        },
        billList: [],
        vLoading: false,
      };
    }, methods: {
      selectData() {
        this.vLoading = true;
        request({
          url: "bill/list",
          method: "POST",
          data: {
            current: this.listQuery.current,
            size: this.listQuery.size,
          }
        }).then(res => {
          this.vLoading = false;
          console.log("bill/list:---------------------");
          res = res.data;
          console.log(res);
          if (res.code === 0) {
            this.billList = res.data.records;
            this.listQuery.total = res.data.total;
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
    }, filters: {
      typeShowFilter(type) {
        let m = {
          "-1": "danger",
          "1": "success",
          "0": "info",
        };
        return m[type + ""]

      }, typeFilter(type) {
        let m = {
          "-1": "支出",
          "1": "收入",
          "0": "未知",
        };
        return m[type + ""]
        // return '支出'

      }

    }
  }
</script>
