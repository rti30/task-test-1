
import { server } from './server';
import { snippetErrMes } from './messegeErrors/youtube';

const baseURL = 'https://www.googleapis.com/youtube/v3/'
const API_KEY = 'AIzaSyCKmh5zgy8PgsIhvdWO9YgrtiCEPVwqaBo'

async function youtube({ string, order = "relevance", maxResults = 12 }) {
   try {
      let response = await server.get(`${baseURL}search?part=snippet&maxResults=${maxResults}&q=${string}&order=${order}&key=${API_KEY}`);
      return { body: response.data };
   }
   catch (e) {
      //! случай лимита ключа не тестировался
      const messegeError = e.errors.some(item => item.reason in snippetErrMes)
      if (messegeError) {
         return { messegeError, body: false }
      }
      else throw e;
      //! 
   }
}

async function videoInfo(videoId) {
   try {
      let response = await server.get(`${baseURL}videos?id=${videoId}&key=${API_KEY}&part=statistics`)
      return response.data;
   }
   catch (e) {
      console.warn(e);
      return false; // обработка не требуется
   }
}

export { youtube, videoInfo }
