import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

// Définissez vos routes
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import("@views/Home.vue"),
  },
];

// Créez l'instance du routeur
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Exportez le routeur pour l'utiliser dans votre application
export default router;
