import { useEffect, useState } from 'react'
import axios from 'axios'
import { ProductType } from '../types/Product'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../app/rootReducer';
import ListProduct from '../components/ListProduct';

type Props = {
  products: ProductType[]
}

const Homepage = (props: Props) => {
  // const products: ProductType[] = useSelector((state: RootState) => state.products.value)
  const [product, setProduct] = useState<ProductType[]>([])
  const [newProduct, setNewProduct] = useState<ProductType[]>([])

  useEffect(() => {
    const getNewProduct = async () => {
      const {data} = await axios.get(`http://localhost:8000/api/products?limit=4`)
      setNewProduct(data)
    }
    getNewProduct()
    const getProductPage1 = async () => {
      const {data} = await axios.get(`http://localhost:8000/api/products?page=1`)
      setProduct(data)
      console.log(product);
    }
    getProductPage1()
  }, [])

  //call api next page
  const getNextPage = async (pageNumber: number) => {
    const {data} = await axios.get(`http://localhost:8000/api/products?page=${pageNumber}`) 
    setProduct(data)
  }

  return (
    <div className="bg-[#f1f3f6] py-6">
      <div className="banner max-w-7xl mx-auto">
        <Swiper slidesPerView={1}>
          <SwiperSlide>
            <img className="w-full" src="https://au2-images.shop.samsung.com/medias/2000x600.jpg?context=bWFzdGVyfGltYWdlc3w2MTcyNjF8aW1hZ2UvanBlZ3xoMDYvaDlmLzEyMDg1NjY0MzgzMDA2LzIwMDB4NjAwLmpwZ3wxYjlkNTNhODMzNWU2MGJmYzQ2NTZmZDMwZWY1ZWRlMmUyYzMzOWRjNDM4NDU0MTI2MGI2ZDUyZDExY2YwMjA5"/>
          </SwiperSlide>
          <SwiperSlide>
            <img className="w-full" src="https://au2-images.shop.samsung.com/medias/2000x600.jpg?context=bWFzdGVyfGltYWdlc3w3ODIxNzJ8aW1hZ2UvanBlZ3xoODgvaDNhLzEyMTI4NTYxMjMzOTUwLzIwMDB4NjAwLmpwZ3w0OWE1ZWM4ZDcyMTFiYTEwYjI5ODE4OTcwYjUyNDAxYzAxMDAzZTQyYjUyOTU3MGVlNzZkOTNjOTA1MWQ2OWEy"/>
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="bg-white mt-6 shadow border-[1px] max-w-2xl mx-auto py-2 px-4 lg:max-w-7xl">
        <h2 className="title text-2xl border-b-[1px] mx-[-16px] px-4 py-4 font-bold text-gray-900">
          New products
        </h2>
        <ListProduct products={newProduct} />
      </div>
      <div className="bg-white mt-6 shadow border-[1px] max-w-2xl mx-auto py-2 px-4 lg:max-w-7xl">
        <h2 className="text-2xl border-b-[1px] mx-[-16px] px-4 py-4 font-bold text-gray-900">
          All product
        </h2>
        <ListProduct products={product} />
        <div className="grid mt-2 px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 sm:grid-cols-9 dark:text-gray-400">
          <span className="flex items-center col-span-3">
            Showing 1-2 of 2
          </span>
          <span className="col-span-2"></span>
          {/* <!-- Pagination --> */}
          <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
            <nav aria-label="Table navigation">
              <ul className="inline-flex items-center">
                <li>
                  <button className="px-3 py-1 w-[50px] rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple">
                    <svg aria-hidden="true" className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"></path>
                    </svg>
                  </button>
                </li>
                <li>
                  <button onClick={() => getNextPage(1)} className="px-3 py-1 w-[50px] hover:bg-gray-200 rounded-md focus:outline-none focus:shadow-outline-purple">1</button>
                </li>
                <li>
                  <button onClick={() => getNextPage(2)} className="px-3 py-1 w-[50px] hover:bg-gray-200 rounded-md focus:outline-none focus:shadow-outline-purple">2</button>
                </li>
                <li>
                  <button className="px-3 py-1 w-[50px] rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple">
                    <svg className="w-4 h-4 fill-current" aria-hidden="true" viewBox="0 0 20 20">
                      <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"></path>
                    </svg>
                  </button>
                </li>
              </ul>
            </nav>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Homepage