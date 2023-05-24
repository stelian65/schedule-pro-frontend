// store.js
import Vuex from 'vuex';



 const store = new Vuex.Store({
  state: {
    accessToken: '',
    user: {
      username: '',
      id: '',
      role: ''
    }
  },
  mutations: {
    setAccessToken(state, token) {
      state.accessToken = token;
    },
    setUser(state, user) {
      state.user = user;
    }
  },
  actions: {
    login({ commit }, { token, user }) {
      commit('setAccessToken', token);
      commit('setUser', user);
    },
    logout({ commit }) {
      commit('setAccessToken', '');
      commit('setUser', {
        username: '',
        id: '',
        role: ''
      });
    }
  },
  getters: {
    isAuthenticated: state => !!state.accessToken,
    getToken: state => state.accessToken,
    getUser: state => state.user
  }
});

export default store;
