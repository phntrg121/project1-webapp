
export default {
  state: {
    token: null,
    user: null,
    isSignedIn: false
  },

  getters: {
    isAuthenticated: (state) => {
      return state.isSignedIn
    },
    getToken: (state) => {
      return state.token
    },
    currentUser: (state) => {
      return state.user
    }
  },

  mutations: {    
    SET_SIGNIN(state, sign) {
      state.isSignedIn = sign
    },
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_USER(state, data) {
      state.user = data
    },
    CLEAR_AUTH(state) {
      state.token = null
      state.user = null
      state.isSignedIn = false
    }
  },

  actions: {
    signIn({ commit }, data) {
      commit('SET_USER', data)
      commit('SET_SIGNIN', true)
    },

    signUp({ commit }, data) {
      commit('SET_USER', data)
      commit('SET_SIGNIN', true)
    },

    setUser({commit}, data){
      commit('SET_USER', data)
    },

    signOut({ commit }) {
      commit('CLEAR_AUTH')
    }
  }
}