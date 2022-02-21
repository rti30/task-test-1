import userApi from '@/api/user.js'
//import { setToken, cleanTokensData, getJWTPayload, getToken } from '@/api/token.js';
import { setToken, getToken, getUserId, cleanTokensData } from '@/api/token.js';
let resolveAuth;
let authPromise;

export default {
   namespaced: true,
   state: {
      token: null,
      favorite: [],
   },
   getters: {
      isLogin: state => state.token !== null,
      token: state => state.token,
      awaitAuth: () => authPromise,
      favorite: (state) => state.favorite,

   },
   mutations: {
      installToken(state, token) {
         state.token = token;
      },
      addFav(state, form) {
         state.favorite.push(form)
      },
      changeRequest(state, { form, key }) {
         state.favorite[key] = form;
      },
      setFav(state, data) {
         state.favorite = data;
      },
      removeRequest(state, id) {
         state.favorite = state.favorite.filter(item => item.id !== id);
      },
      removeToken(state) {
         state.token = null;
      }
   },

   actions: {
      async login({ commit, dispatch }, payload) {
         try {
            authPromise = new Promise(resolve => resolveAuth = resolve)
            const { body, messegeError } = await userApi.login(payload);
            if (body) {
               commit('installToken', body)
               setToken(body, "myTestToken")
               dispatch("getLocalFav");
            }
            else {
               dispatch('alert/add', { text: messegeError }, { root: true })
               commit('installToken', null)
            }
            resolveAuth();
         }
         catch (e) {
            resolveAuth();
            throw e;
         }
      },

      async auth({ commit }) {
         authPromise = new Promise(resolve => resolveAuth = resolve);
         const token = getToken("myTestToken");
         if (!token) {
            commit('installToken', null)
         }
         const result = await userApi.auth(token);
         if (result) {
            commit('installToken', result)
            setToken(result, "myTestToken")
         }
         else {
            commit('installToken', null)
         }
         resolveAuth();
      },
      saveRequest({ commit, dispatch }, form) {
         const id = +new Date();
         commit('addFav', { id, ...form });
         dispatch("saveFavLocal")
      },
      changeRequest({ commit, getters, dispatch }, { form, key }) {
         const hasFav = getters.favorite[key];
         if (hasFav) {
            commit('changeRequest', { form, key });
            dispatch("saveFavLocal")
         }
      },
      removeRequest({ commit, dispatch }, id) {
         commit('removeRequest', id);
         dispatch("saveFavLocal")
      },

      setFav({ commit, dispatch }, data) {
         commit('setFav', data);
         dispatch("saveFavLocal");
      },
      saveFavLocal({ dispatch, getters }) {
         const { login } = getUserId(getters.token)
         if (getters.favorite.length) {
            localStorage.setItem("fav_" + login, JSON.stringify(getters.favorite));
         }
         else { dispatch("removeFavLocal", login) }
      },
      removeFavLocal({ getters }) {
         const { login } = getUserId(getters.token)
         cleanTokensData("fav_" + login)
      },
      async getLocalFav({ dispatch, getters }) {
         await getters.awaitAuth;
         if (getters.isLogin) {
            const { login } = getUserId(getters.token)
            const favData = JSON.parse(localStorage.getItem("fav_" + login));
            if (favData) { dispatch("setFav", favData); }
         }
      },
      async logout({ commit, dispatch, getters }) {
         await getters.awaitAuth;
         cleanTokensData("myTestToken");
         commit('removeToken');
         commit('setFav', []);
         dispatch('content/clear', {}, { root: true });
      }
   },
}
