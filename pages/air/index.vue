<template>
  <div class="air">
    <!-- 国际机票 -->
    <h2 class="air-logo">
      <i class="iconfont icon-feiji1"></i>
      国内机票
    </h2>
    <el-row type="flex" justify="space-between">
      <div class="air-left">
        <airLeft />
      </div>
      <div class="air-right">
        <img src="http://157.122.54.189:9093/images/pic_sale.jpeg" />
      </div>
    </el-row>

    <!-- message -->
    <el-row type="flex" class="message">
      <el-col :span="8">
        <i class="iconfont icon-renzhengshangjia"></i>
        <span>100%航协认证</span>
      </el-col>
      <el-col :span="8">
        <i class="iconfont icon-anquan"></i>
        <span>出行保证</span>
      </el-col>
      <el-col :span="8">
        <i class="iconfont icon-dianhua1"></i>
        <span>7x24小时服务</span>
      </el-col>
    </el-row>

    <!-- 特价机票 -->
    <h3 class="air-cheep">
      <i class="iconfont icon-feiji"></i>
      特价机票
    </h3>

    <div class="air-cheep-img"></div>
  </div>
</template>
<script>
import airLeft from "../../components/air/airleft";
import "../../loadfont/iconfont.css";
export default {
  components: {
    airLeft
  }
};
</script>
<style lang="less" scoped>
.air {
  width: 1000px;
  margin: 0 auto;
  .air-logo {
    font-size: 20px;
    font-weight: normal;
    color: #fec70a;
    padding: 10px 0;
    i {
      font-size: 25px;
      color: #fec70a;
    }
  }
  .air-cheep {
    font-size: 20px;
    font-weight: normal;
    color: blue;
    margin: 10px, 0;
     i {
        font-size: 25px;
        color:#60adfd
      }
  }
  .message {
    margin: 20px 0;
    border: 1px solid rgb(236, 232, 232);
    background: rgb(196, 212, 219);
    box-sizing: border-box;
    text-align: center;
    > div {
      height: 42px;
      border: 1px solid rgb(236, 232, 232);
      font-size: 20px;
      color: #60adfd;
      line-height: 40px;

      &:last-child {
        border-right: none;
      }

      * {
        vertical-align: middle;
      }
      i {
        font-size: 25px;
        color:#60adfd
      }
      &:nth-child(2) i{
        color: #49cc7b;
      }
      span {
        font-size: 16px;
        color: #000;
      }
    }
  }
}
</style>
