import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SignIn from '../views/SignIn'
import SignUp from '../views/SignUp'
import Logout from '../views/Logout'
import PlayLists from '../views/PlayLists'
import PlayListDetail from '../views/PlayListDetail'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/signin',
    name: 'signin',
    component: SignIn
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp
  },
  {
    path: '/logout',
    name: 'logout',
    component: Logout
  },
  {
    path: '/playlists',
    name: 'playlists',
    component: PlayLists
  },
  {
    path: '/playlists/:id',
    name: 'playlistDetail',
    component: PlayListDetail
  }
]

const router = new VueRouter({
  routes
})

export default router
