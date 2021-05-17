import axios from 'axios'

export default {
  getVideoComment(videoId){
    return axios.get(process.env.VUE_APP_API_URL + '/comments/v=' + videoId)
  },
}