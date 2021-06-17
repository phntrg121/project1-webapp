import axios from 'axios'

export default {
  //user
  singIn(credential){
    return axios.post(process.env.VUE_APP_API_URL + '/users/user/signin', credential)
  },
  signUp(data){
    return axios.post(process.env.VUE_APP_API_URL + '/users/user/signup', data)
  },
  getById(id){
    return axios.get(process.env.VUE_APP_API_URL + '/users/user/' + id)
  },
  updateUser(user){
    return axios.put(process.env.VUE_APP_API_URL + '/users/user/' + user.id, user)
  },

  //channel
  createChannel(id){
    return axios.post(process.env.VUE_APP_API_URL + '/users/channel/create', {userId: id})
  },
  getChannel(uid){
    return axios.get(process.env.VUE_APP_API_URL + '/users/channel/' + uid)
  },
  updateChannel(channel){
    return axios.put(process.env.VUE_APP_API_URL + '/users/channel/' + channel.id, channel)
  }
}