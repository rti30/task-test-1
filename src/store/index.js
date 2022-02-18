import { createStore } from 'vuex'
import user from '@/store/user';
import content from '@/store/content';
import alert from '@/store/alert';


export default createStore({
   modules: {
      user,
      content,
      alert
   },
   strict: process.env.NODE_ENV !== 'production',
})


