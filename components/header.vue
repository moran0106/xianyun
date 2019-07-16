<template>
  <div class="header">
      <el-row type="flex" justify="space-between" class="content">
    
      <!-- logo -->
      <div class="logo">
        <nuxt-link to="/">
          <img src="http://157.122.54.189:9093/images/logo.jpg" alt />
        </nuxt-link>
      </div>
      <!-- 头部导航 -->
      <el-row type="flex" class="navs">
        <nuxt-link link to="/">首页</nuxt-link>
        <nuxt-link link to="/post">旅游攻略</nuxt-link>
        <nuxt-link link to="/hotel">酒店</nuxt-link>
        <nuxt-link link to="/air">国内机票</nuxt-link>
      </el-row>
      <!-- 头部login  登陆前登陆后 -->
      <div >
          <!-- 下拉列表 -->
        <div class="login_before" >
            <el-dropdown>          
          <span class="el-icon-bell el-dropdown-link" ><i class="el-icon-arrow-down el-icon--right">消息</i></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>消息</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <nuxt-link to="user/login" v-if="!$store.state.user.userInfo.token">登录/注册</nuxt-link>
        </div>
            <!-- 登陆跳转页面 -->
      <div class="login_later" v-if="$store.state.user.userInfo.token">
          <el-dropdown>
            <span  class="el-dropdown-link">
              <!-- 头像 -->
              <img :src="$axios.defaults.baseURL + $store.state.user.userInfo.user.defaultAvatar" alt=""> 
                  {{$store.state.user.userInfo.user.nickname}}               
               <i class="el-icon-arrow-down el-icon--right"></i>       
            </span>          
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click.native="handleloginout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      </div>
    
    
    </el-row>
  </div>
</template>
<script>
export default {
  methods: {
      handleloginout(){
      
        this.$store.commit('user/clearUserInfo')
  //  const {commit}=this.$store
  //  commit('user/clearUserInfo')
   this.$message.success('退出成功')
   
  }
  }

};
</script>
<style lang="less" scoped>
.header{
    height: 60px;   
    line-height: 60px;  
    border-bottom: 1px #ddd solid;
    box-shadow:0 3px 0 #f5f5f5;
    .content{
     width: 1000px;
     margin:0 auto
     
    }
   .logo{
       margin-top: 10px;
       margin-right: 10px;
       img{
           width: 155px;
           height: 40px;
           
       }
   }
}
.navs{
    flex:1;
   
   a{
       
        height:60px;
        box-sizing: border-box;
        padding: 0 20px;
         &:hover{
            color:skyblue;
            border-bottom: 5px skyblue solid;
        }
   }
   .nuxt-link-exact-active{
        background: skyblue;
        color:#fff;

        &:hover{
            color: #fff;
        }
    }
   
}
.login_before{
  display:inline-block;
  a{
    &:hover{
      color: blue      
    }
  }
}
.login_later{
    outline: none; 
    display:inline-block;
    img{
        width:36px;
        height:36px;
        vertical-align: middle;
    }
}

</style>
