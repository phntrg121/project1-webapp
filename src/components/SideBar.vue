<template>
  <div class="sidebar">
    <div>Home</div>
    <div>Explore</div>
    <div>Subcriptions</div>
    <div>Library</div>
    <div>Home</div>
  </div>
</template>

<script>
export default {
  name: "SideBar",
};
</script>

<style scoped>
.sidebar{
  height: 100%;
  width: 60px;
  display: flex;
}

.sidebar div{
  width: 100%;
  margin: 10px;
}
</style>
