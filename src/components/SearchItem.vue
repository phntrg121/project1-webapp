<template>
  <div id="search_item">
    <div class="video_thumbnail click-able" @click="watch()">
      <img :src="video.thumbnail" alt="video thumbnail">
    </div>
    <div class="video_info">      
      <label class="click-able" style="margin-top: 10px; font-size: 20px;" @click="watch()">{{video.title}}</label>
      <user-item style="color: #666; margin-bottom: 10px" :uid="video.uploaderId" />
      <label style="color: #666; font-size: 12px ">{{video.views}} views</label>
      <p style="color: #666; font-size: 14px; max-width: 100">{{video.description}}</p>
    </div>
  </div>
</template>

<script>
import UserItem from './UserItem.vue'

export default {
  name: 'SearchItem',
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
#search_item{
  display: flex;
  flex-direction: row;
  padding: 10px;
  margin-bottom: 10px;
}
.video_thumbnail{
  max-width: 320px;
  max-height: 180px;
}
.video_thumbnail img{
  zoom: 2;
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
</style>