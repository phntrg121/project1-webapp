<template>
  <div id="channel_video">
    <div class="videos">
      <div  v-for="video in videos" :key="video">
        <video-box :video="video"></video-box>
      </div>
    </div>
  </div>
</template>

<script>
import VideoBox from '../../components/VideoBox.vue'
import VideoService from '../../services/VideoService'

export default {
  name: 'Main',
  components: { VideoBox },
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

.channel_video{  
  width: 100%;
  background: #f1f1f1;
  display: flex;
  justify-content: center;
  height: 100%;
}

.videos{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
}
</style>
