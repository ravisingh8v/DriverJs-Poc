import axios from "axios"

export default {
    // async sendingUserMessage(context: any, payload: any) {
    //     context.rootState.auth.isLoading = true

    //     // console.log(context.rootState);

    //     const userId = localStorage.getItem('userId') || 'Not a logged in User'
    //     // const activeUser = context.rootGetters['auth/activeUser']
    //     // eslint-disable-next-line
    //     await axios.post(`${process.env.VUE_APP_BASE_URL}contact-us.json`, { userId: userId, firstName: payload.firstName, lastName: payload.lastName, email: payload.email, message: payload.message, time: payload.time, day: payload.day }).then((res) => {
    //         // console.log(res);

    //         context.rootState.auth.isLoading = false
    //     }).catch((error) => {
    //         context.rootState.auth.isLoading = false
    //         throw error.message
    //     })
    // }
}