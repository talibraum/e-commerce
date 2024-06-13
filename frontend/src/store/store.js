import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: {
      id: null,
      username: '',
      address: '',
      
    },
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    CLEAR_USER(state) {
      state.user = {
        id: null,
        username: '',
        address: '',
       
      };
    },
  },
  actions: {
    login({ commit }, user) {
      commit('SET_USER', { ...user});
    },
    logout({ commit }) {
      commit('CLEAR_USER');
    },
  },
  getters: {
    userId: (state) => state.user.id,
    username: (state) => state.user.username,
    address: (state) => state.user.address,
  },
});

export default store;
