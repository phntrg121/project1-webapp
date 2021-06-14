<template>
  <div class="video_box">
    <div class="thumbnail click-able" @click="watch()">
      <img :src="video.thumbnail" alt="video thumbnail">
    </div>
    <label class="title click-able" @click="watch()">{{video.title}}</label>
    <user-item :uid="video.uploaderId"  class="uploader"/>
    <label class="view">{{video.views.toLocaleString()}} views</label>
  </div>
</template>

<script>
import UserItem from './UserItem.vue'

export default {
  name: 'VideoBox',
  components:{
    UserItem
  },
  props: {    
    video: Object,
  },
  methods:{
    watch(){
      this.$router.push({
        name: 'Watch',
        params: { id: this.video.id } 
      })
    }
  },
}
</script>

<style scoped>
.video_box{
  max-width: 320px;
  background: transparent;
  margin: 10px;
  display: flex;
  flex-wrap: wrap;
}
.thumbnail{
  max-width: 320px;
  max-height: 180px;
  margin-bottom: 10px;
}
.thumbnail img{
  zoom: 2;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video_box label{
  margin-bottom: 10px;
  width: 100%;
}

.title{
  font-size: 20px
}

.uploader{
  color: #666;
  margin-bottom: 10px;
  width: 100%;
}

.view{
  font-size: 13px;
  color: #666;
}
</style>