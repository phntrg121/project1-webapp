<template>
  <div class="video_tile" @click="watch()">
    <img class="thumbnail" :src="video.thumbnail" width="240" height="160"/>
    <label class="title">{{video.title}}</label>
    <label v-if="uploader" class="uploader">{{uploader.username}}</label>
    <label class="view">{{video.views}} views</label>
  </div>
</template>

<script>
import UserService from '../services/UserService'

export default {
  name: 'VideoTile',
  props: {    
    video: Object,
  },
  data() {
    return{
      uploader: null,
    }
  },
  methods:{
    watch(){
      this.$router.push({
        name: 'Watch',
        params: { id: this.video.id } 
      })
    }
  },
  mounted(){
    UserService.getById(this.video.uploaderId)
    .then(res => {
      if(res.data.message == 'OK'){
        this.uploader = res.data.data
      }
    })
    .catch((err)=>console.log(err))
  }
}
</script>

<style scoped>
.video_tile{
  width: 240px;
  height: 240px;
  background: transparent;
  margin: 20px;
  display: flex;
  flex-wrap: wrap;
}

.video_tile label{
  width: 100%;
  padding: 0px 10px;
}

.title{
  font-weight: bold;
}

.uploader{
  font-size: 13px;
  color: #666;
}

.view{
  font-size: 13px;
  color: #666;
}
</style>