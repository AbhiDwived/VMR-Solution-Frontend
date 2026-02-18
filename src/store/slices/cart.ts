import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { cartApi } from '../api/cartApi'

interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  variant?: string
}

interface CartState {
  items: CartItem[]
  total: number
  itemCount: number
  isOpen: boolean
}

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
  isOpen: false
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id)
      if (existingItem) {
        existingItem.quantity += action.payload.quantity
      } else {
        state.items.push(action.payload)
      }
      cartSlice.caseReducers.calculateTotals(state)
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload)
      cartSlice.caseReducers.calculateTotals(state)
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id)
      if (item) {
        item.quantity = action.payload.quantity
      }
      cartSlice.caseReducers.calculateTotals(state)
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen
    },
    calculateTotals: (state) => {
      state.itemCount = state.items.reduce((total, item) => total + item.quantity, 0)
      state.total = state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
    },
    syncCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload
      cartSlice.caseReducers.calculateTotals(state)
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      cartApi.endpoints.getCart.matchFulfilled,
      (state, { payload }) => {
        if (payload.success && payload.data) {
          state.items = payload.data.map((item: any) => ({
            id: item.id.toString(),
            name: item.name,
            price: item.discount_price || item.price,
            image: JSON.parse(item.product_images || '[]')[0] || '',
            quantity: item.quantity,
            variant: item.variant_id,
          }))
          cartSlice.caseReducers.calculateTotals(state)
        }
      }
    )
  },
})

export const { addItem, removeItem, updateQuantity, toggleCart, syncCart } = cartSlice.actions
export default cartSlice.reducer



