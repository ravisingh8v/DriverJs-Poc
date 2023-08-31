import Http from "@/interceptor/http.interceptor";
import store from "@/store";
import { contactForm } from "../model/ContactModel";
const url = process.env.VUE_APP_BASE_URL;

class ContactService {
    async sendingUserMessage(userData: contactForm) {
        const userId = localStorage.getItem('userId') || 'Not a logged in User';
        return Http.post(`${url}contact-us.json`, { userId: userId, firstName: userData.firstName, lastName: userData.lastName, email: userData.email, message: userData.message, time: userData.time, day: userData.day })
    }
}
const contactService = new ContactService;
export default contactService;