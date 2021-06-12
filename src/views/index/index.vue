<!--
 * @Author: your name
 * @Date: 2021-03-19 15:31:11
 * @LastEditTime: 2021-03-19 17:10:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \localHealth\src\pages\index\index.vue
-->
<template>
  <div id="v-index">
    <el-container>
      <el-header>
        <v-header></v-header>
      </el-header>
      <el-container>
        <el-aside style="width:180px">
          <v-menu></v-menu>
        </el-aside>
        <el-main style="background:#f2f2f2;padding:20px">
          <el-card style="width:100%;height:100%">
            <transition>
              <router-view></router-view>
            </transition>
          </el-card>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import header from "../index/header.vue";
import menu from "../index/menu.vue";
export default {
  components: {
    "v-header": header,
    "v-menu": menu
  },
  data() {
    return {
      user: {}
    };
  },
  methods: {}
};
</script>
<style scoped>
#v-index {
  height: 100%;
}
.el-container {
  height: 100%;
}
.el-header {
  width: 100%;
  height: 48px;
  opacity: 1;
  background: #ffffff;
  box-shadow: 0px -1px 0px 0px #ebedf5 inset;
  padding: 0px;
}
.el-aside {
  width: 180px;
  height: 100%;
  opacity: 1;
  background: #223770;
}
</style>
