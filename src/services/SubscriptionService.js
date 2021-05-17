import axios from 'axios'

export default {
  createSub(id){
    return axios.post(process.env.VUE_APP_API_URL + '/subscriptions/create/' + id, {})
  },
  getSub(id){
    return axios.get(process.env.VUE_APP_API_URL + '/subscriptions/' + id)
  },
  getSubscriber(id){
    return axios.get(process.env.VUE_APP_API_URL + '/subscriptions/subscribers/' + id)
  },
  getSubscription(id){
    return axios.get(process.env.VUE_APP_API_URL + '/subscriptions/subscriptions/' + id)
  },
  isSubscribed(sub){
    return axios.post(process.env.VUE_APP_API_URL + '/subscriptions/check', sub)
  },
  subscribe(sub){
    return axios.post(process.env.VUE_APP_API_URL + '/subscriptions/subscribe', sub)
  },
}