<template>
  <div id="watch">
    <nav-bar/>
    <div v-if="video" class="video">
      <div class="video_watch">
        <div class="player">
          <video :src="video.videoURL" type="video/mp4" controls @play="updateView()"></video>
          <div class="tag_list">
            <div v-for="tag in video.tags" :key="tag">
              <router-link class="tag" to="">#{{tag}}</router-link>
            </div>
          </div>
          <label class="title">{{ video.title }}</label>
          <div class="view_like">
            <label>{{video.views.toLocaleString()}} views</label>
            <like-button style="font-size: 16px" :likes="video.likes" :isLiked="isLiked" @onPress="onLikePress"/>
          </div>
        </div>        
        <div class="video_info">          
          <div  v-if="uploader && sub" style="display: flex; justify-content: space-between; width: 100%; margin-top: 10px;">
            <div class="video_uploader">
              <img :src="uploader.avatar" alt="">
              <div>
                <label class="uploader_name">{{uploader.username}}</label>
                <label class="uploader_sub">{{sub.subscriberCount.toLocaleString()}} subscribers</label>
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
          <comment-input @onSuccessPost="onSuccessPost"/>
          <div class="comment_list">
            <div v-for="comment in comments" :key="comment">
              <comment :comment="comment"/>
            </div>
          </div>
        </div>
      </div>
      <div class="related_video">
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
import LikeButton from '../components/LikeButton.vue'
import NavBar from '../components/NavBar.vue'
import RelatedVideo from '../components/RelatedVideo.vue'
import UserService from '../services/UserService'
import VideoService from '../services/VideoService'
import CommentService from '../services/CommentService'
import SubscriptionService from '../services/SubscriptionService'
import LikeService from '../services/LikeService'
import HistoryService from '../services/HistoryService'

export default {
  name: '',
  components:{
    NavBar,
    RelatedVideo,
    CommentInput,
    Comment,
    LikeButton
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
      comments: [],
      isLiked: false,
      isPlayed: false,

      processingSubscribe: false,
      processingLike: false,
    }
  },
  methods: {
    async getVideo() {
      try{
        this.video = (await VideoService.getVideoById(this.videoId)).data.data
        this.uploader = (await UserService.getById(this.video.uploaderId)).data.data
        this.sub = (await SubscriptionService.getSubscriber(this.video.uploaderId)).data.data
        this.relatedVideos = (await VideoService.getRelatedVideos({ videoId: this.videoId, tags: this.video.tags})).data.data
        this.checkSub()
        this.checkLike()
        this.getComment()
      }
      catch(err){
        console.log(err)
      }
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
      if(this.processingSubscribe) return
      if(!this.$store.getters.isAuthenticated){
        this.$router.push({path:"/account/signin", query: {continue: this.$route.fullPath}})
        return
      }
      this.processingSubscribe = true
      SubscriptionService.subscribe({ userId: this.$store.getters.currentUser.id, otherId: this.video.uploaderId })
      .then(res => {
        if(res.data.message == "OK"){
          this.isSubscribed = res.data.data
        }
        else{
          alert("Subscribe error")
        }
      })
      .catch(err => console.log(err))
      .finally(()=>{
        this.processingSubscribe = false        
      })
    },
    onSuccessPost(value){
      this.comments.splice(0,0,value)
    },
    async checkLike(){      
      if(!this.$store.getters.isAuthenticated) return
      LikeService.checkVideo({ userId: this.$store.getters.currentUser.id, videoId: this.video.id })
      .then(res => {
        if(res.data.message == "OK"){
          this.isLiked = res.data.data
        }
      })
      .catch(err => console.log(err))

    },
    async onLikePress(){
      if(this.processingLike) return
      if(!this.$store.getters.isAuthenticated){
        this.$router.push({path:"/account/signin", query: {continue: this.$route.fullPath}})
        return
      }
      this.processingLike = true
      LikeService.likeVideo({ userId: this.$store.getters.currentUser.id, videoId: this.video.id })
      .then(res => {
        if(res.data.message == "OK"){
          this.isLiked = res.data.data          
          this.video.likes += this.isLiked? 1: -1
          VideoService.putLike(this.videoId,{like: this.isLiked? 1: -1})
        }
        else{
          alert("Like error")
        }
      })
      .catch(err => console.log(err))
      .finally(()=>{
        this.processingLike = false        
      })
    },
    async updateView(){
      if(!this.isPlayed){
        this.isPlayed = true
        this.video.views++
        VideoService.putView(this.videoId,{})
        if(this.$store.getters.isAuthenticated){
          HistoryService.pushHistory(this.$store.getters.currentUser.id, {videoId: this.videoId, lastWatched: Date.now()})
        }
      }
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
  margin: 20px;
  width: calc(100% - 40px);
  display: flex;
}

.tag_list{
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  margin-bottom: 10px;
}

.tag{
  color: blue;
  text-decoration: none;
  margin-right: 10px;
}

.video_watch{  
  width: 100%;
  max-width: 720px;
}

.player{
  border-bottom: 2px solid #ccc;
}

.player video{
  width: 100%;
}  

.title{
  font-size: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
  font-weight: 400;
}

.view_like{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
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
  padding: 10px 20px;
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
  margin-left: 10px;
  max-width: 360px;
}
</style>
