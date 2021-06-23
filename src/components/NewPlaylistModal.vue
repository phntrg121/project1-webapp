<template>
  <div id="channel_about">
    <transition name="modal_fade">
      <div class="modal_overlay">
        <div class="modal">
          <div class="modal_header">
            <label>NEW PLAYLIST</label>
          </div>

          <div class="modal_body">
            <label>Playlist name</label>
            <input v-model="name" type="text"/>
          </div>

          <div class="modal_footer">
            <button @click="closeModal">CANCEL</button>
            <button @click="create">CREATE</button>
          </div>
        </div>
      </div>      
    </transition>
  </div>
</template>

<script>
import PlaylistService from '../services/PlaylistService'
export default {
  name: 'New Playlist Modal',
  data(){
    return {
      creating: false,
      name: "",
    }
  },
  methods: {
    closeModal(){
      this.name = ""
      this.$emit('close')
    },
    async create(){
      if(name == "" || this.creating) return
      this.creating = true
      PlaylistService.createPlaylist({userId: this.$store.getters.currentUser.id, name: this.name})
      .then(res=>{
        alert("Playlist created")
      })
      .catch(err=>console.log(err))
      .finally(()=>{
        this.creating = false
        this.$emit('close')
      })
    }
  }
}
</script>

<style scoped>
.modal_overlay{
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 99;
  background-color: rgb(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  min-width: 400px;
  background-color: #FFF;
  border-radius: 10px; 
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.modal_fade-enter,
.modal_fade-leave-to {
  opacity: 0;
}

.modal_fade-enter-active,
.modal_fade-leave-active {
  transition: opacity .5s ease;
}

.modal > div{
  width: 100%;
  display: flex;
}

.modal_header{  
  margin-bottom: 10px;
}
.modal_body{
  margin: 10px 0px;
  flex-direction: column;
  font-size: 16px;
}

.modal_body input[type="text"]{

}

.modal_footer{
  margin-top: 10px;
  justify-content: flex-end;
}

.modal_footer button{
  margin-left: 10px;
}
</style>
