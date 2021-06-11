<template>
  <div id="channel_subscription">
    <label>Subscriptions</label>
    <div class="subscriptions">
      <div  v-for="id in subscriptions" :key="id">
        <channel-subscription-item :uid="id"></channel-subscription-item>
      </div>
    </div>
  </div>
</template>

<script>
import ChannelSubscriptionItem from '../../components/ChannelSubscriptionItem.vue'
import SubscriptionService from '../../services/SubscriptionService'

export default {
  name: 'ChannelSubscriptions',
  components: { ChannelSubscriptionItem },
  data(){
    return {
      subscriptions: [],
    }
  },
  methods: {    
    async getSubscription(){
      SubscriptionService.getSubscription(this.$route.params.id)
      .then(res => {
        if(res.data.message == "OK"){
          this.subscriptions = res.data.data.subscriptions
        }
      })
      .catch(err => console.log(err))
    },
  },
  mounted(){
    this.getSubscription()
  }
}
</script>

<style scoped>
#channel_subscription{  
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
}

#channel_subscription > label{
  margin-top: 20px;
  margin-bottom: 10px;
}

.subscriptions{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
}
</style>
