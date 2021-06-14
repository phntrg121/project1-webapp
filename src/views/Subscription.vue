<template>
  <div v-if="$store.getters.isAuthenticated" id="subscription">
    <div v-if="subscription" class="subscription_list">
      <div>SUBSCRIPTIONS<span style="color: #666; margin-left: 10px">{{subscription.subscriptionCount}}</span></div>
      <div v-for="id in subscription.subscriptions" :key=id>
        <subscription-item :uid="id"/>
      </div>
    </div>
    <div class="subscription_videos">
      <div class="video_list">
        <div v-for="video in videos" :key=video>
          <video-item :video="video"/>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="not_authenticated">
    <label> Sign in to see your subscriptions</label>
    <router-link :to='{path:"/account/signin", query: {continue: $route.fullPath}}' class="signin_button" style="text-decoration: none" tag="button">Sign In</router-link>
  </div>
</template>

<script>
import SubscriptionItem from '../components/SubscriptionItem'
import VideoItem from '../components/VideoItem'
import SubscriptionService from '../services/SubscriptionService'
import VideoService from '../services/VideoService'

export default {
  name: 'Subscription',
  components:{
    SubscriptionItem,
    VideoItem
  },
  data(){
    return{
      subscription: null,
      videos: [],
    }
  },
  methods: {
    async getSubscription(){
      SubscriptionService.getSubscription(this.$store.getters.currentUser.id)
      .then(res => {
        if(res.data.message == "OK"){
          this.subscription = res.data.data
        }
      })
      .catch(err => console.log(err))
    },
    async getVideos(){      
      VideoService.getVideoPage(1)
      .then(res => {
        if(res.data.message == "OK"){
          this.videos = res.data.data
        }
      })
      .catch((err) => console.log(err))
    },
  },
  mounted(){
    if(!this.$store.getters.isAuthenticated) return
    this.getSubscription()
    this.getVideos()
  }
}
</script>

<style scoped>
#subscription{
  display: flex;
  flex-direction: row;
  height: 100%;
}

.subscription_list{
  height: 100%;
  max-width: 210px;
  min-width: 210px;
  width: 30%;
  background: #f1f1f1;
  overflow-y: auto;
}

.subscription_list > div{  
  width: calc(100% - 40px);
  margin: 20px;
}

.subscription_videos{
  max-height: 100%;
  width: calc(100%-20px);
  overflow-y: auto;
  padding: 10px
}

.video_list{
  display: flex;
  flex-wrap: wrap;
}


.not_authenticated{
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.not_authenticated label{
  margin-bottom: 20px;
}

.signin_button{
  border: 2px solid blue;
  padding: 5px 15px;
  color: blue;
  font-weight: 400;
  background: transparent;
}
</style>
