import Library from '../views/library/Library.vue'
import History from '../views/library/History.vue'

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
  ]
}

export default library;