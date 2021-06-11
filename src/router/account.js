import SignIn from '../views/account/SignIn.vue'
import SignUp from '../views/account/SignUp.vue'
import Account from '../views/account/Account.vue'

const account = {
  path: '/account',
  name: "Account",
  component: Account,
  children:[      
    {
        path: '/account/signup',
        name: 'SignUp',
        component: SignUp
    },
    {
        path: '/account/signin',
        name: 'SignIn',
        component: SignIn
    },
  ]
}

export default account;