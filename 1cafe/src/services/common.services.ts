import Http from '@/interceptor/http.interceptor';
import store from '@/store';
const url = process.env.VUE_APP_BASE_URL


class CommonService {
    // /**
    //  * 
    //  * @returns products or handling error
    //  */
    // getAllProducts() {
    //     return Http.get(url + 'products.json').then((res: any) => {
    //         return res.data
    //     }).catch((res: any) => {
    //         store.commit('auth/isLoading', false)
    //         if (res.response.status == 404) {
    //             alert('something went wrong please try after sometime')
    //         }
    //         return res.message
    //     })
    // }

    // /**
    //  * 
    //  * @param data 
    //  * @returns 
    //  */
    // async addToCart(data: any) {
    //     const userId = localStorage.getItem('userId')
    //     const cartId = data.id

    //     if (data.id.length > 5) {
    //         return await Http.put(`${url}users/${userId}/cart/${cartId}.json`, data).then((res: any) => {
    //             return res.data
    //         }).catch((res: any) => {
    //             store.commit('auth/isLoading', false)
    //             return res.message
    //         })
    //     } else {
    //         return await Http.post(`${url}users/${userId}/cart.json`, data).then((res) => {
    //             console.log(res);
    //         }).catch((res: any) => {
    //             store.commit('auth/isLoading', false)
    //             return res.message
    //         })
    //     }

    // }






}
const commonService = new CommonService
export default commonService