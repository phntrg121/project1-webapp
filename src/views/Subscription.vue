<template>
  <div id="subscription">
    <div class="subscription_list">
      <div>SUBSCRIPTIONS</div>
      <div v-for="id in subs" :key=id>
        <user-item :uid="id"/>
      </div>
    </div>
    <div class="subscription_videos">
      <div class="video_list">
        <div v-for="video in videos" :key=video>
          <video-box :video="video"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserItem from '../components/UserItem'
import VideoBox from '../components/VideoBox'
import SubscriptionService from '../services/SubscriptionService'
import VideoService from '../services/VideoService'

export default {
  name: 'Subscription',
  components:{
    UserItem,
    VideoBox
  },
  data(){
    return{
      subs: [],
      videos: [],
    }
  },
  methods: {
    async getSubscription(){
      SubscriptionService.getSubscription(this.$store.getters.currentUser.id)
      .then(res => {
        if(res.data.message == "OK"){
          this.subs = res.data.data.subscriptions
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
</style>
