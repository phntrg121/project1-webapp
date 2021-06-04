<template>
  <div id="channel">
    <div class="channel_banner">
      <div v-if="channel" class="banner">
        <div class="banner_info">
          <img width="120" height="120" :src="channel.avatar" alt="user image">
          <label>{{channel.username}}</label>
        </div>
        <div class="banner_button">
          <button v-if="isOwner()" class="btn_enable" @click="toUpload">UPLOAD</button>
          <button v-if="isOwner()" class="btn_enable" @click="toEdit">EDIT</button>
          <button v-if="!isOwner()" :class="[(true) ? 'btn_disble' : 'btn_enable']">SUBSCRIBE</button>
        </div>
        <input type="file" style="display: none" ref="fileInput" accept="video/*" @change="onFilePicked"/>
      </div>
    </div>
    <div class="channel_content">
      <div class="content">
        <div v-if="channel" class="channel_tabs">
          <router-link :to="`/channel/${channel.id}`" :class="[($route.name === 'Channel Video')? 'channel_tab select':'channel_tab']">
            Videos
          </router-link>
          <router-link :to="`/channel/${channel.id}/likes`" :class="[($route.name === 'Channel Like')? 'channel_tab select':'channel_tab']">
            Likes
          </router-link>
          <router-link :to="`/channel/${channel.id}/subscribers`" :class="[($route.name === 'Channel Subscriber')? 'channel_tab select':'channel_tab']">
            Subscribers
          </router-link>
          <router-link :to="`/channel/${channel.id}/about`" :class="[($route.name === 'Channel About')? 'channel_tab select':'channel_tab']">
            About
          </router-link>
        </div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from '../../services/UserService'
import Upload from '../../components/Upload.vue'

export default {
  components: { Upload },
  name: 'Channel',
  data() {
    return{
      channel: null,
    }
  },
  methods: {
    isOwner(){
      if(!channel) return false
      if(!this.$store.getters.isAuthenticated) return false
      return this.channel.id==this.$store.getters.currentUser.id
    },
    toUpload(){
      this.$router.push({
        path:`/content/${this.$store.getters.currentUser.id}/`,
        params: { upload: true},
      })
    },
    toEdit(){
      this.$router.push({
        path:`/content/${this.$store.getters.currentUser.id}`,
      })
    },
    async getChannelInfo(){
      UserService.getById(this.$route.params.id)
      .then(res=>{
        if(res.data.message == "OK"){
          this.channel = res.data.data
        }
      })
      .catch(err=>console.log(err))
    },   
  },
  mounted(){
    this.getChannelInfo()
  }
}
</script>

<style scoped>
#channel{
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

.channel_banner{
  width: calc(100% - 20px);
  justify-content: center;
  background: #f9f9f9;
  margin: 10px;
  display: flex;
}

.banner{
  display: flex;
  width: 100%;
  max-width: 840px;
  flex-direction: row;
  justify-content: space-between;
}

.banner_info{  
  display: flex;
  flex-direction: row;
  align-items: center;
}
.banner_info img{
  width: 100px;
  height: 100px;
  border-radius: 50px
}
.banner_info label{
  margin: 0px 10px;
}

.banner_button{
  display: flex;
  flex-direction: row;
  align-items: flex-end;
}

.banner_button button{
  margin: 0px 5px;
  font-weight: bold;
  padding: 5px 20px;
  text-decoration: 0;
  border: 0;
}
.banner_button button:hover{
  cursor: pointer;
}
.btn_enable{
  background: red;
  color: white;
}
.btn_disable{
  background: #ccc;
  color: white;
}

.channel_content{
  width: 100%;
  background: #f1f1f1;
  display: flex;
  justify-content: center;
  height: 100%;
}

.content{  
  display: flex;
  width: 100%;
  max-width: 840px;
  align-items: center;
  flex-direction: column;
}

.channel_tabs{
  width: 100%;
  display: flex;
  flex-direction: row;
}

.channel_tab{
  width: 100%;
  padding: 10px;
  display: block;
  text-align: center;
  color: #666;
  text-decoration: 0;
}

.select{
  font-weight: bold;
  border-bottom: 3px solid #666;
}
</style>
