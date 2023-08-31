import store from "@/store";
import axios from "axios";
import { ref } from "vue";

const Http = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL
})

Http.interceptors.request.use((config: any) => {
    // console.log(config);
    if (config.method != 'delete') {
        store.commit('auth/isLoading', true)
    }

    return config
})
Http.interceptors.response.use((response: any) => {
    setTimeout(() => {
        store.commit('auth/isLoading', false)
    }, 500)
    return response
}, async (error) => {
    store.commit('auth/isLoading', false)

    const response = error.response.status;

    const errorMessage = ref('');
    switch (response) {
        case 400:
            errorMessage.value = 'Invalid input'
            break;
        case 401:
            errorMessage.value = 'Unauthorized access'
            break;
        case 404:
            errorMessage.value = "Data not found"
            break;
        default:
            break;
    }
    store.commit('errorMessage', errorMessage)
    return error.response
})

export default Http