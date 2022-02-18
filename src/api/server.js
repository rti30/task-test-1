
import axios from 'axios';
let config = {
   baseURL: "",
   timeout: 5000
};
const server = axios.create(config);

const usersList = () => new Promise(resolve => {
   setTimeout(() => resolve(
      [
         {
            "id": 1,
            "login": "Ivan",
            "password": "1234!"
         },
         {
            "id": 2,
            "login": "Petr",
            "password": "1234!"
         },
         {
            "id": 1,
            "login": "Cumberbatch",
            "password": "1234!"
         }
      ]
   ), 50)
})
export { server, usersList };

