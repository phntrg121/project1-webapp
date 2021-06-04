<template>
  <div id="video_item">
    <img :src="video.thumbnail" alt="video thumbnail" width="240" height="160" @click="watch()">
    <div class="video_info">      
      <label style="font-weight: bold; font-size: 20px;" @click="watch()">{{video.title}}</label>
      <label style="color: #666; font-size: 14px ">{{video.views}} views</label>
      <user-item style="color: #666" :uid="video.uploaderId" />
      <p style="color: #666; font-size: 14px; max-width: 100">{{video.description}}</p>
    </div>
  </div>
</template>

<script>
import UserItem from '../components/UserItem.vue'

export default {
  name: 'VideoItem',
  components:{
    UserItem
  },
  props:{
    video: Object,
  },
  methods:{
    watch(){
      this.$router.push({
        name: 'Watch',
        params: { id: this.video.id } 
      })
    }
  }
}
</script>

<style scoped>
#video_item{
  display: flex;
  flex-direction: row;
  margin: 20px 10px;
}

.video_info{
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 10px;
}

.video_info label, .video_info p, .video_info user-item{
  margin-bottom: 10px;
}

.video_info p{
  overflow: hidden;
}



</style>