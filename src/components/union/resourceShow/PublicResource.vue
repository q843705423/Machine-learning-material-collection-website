<template>
  <div>
    <el-input v-model="keyword" placeholder="请输入关键字"/>
    <el-card v-for="item in list" class="box-card">

      <el-row>
        <el-col :xs="18" :sm="18" :lg="18" class="card-panel-col">
          <i class="el-icon-picture-outline" style="font-size:20px">
          <span style="color:blue;cursor:pointer;font-size:20px;" @click="showDialog(item)">
          {{ item.resourceName }}
          </span>
          </i>
        </el-col>
        <el-col :xs="6" :sm="6" :lg="6" class="card-panel-col" style="text-align: right">
          <i class="el-icon-star-on">
            {{item.collectNumber}}
          </i>

        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="24" :lg="24" class="card-panel-col" style="margin: 10px 0 0 0 ">
          {{item.describeContent}}
        </el-col>
      </el-row>
      <el-row style="margin:20px 0 0 0 ">
        <el-col :xs="24" :sm="24" :lg="24" class="card-panel-col">
          更新于{{item.updateTime}}
          <i class="el-icon-s-flag" @click="confirmCollection" style="cursor:pointer;margin: 0 0 0 20px">
            收藏
          </i>
        </el-col>
      </el-row>

    </el-card>

    <el-dialog :visible.sync="dialog.show" title="资源详情">
      <el-row>
        <el-col :xs="18" :sm="18" :lg="18" class="card-panel-col">
          <el-button type="success" @click="getDownloadUrl">下载文件路径</el-button>
          <el-button type="warning" @click="getDownloadUrl">请求上传图片</el-button>
          <el-button type="info" @click="cloneConfirm">克隆</el-button>
        </el-col>
        <el-col :xs="6" :sm="6" :lg="6" class="card-panel-col" style="text-align: right">
          <i class="el-icon-star-off" style="font-size:20px;margin:0 20px 0 20px;cursor:pointer"
             @click="confirmCollection">收藏</i>
          <i class="el-icon-s-flag" style="font-size:20px;cursor:pointer" @click="good">点赞</i>

        </el-col>

      </el-row>
      <el-row>
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="url"
            label="图片">
               <template slot-scope="scope">
                 <el-popover
                  placement="right"
                  title=""
                  trigger="hover">
            <span slot="reference"> {{scope.row.url}}</span>

                  <img  :src="'http://127.0.0.1:8080/resourceImg/img/'+scope.row.url"
                       :alt="scope.row.picture" style="max-height: 350px;max-width: 350px">
               </el-popover>
                </template>
          </el-table-column>
          <el-table-column
            prop="uploadTime"
            label="日期"
            width="180">
          </el-table-column>
        </el-table>

        <pagination  v-show="listQueryByImgList.total>0" :total="listQueryByImgList.total"
                    :page.sync="listQueryByImgList.current"
                    :limit.sync="listQueryByImgList.limit" @pagination="requestImgList"/>


      </el-row>
    </el-dialog>

    <el-popover placement="right" title="" trigger="hover">
      <img :src="url" alt="hello"/>

    </el-popover>
  </div>

</template>
<style scoped>

  .box-card {
    /*height: 194px;*/
    /*width: 30%;*/
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 2px rgba(10, 16, 20, .24), 0 0 2px rgba(10, 16, 20, .12);
    box-sizing: border-box;
    transition: box-shadow .5s;
    /*max-width: 340px;*/
    /*min-width: 262px;*/
    margin: 24px 8px;
    /*padding-bottom: 48px;*/
    position: relative;

  }
</style>
<script>
  import Pagination from '@/views/Pagination'
  import {Message, MessageBox} from 'element-ui'
  import request from '@/utils/Axios'

  export default {
    name: "PublicResource",
    components: {Message, MessageBox,Pagination},
    created: function () {
      this.selectData();

    },
    data: function () {
      return {
        listQueryByImgList:{
          current:1,
          size:10,
        },
        url:'',
        dialog: {
          show: false,
          resourceId: -1,
        },
        tableData: [],
        keyword: '',
        list: [
          {
            "name": "MengTo/Spring",
            "desc": "A library to simplify iOS animations in Swift.",
            "goodNumber": 12,
            "collectNumber": 1,
            "updateTime": "2019-12-10"
          },
        ],
      };
    }, methods: {
      cal(url){
        console.log(url)
        return require(url)
      },
      selectData() {
        request({
          url: "resource/resourceOpenList",
          method: "POST",
          data: {
            current: 1,
            size: 10,
            keyword: this.keyword,

          }
        }).then(res => {
          this.dialog.show = false;
          console.log(":---------------------");
          res = res.data;
          console.log(res);
          if (res.code === 0) {
            this.list = res.data.records;
          } else {
            Message({message: res.msg, type: "error", duration: 2000,})
          }
          console.log(":|||||||||||||||||||||||||||||||||||||||||||")
        }).catch(res => {
          console.log("!!!!!!!!!!!!");
          console.log(res);
        })

      },
      confirmCollection() {
        MessageBox.confirm(
          '是否收藏该资源?',
          '确定收藏该资源',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then((res) => {
          this.collect();
        })

      },
      collect() {
        request({
          url: "resource/collect",
          method: "POST",
          data: {
            resourceId: this.dialog.resourceId,
          }
        }).then(res => {
          console.log("resource/collect:---------------------");
          res = res.data;
          console.log(res);
          if (res.code === 0) {
            Message({message: "收藏资源集成功", type: "success", duration: 2000,})
          } else {
            Message({message: res.msg, type: "error", duration: 2000,})
          }
          console.log("resource/collect:|||||||||||||||||||||||||||||||||||||||||||")
        }).catch(res => {
          console.log("!!!!!!!!!!!!");
          console.log(res);
        });
      }, good() {
        request({
          url: "resource/good",
          method: "POST",
          data: {
            resourceId: this.dialog.resourceId,
          }
        }).then(res => {
          console.log("resource/good:---------------------");
          res = res.data;
          console.log(res);
          if (res.code === 0) {
            Message({message: '点赞成功', type: "success", duration: 2000,})
          } else {
            Message({message: res.msg, type: "error", duration: 2000,})
          }
          console.log("resource/good:|||||||||||||||||||||||||||||||||||||||||||")
        }).catch(res => {
          console.log("!!!!!!!!!!!!");
          console.log(res);
        });

      },
      cloneConfirm() {

      },
      getDownloadUrl() {
        Message({
          message: '已经将路径复制于剪切板',
          type: "success",
          duration: 2000,
        })

      },
      showDialog(row) {
        this.dialog.show = true;
        this.dialog.resourceId = row.id;
        this.requestImgList();

      }, requestImgList() {
        request({
          url: "resourceImg/listImg",
          method: "POST",
          data: {
            current: 1,
            size: 10,
            resourceId: this.dialog.resourceId,
          }
        }).then(res => {
          // this.dialog.show = false;
          console.log("resourceImg/listImg:---------------------");
          res = res.data;
          console.log(res);
          if (res.code === 0) {
            this.tableData = res.data.records;
            this.listQueryByImgList.total = res.data.total
            Message({
                message: res.data.total,
                type:"success",
                duration: 2000,
            })
          } else {
            Message({message: res.msg, type: "error", duration: 2000,})
          }
          console.log("resourceImg/listImg:|||||||||||||||||||||||||||||||||||||||||||")
        }).catch(res => {
          console.log("!!!!!!!!!!!!");
          console.log(res);
        })

      },
      hello() {
        Message({
            message: 'hello',
            type:"success",
            duration: 2000,
        })

      },world(){
        Message({
            message: 'world',
            type:"error",
            duration: 2000,
        })
      }
    }, watch: {
      "test": function () {

      }
    }
  }
</script>
