import { youtube } from '@/api/youtube.js'
export default {
   namespaced: true,
   state: {
      content: null,
      search: '',
      currentSearch: '',
      searchInProcessing: false,
   },
   getters: {
      content: state => state.content,
      search: state => state.search,
      hasContent: state => state.content?.items?.length,
      //    currentSearch: (state, getters) => getters.hasContent ? state.currentSearch : '',
      currentSearch: state => state.currentSearch,
      searchInProcessing: state => state.searchInProcessing,
   },
   mutations: {
      changeContent(state, data) {
         state.content = data;
      },
      installSearch(state, string) {
         state.search = string
      },
      changeCurrentSearch(state, request) {
         state.currentSearch = request;
      },
      changeProcessSearch(state, value) {
         state.searchInProcessing = value;
      }
   },

   actions: {
      changeSearch({ commit }, string) {
         string = string.toString().replace(/\s+/g, ' ')
            .replace(/^\s/, '')
            .replace(/\s$/, '')
         commit('installSearch', string)
      },
      async getContent({ dispatch, getters, commit }, params) {
         if (!getters.searchInProcessing) {
            commit('changeProcessSearch', true);
            if (!params.string && !getters.search) {
               commit('changeProcessSearch', false);
               return // Пустой поисковой запрос
            }
            if (!params.string) {
               params.string = getters.search;
            }
            try {
               const { messegeError, body } = await youtube(params)
               if (messegeError) {
                  dispatch('alert/add', { text: messegeError }, { root: true })
               }
               else if (body) {
                  commit('changeContent', body)
                  commit('changeCurrentSearch', params.string)
                  commit('installSearch', params.string)
               }
            }
            catch (e) {
               commit('changeProcessSearch', false);
               throw e;
            }
            commit('changeProcessSearch', false);
         }
      }
   }
}