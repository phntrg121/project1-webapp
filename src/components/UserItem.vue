<template>
  <div class="user_item">
    <div v-if="user" class="user_display">
      <img :src="user.avatar" class="user_avatar click-able" @click="toChannel">
      <label class="click-able" @click="toChannel">{{user.username}}</label>
    </div>
  </div>
</template>

<script>
import UserService from '../services/UserService'

export default {
  name: 'UserItem',
  props:{
    uid: String
  },
  data(){
    return{
      user: null
    }
  },
  methods:{
    toChannel(){
      this.$router.push({
        path: `/channel/${this.user.id}`,
      })
    }
  },
  mounted(){
    UserService.getById(this.uid)
    .then(res => {
      if(res.data.message == 'OK'){
        this.user = res.data.data
      }
    })
    .catch((err)=>console.log(err))
  }
}
</script>

<style scoped>
.user_item{
  display: block;
}

.user_display{
  display: flex;
  flex-direction: row;
  align-items: center;
}

.user_display img{
  width: 20px;
  height: 20px;
  border-radius: 10px;
}

.user_display label{
  font-size: 12px;
  margin-left: 10px;
}
</style>
