<template>
  <div class="video_box">
    <img class="thumbnail" :src="video.thumbnail" width="240" height="160" @click="watch()"/>
    <label class="title" @click="watch()">{{video.title}}</label>
    <label class="view">{{video.views}} views</label>
    <user-item :uid="video.uploaderId"  class="uploader"/>
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
  width: 240px;
  height: 240px;
  background: transparent;
  margin: 20px;
  display: flex;
  flex-wrap: wrap;
}

.video_box label{
  width: 100%;
  padding: 0px 10px;
}

.title{
  font-weight: bold;
}

.uploader{
  color: #666;
  width: 100%;
  padding: 0px 10px;
}

.view{
  font-size: 13px;
  color: #666;
}

.title:hover, .thumbnail:hover{
  cursor: pointer;
}
</style>