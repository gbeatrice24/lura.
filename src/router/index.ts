import { createRouter, createWebHistory } from "vue-router";

import MainLayout from "../components/MainLayout.vue";
import OtherConfessionsPage from "../components/OtherConfessionsPage.vue";

const routes = [
  { path: "/", component: MainLayout },
  { path: "/others", component: OtherConfessionsPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
