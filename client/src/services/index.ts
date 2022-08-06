// TODO: ADD STORE AND STATEINTERFACE
import { AxiosInstance } from 'axios'
import { AxiosService } from './axiosService'

const services: Record<string, AxiosInstance> = {}

export type ServicesInterface = typeof services

export function createServices () {
    services.AxiosService = new AxiosService().Axios
}

export function useServices () {
    return services
}

