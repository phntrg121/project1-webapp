<template>
  <div class="user_menu">
    <div class="menu_item click-able" @click="toChannel()">
      <svg width="24px" height="24px" viewBox="0 0 24 24" class="menu_icon"><g class="menu_icon"><path d="M18.4 5.6v12.8H5.6V5.6h12.8zm0-1.8H5.6a1.8 1.8 0 0 0-1.8 1.8v12.8a1.8 1.8 0 0 0 1.8 1.9h12.8a1.8 1.8 0 0 0 1.9-1.9V5.6a1.8 1.8 0 0 0-1.9-1.8z" class="menu_icon"></path><path d="M10.2 9v6.5l5-3.2-5-3.2z" class="menu_icon"></path></g></svg>           
      <label>My Channel</label>
    </div>
    <hr>
    <div class="menu_item click-able" @click="signOut()">
      <svg width="24px" height="24px" viewBox="0 0 24 24" class="menu_icon"><g class="menu_icon"><path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" class="menu_icon"></path></g></svg>             
      <label>Sign Out</label>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserMenu",
  methods: {    
    toChannel(){
      this.$emit('onClose')
      this.$router.push({
        path: `/channel/${this.$store.getters.currentUser.id}`,   
        // params: { id: this.$store.getters.currentUser.id } 
      })
    },
    signOut(){
      this.$store.dispatch('signOut')
      this.$store.dispatch('removeChannel')
      this.$emit('onSignOut')
    },
  }
}
</script>

<style scoped>

.user_menu{
  font-size: 16px;
  position: absolute;
  width: 200px;
  top: 50px;
  right: 10px;
  background: white;
  border: 1px solid #cecece;
  border-top: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
}

.user_menu hr{
  width: 100%;
  padding: 0;
  margin: 0;
  height: 0.5px;
  background: #cecece;
  border: none;
}

.menu_item{
  display: flex;
  align-items: center;
  padding: 10px;
}

.menu_icon{
  fill: #666;
}
.menu_item label{
  padding: 0px 10px;
}

.menu_item:hover{
  background: #ccc;
}

</style>
