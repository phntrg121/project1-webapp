<template>
  <div id="channel_about">
    <div v-if="channel" class="channel_detail">
      <div v-if="channel.description!=''" class="section">
        <label>Description</label>
        <p>{{channel.description}}</p>
      </div>
      <div v-if="channel.contact!=''" class="section">
        <label>Contact</label>
        <p>{{channel.contact}}</p>
      </div>
      <div v-if="channel.links.lenght>0" class="section">
        <label>Links</label>
        <p>{{channel.links}}</p>
      </div>
    </div>
    <div v-if="channel" class="channel_stat">
      <div class="stat">
        <label>Stat</label>
        <label>Joined {{new Date(channel.createdDate).toDateString()}}</label>
        <!-- <label>{{channelDetail.totalView}} views</label> -->
      </div>
    </div>
  </div>
</template>

<script>
import UserService from '../../services/UserService'
export default {
  name: 'Main',
  data(){
    return {
      channel: null,
    }
  },
  mounted(){
    UserService.getChannel(this.$route.params.id)
    .then(res=>{
      this.channel = res.data.data
    })
    .catch(err=>console.log(err))
  }
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
.section{  
  padding: 10px 0px;
  border-bottom: 1px solid #cecece;
}
.section p{
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
