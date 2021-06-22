<template>
  <div id="studio_playlists">
    <new-playlist-modal v-show="showCreatePlaylistModal" @close="onCloseModal()"/>
    <div class="head">
      <label>Playlists</label>
      <button class="click-able" @click="openModal()">NEW PLAYLIST</button>
    </div>
    <div class="body">
      <label class="playlist_filter">FILTER</label>
      <div class="playlist_table">
        <table >
          <thead>
            <tr>
              <th>Playlist</th>
              <th>Last Updated</th>
              <th>Video Count</th>
            </tr>
          </thead>
          <tbody>
            <tr class="table_row" v-for="list in playlists" :key="list">
              <td>
                <div class="playlist_col">
                  <div class="playlist_img">
                    <img :src="list.cover"/>
                    <div><label>{{list.videoCount}}</label></div>
                  </div>
                  <div style="position: relative; margin-left: 10px; width: 100%">
                    <label>{{list.name}}</label>
                    <div class="playlist_nav">
                      <button class="click-able" @click="toPlaylist(list.id)">
                        <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false"><g><path d="M8 5v14l11-7z"></path></g></svg>
                      </button>
                      <button class="click-able">
                        <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false"><g><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></g></svg>
                      </button>
                      <button class="click-able">
                        <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false"><g><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></g></svg>
                      </button>
                    </div>
                  </div>
                  
                </div>              
              </td>
              <td>{{new Date(list.latestUpdate).toDateString()}}</td>
              <td>{{list.videoCount}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import NewPlaylistModal from '../../components/NewPlaylistModal.vue'
import PlaylistService from '../../services/PlaylistService'

export default {
  name: 'Studio Playlists',
  components: { NewPlaylistModal },
  data(){
    return {
      playlists: [], 
      showCreatePlaylistModal: false,
    }
  },
  methods: {
    openModal(){
      this.showCreatePlaylistModal = true
    },
    onCloseModal(){
      this.showCreatePlaylistModal = false
    },
    toPlaylist(id){
      this.$router.push({
        name: 'Playlist',
        query: { list: id }
      })
    },
    async getPlaylists(){
      PlaylistService.getPlaylistFromUser(this.$store.getters.currentUser.id)
      .then(res=>{
        this.playlists = res.data.data
      })
      .catch(err=>console.log(err))
    }
  },
  mounted(){
    this.getPlaylists()
  }
}
</script>

<style scoped>

#studio_playlists{  
  display: flex;
  flex-direction: column;
  width: calc(100% - 20px);
  height: fit-content;
  padding: 10px;
}
.head{
  display: flex;
  flex-direction: row;
  width: calc(100% - 20px);
  justify-content: space-between;
  align-items: center;
  padding: 20px 10px;
}
.head label{
  font-size: 20px;
  font-weight: bold;
}
.head button{
  border: 0;
  padding: 0;
  background: transparent;
  font-size: 14px;
  color: blue
}


.body{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.playlist_filter{
  padding: 10px;
  border-bottom: 1px solid #cecece;
}

.playlist_table{
  width: 100%;
  overflow-x: auto;  
}
.playlist_table table{  
  border-collapse: collapse;
  width: 100%;
}
.playlist_table table th{
  padding: 10px;
  border-bottom: 1px solid #cecece;
}
.table_row td{
  padding: 10px;
  text-align: center;
}
.table_row:hover{
  background-color: #eee;
}

.playlist_col{
  display: flex;
  flex-direction: row;
  min-width: 360px;
}
.playlist_img{
  min-width: 120px;
  max-width: 120px;
  min-height: 68px;
  max-height: 68px;
  position: relative;
}
.playlist_img img{
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.playlist_img > div{
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgb(0, 0, 0, 0.6);
  width: 40px;
}
.playlist_img > div > label{
  font-weight: bold;
  color: white;
}
.playlist_col > div > label{
  position: absolute;
  top: 0;
  left: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: start;
  width: 100%;
  height: 100%;
}
.playlist_nav{  
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  right: 0;
  width: 100%;
  height: 100%;
  visibility: hidden;
}
.playlist_nav button{
  margin-left: 10px;
  width: 32px;
  height: 32px;
  padding: 0;
  outline: 0;
  border: 0;
  fill: #666;
}
.playlist_nav button svg{
  widows: 100%;
  height: 100%;
}
.table_row:hover .playlist_col > div > label{
  visibility: hidden;
}
.table_row:hover .playlist_nav{
  visibility: visible;
}
</style>
