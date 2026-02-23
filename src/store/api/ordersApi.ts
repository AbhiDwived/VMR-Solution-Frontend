import { baseApi } from './baseApi'

export interface Order {
  id: string
  userId: string
  items: Array<{
    id: string
    name: string
    price: number
    quantity: number
    image: string
  }>
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  createdAt: string
  updatedAt: string
}

export const ordersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: () => '/admin/orders',
      providesTags: ['Order'],
    }),
    getOrderById: builder.query({
      query: (id) => `/admin/order/${id}`,
      providesTags: (result, error, id) => [{ type: 'Order', id }],
    }),
    updateOrderStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/admin/order/${id}/status`,
        method: 'PUT',
        body: { status },
      }),
      invalidatesTags: ['Order'],
    }),
    getOrders: builder.query<Order[], void>({
      query: () => '/orders',
      providesTags: ['Order'],
    }),
    getOrder: builder.query<Order, string>({
      query: (id) => `/orders/${id}`,
      providesTags: (result, error, id) => [{ type: 'Order', id }],
    }),
    createOrder: builder.mutation<Order, Partial<Order>>({
      query: (order) => ({
        url: '/orders',
        method: 'POST',
        body: order,
      }),
      invalidatesTags: ['Order'],
    }),
  }),
})

export const {
  useGetAllOrdersQuery,
  useGetOrderByIdQuery,
  useUpdateOrderStatusMutation,
  useGetOrdersQuery,
  useGetOrderQuery,
  useCreateOrderMutation,
} = ordersApi



