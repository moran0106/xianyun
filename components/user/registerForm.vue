<template>
  
     <!-- 注册表单 -->
            <el-form ref="registerform" :model="registerform" :rules="rules" class="form">
              <el-form-item prop="username" >
                <el-input v-model="registerform.username" placeholder="用户名/手机"></el-input>
              </el-form-item>
              <el-form-item prop="captcha" >
                <el-input v-model="registerform.captcha" placeholder="验证码">
                  <!-- 插槽 -->
                    <template slot="append">
                        <el-button @click="handleSendCaptcha">
                            发送验证码
                        </el-button>
                    </template>
                </el-input>
              </el-form-item>

              <el-form-item prop="nickname" >
                <el-input placeholder="昵称" v-model="registerform.nickname"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input type="password"   v-model="registerform.password" placeholder="密码"></el-input>
              </el-form-item>
              <el-form-item prop="cheackpasssword" >
                <el-input type="password" v-model="registerform.cheackpasssword" placeholder="确认密码"></el-input>
              </el-form-item>
             
              <el-button type="primary" plain class="btn" @click="handleregister">注册</el-button>
            </el-form>
  
</template>
<script>
export default {
  data () {
     //密码确认
     const validatePass = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('请再次输入密码'));
        } else if (value !== this.registerform.password) {
            callback(new Error('两次输入密码不一致!'));
        } else {
            callback();
        }
    }
    
    return {
      registerform: {
        username: "",
        password: "",
        captcha:'',  //验证码
        nickname:'',//昵称
        cheackpasssword:''
      },
      rules: {
        username: [
          { required: true, message: "请输入手机号", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 16, message: "请输入6到16位", trigger: "blur" }
        ],
        cheackpasssword: [
          {validator: validatePass, trigger: "blur" },
          
        ],
        nickname: [
          { required: true, message: "请输入昵称", trigger: "blur" },         
        ],
        captcha:[
           { required: true, message: "请输入验证码", trigger: "blur" }, 
        ]
      },
    }
  },
  methods: {
    //验证码
    handleSendCaptcha(){
     //判断是否有输入手机号
     if(!this.registerform.username.trim()){
       this.$message.warning('请输入手机号')
       return
     }
     this.$axios({
       url:'/captchas',
       method:'POST',
       data:{tel:this.registerform.username}
       
     }).then(res=>{
       console.log(this.registerform.username);
       console.log(res);
       const code=res.data.code
       console.log(code);
       this.$alert(`手机验证码是：${code}`,'提示',{
          confirmButtonText: '确定',
          type:'warning'
       })
     })


    },
    //注册
    handleregister(){
      this.$refs.registerform.validate(valid=>{
        if(valid){
          const {cheackpasssword,...ate}=this.registerform
          this.$axios({
            url:'/accounts/register',
            method:'POST',
            data:ate
          }).then(res=>{
            console.log(res);
            // 把数据保存到vuex
            this.$store.commit('user/setUserInfo',res.data)
            this.$router.back()
          })
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
