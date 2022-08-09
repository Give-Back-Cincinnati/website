import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

export class AxiosService {

    Axios: AxiosInstance

    constructor () {
        this.Axios = Axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
            headers: {
                'Content-Type': 'application/json'
            }
        })

        this.Axios.interceptors.request.use((config: AxiosRequestConfig) => {
            // Exclude these urls from sending credentials, BUT send credentials with every other request
            const excludedUrls: Record<string, boolean> = {
                "/auth/login": true
            }
            if (config.url && excludedUrls[config.url]) {
                return config
            }

            config.withCredentials = true

            return config
        })

        return this
    }

}
