<template>
  <div class="relatedvideo" @click="watch()">
    <div>
      <img class="thumbnail" :src="video.thumbnail" width="120" height="90"/>
    </div>
    <div class="text">
      <label class="title">{{video.title}}</label>
      <label v-if="uploader" class="uploader">{{uploader.username}}</label>
      <label class="view">{{video.views}} views</label>
    </div>    
  </div>
</template>

<script>
import UserService from '../services/UserService'

export default {
  name: 'RelatedVideo',
  props: {    
    video: Object,
  },
  data(){
    return {
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
.relatedvideo{
  width: 100%;
  height: 90px;
  background: transparent;
  display: flex;
  margin: 10px 0px;
}

.text{
  padding: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  max-width: 160px;
}
.text label{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.title{
  font-weight: bold;
}

.uploader, .view{
  font-size: 12px;
}
</style>
