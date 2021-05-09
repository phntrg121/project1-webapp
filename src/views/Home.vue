<template>
  <div class="home">
    <div class="display">
      <div class="videos-list">
        <div v-for="video in videos" :key="video">
          <video-tile :video="video"/>
        </div>
      </div>  
    </div>     
  </div>
</template>

<script>
import VideoTile from '../components/VideoTile.vue'
import VideoService from '../services/VideoService'

export default {
  name: 'Home',
  components: {
    VideoTile
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
      this.videos = res.data
    })
    .catch((err) => console.log(err))
  },
}
</script>

<style scoped>
.videos-list{
  display: flex;
  flex-wrap: wrap;
}

.display{
  display: flex;
  justify-content: center;
  padding: 10px;
}

/* @media screen and (max-width: 596px) { .videos-list { width: 280px; } } */
/* @media screen and (min-width: 597px) and (max-width: 876px) { .videos-list { width: 560px; } } */
/* @media screen and (min-width: 877px) and (max-width: 1156px) { .videos-list { width: 840px; } } */
/* @media screen and (min-width: 1157px) and (max-width: 1436px) { .videos-list { width: 1120px; } } */
/* @media screen and (min-width: 1437px) and (max-width: 1716px) { .videos-list { width: 1400px; } } */
</style>
