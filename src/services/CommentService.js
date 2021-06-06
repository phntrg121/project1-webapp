import axios from 'axios'

export default {
  postComment(comment){
    return axios.post(process.env.VUE_APP_API_URL + '/comments/comment/post', comment)
  },
  postReply(reply){
    return axios.post(process.env.VUE_APP_API_URL + '/comments/reply/post', reply)
  },
  getVideoComments(videoId){
    return axios.get(process.env.VUE_APP_API_URL + '/comments/comment/video=' + videoId)
  },
  getCommentReplies(commentId){
    return axios.get(process.env.VUE_APP_API_URL + '/comments/reply/comment=' + commentId)
  },
}