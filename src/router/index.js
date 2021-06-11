import { createRouter, createWebHistory } from "vue-router"
import Main from '../views/Main.vue'
import Home from '../views/Home.vue'
import Explore from '../views/Explore.vue'
import Subscription from '../views/Subscription.vue'
import NotFound from '../views/NotFound.vue'
import Watch from '../views/Watch.vue'
import Search from '../views/Search.vue'
import Playlist from '../views/Playlist.vue'

//other routes
import channel from './channel'
import library from './library'
import content from './content'
import account from './account'

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
        path: '/playlist',
        name: 'Playlist',
        component: Playlist
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
  account,
  content,
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
