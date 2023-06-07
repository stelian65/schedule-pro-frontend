import LoginView from '../components/LoginView.vue'
import HomeView from '../components/HomeView.vue'
import RecordWorkingTime from '../components/LeftMenuComponents/RecordWorkingTime.vue'
import Tasks from '../components/LeftMenuComponents/ViewTasks.vue'
import RegisterComponent from '../components/AdminUse/RegisterComponent.vue'
import store from '../store/index'


const routes = [
  {
    path: '', 
    redirect: '/login',
  },
  {
    path: '/login',
    name:'Login',
    component: LoginView,
    beforeEnter: (to,from, next) => {checkIsLogated(to,from,next)}
  }, 
  {
    path: '/home',
    name:'Home',
    component: HomeView,
    meta:{ requiresAuth: true},
    beforeEnter: (to,from, next) => {checkBefore(to,from,next)},
    children: [
      {
        path: '/record-time',
        component: RecordWorkingTime
      },
      {
        path: '/tasks',
        component: Tasks
      },
      {
        path:'/register',
        component: RegisterComponent
      }
    ]

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

function checkIsLogated(to,from ,next){
  if (store.getters.isAuthenticated) {
    next('/home'); // User is authenticated, allow access
  } else{
    next();
  }
}

export default routes
