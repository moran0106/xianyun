import {Message} from 'element-ui'

//axios 拦截器
//第一个参数：nuxt对象
export default ({$axios})=>{
    //拦截axios 请求
    $axios.onError(err=>{
     const {message,statusCode}=err.response.data
     if(statusCode===400){
         //错误提示
        Message.error(message)
     }
    })
}