export default ({
    isLoading(state: any) {
        return state.isLoading
    },
    userId(state: any) {
        return state.userId
    },
    isAuthenticated(state: any) {
        return state.isAuthenticated
    },
    activeUser(state: any) {
        return state.activeUser
    },
    showGuardAlert(state: any) {
        return state.showGuardAlert
    },

    token(state: any) {
        return state.token
    }
})