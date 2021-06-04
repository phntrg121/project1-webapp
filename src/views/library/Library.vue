<template>
  <div id="library">  
    <div class="library_list">
      <div>LIBRARY</div>
      <router-link :class="[($route.name === 'History') ? 'library_tab select' : 'library_tab']" to='/history'>
        <svg viewBox="0 0 24 24" focusable="false" class="library_icon"><g><path d="M11.9 3.75c-4.55 0-8.23 3.7-8.23 8.25H.92l3.57 3.57.04.13 3.7-3.7H5.5c0-3.54 2.87-6.42 6.42-6.42 3.54 0 6.4 2.88 6.4 6.42s-2.86 6.42-6.4 6.42c-1.78 0-3.38-.73-4.54-1.9l-1.3 1.3c1.5 1.5 3.55 2.43 5.83 2.43 4.58 0 8.28-3.7 8.28-8.25 0-4.56-3.7-8.25-8.26-8.25zM11 8.33v4.6l3.92 2.3.66-1.1-3.2-1.9v-3.9H11z"></path></g></svg>
        <label>History</label>
      </router-link>
      <router-link :class="[($route.name === 'MyVideo') ? 'library_tab select' : 'library_tab']" to='/myvideos'>
        <svg viewBox="0 0 24 24" focusable="false" class="library_icon"><g><path d="M18.4 5.6v12.8H5.6V5.6h12.8zm0-1.8H5.6a1.8 1.8 0 0 0-1.8 1.8v12.8a1.8 1.8 0 0 0 1.8 1.9h12.8a1.8 1.8 0 0 0 1.9-1.9V5.6a1.8 1.8 0 0 0-1.9-1.8z"></path><path d="M10.2 9v6.5l5-3.2-5-3.2z"></path></g></svg>
        <label>My Videos</label>
      </router-link>
      <router-link :class="[($route.name === 'Liked') ? 'library_tab select' : 'library_tab']" to='/liked'>
        <svg viewBox="0 0 24 24" focusable="false" class="library_icon"><g><path d="M3.75 18.75h3v-9h-3v9zm16.5-8.25c0-.83-.68-1.5-1.5-1.5h-4.73l.7-3.43.03-.24c0-.3-.13-.6-.33-.8l-.8-.78L8.7 8.7c-.3.26-.45.64-.45 1.05v7.5c0 .82.67 1.5 1.5 1.5h6.75c.62 0 1.15-.38 1.38-.9l2.27-5.3c.06-.18.1-.36.1-.55v-1.5z"></path></g></svg>
        <label>Liked Videos</label>
      </router-link>
      <router-link :class="[($route.name === 'Playlist') ? 'library_tab select' : 'library_tab']" to='/playlist'>
        <svg viewBox="0 0 24 24" focusable="false" class="library_icon"><g><path d="M3.67 8.67h14V11h-14V8.67zm0-4.67h14v2.33h-14V4zm0 9.33H13v2.34H3.67v-2.34zm11.66 0v7l5.84-3.5-5.84-3.5z"></path></g></svg>
        <label>Playlists</label>
      </router-link>
    </div>
    <div v-if="$route.name === 'Library'" class="library_videos">
      <label>lib</label>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'Library',
}
</script>

<style scoped>
#library{
  display: flex;
  flex-direction: row;
  height: 100%;
}

.library_list{
  height: 100%;
  max-width: 210px;
  width: 30%;
  background: #f1f1f1;
  overflow-y: auto;
}
.library_list > div{
  width: calc(100% - 40px);
  margin: 20px;
}


.library_tab{
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  color: #666;  
  fill: #666;
  text-decoration: 0;
}

.library_tab label{
  margin: 10px;
}

.select{
  
  color: red;  
  fill: red;
}

.library_tab:hover{
  background: #e1e1e1;
}

.library_icon{
  width: 24px;
  height: 24px;
  margin: 10px;
}

.subscription_videos{
  height: 100%;
  width: 70%;
  overflow-y: auto;
}
</style>
