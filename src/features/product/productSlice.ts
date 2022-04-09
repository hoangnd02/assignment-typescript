import axios from 'axios';
import { ProductType } from '../../types/Product';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ProductState {
  value: ProductType[];
  loading: boolean
}

const initialState: ProductState = {
  value: [],
  loading: false,
}

const products = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<ProductType>) {
      const product :ProductType = action.payload
      state.value.push(product);
    },
    editProduct(state, action: PayloadAction<ProductType>) {
      const productEdit = action.payload
      state.value = state.value.map(product => product._id == productEdit._id ? productEdit : product);
    },
    deleteProduct(state, action: PayloadAction<number>) {
      const idProduct = action.payload
      state.value = state.value.filter(product => product._id !== idProduct)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.loading = true
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.value = action.payload
    });
}
})

export const { addProduct, editProduct, deleteProduct } = products.actions
export default products.reducer

export const getProducts = createAsyncThunk(
  "product/getProducts",
  async () => {
    const { data } = await axios.get("http://localhost:8000/api/products");
    return data 
  }
)
