<template>
  <div id="main">
    <nav-bar class="nav"/>
    <div class="body">
      <side-bar class="side"/>
      <div class="scroll">
        <router-view></router-view>
      </div>
    </div>     
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import SideBar from '../components/SideBar.vue'

export default {
  name: 'Main',
  components: {
    NavBar,
    SideBar
  },
  data(){
    return {
    }
  },
}
</script>

<style scoped>
#main{  
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
}

.nav{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}

.body{
  display: flex;
  flex-direction: row;
  margin-top: 60px;
  width: 100%;
  height: calc(100% - 62px);
  position: relative;
}

.side{
  height: 100%;
}

.scroll{
  width: 100%;
  height: 100%;
  overflow-y: auto;
  border-top: 2px solid #ccc;
  background: rgb(240, 240, 240);
}

</style>
