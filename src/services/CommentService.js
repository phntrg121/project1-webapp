import axios from 'axios'

export default {
  getVideoComment(videoId){
    return axios.get(process.env.VUE_APP_COMMENTSERV_URL + '/v=' + videoId)
  },
}