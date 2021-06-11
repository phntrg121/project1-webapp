<template>
  <div id="channel_about">
    <div class="channel_detail">
      <div class="description">
        <label>Description</label>
        <p>{{channelDetail.description}}</p>
      </div>
    </div>
    <div class="channel_stat">
      <div class="stat">
        <label>Stat</label>
        <label>Joined {{channelDetail.createDate}}</label>
        <label>{{channelDetail.totalView}} views</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Main',
  data(){
    return {
      channelDetail: {
        description: "No description",
        createDate: new Date().toLocaleDateString(),
        totalView: (13325525523).toLocaleString(),
      }
    }
  },
}
</script>

<style scoped>
#channel_about{  
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  margin-top: 20px;
}
.channel_detail, .channel_stat, .description, .stat{  
  display: flex;
  flex-direction: column;
}
.channel_detail{
  width: 70%;
  margin: 0px 20px;
}
.description{  
  padding: 10px 0px;
  border-bottom: 1px solid #cecece;
}
.description p{
  font-size: 14px;
}
.channel_stat{
  width: 30%;
  margin: 0px 20px;
}
.stat label{
  padding: 10px 0px;
  border-bottom: 1px solid #cecece;
}
</style>
