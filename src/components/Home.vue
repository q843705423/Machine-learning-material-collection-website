<template>
    <div>
        <div style="width:100%;height:600px" class='show'>
            <div>
                <br>
                <div style='color:white;margin: 50px auto 0 auto;font-size:30px;width:500px;'>
                    最高效的机器学习素材提供服务网站
                </div>
                <div style='color:#ddd;margin: 20px auto 0 auto;font-size:22px;width:450px;'>
                    用最简单的方式，让全世界为你提供数据服务
                </div>
                <div style='margin:70px auto 0 auto;width:600px;'>
                    <el-input placeholder="手机" style="width:220px;"></el-input>
                    <el-input placeholder="密码" style="width:220px;"></el-input>
                    <el-button style='width:150px'>创建账号</el-button>
                </div>
                <div class="computer">
                    <div class='computer-header'>
                        <div class='red-button'></div>
                        <div class='yellow-button'></div>
                        <div class='green-button'></div>
                        <div class="computer-header-input"></div>
                        <div class="computer-header-menu"></div>
                    </div>
                    <div class="computer-body">
                        <div class='computer-body-menu'>
                            <ul>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                            </ul>
                        </div>
                        <div class="computer-body-content">

                        </div>
                    </div>

                </div>
            </div>

        </div>

        <div class="clear"></div>
        <div class='produceIntroduce' style='margin:200px 0 0 0 '>
              <div>
                  <h1 style="color:#111;text-align:center">我们的服务</h1>
                  <div class='introduce-imgs'>
                        <ul>
                            <li>
                                <img src="https://k.zol-img.com.cn/sjbbs/7692/a7691501_s.jpg" class="introduce-img">
                                <div class="introduce-title">
                                    学习素材收集
                                </div>
                                <div class="introduce-text">
                                    根据提出需要收集的学习素材，可以在最大的效率内，检出你需要的大量图片
                                </div>
                            </li>
                            <li>
                                <img src="https://k.zol-img.com.cn/sjbbs/7692/a7691501_s.jpg" class="introduce-img">
                                <div class="introduce-title">
                                    素材标签分配
                                </div>
                                <div class="introduce-text">
                                    对于获取到的学习素材，提供标签化的功能，多人打标签，可以极大的保证标签的正确性。
                                </div>
                            </li>
                            <li>
                                <img src="https://k.zol-img.com.cn/sjbbs/7692/a7691501_s.jpg" class="introduce-img">
                                <div class="introduce-title">
                                    <div style="margin:0 auto 0 auto;">标签准确检测</div> 
                                </div>
                                <div class="introduce-text">
                                    提供整套的标签正确性检测服务,来验证在素材标签分配过程中,产生的可能不利于学习训练的标签
                                </div>
                            </li>
                        </ul>
        
                    </div>
   
            </div>
        </div>

    </div>
</template>

<style>

.introduce-text{
    margin:0 auto 0 auto;
    text-align: center;
    padding: 10px;
    font-size: 20px;
}
.introduce-img{
    width:200px;
    height:200px;
}
.introduce-imgs{
    width:900px;
    margin:100px auto 0 auto;
}
.introduce-text{
    width:200px;
    padding:4px;
    color:#222;
    font-size:10px;
}
.introduce-imgs ul li{
    list-style: none;
    width:200px;
    float:left;
    margin: 20px 0 0 80px;
}
.clear{
    clear:both;
    content:''
}
.computer-body-menu{
    background:#cc99ff;
    width:80px;
    height:480px;
}
.show{
 background: linear-gradient(#cc99ff, #cc3399)
}
.computer-header-input{
    margin:5px 0 0 30px;
    float:left;
    background:#000;
    width:700px;
    height: 10px;
}
.red-button{
    float:left;
    background:red;
    border-radius: 10px;
    width:10px;
    height: 10px;
    margin:5px 0 0 10px;
}
.green-button{
    margin:5px 0 0 10px;
    background:green;
    border-radius: 10px;
    width:10px;
    height: 10px;
    float:left;
}
.yellow-button{
    margin:5px 0 0 10px;
    float:left;
    background:yellow;
    border-radius: 10px;
    width:10px;
    height: 10px;
}
.computer-header{
    width:100%;
    height:20px;
    background: #333;


}
.computer{
    width:900px;
    height:500px;
    background:white;
    margin:20px auto 0 auto;
    border:#333 4px solid;
    border-radius: 4px;
}

</style>

<script>
export default {
    name: 'Home'
}
</script>


