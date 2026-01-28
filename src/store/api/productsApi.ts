import { baseApi } from './baseApi'

export interface Product {
  id: string
  name: string
  price: number
  image: string
  description: string
  category: string
  inStock: boolean
  rating?: number
}

export interface ProductsResponse {
  products: Product[]
  total: number
  page: number
  limit: number
}

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, { page?: number; limit?: number; category?: string; search?: string }>({
      query: (params = {}) => ({
        url: '/products',
        params: {
          page: 1,
          limit: 12,
          ...params,
        },
      }),
      providesTags: ['Product'],
    }),
    getProduct: builder.query<Product, string>({
      query: (id) => `/products/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Product', id }],
    }),
    getCategories: builder.query<string[], void>({
      query: () => '/products/categories',
      providesTags: ['Product'],
    }),
    addAdminProduct: builder.mutation<any, any>({
      query: (productData) => ({
        url: '/admin/product',
        method: 'POST',
        body: productData,
      }),
      invalidatesTags: ['Product'],
    }),
    getAdminProducts: builder.query<any, void>({
      query: () => '/admin/products',
      providesTags: ['Product'],
    }),
    updateAdminProduct: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/admin/product/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Product'],
    }),
    deleteAdminProduct: builder.mutation<any, string>({
      query: (id) => ({
        url: `/admin/product/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
    }),
  }),
})

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetCategoriesQuery,
  useAddAdminProductMutation,
  useGetAdminProductsQuery,
  useUpdateAdminProductMutation,
  useDeleteAdminProductMutation,
} = productsApi



