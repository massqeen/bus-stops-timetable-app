import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import BusLines from '@/views/BusLines.vue'
import BusStops from '@/views/BusStops.vue'

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/lines' },
  { path: '/lines', component: BusLines },
  { path: '/stops', component: BusStops },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
