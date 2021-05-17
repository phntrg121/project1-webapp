import { createRouter, createWebHistory } from "vue-router"
import Main from '../views/Main.vue'
import Home from '../views/Home.vue'
import Explore from '../views/Explore.vue'
import Subscription from '../views/Subscription.vue'
import Library from '../views/Library.vue'
import History from '../views/History.vue'
import MyVideo from '../views/MyVideo.vue'
import Liked from '../views/Liked.vue'
import Playlist from '../views/Playlist.vue'
import Channel from '../views/Channel.vue'
import NotFound from '../views/NotFound.vue'
import Watch from '../views/Watch.vue'
import SignIn from '../views/SignIn.vue'
import SignUp from '../views/SignUp.vue'
import Search from '../views/Search.vue'

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
        path: '/library',
        name: 'Library',
        component: Library,
        children: [
          {
            path: '/history',
            name: 'History',
            component: History
          },
          {
            path: '/myvideos',
            name: 'MyVideo',
            component: MyVideo
          },
          {
            path: '/liked',
            name: 'Liked',
            component: Liked
          },
          {
            path: '/playlist',
            name: 'Playlist',
            component: Playlist
          },
        ]
      },
      {
        path: '/search',
        name: 'Search',
        component: Search
      },
      {        
        path: '/channel',
        name: 'Channel',
        component: Channel
      }
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
