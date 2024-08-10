import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import BusLines from '@/views/BusLines.vue'
import Stops from '@/views/Stops.vue'

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: BusLines },
  { path: '/stops', component: Stops },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
