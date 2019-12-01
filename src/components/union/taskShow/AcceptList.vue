<template>
  <div>
    <el-table
      style="margin: 20px 1%;width:98%;"
      v-loading="acceptQuery.condition.loading"
      :data="acceptQuery.condition.records"
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
    </el-table>
              <pagination :v-if="ok" v-show="acceptQuery.condition.total>0" :total="condition.total" :page.sync="acceptQuery.condition.current"
                          :limit.sync="acceptQuery.condition.limit" @pagination="selectAcceptList"/>
  </div>
</template>
<style>

</style>
<script>
  import request from '@/utils/Axios'
  import Pagination from '@/views/Pagination'
  export default {
    name:"AcceptList",
    components: {Pagination},
    created: function () {
      this.selectAcceptList()
      this.ok = true;

    },
    data: function () {
      return {
        ok : false,
        acceptQuery:{
          condition:{
            current: 1,
            limit: 10,
            total: 0,
            loading: false
          },records:[

          ],

        },
      };
    }, methods: {
      selectAcceptList(){
        if(!this.ok){
          return ;
        }
        console.log("task/acceptList:---------------------");
        request({
          url: "subTask/acceptList",
          method: "POST",
          data: {}
        }).then(res => {
          console.log("task/acceptList:---------------------");
          res = res.data;
          console.log(res);
          if (res.code === 0) {
            this.acceptQuery.records = res.data.records;
            this.acceptQuery.condition.total = res.data.total;
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

      }
    }
  }
</script>
