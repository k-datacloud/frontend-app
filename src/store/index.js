import { createStore } from 'vuex'

export default createStore({
  state: {
    authToken: null,
    userId: null,
  },
  getters: {
  },
  mutations: {
    setAuthToken(state, token) {
      state.authToken = token;
    },
    setUserId(state, userId) {
      state.userId = userId;
    },
  },
  actions: {
  },
  modules: {
  }
})
