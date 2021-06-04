import { createRouter, createWebHistory } from "vue-router"
import Main from '../views/Main.vue'
import Home from '../views/Home.vue'
import Explore from '../views/Explore.vue'
import Subscription from '../views/Subscription.vue'
import NotFound from '../views/NotFound.vue'
import Watch from '../views/Watch.vue'
import SignIn from '../views/SignIn.vue'
import SignUp from '../views/SignUp.vue'
import Search from '../views/Search.vue'
import Content from '../views/Content.vue'

//other routes
import channel from './channel'
import library from './library'

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home
      },
      {
        path: '/explore',
        name: 'Explore',
        component: Explore,
        alias: ['/explore/music', '/explore/gaming', '/explore/sport', '/explore/news']        
      },
      {
        path: '/subscription',
        name: 'Subscription',
        component: Subscription
      },
      {
        path: '/search',
        name: 'Search',
        component: Search
      },
      {
        path: '/content/:id',
        name: 'Content',
        component: Content,
      },
      library,
      channel,
    ]
  },
  {
    path: '/watch/:id',
    name: 'Watch',
    component: Watch
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn
  },
  // {
  //   path: '/*',
  //   name: 'NotFound',
  //   component: NotFound
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
