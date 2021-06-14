<template>
  <div id="search">
    <div class="search_advance">
      <label>FILTERS</label>
      <div v-if="filterShow" class="filter">

      </div>
    </div>
    <div class="search_result">
      <div style="margin: 10px;">Results for:<span style="font-weight: bold">{{text}}</span></div>
      <div v-for="video in results" :key="video">
        <search-item :video="video"/>
      </div>
    </div>
  </div>
</template>

<script>
import SearchItem from '../components/SearchItem.vue'

export default {
  name: 'Search',
  components: {
    SearchItem
  },
  data(){
    return{
      text: this.$route.query['query'],
      filterShow: false,
      results: [
        {
          title: 'asdad',
          uploader: 'mr zero',
          views: 44577
        },
        {
          title: 'ssjjfsssr33',
          uploader: 'looolll',
          views: 12321
        },
        {
          title: 'wwwee rsjkhkjxdw',
          uploader: 'ass boom',
          views: 9943369
        },
        {
          title: 'sssf jdhflkdh fuck',
          uploader: 'sdasd dddd',
          views: 572164
        },
      ]
    }
  },
  mounted(){
    //this.results = []
  }
}
</script>

<style scoped>
.search_advance{
  width: calc(100% -20px);
  border-bottom: 2px solid #666;
  margin: 0px 10px;
  padding: 10px;
}
.search_advance > label:hover{
  cursor: pointer;
}
.search_result{
  margin: 10px;
  width: calc(100% - 20px);
}
</style>