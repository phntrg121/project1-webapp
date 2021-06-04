<template>
  <div id="content">    
    <upload v-show="showUploadModal" @close="showUploadModal=false"/>
    Content Page
    <button @click="showUploadModal=true">upload</button>
  </div>
</template>

<script>
import UserService from '../services/UserService'
import Upload from '../components/Upload.vue'

export default {
  components: { Upload },
  name: 'Main',
  data(){
    return {
      showUploadModal: false,
      user: null
    }
  },
  methods:{
    async getUserInfo(){
      UserService.getById(this.$route.params.id)
      .then(res=>{
        if(res.data.message == "OK"){
          this.user = res.data.data
        }
      })
      .catch(err=>console.log(err))
    },   
  },
  mounted(){
    this.getUserInfo()
    this.showUploadModal = this.$route.params.upload
  }
}
</script>

<style scoped>
</style>
