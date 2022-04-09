import { useState } from "react"
import { useDispatch } from "react-redux"
import { addCart, deleteCart } from "../features/cart/cartSlice"
import { ProductType } from "../types/Product"

type Props = {
  product: {
    product: ProductType,
    quantity: number,
  }
}

const ProductCartItem = ({product}: Props) => {
  const [ count, setCount ] = useState<number>(product.quantity)
  const dispatch = useDispatch()

  const downQuantity = () => {
    if (count <= 1) return
    setCount(count - 1)
    const newProduct = {...product}
    newProduct.quantity = count
    console.log(newProduct)
    dispatch(addCart(newProduct))
  }

  const upQuantity = () => {
    setCount(count + 1)
    const newProduct = {...product}
    newProduct.quantity = count
    console.log(newProduct)
    dispatch(addCart(newProduct))
  }

  const remove = (id: number) => {
    console.log(id)
    dispatch(deleteCart(id))
  }

  return (
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
          <svg onClick={() => downQuantity()} className="fill-current text-gray-600 w-3" viewBox="0 0 448 512"><path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" /></svg>
          <input value={count} className="mx-2 text-center w-12" type="text" defaultValue="1"/>
          <svg onClick={() => upQuantity()} className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
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
      <span onClick={() => remove(product.product._id)}>Remove</span>
    </div>
  )
}

export default ProductCartItem