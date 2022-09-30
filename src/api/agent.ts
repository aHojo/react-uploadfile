import axios, {AxiosError, AxiosResponse} from "axios"



axios.defaults.baseURL = "https://api.getguru.com/api/v1"
axios.defaults.withCredentials = true

const responseBody = (response: AxiosResponse) => response.data

axios.interceptors.response.use(async response => {
    return response
}, (error: AxiosError) => {
    return
})

const requests = {
    get: (url: string, authHead: {}) => {
        console.log(authHead)
        return axios.get(url, {headers: authHead}).then(responseBody)
    },
    post: (url: string) => axios.post(url).then(responseBody),
    put: (url: string) => axios.put(url).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
}

export const User = {
    getUser: (email: string) => requests.get(`/api/v1/admin/users/${email}`, {}),
    changeUserEmail: (oldEmail: string, newEmail: string) => requests.post("")
}

export const Team = {
    getTeamInfo: (email:string, token: string) => requests.get(`/members`,
        {"Authorization": `Basic ${btoa(`${email}:${token}`)}`})
}