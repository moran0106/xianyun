
//用户登录数据

export const state=()=>({
    //接口返回数据的结构
    userInfo:{
        token:'',
        user:{}
    }
})

export const mutations={
    setUserInfo(state,data){
        state.userInfo = data
    },
    //清除state
    clearUserInfo(state){
        state.userInfo = {}
    }

}

export const actions={
    login({commit},data){
        return   this.$axios({
            url:'/accounts/login',
            method:'POST',
            data:data
          }).then(res=>{
               console.log(res);
               console.log(res.data);
              //  console.log(this);
              // this.$store.state.user.userInfo=res.data
            //    this.$store.commit('user/setUserInfo',res.data)
            commit('setUserInfo',res.data)
          })
    }
}