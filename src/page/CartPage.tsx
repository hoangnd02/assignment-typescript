import axios from 'axios'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { RootState } from '../app/rootReducer'
import { authenticated } from '../utils/localstorage'


type Props = {}

const CartPage = (props: Props) => {
  const { register, handleSubmit, formState: {errors} } = useForm<any>()
  const products = useSelector((state: RootState) => state.cart.value)
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<any> = async (dataInput) => {
    try {
      
    } catch (error) {
      console.log(error)        
    }
  } 
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
          <div>
            <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
              <div className="flex w-2/5">
                <div className="w-24">
                  <img src={product.product.image}/>
                </div>
                <div className="flex flex-col justify-center ml-4 flex-grow">
                  <span className="text-gray-600 font-bold text-base text-center justify-center">
                    {product.product.name}
                  </span>
                </div>
              </div>
              <div id="action" className="flex justify-center w-1/5">
                <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512"><path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" /></svg>
                <input value={product.quantity} className="mx-2 text-center w-12" type="text" defaultValue="1"/>
                <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
                  <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                </svg>
              </div>
              <span className="text-center w-1/5 font-semibold text-sm">
                {product.product.price}
              </span>
              <span className="text-center w-1/5 font-semibold text-sm">
                {+product.product.price * product.quantity}
                </span>
            </div>
            <span data-id="${product.id}" id="del_btn">Remove</span>
          </div>
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
            <span id="total_price" />
          </div>
          $Button.print("Check out")
        </div>
        `)
      </div>
    </div>
  </div>)
}

export default CartPage