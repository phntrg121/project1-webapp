<template>
  <div class="signup">
    <form class="form">
      <h1>SIGN UP</h1>
      <div class="text_field">
        <input type="text" class="text_input" placeholder=" " v-model="username">
        <label class="text_label">Username</label>
      </div>
      <div class="text_field">
        <input type="email" class="text_input" placeholder=" " v-model="email">
        <label class="text_label">Email</label>
      </div>
      <div class="text_field">
        <input type="password" class="text_input" placeholder=" " v-model="password">
        <label class="text_label">Password</label>
      </div>
      <div class="text_field">
        <input type="password" class="text_input" placeholder=" " v-model="confirm">
        <label class="text_label">Confirm password</label>
      </div>
      <div>
      <input type="checkbox" class="agreed" v-model="agree"> I agreed to the term of service</div>
      <button type="submit" @click.stop.prevent="signUp()">Sign Up</button>
      <div class="signin-link">Already have account? 
        <router-link :to='{path:"/account/signin", query: {continue: continuePath}}'>Sign in</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import UserService from '../../services/UserService'
import SubscriptionService from '../../services/SubscriptionService'
import PlaylistService from '../../services/PlaylistService'
import LikeService from '../../services/LikeService'
import HistoryService from '../../services/HistoryService'

export default {
  name: 'signin',
  data() {
    return {      
      username: '',
      email: '',
      password: '',
      confirm: '',
      agree: false,
      loading: false,
      continuePath: this.$route.query.continue,
    }
  },
  methods:{
    async signUp(){
      if(this.loading) return
      this.loading = true

      try{
        let response = (await UserService.signUp({ email: this.email, username: this.username, password: this.password })).data
        if(response.message != "OK"){
          alert(response.message)
        }
        else{
          let user = response.data
          await SubscriptionService.createSub(user.id)
          await PlaylistService.createWL(user.id)
          await LikeService.createLikedList(user.id)
          await HistoryService.createHistory(user.id)
          await UserService.createChannel(user.id)          
          this.$store.dispatch('signUp', user)
          let channel = (await UserService.createChannel(this.$store.getters.currentUser.id)).data.data
          this.$store.dispatch('setChannel', channel)
          alert(response.message)
          this.$router.push({ path: this.continuePath })
        }
      }
      catch(err){
        console.log(err)
        alert('Something when wrong')
      }
      finally{
        this.loading = false
      }
    },
  }
}
</script>

<style scoped scss>
.signup{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
}

.form{
  width: 360px;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 10px 25px #ccc;
}

h1{
  text-align: center;
  font-weight: bold;
  margin-bottom: 3rem;
}

.text_field{
  height: 48px;
  width: 100%;  
  margin-bottom: 16px;
  border-bottom: 2px solid #666;
}

.text_input{
  position: inherit;
  width: 100%;
  height: 100%;
  font-size: 16px;
  border: none;
  outline: none;
  background: none;
  z-index: 1; 
  font-size: 16px;
}


.text_label{
  position: absolute;
  transform: translate(5px,-32px);
  background-color: #fff;
  color: black;
  font-size: 16px;
  transition: .3s;
  z-index: 2;
}

button{
  margin: 46px 0px;
  width: 100%;
  height: 48px;
  border-radius: 24px;
  font-weight: bold;
  font-size: 18px;
  outline: none;
  border: 1px solid #666;
} 


.text_input:focus + .text_label{
  transform: translateY(-52px);
  font-size: 12px;
  font-weight: 500;
}

.text_input:not(:placeholder-shown).text_input:not(:focus)+ .text_label{
  transform: translateY(-52px);
  font-size: 12px;
  font-weight: 500;
}

button:hover{
  border-width: 2px;
  border-color: #333;
  transform: 0.2s;
  cursor: pointer;
} 

.agreed{
  margin-top: 16px;
}

.signin-link{
  text-align: center;
}
</style>