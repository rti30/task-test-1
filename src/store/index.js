import { createStore } from 'vuex'
import user from '@/store/user';
import content from '@/store/content';


export default createStore({
   modules: {
      user,
      content,
   },
   strict: process.env.NODE_ENV !== 'production',
})


