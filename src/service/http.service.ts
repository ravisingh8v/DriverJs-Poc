import http from "axios";

const url = process.env.VUE_APP_BASE_URL;
// const requireObject = {
//     overlayColor: "rgb(0, 0, 0)",
//     allowClose: true,
//     animate: true,
//     showProgress: false,
// }
class Configuration {
    async setConfig(data: any) {
        return await http.put(url + '/1', { ...data })
    }
    async getConfig() {
        return await http.get(url + '/1').then((res) => {
            return res.data

        })

    }
}

// "overlayColor": "rgb(0, 0, 0)",
//       "allowClose": true,
//       "animate": true,
//       "showProgress": false,
const ConfigurationService = new Configuration()
export default ConfigurationService;