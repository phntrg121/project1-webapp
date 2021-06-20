<template>
  <div v-if="author" class="comment">
    <div class="comment_avatar">
      <img :src="author.avatar">
    </div>
    <div class="comment_content">
      <label>{{author.username}}</label>
      <p>{{comment.content}}</p>
      <div class="comment_react">        
        <like-button style="font-size: 14px" :likes="comment.likes" :isLiked="isLiked" @onPress="onLikePress"/>
        <label @click="showReplyInput=true">REPLY</label>
      </div>
      <reply-input v-if="showReplyInput" :commentId="comment.id" @close="showReplyInput=false" @onSuccessPost="onSuccessPost"/>   
      <div v-if="comment.replyCount>0" class="comment_reply">
        <div v-if="!showReplies"><label @click="getReply">Show {{comment.replyCount}} replies</label></div>
        <div v-else><label @click="showReplies=!showReplies">Hide {{comment.replyCount}} replies</label></div>
        <div v-if="showReplies">
          <div v-for="rep in replies" :key="rep" class="replies">
            <reply :reply="rep"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Comment } from '@vue/runtime-core'
import UserService from '../services/UserService'
import CommentService from '../services/CommentService'
import Reply from './Reply.vue'
import ReplyInput from './ReplyInput.vue'
import LikeButton from '../components/LikeButton.vue'
export default {
  components: { Reply, ReplyInput, LikeButton },
  name: 'comment',
  props:{
    comment: Object
  },
  data(){
    return {
      author: null,
      showReplies: false,
      showReplyInput: false,
      replies: [],
      isLiked: false,
    }
  },
  methods: {
    async getAuthorInfo(){
      UserService.getById(this.comment.from)
      .then(res=>{
        if(res.data.message == "OK"){
          this.author = res.data.data
        }
      })
      .catch(err=>console.log(err))
    },
    async getReply(){
      if(this.replies.length > 0) {
        this.showReplies = true
        return
      }
      CommentService.getCommentReplies(this.comment.id)
      .then(res=>{
        this.replies = res.data.data        
        this.showReplies = true;
      })
      .catch(err=>console.log(err))
    },    
    onSuccessPost(value){
      this.replies.splice(0,0,value)
      this.showReplyInput=false
    },    
    onLikePress(){
      this.comment.likes += this.isLiked? -1: 1
      this.isLiked = !this.isLiked
    }
  },
  mounted(){
    this.getAuthorInfo()
  }
}
</script>

<style scoped>
.comment{  
  display: flex;
  flex-direction: row;
}

.comment_avatar img{
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background: transparent;
}

.comment_content{
  width: 100%;
}
.comment_content > label,
.comment_content > p{
  margin: 0px 0px 10px 10px;
  word-wrap: normal;
  width: 100%;
}
.comment_content > label{
  font-size: 12px;
  font-weight: bold;
}
.comment_content > p{
  font-size: 14px;
}

.comment_react{
  color: #666;  
  margin: 0px 0px 10px 10px;
  font-size: 14px;
  width: 100%;
  display: flex;
  align-items: center;
}
.comment_react > label{  
  margin-left: 10px;
}

.comment_reply{
    margin-left: 10px;
}
.comment_reply > div > label{
  font-size: 14px;
  color: blue;
}
.comment_reply > div > label:hover{
  cursor: pointer;
}

</style>
