import axios from "axios"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { Link, useSearchParams } from "react-router-dom"
import { RootState } from "../app/rootReducer"
import ListProduct from "../components/ListProduct"
import { CategoryType } from "../types/Category"
import { ProductType } from "../types/Product"

type Props = {}

const SearchPage = (props: Props) => {
  const [products, setProducts] = useState<ProductType[]>([])
  const categoryStore = useSelector((state: RootState) => state.category.value)
  const productStore = useSelector((state: RootState) => state.products.value)
  const [categories, setCategories] = useState<CategoryType[]>(categoryStore)

  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q")

  useEffect(() => {
    const getProducts = async () => {
      const {data} = await axios.get(`http://localhost:8000/api/product?q=${q}`)
      setProducts(data)
    }
    getProducts()
  }, [q])

  useEffect(() => {
    const getCategories = async () => {
      const {data} = await axios.get(`http://localhost:8000/api/categories`)
      setCategories(data)
    }
    getCategories()
  }, [])

  const selectCategory = async (categoryId: string) => {
    const {data} = await axios.get(`http://localhost:8000/api/category/${categoryId}`)
    console.log(data)
    setProducts(data.products)
  }

  return (
    <div className="flex px-8 bg-[#f1f3f6] py-6">
      <div className="bg-white mt-6 shadow border-[1px] w-1/5 h-[400px] max-w-1xl mx-auto py-2 px-8 lg:max-w-4xl">
        <fieldset>
          <h2 className="text-2xl border-b-[1px] mx-[-16px] px-4 py-4 font-bold text-gray-900">
            Filter
          </h2>
          <div className="my-10 space-y-4">
            <div className="flex items-center">
              <input onClick={() => setProducts(productStore)} id="category" name="category" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
              <label htmlFor="category" className="ml-3 block text-sm font-medium text-gray-700">All</label>
            </div>
            {
              categories.map((category) => 
                <div className="flex items-center">
                  <input onClick={() => selectCategory(category._id)} id="category" name="category" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="category" className="ml-3 block text-sm font-medium text-gray-700">{category.category}</label>
                </div>
              )
            }
          </div>
        </fieldset>
      </div>
      <div className="bg-white mt-6 shadow border-[1px] w-4/5 max-w-2xl mx-auto py-2 px-4 lg:max-w-7xl">
        <h2 className="text-2xl border-b-[1px] mx-[-16px] px-4 py-4 font-bold text-gray-900">
          Search: {q}
        </h2>
        <div id="product_filter" className="mt-6">
        <div className="list-products mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {products
            .map((product: ProductType, index) =>
              <div key={index} className="group relative z-10">
                <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                  <img src={product.image} alt="Front of men&#039;s Basic Tee in black." className="w-full h-full object-center object-cover lg:w-full lg:h-full"/>
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <Link to={`/product/${product._id}`}>
                        <span aria-hidden="true" className="absolute inset-0"></span>
                        {product.name}
                      </Link>
                    </h3>
                    <p className="text-sm my-2 font-medium text-gray-900">${product.price}</p>
                    <p className="mt-1 text-sm text-gray-500">{product.desc}</p>
                  </div>
                </div>
              </div>
          )}
        </div>
        </div>
      </div>
    </div>
  )
}

export default SearchPage