<template>
  <div v-if="user" class="channel_subscription_item">
    <img :src="user.avatar" class="user_avatar click-able" @click="toChannel">
    <label class="click-able" @click="toChannel">{{user.username}}</label>
    <button :class="[isSubscribed? 'subscribed':'not_subscribed']" @click="subscribe">SUBSCRIBE</button>
  </div>
</template>

<script>
import SubscriptionService from '../services/SubscriptionService'
import UserService from '../services/UserService'

export default {
  name: 'ChannelSubscriptionItem',
  props:{
    uid: String
  },
  data(){
    return{
      user: null,
      isSubscribed: false,

      processingSubscribe: false,
    }
  },
  methods:{
    toChannel(){
      this.$router.push({
        path: `/channel/${this.user.id}`,
      })
    },
    checkSub(){
      if(!this.$store.getters.isAuthenticated) {
        this.isSubscribed = false
        return
      }
      SubscriptionService.isSubscribed({ userId: this.$store.getters.currentUser.id, otherId: this.user.id })
      .then(res => {
        if(res.data.message == "OK"){
          this.isSubscribed = res.data.data
        }
      })
      .catch(err => console.log(err))
    },
    async subscribe(){
      if(this.processingSubscribe) return
      if(!this.$store.getters.isAuthenticated){
        this.$router.push({path:"/account/signin", query: {continue: this.$route.fullPath}})
        return
      }
      this.processingSubscribe = true
      SubscriptionService.subscribe({ userId: this.$store.getters.currentUser.id, otherId: this.user.id })
      .then(res => {
        if(res.data.message == "OK"){
          this.isSubscribed = res.data.data
          this.processingSubscribe = false
        }
        else{
          alert("Subscribe error")
          this.processingSubscribe = false
        }
      })
      .catch(err => console.log(err))
    },
  },
  mounted(){
    UserService.getById(this.uid)
    .then(res => {
      if(res.data.message == 'OK'){
        this.user = res.data.data
        this.checkSub()
      }
    })
    .catch((err)=>console.log(err))
  }
}
</script>

<style scoped>
.channel_subscription_item{
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.channel_subscription_item img{
  width: 80px;
  height: 80px;
  border-radius: 40px;
  margin-bottom: 10px;
}

.channel_subscription_item label{
  margin-bottom: 10px;
}

.channel_subscription_item button{
  font-weight: bold;
  padding: 10px 20px;
  text-decoration: 0;
  border: 0;
}

.not_subscribed{
  background: red;
  color: white;
}

.subscribed{
  background: #ccc;
  color: white;
}
</style>
