import axios from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProductType } from '../../types/Product';
import { isAuthenticate } from '../../utils/localstorage';

interface CartState {
  value: any[];
  loading: boolean
}

const initialState: CartState = {
  value: [],
  loading: false,
}

const cart = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCart(state, action: PayloadAction<any>) {
      const productAdd :any = action.payload
      // console.log(productAdd)
      let checkProduct = false
      state.value.map(product => {
        if(product.product._id == productAdd.product._id) {
          product.quantity = productAdd.quantity
          checkProduct = true
          // console.log(true);
        } 
      });
      if(!checkProduct) {
        state.value.push(productAdd)
      }
    },
    deleteCart(state, action: PayloadAction<any>) {
      const idProduct :any = action.payload
      state.value = state.value.filter(product => product.product._id != idProduct);
    },
    setDefaultValueCartStore(state) {
      state.value = []
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getCart.pending, (state) => {
      state.loading = true
    });
    builder.addCase(getCart.fulfilled, (state, action) => {
      state.loading = false;
      state.value = action.payload
    });
  }
})

export const { addCart, deleteCart, setDefaultValueCartStore } = cart.actions
export default cart.reducer

export const getCart = createAsyncThunk(
  "cart/getCart",
  async () => {
    const {token, user} = isAuthenticate()
    const { data } = await axios.get(`http://localhost:8000/api/cart/${user._id}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    return data 
  }
)

