<template>
  <div class="video_item">
    <div class="thumbnail click-able" @click="watch()">
      <img :src="video.thumbnail" alt="video thumbnail">
    </div>
    <label class="title click-able" @click="watch()">{{video.title}}</label>
    <user-item v-if="showUploader" style="color: #666; margin-bottom: 5px" :uid="video.uploaderId" />
    <label class="view">{{video.views.toLocaleString()}} views</label>
  </div>
</template>

<script>
import UserItem from './UserItem.vue'

export default {
  name: 'VideoItem',
  components:{
    UserItem
  },
  props: {    
    video: Object,
    showUploader: {
      type: Boolean,
      default: true,
    },
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
.video_item{
  max-width: 210px;
  background: transparent;
  margin-right: 10px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
.thumbnail{
  max-width: 210px;
  max-height: 118px;
  margin-bottom: 5px;
}
.thumbnail img{
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video_item label{
  margin-bottom: 5px;
  width: 100%;
}

.title{
  font-weight: bold;
  font-size: 16px
}

.view{
  font-size: 13px;
  color: #666;
}
</style>