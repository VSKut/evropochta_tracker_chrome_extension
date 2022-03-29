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
    addNewRecord ({ commit, getters }, payload) {
      const record = getters.getRecordByNumber(payload.number)
      if (record) {
        return 'Этот трэк номер уже существует'
      }

      commit('addNewRecord', payload)
      return true
    },
    updateRecordStatus ({ commit }, payload) {
      commit('updateRecordStatus', payload)
    },
    async refreshHistoryByNumber(context, payload) {
      let error = '';
      const record = context.getters.getRecordByNumber(payload)
      const result = await fetch(`https://evropochta.by/api/track.json/?number=${record.number}`)
          .then(data => data.json())
          .then(data => data.data)
          .then(data => data.map(data => {
            if (data.ErrorDescription) {
              error = data.ErrorDescription
              return {}
            }

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

      if (error) {
        return error
      }


      record.history = result.reduce((acc, arr2) => {
        if (record.history.findIndex(arr1 => arr1.date === arr2.date && arr1.info.main === arr2.info.main && arr1.info.additional === arr2.info.additional) === -1) {
          acc.push(arr2)
        }
        return acc
      }, [...record.history]);

      record.updatedAt = new Date(Date.now())

      context.commit('updateRecord', record)
      return true
    }
  },
  mutations: {
    addNewRecord (state, payload) {
      state.list.push({
        status: 'new',
        number: payload.number,
        name: payload.name,
        history: [],
      })
    },
    updateRecord (state, payload) {
      const index = state.list.findIndex(x => x.number === payload.number)
      state.list[index] = payload
    },
    updateRecordStatus (state, payload) {
      const index = state.list.findIndex(x => x.number === payload.number)
      state.list[index].status = payload.status
      console.log(state.list[index].status)
    },
  },
  plugins: [
    vuexLocal.plugin
  ]
})
