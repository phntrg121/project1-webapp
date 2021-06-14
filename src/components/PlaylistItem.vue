<template>
  <div class="playlist_item">
    <div class="cover click-able" @click="watch()">
      <img :src="list.cover" alt="video thumbnail">
      <div>
        <label>{{list.videoCount}}</label>
      </div>
    </div>
    <label class="title click-able" @click="watch()">{{list.name}}</label>
    <user-item v-if="showUploader" style="color: #666; margin-bottom: 10px" :uid="list.creator" />
    <label class="view click-able" @click="toPlaylist()">VIEW FULL PLAYLIST</label>
  </div>
</template>

<script>
import UserItem from './UserItem.vue'
export default {
  name: 'PlaylistItem',
  components:{
    UserItem
  },
  props: {    
    list: Object,
    showUploader: {
      type: Boolean,
      default: true,
    },
  },
  methods:{
    watch(){
      // this.$router.push({
      //   name: 'Watch',
      //   params: { id: this.video.id } 
      // })
    },
    toPlaylist(){
      this.$router.push({
        name: 'Playlist',
        query: { list: this.list.id }
      })
    }
  },
}
</script>

<style scoped>
.playlist_item{
  max-width: 210px;
  background: transparent;
  margin-right: 10px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
.cover{
  max-width: 210px;
  max-height: 118px;
  margin-bottom: 10px;
  position: relative;
}
.cover img{
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.cover > div{
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgb(0, 0, 0, 0.6);
  width: 80px;
} 
.cover > div > label{
  font-weight: bold;
  color: white;
}

.title{
  font-size: 16px;
  margin-bottom: 10px;
  width: 100%;
}

.view{
  margin-bottom: 10px;
  width: 100%;
  font-size: 14px;
  font-weight: bold;
  color: #666;
}
</style>