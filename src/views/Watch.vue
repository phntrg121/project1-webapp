<template>
  <div class="watch">
    <nav-bar/>
    <div v-if="video" class="video">
      <div class="video_watch">
        <div class="player">
          <video :src="video.videoURL" type="video/mp4" controls></video>
          <div class="tag_list">
            <div v-for="tag in video.tags" :key="tag">
              <router-link class="tag" to="">#{{tag}}</router-link>
            </div>
          </div>
          <label class="title">{{ video.title }}</label>
          <div class="view_like">
            <label>{{video.views}} views</label>
            <button>{{video.likes}} Like</button>
          </div>
        </div>        
        <div class="video_info">          
          <div  v-if="uploader" class="uploader">
            <img :src="uploader.avatar" alt="">
            <label>{{uploader.username}}</label>
          </div>
          <div class="description">
            <div>{{video.description}}</div>
          </div>
        </div>          
        <div class="comment">
          <label>{{comments.size}} Comments</label>
          <comment-input/>
          <div class="comment_list">
            <div v-for="comment in comments" :key="comment">
              <comment :comment="comment"/>
            </div>
          </div>
        </div>
      </div>
      <div class="related_video">
        <label>Related Videos</label>
        <div class="video_list">
          <div v-for="video in relatedVideos" :key="video">
            <related-video :video="video"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Comment from '../components/Comment.vue'
import CommentInput from '../components/CommentInput.vue'
import NavBar from '../components/NavBar.vue'
import RelatedVideo from '../components/RelatedVideo.vue'
import UserService from '../services/UserService'
import VideoService from '../services/VideoService'
import CommentService from '../services/CommentService'

export default {
  name: '',
  components:{
    NavBar,
    RelatedVideo,
    CommentInput,
    Comment
  },
  data(){    
    return{
      video: null,
      uploader: null,
      videoId: this.$route.params.id,
      relatedVideos: [],
      comments: []
    }
  },
  mounted(){
    VideoService.getVideo(this.videoId)
    .then(res => {
      if(res.data.message == "OK"){
        this.video = res.data.data

        UserService.getById(this.video.uploaderId)
        .then(res=>{
          if(res.data.message == "OK"){
            this.uploader = res.data.data
          }
        })
        .catch(err=>console.log(err))

        VideoService.getRelatedVideo({ videoId: this.videoId, tags: this.video.tags})
        .then(res => {
          if(res.data.message == "OK"){
            this.relatedVideos = res.data.data
          }
        })
        .catch((err)=>console.log(err))

      }
    })
    .catch((err)=>console.log(err))

    CommentService.getVideoComment(this.videoId)
    .then(res => {
      if(res.data.message=="OK"){
        this.comments = res.data.data
      }
    })
    .catch(err => console.log(err))
  }
}
</script>

<style scoped>
.watch .video{
  display: flex;
  justify-content: center;
}
.video{
  padding: 20px;
  width: 100% - 40px;
  display: flex;
}

.tag_list{
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
}

.tag{
  color: blue;
  text-decoration: none;
  margin-right: 10px;
}

.video_watch{  
  width: 70%;
}

.player{
  border-bottom: 2px solid #ccc;
}

.player video{
  width: 100%;
}  

.title{
  font-size: 20px;
  padding: 10px;
  font-weight: 400;
}

.view_like{
  display: flex;
  justify-content: space-between;
  padding: 10px;
}

.video_info{
  width: 30%;
  border-bottom: 2px solid #ccc;
}

.uploader{
  display: flex;
  padding: 10px;
}

.uploader img{
  width: 40px;
  height: 40px;
  border-radius: 20px;
}

.uploader label{
  padding: 10px;
  vertical-align: middle;
  font-weight: 400;
}

.description{
  padding: 0px 10px;
  margin-left: 50px;
  margin-bottom: 20px;
  font-size: 14px;
}

.video_info{
  width: 100%;
}

.comment{
  padding: 10px;
}

.related_video{
  height: 100%;
  max-width: 280px;
  padding: 10px;
}

</style>
