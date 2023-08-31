import { user } from "@/views/auth/model/ModelRegistration"
import axios from "axios"

export default {

    /**
     * login
     */
    async userLogin(context: any, userData: any) {
        const responseData = userData
        const user = {
            userId: responseData.localId,
            email: responseData.email,
            tokenId: responseData.idToken,
            expirationTime: responseData.expiresIn
        }
        localStorage.setItem('userId', user.userId)
        localStorage.setItem('token', user.tokenId)
        localStorage.setItem('expirationTime', user.expirationTime)

        const authenticate = () => {
            if (localStorage.getItem('token')?.length && localStorage.getItem('token')) {
                return true
            } else {
                return false
            }
        }
        context.commit('setAuthentication', authenticate)
        context.commit('setUserId', user.userId)
        context.commit('isLoading', false)
    },

    // Check Authentication 
    isAuth(context: any) {
        const token = localStorage.getItem('token')
        if (token) {
            context.commit('setAuthentication', true)
        } else {
            context.commit('setAuthentication', false)
        }
    },
    // logout 
    logout(context: any) {
        localStorage.clear()
        // localStorage.removeItem('token')
        // localStorage.removeItem('userId')
        context.commit('setUser', '')
        context.commit('setAuthentication', false)
    }


    // --- Previous Approach ---  
    // /**
    //  * register user into database 
    //  * @param context 
    //  * @param payload 
    //  */
    // async registration(context: any, payload: user) {
    //     context.commit('isLoading', true)
    //     const userId = context.getters.userId || localStorage.getItem('userId');
    //     try {
    //         // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //         await axios.patch(`https://cafe-410be-default-rtdb.firebaseio.com/users/${userId}.json`, payload).then((res) => {
    //             // console.log(res);
    //         })
    //         context.commit('isLoading', false)
    //         // }
    //     } catch (error) {
    //         context.commit('isLoading', false)
    //     }

    // },


    // /**
    //  * Sign Up 
    //  * @param context 
    //  * @param payload 
    // */
    // async signUpWithEmailPassword(context: any, payload: user) {
    //     context.commit('isLoading', true)
    //     try {
    //         process.env.VUE_APP_BASE_URL
    //         const response = await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAyHUgf2WKTaBYttSOTf-mifdTj7qRCg8E", { email: payload.email, password: payload.password, returnSecureToken: true })
    //         const responseData = await response.data
    //         context.commit('isLoading', false)
    //         context.commit('setUserId', responseData.localId)

    //     } catch (error: any) {
    //         context.commit('isLoading', false)
    //         const msg = error.response.data.error.message.toLowerCase()
    //         let errors = '';
    //         if (msg == 'email_exists') {
    //             errors = 'Email already exist try login'
    //             // throw errors
    //         } else {
    //             errors = "Something went wrong please try after sometimes"
    //             // throw errors
    //         }
    //         throw errors
    //     }

    // },


    // /**
    //  * login
    //  */
    // async userLogin(context: any, payload: user) {
    //     // context.commit('isLoading', true)
    //     try {
    //         const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAyHUgf2WKTaBYttSOTf-mifdTj7qRCg8E', { email: payload.email, password: payload.password, returnSecureToken: true })
    //         const responseData = await response.data
    //         const user = await {
    //             userId: responseData.localId,
    //             email: responseData.email,
    //             tokenId: responseData.idToken,
    //             expirationTime: responseData.expiresIn
    //         }
    //         localStorage.setItem('userId', user.userId)
    //         localStorage.setItem('token', user.tokenId)
    //         localStorage.setItem('expirationTime', user.expirationTime)

    //         const authenticate = () => {
    //             if (localStorage.getItem('token')?.length && localStorage.getItem('token')) {
    //                 return true
    //             } else {
    //                 return false
    //             }
    //         }
    //         context.commit('setAuthentication', authenticate)
    //         context.commit('setUserId', user.userId)
    //         context.commit('isLoading', false)

    //     }
    //     catch (responseData: any) {
    //         context.commit('isLoading', false)
    //         const error = 'something went wrong please try again later'
    //         throw error
    //     }
    // },

    // 
    /**
     *  getting current user
     * @param context set user in activeUser state by committing to setUser Mutations
     */
    // async getUserData(context: any) {
    // const userId = localStorage.getItem('userId')
    // try {
    //     await axios.get(`https://cafe-410be-default-rtdb.firebaseio.com/users/${userId}.json`)
    //         .then((response) => {
    // const responseData = response.data
    // context.commit('setUser', responseData)

    // })
    // } catch (responseData: any) {
    // const error = responseData
    // throw error
    // }
    // },


}