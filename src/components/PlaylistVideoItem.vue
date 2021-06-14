<template>
  <div v-if="video" id="playlist_video_item">      
    <div class="head">
      <label>{{index + 1}}</label>
    </div>
    <div class="video_thumbnail click-able" @click="watch()">
      <img :src="video.thumbnail" alt="video thumbnail">
    </div>
    <div class="video_info">
      <label class="click-able" style="margin-top: 10px; font-size: 18px;" @click="watch()">{{video.title}}</label>
      <user-item style="color: #666; margin-bottom: 10px" :uid="video.uploaderId" />
    </div>
    <div class="tail"></div>
  </div>
</template>

<script>
import VideoService from '../services/VideoService'
import UserItem from './UserItem.vue'

export default {
  name: 'PlaylistVideoItem',
  components:{
    UserItem
  },
  props:{
    videoId: String,
    index: Number,
  },
  data(){
    return {
      video: null,
    }
  },
  methods:{
    watch(){
      this.$router.push({
        name: 'Watch',
        params: { id: this.video.id } 
      })
    },
    async getVideo(){
      this.video = (await VideoService.getVideo(this.videoId)).data.data
    }
  },
  mounted(){
    this.getVideo()
  }
}
</script>

<style scoped>
#playlist_video_item{
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 10px 0px;
}
#playlist_video_item:hover{
  background-color: #e5e5e5;
}

.head{
  min-width: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.video_thumbnail{
  max-width: 140px;
  max-height: 79px;
}
.video_thumbnail img{
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video_info{
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: 10px;
}

.video_info label{
  margin-bottom: 10px;
}

.video_info p{
  margin: 0;
  margin-bottom: 10px;
  height: 100%;
}

.tail{

}
</style>