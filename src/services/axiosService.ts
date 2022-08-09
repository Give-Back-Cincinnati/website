import Axios, { AxiosInstance } from 'axios'

export class AxiosService {

    Axios: AxiosInstance

    constructor () {
        this.Axios = Axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_BASE_URL
        })

        return this
    }

}
