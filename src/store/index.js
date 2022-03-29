import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

// BY080011089552
// BY080011146531
export default createStore({
  state: {
    list: []
  },
  getters: {
    getList (state) {
      return state.list
    },
    getRecordByNumber: (state) => (id) => {
      return state.list.find(record => record.number === id)
    }
  },
  actions: {
    addNewRecord ({ commit }, payload) {
      commit('addNewRecord', payload)
    },
    async refreshHistoryByNumber(context, payload) {
      const record = context.getters.getRecordByNumber(payload)
      const result = await fetch(`https://evropochta.by/api/track.json/?number=${record.number}`)
          .then(data => data.json())
          .then(data => data.data)
          .then(data => data.map(data => {
            return {
              date: data.Timex,
              info: {
                main: data.InfoTrack,
                additional: data.Info,
              },
              check: {
                from: data.CheckxFrom,
                to: data.CheckxTo,
              }
            }
          }))

      record.history = record.history.reduce((acc, arr2) => {
        if (result.findIndex(arr1 => arr1.date === arr2.date && arr1.info.main === arr2.info.main && arr1.info.additional === arr2.info.additional) === -1) {
          acc.push(arr2)
        }
        return acc
      }, [...result]);

      record.updatedAt = new Date(Date.now())

      context.commit('updateRecord', record)
    }
  },
  mutations: {
    addNewRecord (state, payload) {
      state.list.push(payload)
    },
    updateRecord (state, payload) {
      const index = state.list.findIndex(x => x.number === payload.number)
      state.list[index] = payload
    },
  },
  plugins: [
    vuexLocal.plugin
  ]
})
