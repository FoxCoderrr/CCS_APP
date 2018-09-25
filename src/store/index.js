import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);

export default new vuex.Store({
  state: {//$store.state.a调用
    a: 1,
    b: 2,
    c: 0,
    uinfo:"",
  },
  mutations: {//$store.commit('sum')调用
      sum(state){
        state.c = state.a+state.b;
      }
  },
  actions: {//$store.dispatch('sum')调用
      sum(context){
        context.commit('sum');
      }
  },
  getters: {//$store.getters.sum调用
      sum(state){
          return state.a+state.b;
      }
  },
})
