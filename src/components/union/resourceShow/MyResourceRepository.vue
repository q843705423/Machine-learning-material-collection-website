<template>
  <div>
    <el-input v-model="keyword" placeholder="请输入关键字" @keyup.enter.native="getMyResourceList"  />
     
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
        </el-col>

      </el-row>
      <el-row>

      </el-row>

    </el-card>
    <pagination v-show="resourceQuery.total>0"
                :total="resourceQuery.total"
                :page.sync="resourceQuery.current"
                :limit.sync="resourceQuery.size"
                @pagination="getMyResourceList"/>


    <el-dialog :visible.sync="dialog.show" title="资源详情">
      <el-row>
        <el-col :xs="18" :sm="18" :lg="18" class="card-panel-col">
          <el-button type="success" @click="getDownloadUrl">下载文件路径</el-button>
          <el-button type="warning" @click="uploadPic">上传图片</el-button>
          <el-button type="primary" @click="audit">审核</el-button>

        </el-col>
        <el-col :xs="6" :sm="6" :lg="6" class="card-panel-col" style="text-align: right">
          <i class="el-icon-info" @click="openAndReadOnlyConfirm" style="margin: 0 0 0 20px;cursor:pointer">开源只读</i>
          <i class="el-icon-info" @click="openAndCanChangeConfirm" style="margin: 0 20px 0 20px;cursor:pointer">开源可改</i>
          <!--          <el-button type="success" @click="openConfirm">开源且可修改</el-button>-->
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
                    <img :src="'http://127.0.0.1:8080/resourceImg/img/'+scope.row.url"
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
        <pagination v-show="listQueryByImgList.total>0"
                    :total="listQueryByImgList.total"
                    :page.sync="listQueryByImgList.current"
                    :limit.sync="listQueryByImgList.size"
                    @pagination="requestImgList"/>

      </el-row>
    </el-dialog>
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
  import Cookies from 'js-cookie'

  export default {
    name: "MyResourceRepository",
    components: {Message, MessageBox, Pagination},

    created: function () {
      this.getMyResourceList()

    },
    data: function () {
      return {
        listQueryByImgList: {
          current: 1,
          size: 10,
          total: 0,

        },
        resourceQuery: {
          current: 1,
          size: 10,
          total: 0,
        },
        form: {
          resourceId: -1,
        },
        READ_ONLY_OPEN: 1,
        OPEN: 2,
        list: [],
        keyword: '',
        dialog: {
          show: false,
        },
        tableData: [],
      };
    }, methods: {
      getMyResourceList() {
        request({
          url: "resource/userResourceList",
          method: "POST",
          data: {
            current: this.resourceQuery.current,
            size: this.resourceQuery.size,
            keyword: this.keyword
          }
        }).then(res => {
          this.dialog.show = false;
          console.log("resource/userResourceList:---------------------");
          res = res.data;
          console.log(res);
          if (res.code === 0) {
            this.list = res.data.records;
            this.resourceQuery.total = res.data.total
          } else {
            Message({message: res.msg, type: "error", duration: 2000,})
          }
          console.log("resource/userResourceList:|||||||||||||||||||||||||||||||||||||||||||")
        }).catch(res => {
          console.log("!!!!!!!!!!!!");
          console.log(res);
        })
      },
      openAndCanChangeConfirm() {
        MessageBox.confirm(
          '是否设置为开源可改?',
          '确定设置为开源可改',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then((res) => {
          this.open(this.form.resourceId, this.OPEN);
        })


      }, open(resourceId, type) {
        request({
          url: "resource/toPublicResource",
          method: "POST",
          data: {
            resourceId: resourceId,
            type: type,

          }
        }).then(res => {
          this.dialog.show = false;
          console.log(":---------------------");
          res = res.data;
          console.log(res);
          if (res.code === 0) {
            Message({message: "开源成功", type: "success", duration: 2000,})
          } else {
            Message({message: res.msg, type: "error", duration: 2000,})
          }
          console.log(":|||||||||||||||||||||||||||||||||||||||||||")
        }).catch(res => {
          console.log("!!!!!!!!!!!!");
          console.log(res);
        })
      },
      openAndReadOnlyConfirm() {
        MessageBox.confirm(
          '是否设置为开源只读?',
          '确定设置为开源只读',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then((res) => {
          console.log(this.form.resourceId)
          console.log(this.READ_ONLY_OPEN)
          this.open(this.form.resourceId, this.READ_ONLY_OPEN);
        })
      }, openAndReadOnly() {
        Message({
          message: '设置为开源只读成功',
          type: "success",
          duration: 2000,
        })

      },

      requestImgList() {
        request({
          url: "resourceImg/listImg",
          method: "POST",
          data: {
            current: this.listQueryByImgList.current,
            size: this.listQueryByImgList.size,
            resourceId: this.form.resourceId,
          }
        }).then(res => {
          console.log("resourceImg/listImg:---------------------");
          res = res.data;
          console.log(res);
          if (res.code === 0) {
            console.log("?????????????????????")
            this.tableData = res.data.records;
            this.listQueryByImgList.total = res.data.total
          } else {
            Message({message: res.msg, type: "error", duration: 2000,})
          }
          console.log("resourceImg/listImg:|||||||||||||||||||||||||||||||||||||||||||")
        }).catch(res => {
          console.log("!!!!!!!!!!!!");
          console.log(res);
        })

      },
      openConfirm() {
        MessageBox.confirm(
          '是否将该资源集合开源?',
          '确定将该资源集合开源',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then((res) => {
        })

      },
      audit() {

      },
      uploadPic() {

      },
      cancelCollection() {
        Message({
          message: '取消收藏成功',
          type: "success",
          duration: 2000,
        })

      },
      collect() {
        Message({
          message: '收藏成功',
          type: "success",
          duration: 2000,
        })
      }, good() {
        Message({
          message: '点赞成功',
          type: "success",
          duration: 2000,
        })

      },

      setClip(content) {
        var oInput = document.createElement('input');
        oInput.value = content;
        document.body.appendChild(oInput);
        oInput.select();
        document.execCommand("Copy");
        oInput.className = 'oInput';
        oInput.style.display = 'none';
      },
      getDownloadUrl() {
        request({
          url: "resource/downloadUrl",
          method: "POST",
          data: {
            resourceId: this.form.resourceId,
          }
        }).then(res => {
          res = res.data;
          console.log("---------------");
          console.log(res);
          if (res.code === 0) {
            this.setClip(res.data);
            Message({message: '已经将路径复制于剪切板', type: "success", duration: 2000})
          } else {
            Message({message: res.msg, type: "error", duration: 2000,})
          }
        }).catch(res => {
          Message({
            message: '发生未知错误',
            type: "error",
            duration: 2000,
          })
        })

      },
      showDialog(row) {
        this.dialog.show = true;
        console.log("row")
        console.log(row)
        this.form.resourceId = row.id;
        this.requestImgList();

      },
      hello() {

      }
    }, watch: {
      "test": function () {

      }
    }
  }
</script>
