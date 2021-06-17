<template>
  <div id="navbar">
    <div class="nav_start">      
      <div class="head click-able">
        <svg style="width: 24px; height: 24px;"><g><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></g></svg>
      </div>
      <router-link to="/" class="lead_text">
        <div>VEEDEO</div>
      </router-link>
    </div>

    <div class="nav_center">        
      <input type="search" class="search_text" v-model="searchText" placeholder="Search...">
      <button type="submit" class="search_button click-able" @click="search()">
        <svg focusable="false"><g><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></g></svg>
      </button>
    </div>

    <div class="nav_end">
      <div v-if="!$store.getters.isAuthenticated">
        <router-link :to='{path:"/account/signin", query: {continue: $route.fullPath}}' class="signin_button click-able" style="text-decoration: none" tag="button">Sign In</router-link>
      </div>
      <div v-else class="tail">
        <img :src="$store.getters.currentUser.avatar" @click="showUserMenu()" class="profile_pic click-able">
        <user-menu v-show="userMenuShow" @onClose="onUserMenuClose()" @onSignOut="onSignOut()"/>
        <div class="notification_button click-able" @click="showNotificationMenu()">
          <svg viewBox="0 0 24 24" focusable="false" style="width: 24px; height: 24px;"><g class="style-scope yt-icon"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"></path></g></svg>
        </div>
        <notification-menu v-show="notificationMenuShow" @onClose="onNotificationMenuClose()"/>
        <div class="upload_button click-able" @click="$router.push({path: `/studio/${$store.getters.currentUser.id}/content`,query: {upload: true}})">
          <svg viewBox="0 0 24 24" focusable="false" style="width: 24px; height: 24px;"><g class="style-scope yt-icon"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4zM14 13h-3v3H9v-3H6v-2h3V8h2v3h3v2z"></path></g></svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserMenu from './UserMenu.vue'
import NotificationMenu from './NotificationMenu.vue'
export default {
  name: 'NavBar',
  components: {UserMenu, NotificationMenu},
  data() {
    return{
      userMenuShow: false,
      notificationMenuShow: false,
      searchText: ''
    }
  },
  methods:{
    showUserMenu(){
      this.userMenuShow = !this.userMenuShow
      this.notificationMenuShow = false
    },
    showNotificationMenu(){
      this.notificationMenuShow = !this.notificationMenuShow
      this.userMenuShow = false
    },
    search(){
      if (!this.searchText) return
      if (this.searchText == this.$route.query['search-query']) return
      const data = {
        type: 'search',
        searchText: this.searchText
      }

      this.$router.push({
        name: 'Search',
        query: { 'query': this.searchText }
      })
    },
    onUserMenuClose(){
      this.userMenuShow = false
    },
    onSignOut(){
      this.userMenuShow = false
      this.$emit('onSignOut')
    },
    onNotificationMenuClose(){
      this.notificationMenuShow = false
    },
  },
}
</script>

<style scoped>
#navbar{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background: white;
  width: calc(100% - 20px);
  height: fit-content;
}
#navbar .nav_start{
  background: transparent;
  display: flex;
  align-items: center;
}

.head{
  width: 60px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;  
  background: transparent;
}

.lead_text{
  font-weight: bold;
  padding: 10px;
  text-decoration: 0;
  color: #1a1a1a;
}

#navbar .nav_center{
  background: transparent;
  width: 100%;
  max-width: 600px;
  display: flex;
}

.nav_center input,
.nav_center button{
  height: 31px;
  font-size: 16px;
  border: none;
  transition: 0.5s;
}

.search_text{
  outline: none;
  padding-left: 10px;
  background: #eee;
  width: 100%;
  padding-right: 10px;
}

.nav_center:hover{  
  border: 1px solid #666;
}

.search_button{
  background: #ccc;
  width: 64px;
  transition: 0.2s;
  margin-left: -4px;
  border-radius: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.search_button svg {
  width: 24px;
  height: 24px;
}
.search_button:hover{
  background: #aaa;
}

#navbar .nav_end{
  background: transparent;
  width: fit-content;
}

.tail{
  display: flex;
  flex-direction: row-reverse;
}

.notification_button,
.upload_button{
  width: 48px;
  border-radius: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  fill: #666;
}

.profile_pic {
  vertical-align: middle;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-left: 10px;
}

.signin_button{
  border: 2px solid blue;
  padding: 5px 15px;
  color: blue;
  font-weight: 400;
  background: transparent;
}

.signin_button:hover{  
  background: rgba(200, 200, 200, 0.2);
}
</style>
