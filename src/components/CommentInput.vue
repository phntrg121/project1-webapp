<template>
  <div class="commentinput">
    <div v-if="$store.getters.isAuthenticated" class="input">      
      <img :src="user.avatar"/>
      <div class="write_comment">
        <input ref="cmt_input" v-model="commentContent" type="text" placeholder="Add a public comment" @click="type=true"/>
        <div v-show="type" class="cmt_btn_group">            
          <button class="comment_cancel" @click="type=false">Cancel</button>
          <button class="comment_send" @click="postComment">Send</button>
        </div>
      </div>
    </div>
    <div v-else>
      <div>You must signed in to leave comment</div>
    </div>
  </div>
</template>

<script>
import CommentService from '../services/CommentService'
export default {
  name: '',
  data(){
    return {
      user: this.$store.getters.currentUser,
      type: false,
      commentContent: "",
    }
  },
  methods: {
    typing(){
      this.type = true
      this.$refs.cmt_input.focus()
    },    
    async postComment(){
      if(this.commentContent=="") return
      this.type=false
      CommentService.postComment({videoId: this.$route.params.id, from: this.user.id, content: this.commentContent})
      .then(res=>{
        if(res.data.message=="OK"){          
          this.$emit("onSuccessPost", res.data.data)
          this.commentContent=""
        }
        else alert("Can't post comment")
      })
      .catch(err=>console.log(err))
    }
  }
}
</script>

<style scoped>

.commentinput{
  display: flex;
  padding: 10px 0px;
  width: 100%;
}

.input{
  display: flex;
  width: 100%;
}

.input img{
  width: 40px;
  height: 40px;
  border-radius: 20px;
}

.write_comment{
  width: 100%;
  padding: 10px;
}

.write_comment input{
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

.comment_cancel{
  border-color: #666;
  color: #666
}

.comment_send{
  border-color: blue;
  color: blue
}

/* .write_comment input:placeholder-shown ~ .cmt_btn_group button{  
  visibility: hidden;
}

.write_comment input:not(placeholder-shown) ~ .cmt_btn_group button{  
  visibility: visible
}
.write_comment input:focus ~ .cmt_btn_group button{  
  visibility: visible
} */
.write_comment input:focus{  
  border-bottom: 2px solid blue;
}
</style>
