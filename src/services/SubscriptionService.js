import axios from 'axios'

export default {
  createSub(id){
    return axios.post(process.env.VUE_APP_API_URL + '/subscriptions/subscription/create/', {userId: id})
  },
  getSub(id){
    return axios.get(process.env.VUE_APP_API_URL + '/subscriptions/subscription/' + id)
  },
  getSubscriber(id){
    return axios.get(process.env.VUE_APP_API_URL + '/subscriptions/subscription/subscribers/' + id)
  },
  getSubscription(id){
    return axios.get(process.env.VUE_APP_API_URL + '/subscriptions/subscription/subscriptions/' + id)
  },
  isSubscribed(sub){
    return axios.post(process.env.VUE_APP_API_URL + '/subscriptions/subscription/check', sub)
  },
  subscribe(sub){
    return axios.post(process.env.VUE_APP_API_URL + '/subscriptions/subscription/subscribe', sub)
  },
}