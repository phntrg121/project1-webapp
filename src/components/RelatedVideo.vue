<template>
  <div class="related_video" @click="watch()">
    <div>
      <img class="thumbnail" src='' width="120" height="90"/>
    </div>
    <div class="text">
      <label class="title">{{video.title}}</label>
      <label class="uploader">{{video.uploader}}</label>
      <label class="view">{{video.view}}</label>
    </div>    
  </div>
</template>

<script>
export default {
  name: 'RelatedVideo',
  props: {    
    video: Object,
  },
  methods:{
    watch(){
      this.$router.replace({
        name: 'Watch',
        params: { id: this.video.id } 
      })
    }
  }
}
</script>

<style scoped>
.related_video{
  height: 90px;
  background: white;
  display: flex;
  padding: 10px;  
}

.text{
  padding: 10px;
  display: flex;
  flex-direction: column;
  max-width: 140px;
}
.text label{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
