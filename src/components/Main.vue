<template>
  <div>

    <div class="menu">
      <ul>
        <li v-for="item in menuList">
          <a :href="'/#/'+item.path">
            <img :src="item.img" alt="">
            <div>
              {{item.name}}
            </div>
          </a>
        </li>
      </ul>
    </div>

    <div class="body">
      <div class="header">
        <a  @click="hintError">
          <div style="line-height: 40px;padding:0 0 0 20px;color:#007bfc;font-weight: bold;float:left">
            最新公告:
          </div>
          <div style="float:left;line-height:40px;font-size:12px;font-color:#303133;">
            邀请注册，领取大礼
          </div>
          <div style="float:right;line-height: 40px; margin:0 40px 0 0">
            <el-link style="">
              <i class="el-icon-user-solid">
                 {{ userInfo.username }}
              </i>
            </el-link>
            <el-link style="">
              <i class="el-icon-s-comment" style="font-size:15px"> </i>
            </el-link>
          </div>
        </a>
      </div>
      <div class="content">

        <router-view/>
      </div>

    </div>

  </div>
</template>

<style scoped>
  .header {
    height: 40px;
    background: white;
    width: 100%;
    box-shadow: #ccc 1px 1px 1px;
  }

  .body {
    margin-left: 160px;
  }

  ul {

  }

  ul li {
    width: 160px;
    margin: 20px auto 30px auto;
    display: block;

  }

  img {
    cursor: pointer;
    width: 64px;
    height: 64px;
    transition: 0.5s;
  }

  img:hover {
    transform: translate(0px, -10px);;
  }
  svg {
    cursor: pointer;
    width: 64px;
    height: 64px;
    transition: 0.5s;
  }

  svg:hover {
    transform: translate(0px, -10px);;
  }

  svg:hover a {
    color: red;
  }

  .menu {
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    width: 160px;
    /*background-color: #409EFF;*/
    background: linear-gradient(#409EFF, #abcdef);
    border: 1px solid #d4d4ca;
    text-align: center;
    font-size: 13px;
    /*font-family: "微软雅黑", "宋体";*/
    color: #000000;
    height: 100%;
  }
</style>
<script>
  import request from '@/utils/Axios'
  // import TaskShow from '@/components/union/TaskShow'

  export default {
    name: "Main",
    components: {},
    created:function(){
      this.selectUser();
      request({
        url:"menu/list",
        method:"POST",
      }).then(res=>{
        res = res.data;
        if(res.code === 0){
          this.menuList = res.data;
          for(let i = 0 ;  i <= this.menuList.length ; i++){

            this.menuList[i].img =  this.menuList[i].icon
          }
        }else{
          Message({
              message: '发生未知错误',
              type:"error",
              duration: 2000,
          })
        }

      }).catch(res=>{

      });

/*
      request({
        url:"/menu/list",
        method:"POST",
      }).then(res=>{
      })
*/

    },
    data: function () {
      return {
        userInfo:{
          username:'',
        },
        menuList:[1,2,3],
        url: "../assets/icon/bill_icon.png",
        tableData: [{
          date: '2016-05-02 15:36',
          name: '王小虎',
          taskName: '收集猫的图片',
          type: 1,
          address: '上海市普陀区金沙江路 1518 弄',
          total: 100,
          now: 21,
          tag: '公司'
        }, {
          date: '2016-05-04 13:45',
          name: '张三',
          type: 1,
          taskName: '收集金丝雀的图片',
          total: 300,
          now: 21,
          address: '上海市普陀区金沙江路 1518 弄',
          tag: '学校'
        }, {
          date: '2016-05-01 13:23',
          name: '李四',
          type: 1,
          total: 100,
          now: 11,
          taskName: '收集猫的图片',
          address: '上海市普陀区金沙江路 1518 弄',
          tag: '学校'
        }, {
          date: '2016-05-03 14:00',
          name: '王五',
          type: 0,
          taskName: '收集猫的图片',
          total: 200,
          now: 1,
          address: '上海市普陀区金沙江路 1518 弄',
          tag: '公司'

        }],
      }
    },methods:{
      hintError(){
        Message({
            message: '该活动暂时已经结束',
            type:"error",
            duration: 2000,
        })
      },selectUser(){
        request({
          url: "user/newInfo",
          method: "POST",
          data: {}
        }).then(res => {
          console.log("user/newInfo:---------------------");
          res = res.data;
          console.log(res);
          if (res.code === 0) {
            this.userInfo = res.data;
            Message({message: res.msg, type: "success", duration: 2000,})
          } else {
            Message({message: res.msg, type: "error", duration: 2000,})
          }
          console.log("user/newInfo:|||||||||||||||||||||||||||||||||||||||||||")
        }).catch(res => {
          console.log("!!!!!!!!!!!!");
          console.log(res);
        })
      }
    },
    filters: {
      rateFilter(row) {
        return row.now;
      }
    }
  }
</script>
