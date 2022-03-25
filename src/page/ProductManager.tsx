import { Link } from 'react-router-dom';
import Table from '../components/Table';
import { ProductType } from '../types/Product';

type ProductManagerProps = {
  products: ProductType[];
  onDelete: (id: number) => void;
}

const ProductManager = (props: ProductManagerProps) => {
  return (
    <div>
      <div className="mx-6">
        <h2 className="my-6 text-2xl w-full font-semibold text-gray-700 dark:text-gray-200">
          List categories
        </h2>
        <div className="w-[100px]">
          <Link to="/admin/product/add" className="w-[100px]">
            <button type="submit" className="w-full px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-purple">
              Add
            </button>
          </Link>  
        </div>
        <Table onDelete={props.onDelete} data={props.products} />
      </div>

    </div>
  )
}

export default ProductManager