import axios from 'axios'

export default {
  singIn(credential){
    return axios.post(process.env.VUE_APP_USERSERV_URL + '/signin', credential)
  },
  signUp(data){
    return axios.post(process.env.VUE_APP_USERSERV_URL + '/signup', data)
  },
  getById(id){
    return axios.get(process.env.VUE_APP_USERSERV_URL + '/' + id)
  }
}