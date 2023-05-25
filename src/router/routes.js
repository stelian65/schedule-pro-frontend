import LoginView from '../components/LoginView.vue'
import HomeView from '../components/HomeView.vue'
import App from '../App.vue'
import store from '../store/index'


const routes = [
  {
    path: '', // Root route
    redirect: '/home',
  },
  {
    path: '/login',
    name:'Login',
    component: LoginView
  }, 
  {
    path: '/home',
    name:'Home',
    component: HomeView,
    meta:{ requiresAuth: true},
    beforeEnter: (to,from, next) => {checkBefore(to,from,next)}

  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]


function  checkBefore(to,from ,next ){
  if (store.getters.isAuthenticated) {
    next(); // User is authenticated, allow access
  } else {
    next('/login'); // User is not authenticated, redirect to login page
  }
}

export default routes
