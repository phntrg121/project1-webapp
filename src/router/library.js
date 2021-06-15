import Library from '../views/library/Library.vue'
import History from '../views/library/History.vue'
import Dashboard from '../views/library/Dashboard.vue'

const library = {
  path: '/library',
  name: 'Library',
  component: Library,
  children: [
    {
      path: '/library',
      name: 'Library Dashboard',
      component: Dashboard
    },
    {
      path: '/history',
      name: 'History',
      component: History
    },
  ]
}

export default library;