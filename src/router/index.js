import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import NotFound from '../views/NotFound.vue'
import Watch from '../views/Watch.vue'
import SignIn from '../views/SignIn.vue'
import SignUp from '../views/SignUp.vue'
import Search from '../views/Search.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },  
  {
    path: '/search',
    name: 'Search',
    component: Search
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
