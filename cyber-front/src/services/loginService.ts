import { request } from "./api"
import type { User, UserSettings } from "./types"


function login(username:string,password:string) {
    return request<User>('/user/')
}
