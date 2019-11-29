<template>
  <div>
    <el-row>
      <el-col :xs="12" :sm="12" :md="12" :lg="12">
        hello
      </el-col>
      <el-col :xs="12" :sm="12" :md="12" :lg="12">
        world
      </el-col>
    </el-row>
  </div>
</template>
<style>

</style>
<script>
  import axios from "axios";
  import {Message, MessageBox} from 'element-ui'
  import Cookies from 'js-cookie'

  export default {
    name:"BillShow",
    created: function () {

    },
    data: function () {
      return {};
    }, methods: {
      hello() {

      }
    }, watch: {
      "test": function () {

      }
    }
  }
</script>
