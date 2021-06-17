<template>
  <div id="studio_playlists">
    <div class="head">
      <label>Playlists</label>
      <button class="click-able">NEW PLAYLIST</button>
    </div>
    <div class="body">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Studio Playlists',
}
</script>

<style scoped>

#studio_playlists{  
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
