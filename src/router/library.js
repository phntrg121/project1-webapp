import Library from '../views/library/Library.vue'
import History from '../views/library/History.vue'
import MyVideo from '../views/library/MyVideo.vue'
import Liked from '../views/library/Liked.vue'
import Playlist from '../views/library/Playlist.vue'

const library = {
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
}

export default library;