<template>
  <div id="v-menu">
    <el-menu class="el-menu-vertical-demo" background-color="#223770" text-color="#FFFFFF" active-text-color="#FFD04B" @select="selectItems" router>
      <el-submenu v-for="item in menuItems" v-show="!item.hidden" :key="item.title" :index="item.path">
        <template slot="title">
          <span>{{ item.title }}</span>
        </template>
        <template v-for="child in item.children" v-show="
            (child.rolecode == 0 && child.flg > 0) ||
              (child.rolecode == 1 && child.flg > 1) ||
              (child.rolecode == 2 && child.flg == 2) ||
              child.rolecode == 3
          ">
          <el-menu-item :index="child.path" :key="child.path" v-if="!child.children">{{ child.title }}</el-menu-item>
          <el-submenu v-if="child.children" :index="child.path" :key="child.path">
            <template slot="title">{{ child.title }}</template>
            <el-menu-item v-for="c in child.children" :index="c.path" :key="c.path">{{ c.title }}</el-menu-item>
          </el-submenu>
        </template>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      menuItems: [
        {
          title: "首页",
          path: "home",
          children: [
            {
              title: "常营人口",
              rolecode: "3",
              flg: "0",
              path: "/population"
            },
            {
              title: "常营党建",
              rolecode: "3",
              flg: "0",
              path: "/partyBuilding"
            },
            {
              title: "公共服务",
              rolecode: "3",
              flg: "0",
              path: "/publicService"
            },
            {
              title: "环境管理",
              rolecode: "3",
              flg: "0",
              path: "/environmentalManagement"
            }
          ]
        },
        {
          title: "常营健康",
          path: "health",
          children: [
            {
              title: "家庭医生",
              rolecode: "3",
              flg: "0",
              path: "/familyDoctor"
            },
            {
              title: "健康中国-行动释义",
              rolecode: "3",
              flg: "0",
              path: "/actionParaphrase"
            },
            {
              title: "健康北京",
              rolecode: "3",
              flg: "0",
              path: "/healthyBeijing"
            },
            {
              title: "健康之家设备",
              rolecode: "3",
              flg: "0",
              path: "/equipment"
            },
            {
              title: "独居老人",
              rolecode: "3",
              flg: "0",
              path: "/elderlyLivingAlone"
            },
            {
              title: "人口结构",
              rolecode: "3",
              flg: "0",
              path: "/populationStructure"
            },
            {
              title: "健康资源-机构",
              rolecode: "3",
              flg: "0",
              path: "/mechanism"
            },
            {
              title: "健康资源-专业人员",
              rolecode: "3",
              flg: "0",
              path: "/professionals"
            },
            {
              title: "社区卫生服务中心",
              rolecode: "3",
              flg: "0",
              path: "/communityHealthCenter"
            },
            {
              title: "健康中国-行动名称",
              rolecode: "3",
              flg: "0",
              path: "/actionName"
            },
            {
              title: "常营疫苗接种",
              rolecode: "3",
              flg: "0",
              path: "/vaccination"
            }
          ]
        },
        {
          title: "小程序",
          path: "app",
          children: [
            {
              title: "义诊预约",
              rolecode: "3",
              flg: "0",
              path: "/freeClinicAppointment"
            },
            {
              title: "专家预约",
              rolecode: "3",
              flg: "0",
              path: "/expertAppointment"
            },
            {
              title: "家医服务",
              rolecode: "3",
              flg: "0",
              path: "/homeDoctorService"
            }
          ]
        },
      ]
    };
  },
  methods: {
    selectItems(index) { }
  }
};
</script>
<style scoped>
.el-menu {
  border: 0px;
}
i {
  color: #ffffff;
}
</style>
