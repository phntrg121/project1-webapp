<template>
  <div class="library_dashboard">
    <div class="dashboard_content">
      <div>
        <div class="content_title">            
          <label class="click-able">History</label>
          <label style="color:blue" class="click-able" @click="$router.push({path:'/history'})">SEE ALL</label>
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
          <label style="color:blue" class="click-able" @click="$router.push({path:'/playlist', query: {list: 'WL'}})">SEE ALL</label>
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
          <label style="color:blue" class="click-able" @click="$router.push({path:'/playlist', query: {list: 'LL'}})">SEE ALL</label>
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
    <div class="dashboard_info">
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
.library_dashboard{  
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  justify-content: center;
  overflow-y: auto;
}
.dashboard_content{
  display: flex;
  flex-direction: column;
  max-width: 660px;
  width: 100%;
  height: 100%;
}
.dashboard_content > div{
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
.dashboard_info{
  display: flex;
  flex-direction: column;
  width: fit-content;
  height: 100%;
  align-items: center;
  margin-left: 10px;
}
.dashboard_info div{ 
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

</style>
