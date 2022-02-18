import youtube from '@/api/youtube.js'
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
      currentSearch: (state, getters) => getters.hasContent ? state.currentSearch : '',
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
      async getContent({ getters, commit }, params) {
         if (!getters.searchInProcessing) {
            commit('changeProcessSearch', true);
            if (!params.string) {
               params.string = getters.search;
            }
            const response = await youtube(params)
            commit('changeContent', response)
            commit('changeCurrentSearch', params.string)
            commit('installSearch', params.string)
            commit('changeProcessSearch', false);
         }
      }
   }
}