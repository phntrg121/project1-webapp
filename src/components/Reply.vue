<template>
  <div v-if="author" class="reply">
    <div class="reply_avatar">
      <img :src="author.avatar">
    </div>
    <div class="reply_content">
      <label>{{author.username}}</label>
      <p>{{reply.content}}</p>
      <div class="reply_react">
        <like-button style="font-size: 14px" :likes="reply.likes" :isLiked="isLiked" @onPress="onLikePress"/>
        <label @click="showReplyInput=false">REPLY</label>
      </div>
      <reply-input v-if="showReplyInput" :parent="reply.id" :commentId="reply.commentId" @close="showReplyInput=false" @onSuccessPost="onSuccessPost"/>
      <div v-if="reply.childs.length>0" class="reply_reply">
        <div v-for="rep in reply.childs" :key="rep" class="replies">
          <reply :reply="rep"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from '../services/UserService'
import ReplyInput from './ReplyInput.vue'
import Reply from './Reply.vue'
import LikeButton from '../components/LikeButton.vue'
export default {
  components: { Reply, ReplyInput, LikeButton },
  name: 'reply',
  props:{
    reply: Object,
  },
  data(){
    return {
      author: null,
      showReplyInput: false,
      isLiked: false,
    }
  },
  methods: {
    async getAuthorInfo(){
      UserService.getById(this.reply.from)
      .then(res=>{
        if(res.data.message == "OK"){
          this.author = res.data.data
        }
      })
      .catch(err=>console.log(err))
    },
    onSuccessPost(value){
      this.reply.childs.splice(0,0,value)
      this.showReplyInput=false
    },
    onLikePress(){
      this.reply.likes += this.isLiked? -1: 1
      this.isLiked = !this.isLiked
    }
  },
  mounted(){
    this.getAuthorInfo()
  }
}
</script>

<style scoped>
.reply{  
  display: flex;
  flex-direction: row;
}

.reply_avatar img{
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background: transparent;
  margin-top: 8px;
}
.reply_content{
  width: 100%;
}
.reply_content > label,
.reply_content > p{
  margin: 0px 0px 10px 10px;
  word-wrap: normal;  
  width: 100%;
}
.reply_content > label{
  font-size: 12px;
  font-weight: bold;
}
.reply_content > p{
  font-size: 14px;
}

.reply_react{
  color: #666;  
  margin: 0px 0px 10px 10px;
  font-size: 14px;  
  width: 100%;
  display: flex;
  align-items: center;
}
.reply_react > label{  
  margin-left: 10px;
}

.reply_reply{
    margin-left: 10px;
}
</style>
