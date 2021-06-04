<template>
  <div id="explore">
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
    <div class="explore_videos" >
      <div style="margin:none; padding:none; width:80%" v-for="video in videos" :key="video">
        <video-item :video="video"/>
      </div>
    </div>
  </div>
</template>

<script>
import VideoItem from '../components/VideoItem.vue'

import VideoService from '../services/VideoService';

export default {
  name: 'Explore',
  components: {
    VideoItem
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
      VideoService.getVideoPage(1)
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
.explore_tabs{
  width: 100%;
  display: flex;
  flex-direction: row;
}

.explore_tab{
  width: 100%;
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
  padding: 10px;
  background: #f1f1f1;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
