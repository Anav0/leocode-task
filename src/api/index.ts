import users from "api/users";
import axios from "axios";

export const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

export default { users }