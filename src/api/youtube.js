const baseURL = 'https://www.googleapis.com/youtube/v3/'
import { server } from './server';
const API_KEY = 'AIzaSyCKmh5zgy8PgsIhvdWO9YgrtiCEPVwqaBo'

export default async function search({ string, order = "relevance", maxResults = 2 }) {
   try {
      console.log(string, order, maxResults);
      let response = await server.get(`${baseURL}search?part=snippet&maxResults=${maxResults}&q=${string}&order=${order}&key=${API_KEY}`);
      return response.data;
   }
   catch (e) {
      console.log(e);
   }

}
