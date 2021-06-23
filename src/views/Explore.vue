<template>
  <div id="explore">
    <div class="content" style="height: 60px; align-items: flex-end;">
      <div class="explore_tabs">
        <router-link to="/explore/" :class="[(selected == 1)? 'explore_tab select':'explore_tab']" @click="getVideo(1)">
          <label>Trending</label>
        </router-link>
        <router-link to="/explore/music" :class="[(selected == 2)? 'explore_tab select':'explore_tab']" @click="getVideo(2)">
          <label>Music</label>
        </router-link>
        <router-link to="/explore/gaming" :class="[(selected == 3)? 'explore_tab select':'explore_tab']" @click="getVideo(3)">
          <label>Gaming</label>
        </router-link>
        <router-link to="/explore/sport" :class="[(selected == 4)? 'explore_tab select':'explore_tab']" @click="getVideo(4)">
          <label>Sport</label>
        </router-link>
        <router-link to="/explore/news" :class="[(selected == 5)? 'explore_tab select':'explore_tab']" @click="getVideo(5)">
          <label>News</label>
        </router-link>
      </div>
    </div>
    <div class="content" style="background-color: #f1f1f1;">
      <div class="explore_videos" >
        <div class="explore_item" v-for="video in videos" :key="video">
          <search-item :data="video"/>
        </div>
      </div>
    </div>    
  </div>
</template>

<script>
import SearchItem from '../components/SearchItem.vue'

import VideoService from '../services/VideoService';

export default {
  name: 'Explore',
  components: {
    SearchItem
  },
  data(){
    return{      
      selected: -1,
      videos: []
    }
  },
  methods:{
    async getVideo(select){
      if(select == this.selected) return
      this.selected = select
      VideoService.getVideos()
      .then(res => {
        if(res.data.message == "OK"){
          this.videos = res.data.data
        }
      })
      .catch((err) => console.log(err))
    }
  },
  mounted(){
    this.getVideo(1)
  }
}
</script>

<style scoped>
#explore{
  width: 100%;
  height: fit-content;
}

.content{
  width: 100%;
  display: flex;
  justify-content: center;
}

.explore_tabs{
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: row;
  background-color: #f9f9f9;
  max-width: 800px;
}

.explore_tab{
  width: 100%;
  height: fit-content;
  padding: 10px;
  display: block;
  text-align: center;
  color: #666;
  text-decoration: 0;
}

.select{
  font-weight: bold;
  border-bottom: 3px solid #666;
}

.explore_tab :hover{
  cursor: pointer;
}

.explore_videos{
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  width: 100%;
  margin-top: 20px
}
.explore_item{
  width: 100%;
}
</style>
