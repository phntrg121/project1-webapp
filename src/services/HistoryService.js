import axios from 'axios'

export default {
  createHistory(uid){
    return axios.post(process.env.VUE_APP_API_URL + '/histories/watch/create', {userId: uid})
  },
  getHistory(uid){
    return axios.get(process.env.VUE_APP_API_URL + '/histories/watch/' + uid)
  },
  pushHistory(uid, video){
    return axios.put(process.env.VUE_APP_API_URL + '/histories/watch/' + uid, video)
  },
}