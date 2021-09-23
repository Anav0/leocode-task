import { instance } from "api"
import { User } from "models/user";

export default {
    all: () => instance.get<User[]>("/users")
}