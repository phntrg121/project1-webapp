<template>
  <div id="studio_content">
    <upload-modal v-show="showUploadModal" @close="onCloseModal()"/>
    <div class="head">
      <label>Content</label>
      <button class="click-able" @click="openModal()">UPLOAD</button>
    </div>
    <div class="body">

    </div>
  </div>
</template>

<script>
import UploadModal from '../../components/UploadModal.vue'

export default {
  components: { UploadModal },
  name: 'Main',
  data(){
    return {
      showUploadModal: this.$route.query.upload,
    }
  },
  methods:{
    onCloseModal(){
      let query = Object.assign({}, this.$route.query)
      delete query.upload
      this.$router.replace({ query })
    },
    openModal(){
      let query = Object.assign({}, this.$route.query)
      query.upload = true
      this.$router.replace({ query })
    }
  },
  mounted(){
  }
}
</script>

<style scoped>
#studio_content{  
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
.head button{
  border: 0;
  padding: 0;
  background: transparent;
  font-size: 14px;
  color: blue
}
</style>
