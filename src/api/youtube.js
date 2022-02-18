const baseURL = 'https://www.googleapis.com/youtube/v3/'
import { server } from './server';
const API_KEY = 'AIzaSyCKmh5zgy8PgsIhvdWO9YgrtiCEPVwqaBo'

async function youtube({ string, order = "relevance", maxResults = 12 }) {
   try {
      let response = await server.get(`${baseURL}search?part=snippet&maxResults=${maxResults}&q=${string}&order=${order}&key=${API_KEY}`);
      return response.data;
   }
   catch (e) {
      console.warn(e);
      return false;
   }
}

async function videoInfo(videoId) {
   try {
      let response = await server.get(`${baseURL}videos?id=${videoId}&key=${API_KEY}&part=statistics`)
      return response.data;
   }
   catch (e) {
      console.warn(e);
      return false;
   }
}

export { youtube, videoInfo }
