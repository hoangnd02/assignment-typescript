import { combineReducers } from '@reduxjs/toolkit'
import productsReducer from "../features/product/productSlice"
import usersReducer from "../features/user/userSlice"
import categoriesReducer from "../features/category/categorySlice"
import cartReducer from "../features/cart/cartSlice"

const rootReducer = combineReducers({
    products: productsReducer,
    user: usersReducer,
    cart: cartReducer,
    category: categoriesReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
