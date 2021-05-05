<template>
  <div class="search">
    <nav-bar/>
    <div>
      Result of <span>{{text}}</span>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'

export default {
  name: 'Search',
  components: {
    NavBar
  },
  data(){
      return{
          text: '',
          results: []
      }
  },
  beforeRouteUpdate(to, from, next) {
    if (to.query['query'] === '') return
    this.text = to.query['query']
    this.results = []
    next()
  },
}
</script>

<style scoped>
</style>