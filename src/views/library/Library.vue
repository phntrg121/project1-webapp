<template>
  <div v-if="$store.getters.isAuthenticated" id="library">  

    <div class="library_list">
      <div class="header">LIBRARY</div>
      <router-link :class="[($route.name === 'History') ? 'library_tab select' : 'library_tab']" to='/history'>
        <svg viewBox="0 0 24 24" focusable="false" class="library_icon"><g><path d="M11.9 3.75c-4.55 0-8.23 3.7-8.23 8.25H.92l3.57 3.57.04.13 3.7-3.7H5.5c0-3.54 2.87-6.42 6.42-6.42 3.54 0 6.4 2.88 6.4 6.42s-2.86 6.42-6.4 6.42c-1.78 0-3.38-.73-4.54-1.9l-1.3 1.3c1.5 1.5 3.55 2.43 5.83 2.43 4.58 0 8.28-3.7 8.28-8.25 0-4.56-3.7-8.25-8.26-8.25zM11 8.33v4.6l3.92 2.3.66-1.1-3.2-1.9v-3.9H11z"></path></g></svg>
        <label class="click-able">History</label>
      </router-link>
      <router-link class="library_tab" :to="{ path: `/studio/${$store.getters.currentUser.id}`}">
        <svg viewBox="0 0 24 24" focusable="false" class="library_icon click-able"><g><path d="M18.4 5.6v12.8H5.6V5.6h12.8zm0-1.8H5.6a1.8 1.8 0 0 0-1.8 1.8v12.8a1.8 1.8 0 0 0 1.8 1.9h12.8a1.8 1.8 0 0 0 1.9-1.9V5.6a1.8 1.8 0 0 0-1.9-1.8z"></path><path d="M10.2 9v6.5l5-3.2-5-3.2z"></path></g></svg>
        <label class="click-able" >My Videos</label>
      </router-link>
      <router-link class="library_tab" :to='{path:"/playlist", query: {list: "WL"} }'>
        <svg viewBox="0 0 24 24" focusable="false" class="library_icon click-able"><g><path d="M12 3.67c-4.58 0-8.33 3.75-8.33 8.33s3.75 8.33 8.33 8.33 8.33-3.75 8.33-8.33S16.58 3.67 12 3.67zm3.5 11.83l-4.33-2.67v-5h1.25v4.34l3.75 2.25-.67 1.08z"></path></g></svg>
        <label class="click-able">Watch Later</label>
      </router-link>
      <router-link class="library_tab" :to='{path:"/playlist", query: {list: "LL"} }'>
        <svg viewBox="0 0 24 24" focusable="false" class="library_icon click-able"><g><path d="M3.75 18.75h3v-9h-3v9zm16.5-8.25c0-.83-.68-1.5-1.5-1.5h-4.73l.7-3.43.03-.24c0-.3-.13-.6-.33-.8l-.8-.78L8.7 8.7c-.3.26-.45.64-.45 1.05v7.5c0 .82.67 1.5 1.5 1.5h6.75c.62 0 1.15-.38 1.38-.9l2.27-5.3c.06-.18.1-.36.1-.55v-1.5z"></path></g></svg>
        <label class="click-able">Liked Videos</label>
      </router-link>
      <div class="playlist_list" v-for="list in playlists" :key="list">
        <router-link class="library_tab" :to='{path:"/playlist", query: {list: list.id} }'>
          <svg viewBox="0 0 24 24" focusable="false" class="library_icon click-able"><g><path d="M3.67 8.67h14V11h-14V8.67zm0-4.67h14v2.33h-14V4zm0 9.33H13v2.34H3.67v-2.34zm11.66 0v7l5.84-3.5-5.84-3.5z"></path></g></svg>
          <label class="click-able">{{list.name}}</label>
        </router-link>
      </div>      
    </div>
    
    <div v-if="$route.name === 'Library'" class="library_overview">
      <div class="overview_content">
        <div>
          <div class="content_title">            
            <label class="click-able">History</label>
            <label style="color:blue" class="click-able">SEE ALL</label>
          </div>
          <div class="content_list">
            <div v-for="video in histories" :key="video">
              <video-item :video="video"/>
            </div>
          </div>
        </div>
        <div>
          <div class="content_title">            
            <label class="click-able">Watch Later<span style="color: #666; margin-left: 10px">{{watchlaters.length}}</span></label>
            <label style="color:blue" class="click-able">SEE ALL</label>
          </div>
          <div class="content_list">
            <div v-for="video in watchlaters" :key="video">
              <video-item :video="video"/>
            </div>
          </div>
        </div>
        <div>
          <div class="content_title">            
            <label class="click-able">Liked<span style="color: #666; margin-left: 10px">{{likes.length}}</span></label>
            <label style="color:blue" class="click-able">SEE ALL</label>
          </div>
          <div class="content_list">
            <div v-for="video in likes" :key="video">
              <video-item :video="video"/>
            </div>
          </div>
        </div>
        <div>
          <div class="content_title">            
            <label>Playlists</label>
          </div>
          <div class="content_list">
            <div v-for="list in playlists" :key="list">
              <playlist-item :list="list"/>
            </div>
          </div>
        </div>
      </div>
      <div class="overview_info">
        <div class="user_img"><img :src="$store.getters.currentUser.avatar"></div>
        <div class="info_text">
          <label>Uploads</label>
          <label>0</label>
        </div>
        <div class="info_text">
          <label>Watch Later</label>
          <label>0</label>
        </div>
        <div class="info_text">
          <label>Likes</label>
          <label>0</label>
        </div>
        <div class="info_text">
          <label>Playlists</label>
          <label>0</label>
        </div>
      </div>
    </div>

    <router-view v-else></router-view>
  </div>
  <div v-else class="not_authenticated">
    <label> Sign in to access your library</label>
    <router-link :to='{path:"/account/signin", query: {continue: $route.fullPath}}' class="signin_button" style="text-decoration: none" tag="button">Sign In</router-link>
  </div>
</template>

<script>
import VideoItem from '../../components/VideoItem.vue'
import PlaylistItem from '../../components/PlaylistItem.vue'
import PlaylistService from '../../services/PlaylistService'

export default {
  name: 'Library',
  components: { VideoItem, PlaylistItem },
  data(){
    return {
      playlists: [],
      likes: [
        {
          id:"609f1aa5a50d912e40b6ae34",
          title:"Rain in summer",
          uploaderId:"609f1ba48419a409d4429353",
          thumbnail:"https://wallpapercave.com/wp/G4qMVSo.jpg",
          views: "0",
          description:"Rose are red, Violet are blue, Rain are sad"
        },
        {
          id:"609f1aa5a50d912e40b6ae34",
          title:"Rain in summer",
          uploaderId:"609f1ba48419a409d4429353",
          thumbnail:"https://wallpapercave.com/wp/G4qMVSo.jpg",
          views: "0",
          description:"Rose are red, Violet are blue, Rain are sad"
        },
        {
          id:"609f1aa5a50d912e40b6ae34",
          title:"Rain in summer",
          uploaderId:"609f1ba48419a409d4429353",
          thumbnail:"https://wallpapercave.com/wp/G4qMVSo.jpg",
          views: "0",
          description:"Rose are red, Violet are blue, Rain are sad"
        },
      ],
      watchlaters: [
        {
          id:"609f1aa5a50d912e40b6ae34",
          title:"Rain in summer",
          uploaderId:"609f1ba48419a409d4429353",
          thumbnail:"https://wallpapercave.com/wp/G4qMVSo.jpg",
          views: "0",
          description:"Rose are red, Violet are blue, Rain are sad"
        },
        {
          id:"609f1aa5a50d912e40b6ae34",
          title:"Rain in summer",
          uploaderId:"609f1ba48419a409d4429353",
          thumbnail:"https://wallpapercave.com/wp/G4qMVSo.jpg",
          views: "0",
          description:"Rose are red, Violet are blue, Rain are sad"
        },
        {
          id:"609f1aa5a50d912e40b6ae34",
          title:"Rain in summer",
          uploaderId:"609f1ba48419a409d4429353",
          thumbnail:"https://wallpapercave.com/wp/G4qMVSo.jpg",
          views: "0",
          description:"Rose are red, Violet are blue, Rain are sad"
        },
      ],
      histories: [
        {
          id:"609f1aa5a50d912e40b6ae34",
          title:"Rain in summer",
          uploaderId:"609f1ba48419a409d4429353",
          thumbnail:"https://wallpapercave.com/wp/G4qMVSo.jpg",
          views: "0",
          description:"Rose are red, Violet are blue, Rain are sad"
        },
        {
          id:"609f1aa5a50d912e40b6ae34",
          title:"Rain in summer",
          uploaderId:"609f1ba48419a409d4429353",
          thumbnail:"https://wallpapercave.com/wp/G4qMVSo.jpg",
          views: "0",
          description:"Rose are red, Violet are blue, Rain are sad"
        },
        {
          id:"609f1aa5a50d912e40b6ae34",
          title:"Rain in summer",
          uploaderId:"609f1ba48419a409d4429353",
          thumbnail:"https://wallpapercave.com/wp/G4qMVSo.jpg",
          views: "0",
          description:"Rose are red, Violet are blue, Rain are sad"
        },
        {
          id:"609f1aa5a50d912e40b6ae34",
          title:"Rain in summer",
          uploaderId:"609f1ba48419a409d4429353",
          thumbnail:"https://wallpapercave.com/wp/G4qMVSo.jpg",
          views: "0",
          description:"Rose are red, Violet are blue, Rain are sad"
        },
        {
          id:"609f1aa5a50d912e40b6ae34",
          title:"Rain in summer",
          uploaderId:"609f1ba48419a409d4429353",
          thumbnail:"https://wallpapercave.com/wp/G4qMVSo.jpg",
          views: "0",
          description:"Rose are red, Violet are blue, Rain are sad"
        },
        {
          id:"609f1aa5a50d912e40b6ae34",
          title:"Rain in summer",
          uploaderId:"609f1ba48419a409d4429353",
          thumbnail:"https://wallpapercave.com/wp/G4qMVSo.jpg",
          views: "0",
          description:"Rose are red, Violet are blue, Rain are sad"
        },
      ],
    }
  },
  methods:{
    async getPlaylists(){
      PlaylistService.getPlaylistFromUser(this.$store.getters.currentUser.id)
      .then(res=>{
        if(res.data.message == "OK"){
          this.playlists = res.data.data
        }
      })
    },
  },
  mounted(){
    this.getPlaylists()
  }
}
</script>

<style scoped>
#library{
  display: flex;
  flex-direction: row;
  height: 100%;
}

.library_list{
  height: 100%;
  max-width: 210px;
  width: 30%;
  background: #f1f1f1;
  overflow-y: auto;
}
.library_list .header{
  width: calc(100% - 40px);
  margin: 20px;
  position: sticky;
  top: 0;
}


.library_tab{
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  color: #666;  
  fill: #666;
  text-decoration: 0;
}

.library_tab label{
  margin: 10px;
}

.select{
  
  color: red;  
  fill: red;
}

.library_tab:hover{
  background: #e1e1e1;
}

.library_icon{
  width: 24px;
  height: 24px;
  margin: 10px;
}

.playlist_list{
  width: 100%;
  margin: 0;
}



.library_overview{  
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  justify-content: center;
  overflow-y: auto;
}
.overview_content{
  display: flex;
  flex-direction: column;
  max-width: 660px;
  width: 100%;
  height: 100%;
}
.overview_content > div{
  margin-bottom: 20px;
}
.content_title{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 0px;
  width: calc(100%-10px);
  margin-right: 10px;
  margin-bottom: 10px;
}
.content_list{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
}
.overview_info{
  display: flex;
  flex-direction: column;
  width: fit-content;
  height: 100%;
  align-items: center;
  margin-left: 10px;
}
.overview_info div{ 
  border-bottom: 1px solid #cecece;
}
.user_img{
  width: 80px;
  height: 80px;
  padding: 40px;
}
.user_img img{
  width: 100%;
  border-radius: 50%;
  height: 100%;
  object-fit: cover  
}
.info_text{
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 10px 0px;
  font-size: 14px;
  color: #666;
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
