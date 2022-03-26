import { createStore } from 'vuex'

export default createStore({
  state: {
    list: [
      {
        number: 'BY080011089552',
        createdAt: new Date(Date.now()),
        updatedAt: null,
        status: 'new',
        logs: []
      },
      {
        number: 'BY080011146531',
        createdAt: new Date(Date.now()),
        updatedAt: null,
        status: 'onTheWay',
        logs: []
      },
    ]
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

      // record.logs = record.logs.concat(result)

      // loop over arr2, add the elements of array2 if it doesn't exist in array1
      record.logs = record.logs.reduce((acc, arr2) => {
        if (result.findIndex(arr1 => arr1.Timex === arr2.Timex && arr1.Info === arr2.Info) === -1) {
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
})
