import { createRouter, createWebHistory } from "vue-router";

import MainLayout from "../components/MainLayout.vue";
import OtherConfessionsPage from "../components/OtherConfessionsPage.vue";
import WritePage from "../components/WritePage.vue";

const routes = [
  { path: "/", component: MainLayout },
  { path: "/others", component: OtherConfessionsPage },
  { path: "/write", component: WritePage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
