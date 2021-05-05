<template>
  <div class="commentinput">
    <div v-if="$store.getters.isAuthenticated" class="input">      
      <img :src="user.avatar"/>
      <div class="write_comment">        
        <input type="text"/>
        <div class="btn_group">            
          <button>Cancel</button>
          <button>Send</button>
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
}

.btn_group{
  display: flex;
  flex-direction: row;
  justify-content:flex-end;
}

.btn_group button{
  margin: 10px;
}
</style>
