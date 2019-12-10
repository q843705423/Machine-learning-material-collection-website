<template>
  <div>
    <h1 style="margin:20px 0 0 20px">资源</h1>
    <div style="padding:10px 0 0 10px">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="公共资源列表" name="first">
          <div v-if="activeName === 'first'">

            <PublicResource></PublicResource>
          </div>
        </el-tab-pane>
        <el-tab-pane label="收藏资源列表" name="second">
          <div v-if="activeName === 'second'">
            <CollectionResource></CollectionResource>

          </div>
        </el-tab-pane>
        <el-tab-pane label="我的资源仓库" name="third">
          <div v-if="activeName === 'third'">
            <MyResourceRepository></MyResourceRepository>

          </div>

        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<style>

</style>
<script>
  import {Message, MessageBox} from 'element-ui'
  import request from '@/utils/Axios'
  import Pagination from '@/views/Pagination'
  import PublicResource from "@/components/union/resourceShow/PublicResource"
  import CollectionResource from "./resourceShow/CollectionResource";
  import MyResourceRepository from "./resourceShow/MyResourceRepository";

  export default {
    name: "ResourceShow",
    components: {MyResourceRepository, CollectionResource, PublicResource},
    created: function () {

    },
    data: function () {
      return {
        activeName: "first",

      };
    }, methods: {
      handleClick(){

      },
      hello() {

      }
    }, watch: {
      "test": function () {

      }
    }
  }
</script>
