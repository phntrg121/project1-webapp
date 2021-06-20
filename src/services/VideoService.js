import axios from 'axios'
import { storage } from './firebase'

export default {
  getVideos(){
    return axios.get(process.env.VUE_APP_API_URL + '/videos/video')
  },
  getVideoById(id){
    return axios.get(process.env.VUE_APP_API_URL + '/videos/video/' + id)
  },
  getRelatedVideos(tags){
    return axios.post(process.env.VUE_APP_API_URL + '/videos/video/related', tags)
  },
  getUploadVideo(id){    
    return axios.get(process.env.VUE_APP_API_URL + '/videos/upload/channel=' + id)
  },
  async upload(video, thumbnail, info){
    const ref = storage.ref()
    // //upload thumbnail
    // ref.child(`images/${info.uploaderId}/${new Date().getTime() + '-' +file.name}`).put(file)
    // .then((snapshot)=>{
    //   snapshot.ref.getDownloadURL().then(url =>{
    //     info.thumbnail = url
    //   })
    // });
    // //upload video
    // ref.child(`videos/${info.uploaderId}/${new Date().getTime() + '-' +file.name}`).put(file)
    // .then((snapshot)=>{
    //   snapshot.ref.getDownloadURL().then(url =>{
    //     info.videoURL = url
    //   })
    // });

    //upload thumbnail
    let image_snap = await ref.child(`images/${info.uploaderId}/${new Date().getTime() + '-' + info.title}`).put(thumbnail)
    info.thumbnail = await image_snap.ref.getDownloadURL()
    //upload video
    let video_snap = await ref.child(`videos/${info.uploaderId}/${new Date().getTime() + '-' + info.title}`).put(video)
    info.videoURL = await video_snap.ref.getDownloadURL()
    
    return axios.post(process.env.VUE_APP_API_URL + '/videos/upload', info)
  },
  search(query){    
    return axios.post(process.env.VUE_APP_API_URL + '/videos/video/search', query)
  }
}