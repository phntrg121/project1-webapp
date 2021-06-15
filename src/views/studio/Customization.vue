<template>
  <div id="studio_customization">
    <div class="head">
      <label>Customize Channel</label>
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

#studio_customization{  
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
}
.head button{
  border: 0;
  padding: 0;
  background: transparent;
  font-size: 16px;
  color: blue
}
</style>
