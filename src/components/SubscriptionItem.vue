<template>
  <div class="subscription_item">
    <div v-if="user" class="user_display">
      <img :src="user.avatar" class="user_avatar click-able" @click="toChannel">
      <label class="click-able" @click="toChannel">{{user.username}}</label>
    </div>
  </div>
</template>

<script>
import UserService from '../services/UserService'

export default {
  name: 'SubscriptionItem',
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
.subscription_item{
  display: block;
}

.user_display{
  display: flex;
  flex-direction: row;
  align-items: center;
}

.user_display img{
  width: 30px;
  height: 30px;
  border-radius: 15px;
}

.user_display label{
  font-size: 14px;
  margin-left: 10px;
}
</style>
