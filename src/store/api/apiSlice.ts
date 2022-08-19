import { store, actions } from 'store'
import { createApi } from '@reduxjs/toolkit/query/react'
import { Services } from 'services'
import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import type { AxiosRequestConfig, AxiosError, AxiosInstance } from 'axios'
import { ToasterService } from 'services/toasterService'

const axiosBaseQuery =
    (
        { baseUrl }: { baseUrl: string } = { baseUrl: '' }
    ): BaseQueryFn<
        {
            url: string
            method?: AxiosRequestConfig['method']
            body?: AxiosRequestConfig['data']
            params?: AxiosRequestConfig['params']
        },
        unknown,
        unknown
    > =>
        async ({ url, method = 'get', body: data, params }) => {
            try {
                const { Axios } = Services
                const response = await (Axios as AxiosInstance)({ url: baseUrl + url, method, data, params })

                return { data: response.data }
            } catch (axiosError) {
                let err = axiosError as AxiosError
                const error = {
                    error: {
                        status: err.response?.status,
                        data: err.response?.data || err.message,
                        message: err.response?.statusText || err.message
                    },
                }

                if (!url.includes('/users/me')) { // don't show users the response for themselves, it will confuse them
                    const { Toaster } = Services;
                    (Toaster as ToasterService).notify({ key: Math.random().toString(), title: error.error.message || '', intent: 'negative' })
                }

                return error
            }
        }

export const apiSlice = createApi({
    baseQuery: axiosBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || '' }),
    endpoints: () => ({}),
})