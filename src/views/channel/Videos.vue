<template>
  <div id="channel_video">
    <label>Uploads</label>
    <div class="videos">
      <div  v-for="video in videos" :key="video">
        <video-item :video="video" :showUploader="false"/>
      </div>
    </div>
  </div>
</template>

<script>
import VideoItem from '../../components/VideoItem.vue'
import VideoService from '../../services/VideoService'

export default {
  name: 'ChannelVideos',
  components: { VideoItem },
  data() {
    return {
      videos: [],
    }
  },
  methods: {    
    async getUploadVideos(){
      VideoService.getUploadVideo(this.$route.params.id)
      .then(res=>{
         if(res.data.message == "OK"){
          this.videos = res.data.data
        }
      })
      .catch(err=>console.log(err))
    },
  },
  mounted(){
    this.getUploadVideos()
  }
}
</script>

<style scoped>

#channel_video{  
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
}

#channel_video > label{
  margin-top: 20px;
  margin-bottom: 10px;
}

.videos{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
}
</style>
