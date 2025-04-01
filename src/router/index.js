import { createRouter, createWebHistory } from 'vue-router'
import {routesArr}  from './routes';

var routes = routesArr();

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

export default router;
