import Axios, { AxiosInstance } from 'axios'

export class AxiosService {

    Axios: AxiosInstance

    constructor () {
        this.Axios = Axios.create({
            // baseURL: 'http://localhost:3005'
            baseURL: process.env.REACT_APP_API_BASEURL
        })

        return this
    }

}
