import Channel from '../views/channel/Channel.vue'
import Videos from '../views/channel/Videos.vue'
import Likes from '../views/channel/Likes.vue'
import Subscribers from '../views/channel/Subscribers.vue'
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
      path: '/channel/:id/likes',
      name: 'Channel Like',
      component: Likes
    },
    {
      path: '/channel/:id/subscribers',
      name: 'Channel Subscriber',
      component: Subscribers
    },
    {
      path: '/channel/:id/about',
      name: 'Channel About',
      component: About
    }
  ]
}

export default channel;
