import { Link } from 'react-router-dom';
import { ProductType } from '../types/Product';

type Props = {
  products: ProductType[];
}

const ListProduct = (props: Props) => {
  return (
    <div className="list-products mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      {props.products
        .map((product: ProductType, index) =>
          <div key={index} className="group relative z-10">
            <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
              <img src={product.img} alt="Front of men&#039;s Basic Tee in black." className="w-full h-full object-center object-cover lg:w-full lg:h-full"/>
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
  )
}

export default ListProduct