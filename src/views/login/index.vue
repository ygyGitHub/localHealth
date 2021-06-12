<template>
  <el-container class="login-container">
    <el-header style=" height: 200px">
      <div class="logo-container">
        <span class="logoText">常营健康后台管理系统</span>
      </div>
      <div class="logo"></div>
    </el-header>
    <el-main>
      <el-card class="box-card" style="float:right">
        <div>欢迎登录系统</div>
        <el-form ref="form" :model="form" :rules="rules" style="margin-top:13%">
          <el-form-item label="" prop="name">
            <el-input type="text" v-model="form.name" auto-complete="off" prefix-icon="el-icon-s-custom" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item label="" prop="password">
            <el-input type="password" v-model="form.password" auto-complete="off" prefix-icon="el-icon-lock" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item label="" prop="isCheck" style="float: left;">
            <el-checkbox label="记住账号？" name="type"></el-checkbox>
          </el-form-item>
          <el-form-item style="margin: auto;width: 100%;">
            <el-button type="primary" style="width:100%;" v-loading="loading" @click.native.prevent="handleSubmit('form')">登录系统</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-main>
    <el-footer style=" height: 100px">
      <div>版权所有 © 北京红移云创科技有限公司 京ICP备19017496号</div>
      <div>技术支持：北京红移云创科技有限公司</div>
      <div>联系电话：010-67814030 13910603885</div>
    </el-footer>
  </el-container>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      form: {
        name: "",
        password: "",
        isCheck: ""
      },
      rules: {
        name: [{ required: true, message: "请输入登录名", trigger: " " }],
        password: [{ required: true, message: "请输入密码", trigger: " " }]
      },
      loading: false
    };
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = !this.loading;
          let data = {};
          data.username = this.form.name;
          data.password = this.form.password;
          //todo 调接口
          //如果成功 判断是否记住密码
          //如果记住。则吧账户信息入vuex或者...
          this.$router.push({
            path: "/index"
          });
        } else {
          return false;
        }
      });
    }
  },
  created() { },
  mounted() { }
};
</script>

<style>
.login-container {
  height: 100%;
  width: 100%;
  background-color: #f7f7f7;
  overflow: hidden;
  position: relative;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 200px;
}
.logo-container {
  position: absolute;
  left: 210px;
}
.logoText {
  display: inline-block;
  padding-left: 30px;
}
.logo {
  display: inline-block;
  width: 200px;
  height: 200px;
  position: absolute;
  left: 10px;
  background: url("../../assets/logo.png");
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}
.box-card {
  width: 20%;
  height: 58%;
  margin-top: 7%;
  margin-right: 3%;
}
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 30px;
}
</style>
