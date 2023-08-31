import { Cart } from '@/component/cart/model/CartModel';
import Http from '@/interceptor/http.interceptor';
import store from '@/store';
const url = process.env.VUE_APP_BASE_URL
const userId = localStorage.getItem('userId')

class ProductService {
    /**
        * 
        * @returns products or handling error
        */
    getAllProducts() {
        return Http.get(url + 'products.json').then((res: any) => {
            const responseData: Cart[] = res.data
            return responseData
        })
    }

    /**
     * 
     * @param data 
     * @returns 
     */
    async addToCart(data: Cart) {

        // const userId = localStorage.getItem('userId')
        const cartId = data.id

        if (data.id.length > 5) {
            return await Http.put(`${url}users/${userId}/cart/${cartId}.json`, data).then((res: any) => {
                return res
            })
        } else {
            return await Http.post(`${url}users/${userId}/cart.json`, data).then((res) => {
                return res
            })
        }
    }
    async getCartData() {
        // const userId = localStorage.getItem('userId')
        return Http.get(`${url}users/${userId}/cart.json`).then((res: any) => {
            const responseData: Cart[] = res.data
            return responseData
        })
    }
    async deleteCartItem(id: number) {
        Http.interceptors.response.use()
        const cartId = id
        return Http.delete(`${url}users/${userId}/cart/${cartId}.json`)
    }
}

const productService = new ProductService
export default productService