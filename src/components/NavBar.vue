<template>
  <div id="navbar">
    <div class="nav_start">      
      <div class="head click-able">
        <div>
          <svg style="width: 24px; height: 24px;">
            <g><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></g>
          </svg>
        </div>
      </div>
      <router-link to="/">
        <div class="lead_text">METUBE</div>
      </router-link>
    </div>

    <div class="nav_center">        
      <input type="search" class="search_text" v-model="searchText" placeholder="Search...">
      <button type="submit" class="search_button click-able" @click="search()">
        <svg focusable="false">
          <g><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></g>
        </svg>
      </button>
    </div>

    <div class="nav_end">
      <div v-if="!$store.getters.isAuthenticated">
        <router-link :to='{path:"/account/signin", query: {continue: $route.fullPath}}' class="signin_button click-able" style="text-decoration: none" tag="button">Sign In</router-link>
      </div>
      <div v-else>
        <img :src="$store.getters.currentUser.avatar" @click="showMenu()" class="profile_pic click-able">
        <div class="dropdown_menu" v-if="dropDown">
          <div class="dropdown_menu_item click-able" @click="toChannel()">
            <svg width="24px" height="24px" viewBox="0 0 24 24" class="menu_icon">
              <g class="menu_icon">
                <path d="M18.4 5.6v12.8H5.6V5.6h12.8zm0-1.8H5.6a1.8 1.8 0 0 0-1.8 1.8v12.8a1.8 1.8 0 0 0 1.8 1.9h12.8a1.8 1.8 0 0 0 1.9-1.9V5.6a1.8 1.8 0 0 0-1.9-1.8z" class="menu_icon"></path>
                <path d="M10.2 9v6.5l5-3.2-5-3.2z" class="menu_icon"></path>
                </g>
              </svg>           
            <label>My Channel</label>
          </div>
          <!-- <div class="dropdown_menu_item" @click="goLibrary()">
            <svg width="24px" height="24px" viewBox="0 0 24 24" class="menu_icon">
              <g class="menu_icon">
                <path d="M18.7 8.7H5.3V7h13.4v1.7zm-1.7-5H7v1.6h10V3.7zm3.3 8.3v6.7c0 1-.7 1.6-1.6 1.6H5.3c-1 0-1.6-.7-1.6-1.6V12c0-1 .7-1.7 1.6-1.7h13.4c1 0 1.6.8 1.6 1.7zm-5 3.3l-5-2.7V18l5-2.7z" class="style-scope yt-icon"></path>
              </g>
            </svg>          
            <label>My Library</label>
          </div> -->
          <hr>
          <div class="dropdown_menu_item click-able" @click="signOut()">
            <svg width="24px" height="24px" viewBox="0 0 24 24" class="menu_icon">
              <g class="menu_icon">
                <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" class="menu_icon"></path>
              </g>
            </svg>             
            <label>Sign Out</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return{
      dropDown: false,
      searchText: ''
    }
  },
  methods:{
    showMenu(){
      this.dropDown = !this.dropDown
    },
    closeMenu(){
      this.dropDown = false
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
    toChannel(){
      this.closeMenu()
      this.$router.push({
        path: `/channel/${this.$store.getters.currentUser.id}`,   
        // params: { id: this.$store.getters.currentUser.id } 
      })
    },
    signOut(){
      this.$store.dispatch('signOut')
      this.closeMenu()
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
  vertical-align: middle;
}

.head div{
  background: transparent;
  border: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.lead_text{
  font-weight: bold;
  padding: 10px;
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

.profile_pic {
  vertical-align: middle;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.dropdown_menu{
  font-size: 16px;
  position: absolute;
  min-width: 130px;
  top: 40px;
  right: 10px;
  background: white;
  box-shadow: 0px 6px 12px #ccc;
  z-index: 10;
}

.dropdown_menu hr{
  padding: 0;
  margin: 0;
  height: 1.2px;
  background: #ccc;
  border: none;
}

.dropdown_menu_item{
  display: flex;
  align-items: center;
  padding: 10px;
}

.menu_icon{
  fill: #666;
}
.dropdown_menu_item label{
  padding: 0px 10px;
}

.dropdown_menu_item:hover{
  background: #ccc;
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
