import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

store.dispatch("user/auth").then(() => {
   store.dispatch("user/getLocalFav");
});
let app = createApp(App);
app.config.errorHandler = (e) => {
   console.warn(e);
   store.dispatch("alert/add", { text: "Возникла непредвиденная ошибка, попробуйте позже" });
}

app.use(store).use(router).mount('#app')
