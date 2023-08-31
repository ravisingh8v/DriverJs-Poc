import getters from "./getters"
import mutations from "./mutations"
import actions from "./actions"

// importing product store 
export default ({
    namespaced: true,
    state() {
        return {
            allProducts: null,
            // isLoading: false,
            productDetails: '',
            cartData: null
        }
    },
    getters,
    mutations,
    actions,

})