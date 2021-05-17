import axios from 'axios'

export default {
  getVideoPage(pageNum){
    let page = pageNum == 1 ? '': `page=${pageNum}`
    return axios.get(process.env.VUE_APP_API_URL + '/videos/' + page)
  },
  getVideo(id){
    return axios.get(process.env.VUE_APP_API_URL + '/videos/' + id)
  },
  getRelatedVideo(tags){
    return axios.post(process.env.VUE_APP_API_URL + '/videos/related', tags)
  },
}