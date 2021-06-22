import axios from 'axios'

export default {
  createLikedList(uid){
    return axios.post(process.env.VUE_APP_API_URL + '/likes/video/create', {userId: uid})
  },
  getLikedVideoList(uid){
    return axios.get(process.env.VUE_APP_API_URL + '/likes/video/' + uid)
  },
  likeVideo(like){
    return axios.post(process.env.VUE_APP_API_URL + '/likes/video/like', like)
  },
  checkVideo(like){
    return axios.post(process.env.VUE_APP_API_URL + '/likes/video/check', like)
  }
}