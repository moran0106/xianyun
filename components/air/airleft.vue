<template>
    <div class="search-form">

        <!-- 头部tab切换 -->
        <el-row type="flex" class="search-tab">
            <span v-for="(item, index) in tabs" :key="index"
            @click="handleSearchTab(item, index)"
            :class="{active: index === currentTab}">
                <i :class="item.icon"></i>{{item.name}}
            </span>
        </el-row>

        <el-form class="search-form-content" ref="form" label-width="80px">
            <el-form-item label="出发城市">
                <!-- fetch-suggestions 返回输入建议的方法 输入框的值发生改变的时候出发-->
                <!-- select 点击选中建议项时触发 -->
                <el-autocomplete
                :fetch-suggestions="queryDepartSearch"
                placeholder="请搜索出发城市"
                @select="handleDepartSelect"
                class="el-autocomplete"
                v-model="form.departCity"
                ></el-autocomplete>
            </el-form-item>
            <el-form-item label="到达城市">
                <el-autocomplete
                :fetch-suggestions="queryDestSearch"
                placeholder="请搜索到达城市"
                @select="handleDestSelect"
                class="el-autocomplete"
                v-model="form.destCity"
                ></el-autocomplete>
            </el-form-item>
            <el-form-item label="出发时间">
                <!-- change 用户确认选择日期时触发 -->
                <el-date-picker type="date" 
                placeholder="请选择日期" 
                style="width: 100%;"
                @change="handleDate"
                v-model="form.departData">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="">
                <el-button style="width:100%;" 
                type="primary" 
                icon="el-icon-search"
                @click="handleSubmit">
                    搜索
                </el-button>
            </el-form-item>
            <div class="reverse">
                <span @click="handleReverse">换</span>
            </div>
        </el-form>  
      </div>
</template>

<script>
import moment from 'moment'
export default {
    data(){
        return {
            tabs: [
                {icon: "iconfont icondancheng", name: "单程"},
                {icon: "iconfont iconshuangxiang", name: "往返"}
            ],
            currentTab: 0,
            form:{
              departCity:'',
              departCode:'',
              destCity:'',
              destCode:'',
              departData:''
            }
        }
    },
    methods: {
        // tab切换时触发
        handleSearchTab(item, index){
           if(index===1){
               this.$alert("暂时没有往返", "提示", {
                  confirmButtonText: '确定',
                    type: "warning"
                })
           }
        },
        
        // 出发城市输入框获得焦点时触发
        // value 输入框的值，cb是回调函数，接收要展示的列表
        queryDepartSearch(value, cb){
           if(!value) return
           this.$axios({
             url:'/airs/city',
             params:{
               name:value
             }
           }).then(res=>{
            //  推荐列表的数组
            const {data}=res.data
            console.log(data);
             const newData=data.map(v=>{
               console.log(v);
                 v.value=v.name.replace('市','')
                 return v;
             })
             //morenxuanzhongdiyige
             this.form.departCity=newData[0].value
             this.form.departCode=newData[0].sort
             
             cb(newData)
           })
        },

        // 目标城市输入框获得焦点时触发
        // value 是选中的值，
        //cb是回调函数，必须接受数组，且每一项必须对象，对象中必须有value值 接收要展示的列表
        queryDestSearch(value, cb){
          if(!value) return
           this.$axios({
             url:'/airs/city',
             params:{
               name:value
             }
           }).then(res=>{
            //  推荐列表的数组
            const {data}=res.data
            console.log(data);
             const newData=data.map(v=>{
               console.log(v);
                 v.value=v.name.replace('市','')
                 return v;
             })
              //morenxuanzhongdiyige
             this.form.destCity=newData[0].value
             this.form.destCode=newData[0].sort
             cb(newData)
           })
        },
       
        // 出发城市下拉选择时触发
        handleDepartSelect(item) {
            console.log(item);
             //赋值给fromduixiang
             this.form.departCity=item.value
             this.form.departCode=item.sort

        },

        // 目标城市下拉选择时触发
        handleDestSelect(item) {
            this.form.destCity=item.value
            this.form.destCode=item.sort
        },


        // 确认选择日期时触发
        handleDate(value){
          this.form.departData= moment(value).format('YYYY-MM-DD')
    
        },

        // 触发和目标城市切换时触发
        handleReverse(){
              const { departCity, departCode,  destCity,  destCode}=this.form
            this.form.departCity=destCity
            this.form.departCode=destCode
            this.form.destCity=departCity
            this.form.destCode=departCode

        },

        // 提交表单是触发
        handleSubmit(){
         
            // 验证表单是否为空
          const rules={
            departCity:{ value:this.form.departCity,message:'请选择出发城市'},
            destCity:{ value:this.form.destCity,message:'请选择抵达城市'},
            departData:{value:this.form.departData,message:'请选择出发时间'}
          }
           let valid=true
          //循环判断是否为空
          // console.log(object.keys(rules));
         Object.keys(rules).forEach(v => {
            if(!valid) return

           if(!rules[v].value){
             valid=false
             this.$message.warning(rules[v].message)
           }
         });
         if(!valid) return
        //thaozhuanyemian
          this.$router.push({
             path:'/airs/flights',
             query:this.form
          })

        }
    },
    mounted() {
       
    }
}
</script>

<style scoped lang="less">
.search-form{
    border:1px #ddd solid;
    border-top:none;
    width:360px;
    height:350px;
    box-sizing: border-box;
}

.search-tab{
  span{
    display: block;
    flex:1;
    text-align: center;
    height:48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top:3px #eee solid;
    background:#eee;
  }

  .active{
    border-top-color: orange;
    background:#fff;
  }

  i{
    margin-right:5px;
    font-size: 18px;

    &:first-child{
      font-size:16px;
    }
  }
}

.search-form-content{
  padding:15px 50px 15px 15px;
  position: relative;

  .el-autocomplete{
    width: 100%;
  }
}

.reverse{
  position:absolute;
  top: 35px;
  right:15px;

  &:after,&:before{
      display: block;
      content: "";
      position: absolute;
      left:-35px;
      width:25px;
      height:1px;
      background:#ccc;
  }

  &:after{
      top:0;
    }

    &:before{
      top:60px;
    }

  span{
    display: block;
    position:absolute;
    top: 20px;
    right:0;
    font-size:12px;
    background: #999;
    color:#fff;
    width:20px;
    height:20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,&:before{
      display: block;
      content: "";
      position: absolute;
      left:10px;
      width:1px;
      height:20px;
      background:#ccc;
    }

    &:after{
      top:-20px;
    }

    &:before{
      top:20px;
    }
  }
}
</style>