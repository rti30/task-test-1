import { usersList } from './server';
import jwt from 'jsonwebtoken';
const SECRET_KEY = '$fadR524Jsc#1deaf_'

function getToken(login) {
   return jwt.sign({ login }, SECRET_KEY, { expiresIn: '360 days' })
}
export default {
   login: async ({ login, password }) => {
      try {
         if (!login || !password) {
            console("Тут")
            console(login, password)
            return false;
         }
         const users = await usersList();
         const user = users.find(item => item.login === login);
         const validPassword = user?.password === password;
         if (user && validPassword) {
            return getToken(user.login);
         }
         else {
            return false;
         }
      }
      catch (e) {
         console.warn(e)
         return false;
      }
   },
   auth: async (token) => {
      try {
         const userData = jwt.verify(token, SECRET_KEY);
         if (userData) {
            return getToken(userData.login);
         }
         else {
            console.warn("Токен не распознан");
            return false;
         }
      }
      catch (e) {
         console.warn(e)
         return false;
      }
   },

}
