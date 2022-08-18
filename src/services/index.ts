import { EnhancedStore } from '@reduxjs/toolkit'
import { AxiosInstance } from 'axios'
import { RootState, Actions } from 'store'

import { AxiosService } from './axiosService'
import { ToasterService } from './toasterService'

export const Services: Record<string, 
    AxiosInstance
    | ToasterService
> = {}

export function createServices (store: EnhancedStore<RootState>, actions: Actions) {
    Services.Axios = new AxiosService().Axios
    Services.Toaster = new ToasterService(store, actions)
}