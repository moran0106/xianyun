<template>
  
     <!-- 登录表单 -->
            <el-form ref="loginform" :model="loginform" :rules="rules" class="form">
              <el-form-item prop="username" >
                <el-input v-model="loginform.username" placeholder="用户名/手机号"></el-input>
              </el-form-item>
              <el-form-item prop="password" >
                <el-input type="password" v-model="loginform.password" placeholder="密码" @keyup.enter.native="handlelogin"></el-input>
              </el-form-item>
              <p class="form-text">
                <nuxt-link to="#">忘记密码</nuxt-link>
              </p>
              <el-button type="primary" plain class="btn" @click="handlelogin" >登录</el-button>
            </el-form>
  
</template>
<script>
export default {
  data () {
    return {
      loginform: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名/手机号", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 16, message: "请输入6到16位", trigger: "blur" }
        ]
      },
    }
  },
  methods: {
    handlelogin(){
      console.log(this.$refs['loginform']);
      console.log(this.$refs);
      this.$refs['loginform'].validate(valid=>{
          if(valid){
            // this.$axios({
            //   url:'/accounts/login',
            //   method:'POST',
            //   data:this.loginform
            // }).then(res=>{
            //      console.log(res);
            //      console.log(res.data);
            //     //  console.log(this);
            //     // this.$store.state.user.userInfo=res.data
            //      this.$store.commit('user/setUserInfo',res.data)
            // })
               this.$store.dispatch('user/login',this.loginform)
               .then(res=>{
                 this.$message.success('登录成功')
               })
                setTimeout(() => {
                  this.$router.replace('/')
                }, 1000);
          }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.form {
  padding: 20px;
  .form-text {
    font-size: 12px;
    color: skyblue;
    text-align: right;
  }
  .btn {
    width: 100%;
    margin-top: 10px;
  }
}

</style>
