import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom';
import { ProductType } from '../../../types/Product';
import { editProduct } from '../../../features/product/productSlice'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
 
type Props = {}

const ProductEdit = (props: Props) => {
  const { register, handleSubmit, formState: {errors}, reset } = useForm<ProductType>()
  const [product, setProduct] = useState<ProductType>()
  const navigate = useNavigate()
  const {id} = useParams()
  const dispatch = useDispatch()
  const notify = () => toast("Successfully");

  const onSubmit: SubmitHandler<ProductType> = async (dataInput) => {
    try {
      const { data } = await axios.patch(`http://localhost:8000/api/product/${id}`, dataInput)
      dispatch(editProduct(data))
      notify()
      navigate("/admin/product");
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(() => {
    const getProduct = async () => {
        const {data} = await axios.get(`http://localhost:8000/api/product/${id}`)
        console.log(product)
        setProduct(data)
        reset(data)
    } 
    getProduct()
  }, [])

  return (
    <div className="container px-6 mx-auto grid">
      <h2 className="my-6 text-2xl w-full font-semibold text-gray-700 dark:text-gray-200">Edit category</h2>
      <div className="mt-2 md:mt-0 md:col-span-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-3 sm:col-span-3">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" {...register("name")} placeholder=""  className="py-2 px-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"/>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-3 sm:col-span-3">
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <input type="text" {...register("category")} placeholder=""  className="py-2 px-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"/>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-3 sm:col-span-3">
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input type="number" {...register("price")} placeholder=""  className="py-2 px-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"/>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-3 sm:col-span-3">
                <label className="block text-sm font-medium text-gray-700">Image</label>
                <input type="text" {...register("image")} placeholder=""  className="py-2 px-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"/>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-3 sm:col-span-3">
                <label className="block text-sm font-medium text-gray-700">Desc</label>
                <input type="text" {...register("desc")} placeholder=""  className="py-2 px-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"/>
              </div>
            </div>
            <button type="submit" className="w-full px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-purple">
              Edit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProductEdit