import { createStore } from 'vuex'

// Importing External Modules 
import auth from './auth'
import products from './products'
import contact from './contact'

export default createStore({
  state: {
    errorMessage: null
  },
  getters: {
    isLoading(_: any, rootState: any) {
      return rootState['auth/isLoading']

    },
    errorMessage(state: any) {
      return state.errorMessage
    },
  },
  mutations: {
    errorMessage(state: any, payload: any) {
      state.errorMessage = payload
    }
    // isLoading(state: any, payload: any) {
    //   state.isLoading = payload
    // },
  },
  actions: {
  },
  modules: {
    auth: auth,
    products: products,
    contact: contact
  }
})
