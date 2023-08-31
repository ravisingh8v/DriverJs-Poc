// importing auth stores 
import getters from "./getters"
import mutations from "./mutations"
import actions from "./actions"
export default ({
    namespaced: true,
    state() {
        return {
            userId: null,
            isLoading: false,
            isAuthenticated: false,
            activeUser: null,
            showGuardAlert: false,
            token: null,

        }
    },
    getters,
    mutations,
    actions
})