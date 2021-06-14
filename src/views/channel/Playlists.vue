<template>
  <div id="channel_playlist">
    <label>Created playlists</label>
    <div v-if="playlists.length > 0" class="playlists">
      <div v-for="list in playlists" :key="list">
        <playlist-item :list="list" :showUploader="false"/>
      </div>
    </div>
    <div v-else style="display: flex; width: 100%; justify-content: center;">
      <label>This channel has no playlists</label>
    </div>
  </div>
</template>

<script>
import PlaylistItem from '../../components/PlaylistItem.vue'
import PlaylistService from '../../services/PlaylistService'

export default {
  name: 'ChannelPlaylists',
  components: { PlaylistItem },
  data(){
    return {
      playlists: [],
    }
  },
  methods: {    
    async getCreatedPlaylist(){
      PlaylistService.getPlaylistFromUser(this.$route.params.id)
      .then(res=>{
        if(res.data.message == "OK"){
          this.playlists = res.data.data
        }
      })
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
