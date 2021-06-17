
export default {
  state: {
    channel: null,
  },

  getters: {
    userChannel: (state) => {
      return state.channel
    }
  },

  mutations: {    
    SET_CHANNEL(state, data) {
      state.channel = data
    },
    CLEAR_CHANNEL(state) {
      state.channel = null
    }
  },

  actions: {
    setChannel({ commit }, data) {
      commit('SET_CHANNEL', data)
    },

    removeChannel({ commit }) {
      commit('CLEAR_CHANNEL')
    }
  }
}
