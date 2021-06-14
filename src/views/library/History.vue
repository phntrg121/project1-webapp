<template>
  <div id="history">
    <div class="history_list">
      <label>Watch history</label>
      <div class="video_list" v-for="video in videos" :key="video">
        <search-item :video="video"/>
      </div>
    </div>
    <div class="history_filter">
      <div class="filter">
        <label>Filter</label>
      </div>
    </div>
  </div>
</template>

<script>
import SearchItem from '../../components/SearchItem.vue'

export default {
  name: 'History',
  components: {
    SearchItem
  },
  data(){
    return{
      videos: [
        {
          id:"609f1aa5a50d912e40b6ae34",
          title:"Rain in summer",
          uploaderId:"609f1ba48419a409d4429353",
          thumbnail:"https://wallpapercave.com/wp/G4qMVSo.jpg",
          views: "0",
          description:"Rose are red, Violet are blue, Rain are sad"
        },
        {
          id:"609f1aa5a50d912e40b6ae34",
          title:"Rain in summer",
          uploaderId:"609f1ba48419a409d4429353",
          thumbnail:"https://wallpapercave.com/wp/G4qMVSo.jpg",
          views: "0",
          description:"Rose are red, Violet are blue, Rain are sad"
        },
        {
          id:"609f1aa5a50d912e40b6ae34",
          title:"Rain in summer",
          uploaderId:"609f1ba48419a409d4429353",
          thumbnail:"https://wallpapercave.com/wp/G4qMVSo.jpg",
          views: "0",
          description:"Rose are red, Violet are blue, Rain are sad"
        },
        {
          id:"609f1aa5a50d912e40b6ae34",
          title:"Rain in summer",
          uploaderId:"609f1ba48419a409d4429353",
          thumbnail:"https://wallpapercave.com/wp/G4qMVSo.jpg",
          views: "0",
          description:"Rose are red, Violet are blue, Rain are sad"
        },
      ]
    }
  }
}
</script>

<style scoped>
#history{
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  overflow-y: auto;
}

.history_list{
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
}
.history_list label{
  margin: 20px;
}
.video_list{
  margin: 0px 20px
}

.history_filter{
  position:sticky;
  top: 0;
  background-color: #f1f1f1;
  min-width: 300px;
  height: 100%
}
.filter{
  margin: 20px;
}
</style>
