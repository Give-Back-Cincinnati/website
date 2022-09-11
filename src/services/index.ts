import { EnhancedStore } from '@reduxjs/toolkit'
import { AxiosInstance } from 'axios'
import { RootState, Actions } from 'store'

import { AxiosService } from './axiosService'
import { ToasterService } from './toasterService'
import { AutocompleteService } from './autocompleteService'

export type IServices<T> = 
    T extends "Axios" ? AxiosInstance :
    T extends "Toaster" ? ToasterService :
    T extends "Autocomplete" ? AutocompleteService:
    never;

export const Services: Record<string, unknown> = {}

export function createServices (store: EnhancedStore<RootState>, actions: Actions) {
    Services.Axios = new AxiosService().Axios
    Services.Toaster = new ToasterService(store, actions)
    Services.Autocomplete = new AutocompleteService()
}