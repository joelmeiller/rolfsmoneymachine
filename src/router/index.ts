import { createRouter, createWebHistory } from 'vue-router'
import LoginRoute from './LoginRoute.vue'
import ProcessingRoute from './ProcessingRoute.vue'
import ResultRoute from './ResultRoute.vue'
import SelectFileRoute from './SelectFileRoute.vue'
import SetupRoute from './SetupRoute.vue'
import StartRoute from './StartRoute.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/start',
      name: 'start',
      component: StartRoute
    },
    {
      path: '/select_file',
      name: 'select file',
      component: SelectFileRoute
    },
    {
      path: '/setup',
      name: 'setup',
      component: SetupRoute
    },
    {
      path: '/processing',
      name: 'processing',
      component: ProcessingRoute
    },
    {
      path: '/result',
      name: 'result',
      component: ResultRoute
    },
    {
      path: '/login',
      name: 'login',
      component: LoginRoute
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/start'
    }
    
  ]
})

export default router
