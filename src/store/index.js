import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  strict: true,
  plugins: [
    createPersistedState({
      key: "@song-friends",
    }),
  ],
  state: {
    user: {
      name: "",
      avatar: "",
      token: "",
    },
  },
  mutations: {
    SAVE_USER(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    saveUser(context, payload) {
      context.commit("SAVE_USER", payload);
    },
  },
  getters: {
    isAuthenticated: (state) => {
      return Boolean(state.user.token);
    },
    getToken(state) {
      return state.user.token;
    },
  },
  modules: {},
});
