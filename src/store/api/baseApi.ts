import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { RootState } from '../store'

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4028/api',
    prepareHeaders: (headers, { getState }) => {
      // Try to get token from Redux state first
      let token = (getState() as RootState).auth?.token
      
      // If no token in state, try localStorage
      if (!token && typeof window !== 'undefined') {
        token = localStorage.getItem('auth_token')
      }
      
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      headers.set('content-type', 'application/json')
      return headers
    },
  }),
  tagTypes: ['Product', 'Cart', 'Order', 'User'],
  endpoints: () => ({}),
})

export const { middleware: apiMiddleware } = baseApi



