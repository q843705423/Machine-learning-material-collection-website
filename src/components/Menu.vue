<template>
  <div>
    <div class='header'>

      <div class='title' style='font-size:40px;float:left;margin:20px 0 0 20%;'>机器学习素材收集网</div>
      <!--
            <div class="menu" style='margin:0 0 0 100px;'>
              <ul>
                <li>
                  <router-link to="/home">首页</router-link>
                </li>
                <li>
                  <router-link to="/home">查看需求</router-link>
                </li>
              </ul>
            </div>
      -->
      <div class="login">
        <!--<el-button style='background:rgba(255,255,255,0);color:#eee;margin:25px 0 0 100;'>登录</el-button>-->
        <el-button @click="goLoginInterface" style='background:rgba(255,255,255,0);color:#eee;margin:25px 0 0 100px;'>
          登录
        </el-button>
        <!-- <router-link to="/login">登录</router-link> -->
      </div>
    </div>
  </div>

</template>
<style scoped>
  .menu {

    float: left;
  }

  .title {

    color: #eeeeee;
  }

  .menu ul li {
    float: left;
    list-style: none;
    margin: 30px 0 0 40px;
  }

  .menu ul li a {
    font-size: 20px;
    text-decoration: none;
    color: #eeeeee;
  }

  .menu ul li a:hover {
    font-size: 20px;
    text-decoration: none;

    color: rgba(226, 227, 255, 1);
  }


  .login {
    float: left;
    margin: 0 0 0 200px;
  }

  .header {
    background: #409EFF;
    width: 100%;
    height: 90px;
  }

</style>

<script>
  export default {
    name: 'Menu',
    methods: {
      goLoginInterface(){
        this.$router.push({path: "/login"})
      }
    }

  }
</script>
