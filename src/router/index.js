import Vue from 'vue'
import Router from 'vue-router'
import Login from "../views/login/index.vue";
import Index from "../views/index/index.vue";
import population from "../views/home/population.vue";
import partyBuilding from "../views/home/partyBuilding.vue";
import publicService from "../views/home/publicService.vue";
import environmentalManagement from "../views/home/environmentalManagement.vue";
import familyDoctor from "../views/health/familyDoctor.vue";
import actionParaphrase from "../views/health/actionParaphrase.vue";
import actionName from "../views/health/actionName.vue";
import professionals from "../views/health/professionals.vue";
import equipment from "../views/health/equipment.vue";
import elderlyLivingAlone from "../views/health/elderlyLivingAlone.vue";
import populationStructure from "../views/health/populationStructure.vue";
import communityHealthCenter from "../views/health/communityHealthCenter.vue";
import healthyBeijing from "../views/health/healthyBeijing.vue";
import mechanism from "../views/health/mechanism.vue";
import vaccination from "../views/health/vaccination.vue";
import homeDoctorService from "../views/applets/homeDoctorService.vue";
import freeClinicAppointment from "../views/applets/freeClinicAppointment.vue";
import expertAppointment from "../views/applets/expertAppointment.vue";
import screeningItems from "../views/applets/screeningItems.vue";
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: "/login",
      component: Login
    },
    {
      path: "/index",
      component: Index,
      children: [
        {
          path: "/",
          name: "population",
          component: population
        }, {
          path: "/population",
          name: "population",
          component: population
        }, {
          path: "/partyBuilding",
          name: "partyBuilding",
          component: partyBuilding
        }, {
          path: "/publicService",
          name: "publicService",
          component: publicService
        }, {
          path: "/environmentalManagement",
          name: "environmentalManagement",
          component: environmentalManagement
        }, {
          path: "/familyDoctor",
          name: "familyDoctor",
          component: familyDoctor
        }, {
          path: "/actionParaphrase",
          name: "actionParaphrase",
          component: actionParaphrase
        }, {
          path: "/actionName",
          name: "actionName",
          component: actionName
        }, {
          path: "/professionals",
          name: "professionals",
          component: professionals
        }, {
          path: "/equipment",
          name: "equipment",
          component: equipment
        }, {
          path: "/elderlyLivingAlone",
          name: "elderlyLivingAlone",
          component: elderlyLivingAlone
        },
        {
          path: "/populationStructure",
          name: "populationStructure",
          component: populationStructure
        },
        {
          path: "/communityHealthCenter",
          name: "communityHealthCenter",
          component: communityHealthCenter
        },
        {
          path: "/healthyBeijing",
          name: "healthyBeijing",
          component: healthyBeijing
        },
        {
          path: "/mechanism",
          name: "mechanism",
          component: mechanism
        },
        {
          path: "/vaccination",
          name: "vaccination",
          component: vaccination
        },
        {
          path: "/homeDoctorService",
          name: "homeDoctorService",
          component: homeDoctorService
        },
        {
          path: "/freeClinicAppointment",
          name: "freeClinicAppointment",
          component: freeClinicAppointment
        },
        {
          path: "/expertAppointment",
          name: "expertAppointment",
          component: expertAppointment
        },
        {
          path: "/screeningItems",
          name: "screeningItems",
          component: screeningItems
        },
      ]
    }
  ]
})
// ??????????????????
router.beforeEach((to, from, next) => {
  const name = localStorage.getItem('userName');//??????????????????????????????name??????
  if (["", null, 'null', undefined, 'undefined'].includes(name) && to.path != '/login') {//????????????????????????????????????????????????????????????????????????
    next("/login")//??????????????????
  } else {
    next()
  }
});
export default router
