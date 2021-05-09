import axios from 'axios'

export default {
  createSub(id){
    return axios.post(process.env.VUE_APP_SUBSCRIPTIONSERV_URL + '/create/' + id, {})
  },
  getSub(id){
    return axios.get(process.env.VUE_APP_SUBSCRIPTIONSERV_URL + '/' + id)
  },
  getSubCount(id){
    return axios.get(process.env.VUE_APP_SUBSCRIPTIONSERV_URL + '/count/' + id)
  },
  isSubscribed(sub){
    return axios.post(process.env.VUE_APP_SUBSCRIPTIONSERV_URL + '/check', sub)
  },
  subscribe(sub){
    return axios.post(process.env.VUE_APP_SUBSCRIPTIONSERV_URL + '/subscribe', sub)
  },
}