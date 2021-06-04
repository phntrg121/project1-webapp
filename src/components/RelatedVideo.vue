<template>
  <div class="relatedvideo" @click="watch()">
    <div>
      <img class="thumbnail" :src="video.thumbnail" alt="video thumbnail" width="120" height="90"/>
    </div>
    <div class="text">
      <label class="title">{{video.title}}</label>
      <label class="view">{{video.views}} views</label>
      <user-item class="uploader" :uid="video.uploaderId"/>
    </div>    
  </div>
</template>

<script>
import UserService from '../services/UserService'
import UserItem from '../components/UserItem'

export default {
  name: 'RelatedVideo',
  components:{
    UserItem
  },
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
  margin-bottom: 5px;
}

.uploader, .view{
  margin-bottom: 5px;
  font-size: 12px;
}
</style>
