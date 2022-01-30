import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

const userDefaultState = {
  name: "",
  avatar: "",
  token: "",
};

const matchesDefaultState = {
  matches: [],
};

export default createStore({
  strict: true,
  plugins: [
    createPersistedState({
      key: "@song-friends",
      paths: ["user"],
    }),
  ],
  state: {
    user: userDefaultState,
    matches: matchesDefaultState,
  },
  mutations: {
    SAVE_USER(state, payload) {
      state.user = payload;
    },
    RESET_USER(state) {
      state.user = userDefaultState;
    },
    SAVE_MATCHES(state, payload) {
      state.matches = payload;
    },
    UPDATE_MATCHES(state, payload) {
      let exists = false;

      for (let match of state.matches) {
        if (match?._id === payload?._id) {
          exists = true;
          break;
        }
      }

      if (!exists) state.matches = [payload].concat(state.matches);
    },
  },
  actions: {
    saveUser(context, payload) {
      context.commit("SAVE_USER", payload);
    },
    resetUser(context) {
      context.commit("RESET_USER");
    },
    saveMatches(context, payload) {
      context.commit("SAVE_MATCHES", payload);
    },
    updateMatches(context, payload) {
      context.commit("UPDATE_MATCHES", payload);
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
