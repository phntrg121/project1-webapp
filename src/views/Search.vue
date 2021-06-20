<template>
  <div id="search">
    <div class="search_filter">
      <label class="click-able">FILTERS</label>
      <div v-if="filterShow" class="filter">
      </div>
    </div>
    <div class="search_result">
      <div v-if="results.length==0">
        <label>No result for<span style="margin-left: 8px;font-weight: bold">{{query}}</span></label>
      </div>
      <div v-else>
        <div v-for="video in results" :key="video">
          <search-item :video="video"/>
        </div>
      </div>
    </div>    
  </div>
</template>

<script>
import SearchItem from '../components/SearchItem.vue'
import VideoService from '../services/VideoService'

export default {
  name: 'Search',
  components: {
    SearchItem
  },
  data(){
    return{
      query: this.$route.query['query'],
      filterShow: false,
      results: []
    }
  },
  mounted(){
    VideoService.search({query: this.query})
    .then(res=>{
      this.results = res.data.data
    })
    .catch(err=>console.log(err))
  }
}
</script>

<style scoped>
#search{
  display: flex;
  flex-direction: column;
  width: calc(100% - 20px);
  height: calc(100% - 20px);
  padding: 10px;
  align-items: center;
}

.search_filter{
  width: 100%;
  border-bottom: 1px solid #cecece;
  padding: 10px 0px;
  margin-bottom: 10px;
  max-width: 800px;
}

.search_result{
  width: 100%;
  max-width: 800px;
}
</style>