<template>
  <div id="studio_content">
    <upload-modal v-show="showUploadModal" @close="onCloseModal()"/>
    <div class="head">
      <label>Content</label>
      <button class="click-able" @click="openModal()">UPLOAD</button>
    </div>
    <div class="body">
      <label class="video_filter">FILTER</label>
      <div class="video_table">
        <table >
          <thead>
            <tr>
              <th>Video</th>
              <th>Visibility</th>
              <th>Uploaded Date</th>
              <th>Views</th>
              <th>Likes</th>
              <th>Comments</th>
            </tr>
          </thead>
          <tbody>
            <tr class="table_row" v-for="video in videos" :key="video">
              <td>
                <div class="video_col">
                  <div class="video_img"><img :src="video.thumbnail"/></div>
                  <div style="position: relative; margin-left: 10px; width: 100%">
                    <label>{{video.title}}</label>
                    <div class="video_nav">
                      <button class="click-able" @click="toWatch(video.id)">
                        <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false"><g><path d="M8 5v14l11-7z"></path></g></svg>
                      </button>
                      <button class="click-able">
                        <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false"><g><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></g></svg>
                      </button>
                      <button class="click-able">
                        <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false"><g><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></g></svg>
                      </button>
                    </div>
                  </div>
                  
                </div>              
              </td>
              <td>{{video.visibility}}</td>
              <td>{{new Date(video.uploadedDate).toDateString()}}</td>
              <td>{{video.views}}</td>
              <td>{{video.likes}}</td>
              <td>{{video.comments}}</td>
            </tr>
          </tbody>
        </table>
      </div>      
    </div>
  </div>
</template>

<script>
import UploadModal from '../../components/UploadModal.vue'
import VideoService from '../../services/VideoService'

export default {
  components: { UploadModal },
  name: 'Main',
  data(){
    return {
      showUploadModal: this.$route.query.upload,
      videos: [],
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
    },
    toWatch(id){
      this.$router.push({
        name: 'Watch',
        params: { id: id } 
      })
    },
    async getUploadVideos(){
      VideoService.getAllUploadVideo(this.$store.getters.currentUser.id)
      .then(res=>{
         if(res.data.message == "OK"){
          this.videos = res.data.data
        }
      })
      .catch(err=>console.log(err))
    },
  },
  mounted(){
    this.getUploadVideos()
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

.body{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.video_filter{
  padding: 10px;
  border-bottom: 1px solid #cecece;
}

.video_table{
  width: 100%;
  overflow-x: auto;  
}
.video_table table{  
  border-collapse: collapse;
  width: 100%;
}
.video_table table th{
  padding: 10px;
  border-bottom: 1px solid #cecece;
}
.table_row td{
  padding: 10px;
  text-align: center;
}
.table_row:hover{
  background-color: #eee;
}

.video_col{
  display: flex;
  flex-direction: row;
  min-width: 360px;
}
.video_img{
  min-width: 120px;
  max-width: 120px;
  min-height: 68px;
  max-height: 68px;
}
.video_img img{
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.video_col label{
  position: absolute;
  top: 0;
  left: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: start;
  width: 100%;
  height: 100%;
}
.video_nav{  
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  right: 0;
  width: 100%;
  height: 100%;
  visibility: hidden;
}
.video_nav button{
  margin-left: 10px;
  width: 32px;
  height: 32px;
  padding: 0;
  outline: 0;
  border: 0;
  fill: #666;
}
.video_nav button svg{
  widows: 100%;
  height: 100%;
}
.table_row:hover label{
  visibility: hidden;
}
.table_row:hover .video_nav{
  visibility: visible;
}
</style>
