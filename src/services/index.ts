import { AxiosInstance } from 'axios'
import { AxiosService } from './axiosService'
import { ToasterService } from './toasterService'

export class Services {
    
    services: {
        Axios: AxiosInstance,
        Toaster: ToasterService
    }

    constructor () {
        this.services = {
            Axios: new AxiosService().Axios,
            Toaster: new ToasterService()
        }
        return this
    }

}

export const ServiceSingleton = new Services()

export function useServices () {
    return ServiceSingleton.services
}
