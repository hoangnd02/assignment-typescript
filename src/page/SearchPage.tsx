import axios from "axios"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { ProductType } from "../types/Product"

type Props = {}

const SearchPage = (props: Props) => {
  const [products, setProducts] = useState<ProductType[]>([])
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q")

  useEffect(() => {
    const getProducts = async () => {
      const {data} = await axios.get(`http://localhost:8000/api/product?q=${q}`)
      setProducts(data)
    }
    getProducts()
  }, [])

  return (
    <div className="flex px-8 bg-[#f1f3f6] py-6">
  <div className="bg-white mt-6 shadow border-[1px] w-1/5 h-[300px] max-w-1xl mx-auto py-2 px-8 lg:max-w-4xl">
    <fieldset>
      <h2 className="text-2xl border-b-[1px] mx-[-16px] px-4 py-4 font-bold text-gray-900">
        Filter
      </h2>
      <div className="my-10 space-y-4">
        ${'{'}categories.data
        .map(
        (category) =&gt; `
        <div className="flex items-center">
          <input id="category" defaultValue="${category.title}" name="category" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
          <label htmlFor="category" className="ml-3 block text-sm font-medium text-gray-700">${'{'}category.title{'}'}</label>
        </div>`,
        )
        .join(""){'}'}
      </div>
    </fieldset>
  </div>
  <div className="bg-white mt-6 shadow border-[1px] w-4/5 max-w-2xl mx-auto py-2 px-4 lg:max-w-7xl">
    <h2 className="text-2xl border-b-[1px] mx-[-16px] px-4 py-4 font-bold text-gray-900">
      Search:  ${'{'}urlParams.get("q"){'}'}
    </h2>
    <div id="product_filter" className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
     {}
    </div>
  </div>
</div>

  )
}

export default SearchPage