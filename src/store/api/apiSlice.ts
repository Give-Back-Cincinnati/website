import { createApi } from '@reduxjs/toolkit/query/react'
import { Services } from 'services'
import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import type { AxiosRequestConfig, AxiosError, AxiosInstance } from 'axios'

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' }
  ): BaseQueryFn<
    {
      url: string
      method: AxiosRequestConfig['method']
      data?: AxiosRequestConfig['data']
      params?: AxiosRequestConfig['params']
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params }) => {
    try {
        const { Axios } = Services
      const result = await (Axios as AxiosInstance)({ url: baseUrl + url, method, data, params })
      return { data: result.data }
    } catch (axiosError) {
      let err = axiosError as AxiosError
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      }
    }
  }

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: axiosBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || '' }),
    endpoints: builder => ({
        googleOauthCallBack: builder.query({
            query: (callbackUrl) => ({ url: callbackUrl, method: 'get' })
        }),
        getMe: builder.query({
            query: () => ({ url: '/users/me', method: 'get' })
        }),
        getEvents: builder.query({
            query: () => ({ url: '/events', method: 'get'})
        })
    })
})

export const {
    useGetMeQuery,
    useGoogleOauthCallBackQuery,
    useGetEventsQuery
} = apiSlice