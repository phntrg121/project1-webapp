<template>
  <div id="channel_about">
    <transition name="modal_fade">
      <div class="modal_overlay">
        <div class="modal">
          <div class="modal_header">
            <label>UPLOAD</label>
          </div>

          <div v-show="video" class="modal_body">
            <div class="preview">
              <video ref="uploadVideo" controls></video>
              <canvas style="display:none" ref="uploadThumbnail"/>
            </div>
            <label style="margin-top: 10px">Title</label>
            <input v-model="title" type="text" style="margin-: 10px">
            <label style="margin-top: 10px">Description</label>            
            <textarea v-model="description" rows="4"></textarea>
            <div style="margin-top: 10px">
              <label>View mode:</label>
              <input type="radio" name="view" value="public"> Public
              <input type="radio" name="view" value="private"> Private
            </div>          
          </div>
          <div v-show="!video" class="modal_body">
            <div>
              <label>Choose video </label>
              <button @click="onPickVideo">Select</button>
              <input type="file" style="display: none" ref="videoInput" accept="video/*" @change="onVideoPicked"/>
            </div>
          </div>

          <div class="modal_footer">
            <button @click="closeModal">CANCEL</button>
            <button @click="upload">UPLOAD</button>
          </div>
        </div>
      </div>      
    </transition>
  </div>
</template>

<script>
import VideoService from '../services/VideoService'

export default {
  name: 'Main',
  data(){
    return {
      video: null,
      thumbnail: null,
      title: '',
      description: '',
    }
  },
  methods: {
    closeModal(){
      this.video = null
      this.thumbnail = null
      this.$emit('close')
    },
    onPickVideo() {
      this.$refs.videoInput.click()
    },
    async onVideoPicked(event) {
      const file = event.target.files[0]
      this.video = file
      
      this.title = file.name 

      //load video for preview
      let vd = this.$refs.uploadVideo
      vd.setAttribute('src',URL.createObjectURL(this.video))
      vd.load()

      //generate thumbnail
      let cv = this.$refs.uploadThumbnail
      let ctx = cv.getContext("2d")
      vd.currentTime = 3
      ctx.drawImage(vd, 0, 0, vd.videoWidth, vd.videoHeight)
      cv.toBlob((blob) => {
        this.thumbnail = new File([blob], `${file.name}.jpg`, { type: "image/jpeg" })
      }, 'image/jpeg', 0.8)
    },
    async upload(){
      if(!this.video||!this.thumbnail) return
      if(!this.$store.getters.isAuthenticated) return
      VideoService.upload(this.video, this.thumbnail, {
        title: this.title,
        thumbnail: "",
        videoURL: "",
        description: this.description,
        uploaderId: this.$store.getters.currentUser.id,
        tags: []
      })
      .then(res=>{
        if(res.data.message="OK"){
          alert("Upload Success")
          this.closeModal()
        }
      })
      .catch(err=>console.log(err))
    }
  }
}
</script>

<style scoped>
.modal_overlay{
  position: absolute;
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
.modal_body input[type="text"],
.modal_body textarea{  
  font-size: 14px;
}
.modal_footer{
  margin-top: 10px;
  justify-content: flex-end;
}

.modal_footer button{
  margin-left: 10px;
}

.preview{
  display: flex;
  justify-content: center;
}

.preview video{
  margin: 10px;
  max-width: 400px;
  max-height: 300px;
}
</style>
