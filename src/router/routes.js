import LoginView from '../components/LoginView.vue'
import { UserRoles } from 'src/utils/authorize'
import HomeView from '../components/HomeView.vue'


const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }
    ],
    meta: { role: UserRoles.USER  }
  },
  {
    path: '/login',
    name:'Login',
    component: LoginView
  },
  {
    path: '/home',
    name:'home',
    component: HomeView
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
