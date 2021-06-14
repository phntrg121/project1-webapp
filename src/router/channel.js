import Channel from '../views/channel/Channel.vue'
import Videos from '../views/channel/Videos.vue'
import Playlists from '../views/channel/Playlists.vue'
import Subscriptions from '../views/channel/Subscriptions.vue'
import About from '../views/channel/About.vue'

const channel = {        
  path: '/channel/:id',
  name: 'Channel',
  component: Channel,
  children: [
    {
      path: '/channel/:id',
      name: 'Channel Video',
      component: Videos
    },
    {
      path: '/channel/:id/playlists',
      name: 'Channel Playlist',
      component: Playlists
    },
    {
      path: '/channel/:id/subscriptions',
      name: 'Channel Subscription',
      component: Subscriptions
    },
    {
      path: '/channel/:id/about',
      name: 'Channel About',
      component: About
    }
  ]
}

export default channel;
