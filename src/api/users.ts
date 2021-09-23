import axios from "axios";
import { User } from "models/user";

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

export default {
    all: () => instance.get<User[]>("/users")
}