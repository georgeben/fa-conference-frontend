import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from "vuex-persist";
import TalkAPI from "../api/talks"
import AuthAPI from "../api/auth"
import { storage } from "../utils";
import { TOKEN } from "../utils/constants";
import { removeAuthHeader, setAuthHeader } from "../lib/httpClient";

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  key: "future-africa",
  storage: window.localStorage,
  reducer: state => ({
    user: state.user,
    isLoggedIn: state.isLoggedIn,
  }),
});


export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    user: null,
    talks: [],
    googleAuth: null,

  },
  mutations: {
    setTalks(state, talks) {
      state.talks = talks
    },
    setGoogleAuth(state, data) {
      state.googleAuth = data
    },
    setUser(state, user) {
      state.user = user
    },
    setIsLoggedIn(state, status) {
      state.isLoggedIn = status
    }
  },
  actions: {
    async listTalks({ commit }) {
      const response = await TalkAPI.listTalks();
      const talks = response.data.data;
      commit('setTalks', talks)
    },
    async googleSignIn({ commit }, id_token) {
      const response = await AuthAPI.signInWithGoogle(id_token)
      const { user, token } = response.data.data
      commit("setUser", user)
      commit("setIsLoggedIn", true)
      storage.updateState(TOKEN, token)
      setAuthHeader()
    },
    async joinTalk({ commit }, slug) {
      const response = await TalkAPI.attend(slug)
      commit("setUser", response.data.data)
    },
    async getUserData({ commit, dispatch }) {
      try {
        const response = await AuthAPI.getCurrentUser()
        commit("setUser", response.data.data)

      } catch (error) {
        if (error.response.status < 500) {
          dispatch("logout")

        }
      }
    },
    logout({ commit }) {
      commit("setUser", null)
      commit("setIsLoggedIn", false)
      removeAuthHeader()
      storage.removeState(TOKEN)
    }
  },
  getters: {
    authStatus(state) {
      return state.isLoggedIn
    }
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
