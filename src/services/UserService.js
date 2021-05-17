import axios from 'axios'

export default {
  singIn(credential){
    return axios.post(process.env.VUE_APP_API_URL + '/users/signin', credential)
  },
  signUp(data){
    return axios.post(process.env.VUE_APP_API_URL + '/users/signup', data)
  },
  getById(id){
    return axios.get(process.env.VUE_APP_API_URL + '/users/' + id)
  }
}