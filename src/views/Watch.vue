<template>
  <div id="watch">
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
          <div  v-if="uploader && sub" style="display: flex; justify-content: space-between; width: 100%; margin-top: 10px;">
            <div class="video_uploader">
              <img :src="uploader.avatar" alt="">
              <div>
                <label class="uploader_name">{{uploader.username}}</label>
                <label class="uploader_sub">{{sub.subscriberCount}} subscribers</label>
              </div>
            </div>
            <button v-show="!owned" :class="[isSubscribed? 'video_subscribe subscribed':'video_subscribe not_subscribed']" @click="subscribe">SUBSCRIBE</button>
          </div>
          <div class="video_description">
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
        <div v-for="video in relatedVideos" :key="video">
          <related-video :video="video"/>
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
import SubscriptionService from '../services/SubscriptionService'

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
      sub: null,
      isSubscribed: false,
      owned: false,
      videoId: this.$route.params.id,
      relatedVideos: [],
      comments: []
    }
  },
  methods: {
    async getVideo() {
      VideoService.getVideo(this.videoId)
      .then(res => {
        if(res.data.message == "OK"){
          this.video = res.data.data

          this.getUploader()
          this.getRelatedVideo()
        }
      })
      .catch((err)=>console.log(err))

      this.getComment()
    },
    async getUploader(){
      UserService.getById(this.video.uploaderId)
      .then(res=>{
        if(res.data.message == "OK"){
          this.uploader = res.data.data
          this.getSubCount()
          this.checkSub()
        }
      })
      .catch(err=>console.log(err))
    },
    async getRelatedVideo(){
      VideoService.getRelatedVideo({ videoId: this.videoId, tags: this.video.tags})
      .then(res => {
        if(res.data.message == "OK"){
          this.relatedVideos = res.data.data
        }
      })
      .catch((err)=>console.log(err))
    },
    async getComment(){
      CommentService.getVideoComments(this.videoId)
      .then(res => {
        if(res.data.message=="OK"){
          this.comments = res.data.data
        }
      })
      .catch(err => console.log(err))
    },
    async getSubCount(){
      SubscriptionService.getSubscriber(this.video.uploaderId)
      .then(res => {
        if(res.data.message == "OK"){
          this.sub = res.data.data
        }
      })
      .catch(err => console.log(err))
    },
    async checkSub(){
      if(!this.$store.getters.isAuthenticated) return
      if(this.$store.getters.currentUser.id == this.video.uploaderId){
        this.owned = true
        return
      }
      SubscriptionService.isSubscribed({ userId: this.$store.getters.currentUser.id, otherId: this.video.uploaderId })
      .then(res => {
        if(res.data.message == "OK"){
          this.isSubscribed = res.data.data
        }
      })
      .catch(err => console.log(err))
    },
    async subscribe(){
      if(!this.$store.getters.isAuthenticated){
        this.$router.push({ name: 'SignIn' })
        return
      }
      SubscriptionService.subscribe({ userId: this.$store.getters.currentUser.id, otherId: this.video.uploaderId })
      .then(res => {
        if(res.data.message == "OK"){
          this.isSubscribed = res.data.data
        }
      })
      .catch(err => console.log(err))
    }
  },
  mounted(){
    this.getVideo()
  }
}
</script>

<style scoped>
#watch{
  background: #f9f9f9;
}

#watch .video{
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

.video_uploader{
  display: flex;
}

.video_uploader img{
  width: 40px;
  height: 40px;
  border-radius: 20px;
}

.video_uploader div{
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
}

.uploader_name{
  font-weight: bold;
  font-size: 14px;
}

.uploader_sub{
  font-size: 13px;
  color: #666;
}

.video_subscribe{
  font-weight: bold;
  padding: 5px 20px;
  text-decoration: 0;
  border: 0;
}

.video_subscribe:hover{
  cursor: pointer;
}

.not_subscribed{
  background: red;
  color: white;
}

.subscribed{
  background: #ccc;
  color: white;
}

.video_description{
  margin-left: 50px;
  margin-bottom: 20px;
  font-size: 14px;
}

.video_info{
  width: 100%;
}

.comment{
  margin-top: 10px
}

.related_video{
  height: 100%;
  width: 100%;
  padding: 10px;
  max-width: 300px;
}
</style>
