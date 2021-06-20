import axios from 'axios'

export default {
  //watchlater
  createWL(uid){
    return axios.post(process.env.VUE_APP_API_URL + '/playlists/watchlater/create', {userId: uid})
  },
  getWL(uid){
    return axios.get(process.env.VUE_APP_API_URL + '/playlists/watchlater/' + uid)
  },
  //playlist
  createPlaylist(list){
    return axios.post(process.env.VUE_APP_API_URL + '/playlists/playlist/create', list)
  },
  getPlaylistFromUser(uid){
    return axios.get(process.env.VUE_APP_API_URL + '/playlists/playlist/user/' + uid)
  },
  getPlaylist(id){
    return axios.get(process.env.VUE_APP_API_URL + '/playlists/playlist/' + id)
  },
}