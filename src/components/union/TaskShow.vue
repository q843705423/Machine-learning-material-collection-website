<template>
  <div>
    <h1 style="margin:20px 0 0 20px">任务</h1>
    <div style="padding:10px 0 0 10px">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="任务列表" name="first">
          任务列表
        </el-tab-pane>
        <el-tab-pane label="待完成任务" name="second">
          待完成任务
        </el-tab-pane>
        <el-tab-pane label="已接受任务" name="third">
          已接受任务
        </el-tab-pane>
        <el-tab-pane label="发布任务" name="four">
          发布任务
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<style scoped>

</style>
<script>
  export default {
    name: "TaskShow"
  }

</script>
