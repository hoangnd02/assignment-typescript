import axios from 'axios';
import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import Homepage from './page/Homepage';
import ProductPage from './page/ProductPage';
import AdminLayout from './page/layouts/AdminLayout';
import WebsiteLayout from './page/layouts/WebsiteLayout';
import { ProductType } from './types/Product';
import ProductAdd from './page/admin/product/ProductAdd';
import ProductEdit from './page/admin/product/ProductEdit';
import PrivateRoute from './page/PrivateRoute';
import Signin from './page/Signin';
import Signup from './page/Signup';
import { isAuthenticate } from './utils/localstorage';
import CartPage from './page/CartPage';
import ProductManager from './page/admin/product/ProductManager';
import CategoryManager from './page/admin/category/CategoryManager';
import { getProducts } from './features/product/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './app/rootReducer';
import { getCategories } from './features/category/categorySlice';
import CategoryEdit from './page/admin/category/CategoryEdit';
import CategoryAdd from './page/admin/category/CategoryAdd';
import { getCart } from './features/cart/cartSlice';
import SearchPage from './page/SearchPage';
import Dashboard from './page/admin';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function App() {
  const productsApi = useSelector((state: RootState) => state.products.value)
  const [ products, setProducts ] = useState<ProductType[]>(productsApi)
  const dispatch = useDispatch()

  console.log("hoang")

  useEffect(() => {
    dispatch(getProducts())
    dispatch(getCategories())
    dispatch(getCart())
  }, [])
  
  const onHandleAdd = async (product: ProductType) => {
    try {
      if(localStorage.getItem('user')) {
        const {token, user} = isAuthenticate()
        await axios.post(
          `http://localhost:8000/api/products/${user._id}`, product, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
          }
        )
        setProducts([...products, product]);
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="App">
      <ToastContainer />
      <main>
        <Routes>
          <Route path="/" element={<WebsiteLayout />}>
            <Route path="signin" element={<Signin />} />
            <Route path="signup" element={<Signup />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route index element={<Homepage products={products} />} />
            <Route path="product/:id" element={<ProductPage />} />
          </Route>
          <Route path="admin" element={<PrivateRoute><AdminLayout /></PrivateRoute>}>
            <Route index element={<Navigate to="/admin/dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="category">
              <Route index element={<CategoryManager/>} />
              <Route path="add" element={<CategoryAdd />} />
              <Route path="edit/:id" element={<CategoryEdit />} />
            </Route>
            <Route path="product">
              <Route index element={<ProductManager products={products}/>} />
              <Route path="add" element={<ProductAdd onAdd={onHandleAdd}/>} />
              <Route path="edit/:id" element={<ProductEdit/>} />
            </Route>
          </Route>
        </Routes>
      </main>
    </div>
  )
}

export default App
