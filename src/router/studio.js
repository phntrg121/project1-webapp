import Studio from '../views/studio/Studio.vue'
import Content from '../views/studio/Content.vue'
import Playlists from '../views/studio/Playlists.vue'
import Customization from '../views/studio/Customization.vue'
import Dashboard from '../views/studio/Dashboard.vue'

const studio = {
  path: '/studio/:id',
  name: 'Studio',
  component: Studio,
  children: [
    {
      path: '/studio/:id',
      name: 'Studio Dashboard',
      component: Dashboard,
    },
    {
      path: '/studio/:id/content',
      name: 'Studio Content',
      component: Content,
    },
    {
      path: '/studio/:id/playlists',
      name: 'Studio Playlists',
      component: Playlists,
    },
    {
      path: '/studio/:id/customization',
      name: 'Studio Customization',
      component: Customization,
    }
  ]
}

export default studio;
