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
      providesTags: (result, error, id) => [{ type: 'Product', id }],
    }),
    getCategories: builder.query<string[], void>({
      query: () => '/products/categories',
      providesTags: ['Product'],
    }),
  }),
})

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetCategoriesQuery,
} = productsApi
