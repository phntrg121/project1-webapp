<template>
  <div v-if="playlist && creator" id="playlist">
    <div class="playlist_info">
      <div class="playlist_cover click-able">
        <img :src="playlist.cover" alt="playlist cover">
        <div class="playlist_play">
          <label>PLAY</label>
        </div>
      </div>
      <label class="playlist_name">{{playlist.name}}</label>
      <label class="playlist_sub">{{playlist.videoCount}} videos</label>
      <div class="playlist_button">
        <button>Add</button>
      </div>
      <div class="playlist_owner">
        <div class="owner_info">
          <img class="click-able" :src="creator.avatar" alt="owner avatar">
          <label class="click-able">{{creator.username}}</label>
        </div>
        <button v-if="!isOwned" :class="[(!isSubscribed)?'not_subscribed click-able':'subscribed click-able']" @click="subscribe">SUBSCRIBE</button>
      </div>

    </div>
    <div class="playlist_list">
      <div v-for="(id, index) in playlist.videos" :key="id">
        <playlist-video-item :index="index" :videoId="id"/>
      </div>
    </div>
  </div>
  <div v-else>
  </div>
</template>

<script>
import PlaylistVideoItem from '../components/PlaylistVideoItem.vue'
import PlaylistService from '../services/PlaylistService'
import LikeService from '../services/LikeService'
import SubscriptionService from '../services/SubscriptionService'
import UserService from '../services/UserService'

export default {
  name: 'Playlist',
  components:{
    PlaylistVideoItem,
  },
  data(){
    return{
      playlist: null,
      creator: null,
      isSubscribed: false,
      isOwned: false,

      processingSubscribe: false,
    }
  },
  methods: {
    async getPlaylist(listId){
      PlaylistService.getPlaylist(listId)
      .then(res=> {
        if(res.data.message == "OK"){
          this.playlist = res.data.data
          this.getCreator()
        }
      })
      .catch(err=>console.log(err))
    },
    async getWL(uid){
      PlaylistService.getWL(uid)
      .then(res=>{
        if(res.data.message == "OK"){
          this.playlist = res.data.data
          this.creator = this.$store.getters.currentUser
          this.checkSub()
        }
      })
      .catch(err=>console.log(err))
    },
    async getLL(uid){
      LikeService.getLikedVideoList(uid)
      .then(res=>{
        if(res.data.message == "OK"){
          this.playlist = res.data.data
          this.creator = this.$store.getters.currentUser
          this.checkSub()
        }
      })
      .catch(err=>console.log(err))
    },
    async getCreator(){
      this.creator = (await UserService.getById(this.playlist.creator)).data.data
      this.checkSub()
    },
    async checkSub(){
      this.isOwned = (!this.$store.getters.isAuthenticated) ? false: (this.creator.id == this.$store.getters.currentUser.id)
      this.isSubscribed = (!this.$store.getters.isAuthenticated) ? false : (await SubscriptionService.isSubscribed({ userId: this.$store.getters.currentUser.id, otherId: this.playlist.creator })).data.data
    },
    async subscribe(){
      if(this.processingSubscribe) return
      if(!this.$store.getters.isAuthenticated){
        this.$router.push({path:"/account/signin", query: {continue: this.$route.fullPath}})
        return
      }
      this.processingSubscribe = true
      SubscriptionService.subscribe({ userId: this.$store.getters.currentUser.id, otherId: this.playlist.creator })
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
    }
  },
  mounted(){
    if(this.$route.query.list != "WL" && this.$route.query.list != "LL") this.getPlaylist(this.$route.query.list)
    else if(this.$store.getters.isAuthenticated && this.$route.query.list == "WL") this.getWL(this.$store.getters.currentUser.id)    
    else if(this.$store.getters.isAuthenticated && this.$route.query.list == "LL") this.getLL(this.$store.getters.currentUser.id)    
  }
}
</script>

<style scoped>
#playlist{
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  overflow-y: auto;
}

.playlist_info{
  position: sticky;
  top: 0px;
  min-width: 360px;
  height: calc(100% - 40px);
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.playlist_cover{
  width: 360px;
  height: 200px;
  margin-bottom: 10px;
  position: relative;
}
.playlist_cover img{
  zoom: 2;
  width: 100%;
  height: 100%;
}
.playlist_play{
  position: absolute;
  background-color: rgb(0, 0, 0,0.6);
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 10px 0px;
  right: 0;
  left: 0;
  bottom: 0;
}
.playlist_play label{
  color: #fff;
}
.playlist_name {
  font-size: 24px;
  margin-bottom: 10px;
}
.playlist_sub{  
  font-size: 14px;
  margin-bottom: 10px;
}
.playlist_button{
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #666;
}

.playlist_owner{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.owner_info{
  display: flex;
  flex-direction: row;
  align-items: center;
}
.owner_info img{
  width: 50px;
  height: 50px;
  border-radius: 25px;
}
.owner_info label{
  margin-left: 10px;
}
.playlist_owner button{
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

.playlist_list{
  width: 100%;
  height: fit-content;
  min-height: calc(100% - 40px);
  background-color: #f1f1f1;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
}
</style>
