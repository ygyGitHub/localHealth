<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
      <br />
      <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
    <el-button @click="modalMSXM.isShow = !modalMSXM.isShow">默认按钮</el-button>

    <modal :modalObj="modalMSXM">
      <el-form ref="form" label-width="80px">
        <el-form-item label="活动名称">
          <el-input v-model="input"></el-input>
        </el-form-item>
        <el-form-item label="活动名称">
          <el-input v-model="input1"></el-input>
        </el-form-item>
        <el-form-item label="活动名称">
          <el-input v-model="input"></el-input>
        </el-form-item>
      </el-form>
      <div class="divauto">
        <el-button type="success" size="mini" @click="showDio" round>确定</el-button>
        <el-button type="success" size="mini" @click="modalMSXM.isShow = false" round>关闭</el-button>
      </div>
    </modal>
  </div>
</template>

<script>
import modal from './dialog.vue';
export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      modalMSXM: {
        title: '添加', // 标题
        isShow: false, // 是否显示
        width: '60%',
        height: '70%'
      },
      input: '',
      input1: ''
    };
  },
  methods:{
    showDio(){
      console.log(this.input)
    }
  },
  components: {
    modal
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
