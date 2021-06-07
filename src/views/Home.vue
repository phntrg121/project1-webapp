<template>
  <div class="home">
    <div class="display">
      <label>RECOMMENDED</label>
      <div class="videos-list">
        <div v-for="video in videos" :key="video">
          <video-box :video="video"/>
        </div>
      </div>  
    </div>     
  </div>
</template>

<script>
import VideoBox from '../components/VideoBox.vue'
import VideoService from '../services/VideoService'

export default {
  name: 'Home',
  components: {
    VideoBox
  },
  data(){
    return {
      page: 1,
      videos: [],
    }
  },
  mounted() {
    VideoService.getVideoPage(1)
    .then(res => {      
      if(res.data.message == "OK"){
        this.videos = res.data.data
      }
    })
    .catch((err) => console.log(err))
  },
}
</script>

<style scoped>
.display{
  display: flex;
  flex-direction: column;
  padding: 10px;
}
.display >label{
  margin: 10px;
  padding-bottom: 10px;
  border-bottom: 2px solid #6d6d6d;
}
.videos-list{
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

/* @media screen and (max-width: 596px) { .videos-list { width: 280px; } } */
/* @media screen and (min-width: 597px) and (max-width: 876px) { .videos-list { width: 560px; } } */
/* @media screen and (min-width: 877px) and (max-width: 1156px) { .videos-list { width: 840px; } } */
/* @media screen and (min-width: 1157px) and (max-width: 1436px) { .videos-list { width: 1120px; } } */
/* @media screen and (min-width: 1437px) and (max-width: 1716px) { .videos-list { width: 1400px; } } */
</style>
