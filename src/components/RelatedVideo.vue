<template>
  <div class="relatedvideo" @click="watch()">
    <img class="thumbnail" :src="video.thumbnail" alt="video thumbnail" width="160" height="120"/>
    <div class="text">
      <label class="title">{{video.title}}</label>
      <user-item class="uploader" :uid="video.uploaderId"/>
      <label class="view">{{video.views.toLocaleString()}} views</label>
    </div>    
  </div>
</template>

<script>
import UserItem from '../components/UserItem'

export default {
  name: 'RelatedVideo',
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
.relatedvideo{
  width: 100%;
  background: transparent;
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
}

.text{
  margin-left: 10px;
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
  margin-bottom: 5px;
}

.uploader, .view{
  margin-bottom: 5px;
  font-size: 12px;
}
</style>
