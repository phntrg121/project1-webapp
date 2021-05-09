<template>
  <div id="search_item">
    <img src="" alt="" width="200" height="150">
    <div style="display: flex; flex-direction: column; width: 100%; padding: 10px;">      
      <label style="font-weight: bold; font-size: 20px;">{{video.title}}</label>
      <label style="color: #666">{{video.uploader}}</label>
      <label style="color: #666; font-size: 14px ">{{video.views}} views</label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'search item',
  props:{
    video: Object,
  }

}
</script>

<style scoped>
#search_item{
  display: flex;
  flex-direction: row;
  margin: 20px 10px;
}

#search_item  lable{
  width: 100%;
}
</style>