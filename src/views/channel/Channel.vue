<template>
  <div v-if="mounted" id="channel">
    <div class="channel_banner">
      <div class="banner_img">
        <img/>
      </div>
    </div>
    <div class="channel_banner">
      <div v-if="user" class="banner">
        <div class="banner_info">
          <img width="120" height="120" :src="user.avatar" alt="user image">
          <div style="display:flex;flex-direction:column">
            <label style="font-size:20px">{{user.username}}</label>
            <label v-if="sub" style="font-size:14px;color:#666">{{sub.subscriberCount.toLocaleString()}} subscribers</label>          
          </div>
        </div>        
        <div class="banner_button">
          <button v-if="isOwner()" class="btn_enable" @click="toContent">MANAGE CHANNEL</button>
          <button v-if="!isOwner()" :class="[(isSubscribed) ? 'btn_disble' : 'btn_enable']" @click="subscribe">SUBSCRIBE</button>
        </div>
        <input type="file" style="display: none" ref="fileInput" accept="video/*" @change="onFilePicked"/>
      </div>
    </div>
    <div class="channel_banner">
      <div class="content">
        <div v-if="user" class="channel_tabs">
          <router-link :to="`/channel/${user.id}`" :class="[($route.name === 'Channel Video')? 'channel_tab select':'channel_tab']">
            VIDEOS
          </router-link>
          <router-link :to="`/channel/${user.id}/playlists`" :class="[($route.name === 'Channel Playlist')? 'channel_tab select':'channel_tab']">
            PLAYLISTS
          </router-link>
          <router-link :to="`/channel/${user.id}/subscriptions`" :class="[($route.name === 'Channel Subscription')? 'channel_tab select':'channel_tab']">
            SUBSCRIPTIONS
          </router-link>
          <router-link :to="`/channel/${user.id}/about`" :class="[($route.name === 'Channel About')? 'channel_tab select':'channel_tab']">
            ABOUT
          </router-link>
        </div>
      </div>
    </div>
    <div class="channel_content">
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from '../../services/UserService'
import SubscriptionService from '../../services/SubscriptionService'

export default {
  name: 'Channel',
  data() {
    return{
      mounted: false,
      user: null,
      sub: null,
      isSubscribed: false,

      processingSubscribe: false,
    }
  },
  methods: {
    isOwner(){
      if(!this.user) return false
      if(!this.$store.getters.isAuthenticated) return false
      return this.user.id==this.$store.getters.currentUser.id
    },
    toContent(){
      this.$router.push({
        path:`/studio/${this.$store.getters.currentUser.id}`,
      })
    },
    async getChannelInfo(){
      UserService.getById(this.$route.params.id)
      .then(res=>{
        if(res.data.message == "OK"){
          this.user = res.data.data          
          this.getSubCount()
          this.checkSub()
        }
      })
      .catch(err=>console.log(err))
    },
    async getSubCount(){
      SubscriptionService.getSubscriber(this.user.id)
      .then(res => {
        if(res.data.message == "OK"){
          this.sub = res.data.data
        }
      })
      .catch(err => console.log(err))
    },
    async checkSub(){
      if(!this.$store.getters.isAuthenticated){
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
    this.getChannelInfo()
    this.mounted = true
  }
}
</script>

<style scoped>
#channel{
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

.channel_banner{
  width: 100%;
  justify-content: center;
  background: #f9f9f9;
  display: flex;
}

.banner_img{
  width: 100%;
  height: 160px;
}

.banner{
  display: flex;
  width: 100%;
  max-width: 960px;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
}

.banner_info{  
  display: flex;
  flex-direction: row;
  align-items: center;
}
.banner_info img{
  width: 80px;
  height: 80px;
  border-radius: 50px
}
.banner_info label{
  margin: 0px 10px;
}

.banner_button{
  display: flex;
  flex-direction: row;
  align-items: flex-end;
}

.banner_button button{
  margin-left: 10px;
  font-weight: bold;
  padding: 10px 20px;
  text-decoration: 0;
  border: 0;
}
.banner_button button:hover{
  cursor: pointer;
}
.btn_enable{
  background: red;
  color: white;
}
.btn_disable{
  background: #ccc;
  color: white;
}

.channel_content{
  width: 100%;
  background: #f1f1f1;
  display: flex;
  justify-content: center;
  height: 100%;
}

.content{  
  display: flex;
  width: 100%;
  max-width: 960px;
  flex-direction: column;
  margin: 0px 10px;
}

.channel_tabs{
  width: 100%;
  display: flex;
  flex-direction: row;
}

.channel_tab{
  width: fit-content;
  padding: 10px 30px;
  display: block;
  text-align: center;
  color: #666;
  text-decoration: 0;
}

.select{
  font-weight: bold;
  border-bottom: 3px solid #666;
}
</style>
