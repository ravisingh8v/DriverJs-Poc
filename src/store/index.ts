import { createStore } from 'vuex'

export default createStore({
  state: {
    isSidebarOpen: false
  },
  getters: {
    isSidebarOpen(state) {
      return state.isSidebarOpen
    }
  },
  mutations: {
    setIsSidebarOpen(state, payload) {
      state.isSidebarOpen = payload
    }
  },
  actions: {
    setIsSidebarOpen(context, payload) {
      context.commit('setIsSidebarOpen', payload)
      console.log('action', payload)
    }
  },
  modules: {
  }
})
