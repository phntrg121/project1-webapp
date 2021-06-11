<template>
  <div id="playlist">
    <div class="playlist_info">
      <div class="playlist_cover click-able">
        <img :src="playlist.cover" alt="playlist cover">
        <div class="playlist_play">
          <label>PLAY</label>
        </div>
      </div>
      <label class="playlist_name">{{playlist.name}}</label>
      <label class="playlist_sub">{{playlist.videos.length}} videos</label>
      <div class="playlist_button">
        <button>Add</button>
      </div>
      <div class="playlist_owner">
        <div class="owner_info">
          <img class="click-able" :src="owner.avatar" alt="owner avatar">
          <label class="click-able">{{owner.username}}</label>
        </div>
        <button :class="[(true)?'not_subscribed click-able':'subscribed click-able']">SUBSCRIBE</button>
      </div>

    </div>
    <div class="playlist_list">
      <div v-for="(video, index) in playlist.videos" :key="video">
        <playlist-video-item :index="index" :video="video"/>
      </div>
    </div>
  </div>
</template>

<script>
import PlaylistVideoItem from '../components/PlaylistVideoItem.vue'
export default {
  name: 'Playlist',
  components:{
    PlaylistVideoItem,
  },
  data(){
    return{
      playlist: {
        id: "123456",
        name: "pLaYlIsT nAmE",
        cover: "https://wallpapercave.com/wp/G4qMVSo.jpg",
        videos: [
          {
            title:"Rain motherfcker",
            thumbnail:"https://wallpapercave.com/wp/G4qMVSo.jpg",
            uploaderId: "60bc42a19a58c82ef8a56a22"
          },
          {
            title:"Rain motherfcker",
            thumbnail:"https://wallpapercave.com/wp/G4qMVSo.jpg",
            uploaderId: "60bc42a19a58c82ef8a56a22"
          },
          {
            title:"Rain motherfcker",
            thumbnail:"https://wallpapercave.com/wp/G4qMVSo.jpg",
            uploaderId: "60bc42a19a58c82ef8a56a22"
          },
          {
            title:"Rain motherfcker",
            thumbnail:"https://wallpapercave.com/wp/G4qMVSo.jpg",
            uploaderId: "60bc42a19a58c82ef8a56a22"
          },
          {
            title:"Rain motherfcker",
            thumbnail:"https://wallpapercave.com/wp/G4qMVSo.jpg",
            uploaderId: "60bc42a19a58c82ef8a56a22"
          },
        ],
      },
      owner: {
        username: "ABC",
        avatar: "https://yt3.ggpht.com/-7zFDHK5X45w/AAAAAAAAAAI/AAAAAAAAAAA/QJfHeLTEZwE/s900-c-k-no-mo-rj-c0xffffff/photo.jpg"
      }
    }
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
