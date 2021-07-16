import Vue from "vue";
import VueRouter from "vue-router";
import Tracking from "../components/Tracking.vue";
import Login from "../components/Login.vue";
import UserStorage from "../Storage";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "tracking",
    component: Tracking,
    props: true,
    meta: {
      authRequired: true
    }
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      authRequired: false
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.authRequired && !UserStorage.loggedIn()) {
    next('login');
    return;
  }

  if (!to.meta.authRequired && UserStorage.loggedIn()) {
    next('tracking');
    return;
  }

  next();
});
export default router;
