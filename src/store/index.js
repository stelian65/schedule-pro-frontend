
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
    },
    loadFromLocalStorage(state) {
        const storedState = localStorage.getItem('store');
        if (storedState) {
          const parsedState = JSON.parse(storedState);
          state.accessToken = parsedState.accessToken;
          state.user = parsedState.user;
        }
      }
  },
  actions: {
    login({ commit }, { token, user }) {
      commit('setAccessToken', token);
      commit('setUser', user);
      localStorage.setItem('store', JSON.stringify(this.state))
    },
    logout({ commit }) {
      commit('setAccessToken', '');
      commit('setUser', {
        username: '',
        id: '',
        role: ''
      });
      localStorage.removeItem('store');
    }
  },
  getters: {
    isAuthenticated: state => !!state.accessToken,
    getToken: state => state.accessToken,
    getUser: state => state.user
  }
});

store.commit('loadFromLocalStorage');

export default store;
