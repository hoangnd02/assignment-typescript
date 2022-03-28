import { useEffect, useState } from 'react'
import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import './App.css'
import Homepage from './page/Homepage';

import ProductPage from './page/ProductPage';
import AdminLayout from './page/layouts/AdminLayout';
import WebsiteLayout from './page/layouts/WebsiteLayout';
import Dashboard from './page/Dashboard';
import ProductManager from './page/ProductManager';
import { ProductType } from './types/Product';
import ProductAdd from './page/ProductAdd';
import axios from 'axios';
import ProductEdit from './page/ProductEdit';
import PrivateRoute from './page/PrivateRoute';
import Signin from './page/Signin';
import Signup from './page/Signup';
import { isAuthenticate } from './utils/localstorage';

const {token, user} = isAuthenticate()

function App() {
  const  [products, setProducts] = useState<ProductType[]>([])

  useEffect(() => {
    const getProducts = async () => {
      const {data} = await axios.get(
        `https://o1d4ks.sse.codesandbox.io/products`,
      );
      setProducts(data);
    }
    getProducts()
  }, [])

  const onHandleAdd = async (product: ProductType) => {
    await axios.post(
      `http://localhost:8000/api/products/${user._id}`, product, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
      }
    )
    setProducts([...products, product]);
  }

  const onHandleEdit = async (product: ProductType) => {
    const {data} = await axios.put(
      `https://o1d4ks.sse.codesandbox.io/products/${product.id}`, product
    );
    setProducts(products.map(prod => prod.id === data.id ? data : prod));
  }

  const onHandleDelete = async (id: number) => {
    const {data} = await axios.delete(
      `https://o1d4ks.sse.codesandbox.io/products/${id}`
    );
    setProducts(products.filter(product => product.id !== id));
  }

  return (
    <div className="App">
      <main>
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<WebsiteLayout />}>
            <Route index element={<Homepage />} />
            <Route path="product/:id" element={<ProductPage />} />
          </Route>
          <Route path="admin" element={<PrivateRoute><AdminLayout /></PrivateRoute>}>
            <Route index element={<Navigate to="/admin/dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="product" >
              <Route index element={<ProductManager products={products} onDelete={onHandleDelete}/>} />
              <Route path="add" element={<ProductAdd onAdd={onHandleAdd}/>} />
              <Route path="edit/:id" element={<ProductEdit onUpdate={onHandleEdit}/>} />
            </Route>
          </Route>
        </Routes>
      </main>
    </div>
  )
}

export default App
