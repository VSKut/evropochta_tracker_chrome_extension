import { createStore } from 'vuex'

export default createStore({
  state: {
    list: [
      {
        number: 'BY080011089552',
        createdAt: new Date(Date.now()),
        logs: []
      },
      {
        number: 'BY080011146531',
        createdAt: new Date(Date.now()),
        logs: []
      },
    ]
  },
  getters: {
    getList (state) {
      return state.list
    },
    getRecordByNumber (state, payload) {
      return state.list.filter(record => record.number === payload)
    }
  },
  actions: {
    addNewRecord ({ commit }, payload) {
      commit('addNewRecord', payload)
    }
  },
  mutations: {
    addNewRecord (state, payload) {
      state.list.push(payload)
    }
  },
})
