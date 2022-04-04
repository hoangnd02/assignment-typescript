import axios from 'axios'
import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { RootState } from '../app/rootReducer'
import ProductCartItem from '../components/ProductCartItem'

type Props = {}

const CartPage = (props: Props) => {
  const { register, handleSubmit, formState: {errors} } = useForm<any>()
  const products = useSelector((state: RootState) => state.cart.value)
  const navigate = useNavigate();
  const [ count, setCount ] = useState<number>(1)

  const onSubmit: SubmitHandler<any> = async (dataInput) => {
    try {
      
    } catch (error) {
      console.log(error)        
    }
  } 

  const total = products.reduce(
    (previousValue, currentValue) => previousValue + currentValue.product.price * currentValue.quantity
  , 0)

  console.log(products);
  return (
    <div className="container mx-auto mt-10">
    <div className="flex my-10">
      <div className="w-3/5 bg-white px-10 py-10">
        <div className="flex justify-between border-b pb-8">
          <h1 className="text-gray-80 font-semibold text-2xl">Shopping Cart</h1>
        </div>
        <div className="flex mt-10 mb-5">
          <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
          <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Quantity</h3>
          <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Price</h3>
          <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Total</h3>
        </div>
        <div className="list-products">
          {products.map((product) => 
            <ProductCartItem product={product}/>
          )}       
        </div>
        <a href="#" className="flex font-semibold text-indigo-600 text-base mt-10">
          Continue Shopping
        </a>
      </div>
      <div className="w-2/5 px-8 py-10 bg-gray-50">
        <h1 className="text-gray-80 font-semibold text-2xl border-b pb-8">Order Summary</h1>
        <form onSubmit={handleSubmit(onSubmit)}> 
          <div className="px-4 py-4 bg-white space-y-6 sm:p-6">
            <div className="grid grid-cols-3 gap-6">
                <div className="col-span-3 sm:col-span-3">
                <label className="block text-sm font-medium text-gray-700">Full name</label>
                <input type="text" {...register("name")} placeholder="" className="py-2 px-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" />
                </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
                <div className="col-span-3 sm:col-span-3">
                <label className="block text-sm font-medium text-gray-700">Number phone</label>
                <input type="text" {...register("phone")} placeholder="" className="py-2 px-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" />
                </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
                <div className="col-span-3 sm:col-span-3">
                <label className="block text-sm font-medium text-gray-700">City</label>
                <input type="text" {...register("city")} placeholder="" className="py-2 px-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" />
                </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
                <div className="col-span-3 sm:col-span-3">
                <label className="block text-sm font-medium text-gray-700">District</label>
                <input type="text" {...register("district")} placeholder="" className="py-2 px-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" />
                </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
                <div className="col-span-3 sm:col-span-3">
                <label className="block text-sm font-medium text-gray-700">Detail address</label>
                <input type="text" {...register("address")} placeholder="" className="py-2 px-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" />
                </div>
            </div>
            <div>
              <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Submit
              </button>
            </div>
          </div>
        </form>
        <div className="mt-8">
          <div className="flex font-semibold justify-between py-6 text-sm uppercase">
            <span>Total cost</span>
            <span>{total}</span>
          </div>
          {/* $Button.print("Check out") */}
        </div>
      </div>
    </div>
  </div>)
}

export default CartPage