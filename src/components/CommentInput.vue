<template>
  <div class="commentinput">
    <div v-if="$store.getters.isAuthenticated" class="input">      
      <img :src="user.avatar"/>
      <div class="write_comment">        
        <input type="text" placeholder="Add a public comment"/>
        <div class="cmt_btn_group">            
          <button class="comment_cancel">Cancel</button>
          <button class="comment_send">Send</button>
        </div>
      </div>
    </div>
    <div v-else>
      <div>You must signed in to leave comment</div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data(){
    return {
      user: this.$store.getters.currentUser,
    }
  }
}
</script>

<style scoped>

.commentinput{
  display: flex;
  padding: 10px 0px;
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
  margin: 10px;
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

.write_comment input:placeholder-shown ~ .cmt_btn_group button{  
  visibility: hidden;
}

.write_comment input:not(placeholder-shown) ~ .cmt_btn_group button{  
  visibility: visible
}
.write_comment input:focus ~ .cmt_btn_group button{  
  visibility: visible
}
.write_comment input:focus{  
  border-bottom: 2px solid blue;
}
</style>
