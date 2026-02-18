import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('auth_token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Addresses', 'Orders'],
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: '/orders/create',
        method: 'POST',
        body: orderData,
      }),
      invalidatesTags: ['Orders'],
    }),
    getUserOrders: builder.query({
      query: () => '/orders/user',
      providesTags: ['Orders'],
    }),
    getOrderById: builder.query({
      query: (orderId) => `/orders/${orderId}`,
      providesTags: (_result, _error, orderId) => [{ type: 'Orders', id: orderId }],
    }),
    getUserAddresses: builder.query({
      query: () => '/orders/addresses',
      providesTags: ['Addresses'],
    }),
    addAddress: builder.mutation({
      query: (addressData) => ({
        url: '/orders/addresses',
        method: 'POST',
        body: addressData,
      }),
      invalidatesTags: ['Addresses'],
    }),
  }),
});

export const { 
  useCreateOrderMutation, 
  useGetUserOrdersQuery,
  useGetOrderByIdQuery,
  useGetUserAddressesQuery, 
  useAddAddressMutation 
} = orderApi;
