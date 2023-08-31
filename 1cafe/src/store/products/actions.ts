import axios from "axios"

export default {
    /**
     * 
     * @param context 
     * @param response 
     */
    getAllProducts(context: any, response: any) {
        const responseData = [];
        for (const key in response) {
            const data = {
                id: key,
                imageUrl: response[key].imageUrl,
                title: response[key].title,
                description: response[key].description,
                price: response[key].price,
                category: response[key].category
            }
            responseData.push(data)
        }
        context.commit('getAllProducts', responseData)
    },


    /**
    * get Cart Data
    * @param context 
    */
    getCartData(context: any, cartData: any) {
        const responseData = [];
        for (const key in cartData) {
            const responses = cartData[key]
            const data = {
                id: key,
                productId: responses.id,
                category: responses.category,
                description: responses.description,
                imageUrl: responses.imageUrl,
                price: responses.price,
                quantity: responses.quantity,
                title: responses.title,
                totalPrice: responses.totalPrice
            }
            responseData.push(data)
        }
        context.commit('getCartData', responseData)
    },



    // previous approach 
    // getAllProducts(context: any) {
    //     // context.commit('isLoading', true)

    //     axios.get(`${process.env.VUE_APP_BASE_URL}products.json`).then((response) => {
    //         const responseData = [];
    //         for (const key in response.data) {
    //             const data = {
    //                 id: key,
    //                 imageUrl: response.data[key].imageUrl,
    //                 title: response.data[key].title,
    //                 description: response.data[key].description,
    //                 price: response.data[key].price,
    //                 category: response.data[key].category
    //             }
    //             responseData.push(data)
    //         }
    //         // context.commit('isLoading', false)
    //         context.commit('getAllProducts', responseData)
    //     }).catch((response) => {
    //         // context.commit('isLoading', false)
    //         const error = response
    //         throw error
    //     })
    // },



    // --- Previous Approach ---
    /**
     * 
     * @param context 
     * @param payload 
     */

    // async addToCart(context: any, payload: any) {
    //     context.commit('isLoading', true)
    //     const userId = localStorage.getItem('userId')
    //     // id is greater than 5 means its firebase auto generated id 
    //     if (payload.id.length > 5) {
    //         const cartId = payload.id
    //         // eslint-disable-next-line
    //         axios.put(`${process.env.VUE_APP_BASE_URL}users/${userId}/cart/${cartId}.json`, { ...payload }).then((response) => {
    //             context.commit('isLoading', false)
    //             context.dispatch('getCartData')
    //         }).catch(() => {
    //             context.commit('isLoading', false)
    //         })
    //         // if its manual generated id
    //     } else {
    //         // eslint-disable-next-line
    //         axios.post(`${process.env.VUE_APP_BASE_URL}users/${userId}/cart.json`, { ...payload }).then((response) => {
    //             context.commit('isLoading', false)
    //             context.dispatch('getCartData')
    //         }).catch(() => {
    //             context.commit('isLoading', false)
    //         })
    //     }
    //     // console.log(userId);
    //     // console.log(context);


    // },



    //--- previous approach --- 
    // /**
    //  * get Cart Data
    //  * @param context 
    //  */
    // getCartData(context: any) {
    //     const userId = localStorage.getItem('userId')
    //     // context.commit('isLoading', true)
    //     axios.get(`${process.env.VUE_APP_BASE_URL}users/${userId}/cart.json`).then((response: any) => {
    //         const responseData = [];
    //         for (const key in response.data) {
    //             const responses = response.data[key]
    //             const data = {
    //                 id: key,
    //                 category: responses.category,
    //                 description: responses.description,
    //                 imageUrl: responses.imageUrl,
    //                 price: responses.price,
    //                 quantity: responses.quantity,
    //                 title: responses.title,
    //                 totalPrice: responses.totalPrice
    //             }
    //             responseData.push(data)
    //         }
    //         console.log("check3", responseData);

    //         context.commit('getCartData', responseData)
    //         // context.commit('isLoading', false)
    //     }).catch(() => {

    //         context.commit('isLoading', false)
    //     })
    // },

    //--- previous approach ---
    // /**
    //  * 
    //  * @param context 
    //  * @param payload 
    //  */
    // async deleteCartItem(_: any, payload: any) {
    //     const userId = localStorage.getItem('userId')
    //     const cartItemId = payload;
    //     // eslint-disable-next-line
    //     await axios.delete(`${process.env.VUE_APP_BASE_URL}users/${userId}/cart/${cartItemId}.json`).then((response) => {
    //     })
    // }
}