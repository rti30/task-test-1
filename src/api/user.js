import { usersList } from './server';
import ApiErrors from './apiErrors'
import jwt from 'jsonwebtoken';
const SECRET_KEY = '$fadR524Jsc#1deaf_'
import authErr from './messegeErrors/authorized'

function getToken(login) {
   return jwt.sign({ login }, SECRET_KEY, { expiresIn: '360 days' })
}
export default {
   login: async ({ login, password }) => {
      try {
         if (!login || !password) {
            //  return false;
            throw ApiErrors.badRequest('Не заполнены логин и/или пароль') //*Имитация ошибки сервера
         }
         const users = await usersList();
         const user = users.find(item => item.login === login);
         const validPassword = user?.password === password;
         if (user && validPassword) {
            return { body: getToken(user.login) };
         }
         else {
            throw ApiErrors.badRequest('Неверные имя пользователя и/или пароль') //*Имитация ошибки сервера
         }
      }
      catch (e) {
         if (e.status in authErr) {
            return { messegeError: e.messege, body: false }
         }
         else {
            console.warn(e)
            throw e;
         }
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
         return false; //Обработка не требуется
      }
   },

}
