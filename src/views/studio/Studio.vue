<template>
  <div id="studio">    
    <nav-bar class="nav" @onSignOut="onSignOut()"/>
    <div v-if="acceptable()" class="body">
      <div class="side">
        <div class="side_top">
          <div class="user_img">
            <img :src="$store.getters.currentUser.avatar" alt="user image">
          </div>
          <label class="click-able" @click="$router.push({path: `/channel/${$store.getters.currentUser.id}`})">{{$store.getters.currentUser.username}}</label>
        </div>
        <div class="side_middle">
          <router-link :class="[($route.name === 'Studio Dashboard') ? 'option select' : 'option']" :to="`/studio/${$store.getters.currentUser.id}`">
            <svg viewBox="0 0 24 24" focusable="false"><g><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"></path></g></svg>
            <label class="click-able">Dashboard</label>
          </router-link>
          <router-link :class="[($route.name === 'Studio Content') ? 'option select' : 'option']" :to="`/studio/${$store.getters.currentUser.id}/content`">
            <svg viewBox="0 0 24 24" focusable="false" ><g><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 12.5v-9l6 4.5-6 4.5z"></path></g></svg>
            <label class="click-able">Content</label>
          </router-link>
          <router-link :class="[($route.name === 'Studio Playlists') ? 'option select' : 'option']" :to="`/studio/${$store.getters.currentUser.id}/playlists`">
            <svg viewBox="0 0 24 24" focusable="false"><g><path d="M19 9H2v2h17V9zm0-4H2v2h17V5zM2 15h13v-2H2v2zm15-2v6l5-3-5-3z"></path></g></svg>
            <label class="click-able">Playlists</label>
          </router-link>
          <router-link :class="[($route.name === 'Studio Customization') ? 'option select' : 'option']" :to="`/studio/${$store.getters.currentUser.id}/customization`">
            <svg viewBox="0 0 24 24" focusable="false"><g><path d="M0 0h24v24H0z" fill="none"></path><path d="M7.5 5.6L10 7 8.6 4.5 10 2 7.5 3.4 5 2l1.4 2.5L5 7zm12 9.8L17 14l1.4 2.5L17 19l2.5-1.4L22 19l-1.4-2.5L22 14zM22 2l-2.5 1.4L17 2l1.4 2.5L17 7l2.5-1.4L22 7l-1.4-2.5zm-7.63 5.29c-.39-.39-1.02-.39-1.41 0L1.29 18.96c-.39.39-.39 1.02 0 1.41l2.34 2.34c.39.39 1.02.39 1.41 0L16.7 11.05c.39-.39.39-1.02 0-1.41l-2.33-2.35zm-1.03 5.49l-2.12-2.12 2.44-2.44 2.12 2.12-2.44 2.44z"></path></g></svg>
            <label class="click-able">Customization</label>
          </router-link>
        </div>
        <div class="side_bottom">
          <div class="option click-able">
            <svg viewBox="0 0 24 24" focusable="false"><g><path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"></path></g></svg>
            <label class="click-able">Settings</label>
          </div>
          <div class="option click-able">
            <svg viewBox="0 0 24 24" focusable="false"><g><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12h-2v-2h2v2zm0-4h-2V6h2v4z"></path></g></svg>
            <label class="click-able">Feedback</label></div>
        </div>
      </div>      
      <div class="scroll">
        <router-view></router-view>
      </div>
      
    </div>  
  </div>
</template>

<script>
import NavBar from '../../components/NavBar.vue'
import store from '@/store'

export default {
  components: { NavBar},
  name: 'Studio',
  beforeRouteEnter(to, from, next){
    if(!store.getters.isAuthenticated) next({path:"/account/signin", query: {continue: to.fullPath}})
    else if(to.params.id != store.getters.currentUser.id) next({path: `/studio/${store.getters.currentUser.id}`})
    else next()
  },
  data(){
    return {
      user: null,
    }
  },
  methods:{
    onSignOut(){
      console.log("sign out")
      this.$router.push({name: 'Home'})
    },
    acceptable(){
      if(!this.$store.getters.isAuthenticated) return false
      if(this.$route.params.id != this.$store.getters.currentUser.id) return false
      return true
    }
  },
  mounted(){
  }
}
</script>

<style scoped>
#studio{  
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  display: flex;
  flex-direction: column;
}

.nav{
  width: 100%;
}

.body{
  display: flex;
  flex-direction: row;
  width: 100%;
  height: calc(100% - 60px)
}

.side{
  width: 320px;
  height: 100%;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.side_top{
  width: 100%;
  height: 320px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #cecece;
}
.side_top .user_img{
  width: 80px;
  height: 80px;
  margin-bottom: 10px;
}
.side_top label{
  color: #666;
  font-size: 14px;
}
.user_img img{
  width: 100%;
  height: 100%;
  border-radius: 50%;  
  object-fit: cover 
}
.side_middle{
  overflow-y: auto;
  width: 100%;
  height: 100%;
  border-bottom: 1px solid #cecece;
}
.side_bottom{
  width: 100%;
  height: fit-content;
}
.option{
  display: flex;
  flex-direction: row;
  align-items: center;
  width: calc(100% - 40px);
  max-width: 240px;
  color: #666;  
  fill: #666;
  text-decoration: 0;
  padding: 10px 20px;
}
.option svg{
  width: 24px;
  height: 24px;
}
.option label{
  margin-left: 10px;
}
.side_middle .option:hover{
  background: #f1f1f1;
}
.select{  
  color: red;  
  fill: red;
}

.scroll{
  width: 100%;
  overflow-y: auto;
  background: #f9f9f9;
}
</style>
