<template>
  <div class="replyinput">
    <div v-if="$store.getters.isAuthenticated" class="input">      
      <img :src="user.avatar"/>
      <div class="write_reply">
        <input ref="cmt_input" v-model="replyContent" type="text" placeholder="Add a public reply"/>
        <div class="cmt_btn_group">            
          <button class="reply_cancel" @click="closeReply">Cancel</button>
          <button class="reply_send" @click="postReply">Send</button>
        </div>
      </div>
    </div>
    <div v-else>
      <div>You must signed in to reply</div>
    </div>
  </div>
</template>

<script>
import CommentService from '../services/CommentService'
export default {
  name: '',
  props:{
    commentId: String,
    parent: {
      type: String,
      default: ''
    },
  },
  data(){
    return {
      user: this.$store.getters.currentUser,
      replyContent: "",
    }
  },
  methods: {
    closeReply(){
      this.$emit('close')
    },
    async postReply(){
      if(this.replyContent=="") return
      this.type=false
      CommentService.postReply({commentId: this.commentId, from: this.user.id, content: this.replyContent, parent: this.parent})
      .then(res=>{
        if(res.data.message=="OK"){          
          this.$emit("onSuccessPost", res.data.data)
          this.replyContent=""
        }
        else alert("Can't post comment")
      })
      .catch(err=>console.log(err))
    }
  }
}
</script>

<style scoped>

.replyinput{
  display: flex;
  margin-left: 10px;
}

.input{
  display: flex;
  width: 100%;
}

.input img{
  width: 24px;
  height: 24px;
  border-radius: 12px;
}

.write_reply{
  width: 100%;
  margin-left: 10px;
}

.write_reply input{
  width: 100%;
  border: 0;
  font-size: 14px;
  background: transparent;
  outline: 0;
  border-bottom: 2px solid #ccc;
  transition: 0.2s;
}

.cmt_btn_group{
  display: flex;
  flex-direction: row;
  justify-content:flex-end;
}

.cmt_btn_group button{
  margin: 10px 0px 10px 10px;
  width: 72px;
  padding: 5px 10px;
  font-weight: 400;
  border-style: solid;
  border-width: 2px;
}

.cmt_btn_group button:hover{
  cursor: pointer;
}

.reply_cancel{
  border-color: #666;
  color: #666
}

.reply_send{
  border-color: blue;
  color: blue
}

/* .write_reply input:placeholder-shown ~ .cmt_btn_group button{  
  visibility: hidden;
}

.write_reply input:not(placeholder-shown) ~ .cmt_btn_group button{  
  visibility: visible
}
.write_reply input:focus ~ .cmt_btn_group button{  
  visibility: visible
} */
.write_reply input:focus{  
  border-bottom: 2px solid blue;
}
</style>
