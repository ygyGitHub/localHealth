<!--
 * @Author: zqm
 * @Date: 2021-03-19 15:31:34
 * @LastEditTime: 2021-03-19 17:10:36
 * @LastEditors: Please set LastEditors
 * @Description: 头部菜单栏
 * @FilePath: \localHealth\src\pages\index\header.vue
-->
<template>
  <div id="v-header">
    <div class="header-title">
      <span>常营健康系统管理平台</span>
      <span class="title">{{ data }}</span>
      <span class="title">{{ week }}</span>
      <span class="title">多云</span>
    </div>
    <el-dropdown class="header-operations">
      <span class="el-dropdown-link">
        <i class="el-icon-user-solid userIcon"></i>
        {{ user }}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-search">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
// import Lockr from "lockr";
export default {
  name: "v-header",
  data() {
    return {
      data: "",
      week: "",
      weather: "",
      user: "张三"
    };
  },
  methods: {
    getData() {
      var currentDate = new Date();
      var year = currentDate.getFullYear(); //获取完整的年份(4位,1970-????)
      var month = currentDate.getMonth() + 1; //获取当前月份(0-11,0代表1月)
      var day = currentDate.getDate(); //获取当前日(1-31)
      var week = currentDate.getDay(); //获取当前星期X(0-6,0代表星期天)
      switch (week) {
        case 1:
          week = "一";
          break;
        case 2:
          week = "二";
          break;
        case 3:
          week = "三";
          break;
        case 4:
          week = "四";
          break;
        case 5:
          week = "五";
          break;
        case 6:
          week = "六";
          break;
        default:
          week = "日";
          break;
      }
      this.data = year + "年" + month + "月" + day;
      this.week = "星期" + week;
    },
    getWeather() {
      $.ajax({
        type: "GET",
        url: "http://wthrcdn.etouch.cn/weather_mini?city='北京'",
        dataType: "JSON",
        error: function () {
          console.log("数据错误");
        },
        success: function (res) {
          if (res.status == 1000) {
            this.weather = ""
          }
        }
      });
    }
  },
  created() {
    this.getData();
    // this.getWeather();
  },
  mounted() { }
};
</script>
<style scoped>
#v-header {
  width: 100%;
  height: 100%;
}
.header-title {
  display: inline-block;
  line-height: 48px;
  margin-left: 20px;
}
.title {
  margin-left: 42px;
}
.header-operations {
  float: right;
  padding-right: 20px;
  height: 100%;
  display: flex;
  align-items: center;
  font-weight: bold;
}
</style>
