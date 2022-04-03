import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RootState } from '../../../app/rootReducer';
import Table from '../../../components/Table';
import { deleteProduct } from '../../../features/product/productSlice';
import { ProductType } from '../../../types/Product';
import { isAuthenticate } from '../../../utils/localstorage';

type ProductManagerProps = {
  products: ProductType[];
}

const ProductManager = (props: ProductManagerProps) => {
  const dispatch = useDispatch()
  const products = useSelector((state: RootState) => state.products.value)
  const notify = () => toast("Successfully");

  const onHandleDelete = async (_id: number) => {
    try {
      if(localStorage.getItem('user')) {
        const { token } = isAuthenticate()
        await axios.delete(
          `http://localhost:8000/api/product/${_id}`, {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          }
        );
        notify()
        dispatch(deleteProduct(_id))
      }
    }
    catch (error) {
      console.log(error)
    }
  }
  
  return (
    <div>
      <div className="mx-6">
        <h2 className="my-6 text-2xl w-full font-semibold text-gray-700 dark:text-gray-200">
          List products
        </h2>
        <div className="w-[100px]">
          <Link to="/admin/product/add" className="w-[100px]">
            <button type="submit" className="w-full px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-purple">
              Add
            </button>
          </Link>  
        </div>
        <Table onDelete={onHandleDelete} data={products} />
      </div>
    </div>
  )
}

export default ProductManager