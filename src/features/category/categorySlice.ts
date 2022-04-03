import axios from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CategoryType } from '../../types/Category';

interface CategoryState {
  value: CategoryType[];
  loading: boolean
}

const initialState: CategoryState = {
  value: [],
  loading: false,
}

const category = createSlice({
  name: 'category',
  initialState,
  reducers: {
    addCategory(state, action: PayloadAction<CategoryType>) {
      const category :CategoryType = action.payload
      state.value.push(category);
    },
    editCategory(state, action: PayloadAction<CategoryType>) {
      const categoryEdit :CategoryType = action.payload
      console.log(categoryEdit.category)
      state.value = state.value.map(category => category._id == categoryEdit._id ? categoryEdit : category);
    },
    deleteCategory(state, action: PayloadAction<any>) {
      const id = action.payload
      state.value = state.value.filter(category => category._id !== id)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.loading = true
    });
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.value = action.payload
    });
}
})

export const { addCategory, editCategory, deleteCategory } = category.actions
export default category.reducer

export const getCategories = createAsyncThunk(
  "category/getCategories",
  async () => {
    const { data } = await axios.get("http://localhost:8000/api/categories");
    return data 
  }
)
