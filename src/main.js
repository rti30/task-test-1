import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
store.dispatch("user/auth").then(() => {
   store.dispatch("user/getLocalFav");
});
createApp(App).use(store).use(router).mount('#app')
