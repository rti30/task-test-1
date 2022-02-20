//*Имитация ошибок авторизации
class ApiErrors extends Error {
   constructor(status, messege) {
      super();
      this.status = status;
      this.messege = messege;
   }

   static badRequest(messege) {
      return new ApiErrors(400, messege)
   }
}
module.exports = ApiErrors