import axios from 'axios'

export default {
  getVideoPage(pageNum){
    let page = pageNum == 1 ? '': `page=${pageNum}`
    return axios.get(process.env.VUE_APP_VIDEOSERV_URL + '/' + page)
  },
  getVideo(id){
    return axios.get(process.env.VUE_APP_VIDEOSERV_URL + '/' + id)
  },
  getRelatedVideo(tags){
    return axios.post(process.env.VUE_APP_VIDEOSERV_URL + '/related', tags)
  },
}