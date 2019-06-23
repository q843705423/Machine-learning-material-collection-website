<template>
<div style=''>
    
    <div style="margin-top:60px;width:420px;margin-left:auto;margin-right:auto" >
        <!-- 用户: <el-input style="width:200px" /> -->
        <el-row style='margin:0 auto 0 auto'>
            <span style="margin:0 auto 0 auto">
                用户登录
            </span>
        </el-row>

        <el-row>
            <el-input v-model='username' placeholder='用户名' style="width:400px;" />
        </el-row>
        <el-row>
            <el-input type='password' v-model='password' placeholder='密码' style="width:400px" />
        </el-row>

        <el-row>
            <el-button  type='primary' @click='hello()' style="width:400px;" class="button">登录</el-button>
        </el-row>

        <el-row style="" >

            <el-row style='margin-top:20px'>
                <span>求救,我<router-link to='Forget' style='color:blue'>忘记了密码</router-link></span>
            </el-row>
            <el-row style='margin-top:20px'>
                <span>我想要<router-link to='Login' style='color:blue'>注册账号</router-link></span>
            </el-row>
            <!-- <el-button  type='warning' @click='hello()' style="width:300px" class="button" >注册</el-button> -->
        </el-row>

    </div>
</div>
</template>
<style>
input{
    margin-top:20px;
    margin-bottom:20px;
}
.button{
    margin:5px;
    width:300px;
}
</style>
<script>
export default {
    name:'Login',
    created(){
        // this.hello();
    },
    data(){
        return{
            username:"",
            password:"",

        }
    },
    methods:{
        hello(){
            alert(this.username+" "+this.password)
        }
    }
    
   
}
</script>


