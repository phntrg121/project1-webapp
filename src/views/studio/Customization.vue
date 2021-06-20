<template>
  <div id="studio_customization">
    <div class="head">
      <label>Customize Channel</label>
    </div>
    <div class="body">
      <div class="section">
        <label>Display Name</label>
        <div class="textfield" style="margin-top: 10px">
          <input v-model="username" type="text" placeholder=" " class="textinput"/>
          <label class="textlabel">Username</label>
        </div>
      </div>
      <div class="section">
        <label>Profile Image</label>
        <p>Your profile image</p>
        <div class="user_image">
          <img :src="image_url" alt="profile image">
        </div>
        <button class="upload_image_button click-able">UPLOAD</button>
      </div>
      <div class="section">
        <label>Banner Image</label>
        <p>Your banner image</p>
        <div v-if="banner_url!=''" class="banner_image">
          <img :src="banner_url" alt="banner image">
        </div>
        <p v-else style="margin: 10px 0px; font-style: italic">You don't have any banner image</p>
        <button class="upload_image_button click-able">UPLOAD</button>
      </div>
      <div class="section">
        <label>Description</label>
        <p>Add your channel description</p>                 
        <textarea v-model="description" rows="4" class="description text_focus" spellcheck="false"></textarea>
      </div>
      <div class="section">
        <label>Contact</label>
        <p>Add your contact info</p>
        <div class="textfield" style="margin-top: 10px">
          <input v-model="contact" class="textinput" type="email" placeholder=" "/>
          <label class="textlabel">Email</label>
        </div>
      </div>
      <div class="section">
        <label>Links</label>
        <p>Add links to your channel</p>
      </div>
      <div v-if="hasChange()" class="save_buttons">
        <button class="cancel_btn click-able" @click="cancel()">CANCEL</button>
        <button class="save_btn click-able" @click="save()">SAVE</button>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from '../../services/UserService'
export default {
  name: 'Studio Customization',
  data(){
    return{
      image_url: '',
      banner_url: '',
      description: '',
      contact: '',
      links: [],
      username: '',

      image: null,
      banner: null,

      baseUserInfo: this.$store.getters.currentUser,
      baseChannelInfo: this.$store.getters.userChannel,

      updating: false,
    }
  },
  methods: {
    hasChange(){
      if(this.username != this.baseUserInfo.username) return true
      if(this.description != this.baseChannelInfo.description) return true
      if(this.contact != this.baseChannelInfo.contact) return true
      if(this.links != this.baseChannelInfo.links) return true
      return false;
    },
    setDefaultValue(){
      this.baseUserInfo = this.$store.getters.currentUser
      this.baseChannelInfo = this.$store.getters.userChannel
      this.image_url = this.$store.getters.currentUser.avatar
      this.username = this.$store.getters.currentUser.username
      this.banner_url = this.$store.getters.userChannel.banner
      this.description = this.$store.getters.userChannel.description
      this.contact = this.$store.getters.userChannel.contact
      this.links = this.$store.getters.userChannel.links
    },
    cancel(){
      if(this.hasChange()) this.setDefaultValue()
    },
    async save(){
      if(!this.updating && this.hasChange()){
        this.updating = false
        try{
          let user = (await UserService.updateUser({
            id: this.baseUserInfo.id,
            username: this.username,
            avatar: this.image_url
          })).data.data
          let channel = (await UserService.updateChannel({
            id: this.baseChannelInfo.id,
            banner: this.banner_url,
            description: this.description,
            contact: this.contact,
            links: this.links,
          })).data.data

          if(user && channel){
            this.$store.dispatch('setUser', user)
            this.$store.dispatch('setChannel', channel)
            this.setDefaultValue()
            alert("Save success")            
          }
          else{
            alert("Save error")
          }
        }
        catch(err){
          console.log(err)
          alert("Save error")
        }
        finally{
          this.updating = false
        }
      }
    },
  },
  mounted(){
    this.setDefaultValue()
  }
}
</script>

<style scoped>

#studio_customization{  
  display: flex;
  flex-direction: column;
  width: calc(100% - 20px);
  height: fit-content;
  padding: 10px;
}
.head{
  display: flex;
  flex-direction: row;
  width: calc(100% - 20px);
  justify-content: space-between;
  align-items: center;
  padding: 20px 10px;
}
.head label{
  font-size: 20px;
  font-weight: bold;
}

.body{  
  padding: 0px 10px;
}
.section{
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
}
.section > label{
  font-weight: bold;
}
.section p{
  margin: 0;
  padding: 0;
  font-size: 13px;
}

.user_image{
  width: 180px;
  height: 180px;
  margin: 10px 0px;
}

.user_image img{
  zoom: 2;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.banner_image{  
  width: 100%;
  aspect-ratio: 4 / 1;
  margin: 10px 0px;
}
.banner_image img{
  zoom: 2;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.upload_image_button{
  width: fit-content;
  border: 0;
  padding: 0;
  background: transparent;
  font-size: 14px;
  color: blue
}

.description{
  margin-top: 10px;
  font-family: 'Roboto', sans-serif;
  outline: 0;
  resize: none;
  width: 100%;
  max-width: 800px;
  padding: 8px;
  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box;    /* Firefox, other Gecko */
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid #cecece;
  font-size: 16px;
}
.description:focus{
  border: 1px solid blue;
}


.textfield{
  position: relative;
  width: 100%;
  max-width: 800px;
}
.textlabel{
  position: absolute;
  top: 0;
  left: 0;  
  transform: translate(10px,10px);
  color: #cecece;
  z-index: 2;
  background: white;
  transition: 0.2s;
}
.textinput{
  padding: 10px;
  outline: 0;
  border-radius: 4px;
  border: 1px solid #cecece;
  z-index: 1;
  font-size: 16px;
  width: calc(100% - 20px);
}
.textnput:focus {  
  border: 1px solid blue;
}
.textinput:focus ~ .textlabel{  
  transform: translate(10px,-8px);
  font-size: 12px;
}
.textinput:not(:placeholder-shown).textinput:not(:focus) ~ .textlabel{  
  transform: translate(10px,-8px);
  font-size: 12px;
}


.save_buttons{
  position: sticky;
  bottom: 0;
  display: flex;
  flex-direction: row;
  padding: 10px 0px;
  justify-content: flex-end;
  background: #f9f9f9;
}
.save_buttons button{
  margin-left: 10px;
  border: 0;
  font-size: 14px;
}
.cancel_btn{  
  padding: 0;
  background: transparent;
  color: blue;
}
.save_btn{
  background: blue;
  color: white;
  padding: 5px 10px;
}
</style>
