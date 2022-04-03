import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addCategory } from '../../../features/category/categorySlice';
import { CategoryType } from '../../../types/Category';

type props = {}

const CategoryAdd = (props: props) => {
  const { register, handleSubmit, formState: {errors} } = useForm<CategoryType>()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onSubmit: SubmitHandler<CategoryType> = async (dataInput) => {
    try {
      const {data} = await axios.post("http://localhost:8000/api/category", dataInput)
      dispatch(addCategory(data));
      navigate("/admin/category");
    } catch (error) {
      console.log(error)
    }
  } 

  return (
    <div className="container px-6 mx-auto grid">
      <h2 className="my-6 text-2xl w-full font-semibold text-gray-700 dark:text-gray-200">Add category</h2>
      <div className="mt-2 md:mt-0 md:col-span-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-3 sm:col-span-3">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" {...register("category")} placeholder="" className="py-2 px-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"/>
              </div>
            </div>
            <button type="submit" className="w-full px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-purple">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CategoryAdd