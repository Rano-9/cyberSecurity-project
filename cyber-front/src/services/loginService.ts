import { request } from "./api"
import type { User } from "./types"


function login() {
    return request<User>('/user/')
}
export default login