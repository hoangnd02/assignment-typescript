import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { RootState } from '../../../app/rootReducer'
import Table from '../../../components/Table'
import {deleteCategory} from "../../../features/category/categorySlice"

type Props = {}

const CategoryManager = (props: Props) => {
  const categories = useSelector((state: RootState) => state.category.value)
  const dispatch = useDispatch()
  console.log(categories);
  const notify = () => toast("Successfully");

  const delCategory = async (_id: any) => {
    try {
      await axios.delete(`http://localhost:8000/api/category/${_id}`)
      dispatch(deleteCategory(_id))
      notify()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <div className="mx-6">
        <h2 className="my-6 text-2xl w-full font-semibold text-gray-700 dark:text-gray-200">
          List categories
        </h2>
        <div className="w-[100px]">
          <Link to="/admin/category/add" className="w-[100px]">
            <button type="submit" className="w-full px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-purple">
              Add
            </button>
          </Link>  
        </div>
        <Table type="category" onDelete={delCategory} data={categories} />
      </div>
    </div>
  )
}

export default CategoryManager