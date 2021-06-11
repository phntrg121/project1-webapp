<template>
  <div id="channel_playlist">
    <label>Created playlists</label>
    <div class="playlists">
      <div  v-for="list in playlists" :key="list">
        <playlist-item :list="list" :showUploader="false"/>
      </div>
    </div>
  </div>
</template>

<script>
import PlaylistItem from '../../components/PlaylistItem.vue'

export default {
  name: 'ChannelPlaylists',
  components: { PlaylistItem },
  data(){
    return {
      playlists: [
        {
          id: "sh2Dsj2IsLL",
          owner: "60bc42a19a58c82ef8a56a22",
          name: "Play01",
          cover: "https://wallpapercave.com/wp/G4qMVSo.jpg",
          videoCount: 7,
        },
        {
          id: "sh2Dsj2IsLL",
          owner: "60bc42a19a58c82ef8a56a22",
          name: "Play02",
          cover: "https://wallpapercave.com/wp/G4qMVSo.jpg",
          videoCount: 7,
        },
        {
          id: "sh2Dsj2IsLL",
          owner: "60bc42a19a58c82ef8a56a22",
          name: "Play03",
          cover: "https://wallpapercave.com/wp/G4qMVSo.jpg",
          videoCount: 7,
        },
        {
          id: "sh2Dsj2IsLL",
          owner: "60bc42a19a58c82ef8a56a22",
          name: "Play04",
          cover: "https://wallpapercave.com/wp/G4qMVSo.jpg",
          videoCount: 7,
        },
      ],
    }
  },
  methods: {    
    async getCreatedPlaylist(){
    },
  },
  mounted(){
    this.getCreatedPlaylist()
  }
}
</script>

<style scoped>
#channel_playlist{  
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
}

#channel_playlist > label{
  margin-top: 20px;
  margin-bottom: 10px;
}

.playlists{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
}
</style>
