import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ProductType } from '../types/Product'
import { useNavigate } from 'react-router-dom';
import { isAuthenticate } from '../utils/localstorage';
import { useDispatch, useSelector } from 'react-redux';
import {addCart} from '../features/cart/cartSlice'
import { RootState } from '../app/rootReducer';
import { toast } from 'react-toastify';

type Props = {}

const ProductPage = (props: Props) => {
  const [ product, setProduct ] = useState<ProductType>({
    name: "",
    category: "",
    price: 0,
    img: "",
    desc: "",
  })
  const [ count, setCount ] = useState<number>(1)
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const notify = () => toast("Successfully");

  
  const cart = useSelector((state: RootState) => state.cart.value.cartItems)

  useEffect(() => {
    const getProduct = async () => {
      const {data} = await axios.get(`http://localhost:8000/api/product/${id}`)
      setProduct(data)
    }
    getProduct()
  }, [])

  const downQuantity = () => {
    if (count <= 1) return
    setCount(count - 1) 
  }

  const upQuantity = () => {
    setCount(count + 1) 
  }

  const addCartProduct = async () => {
    try {
      if(localStorage.getItem('user')) {
        const {token, user} = isAuthenticate()
        const newCart = {
          product,
          quantity: count
        }
        // await axios.post(`http://localhost:8000/api/cart/${user._id}`, newCart)
        dispatch(addCart(newCart))
        notify()
      } else {
        navigate("/signin")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="bg-[#f1f3f6] py-6 px-12">
      <section className="mt-2 shadow border-[1px] text-gray-700 body-font overflow-hidden bg-white">
        <div className="container px-5 py-16 mx-auto">
          <div className="lg:w-4/5 mx-auto flex justify-around flex-wrap">
            <img className="lg:w-1/3 w-full object-cover object-center rounded border border-gray-200" src={product?.image}/>
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product?.name}</h1>
              <div className="flex mb-4"></div>
              <p className="leading-relaxed">- Tặng Voucher giảm 50% mua Watch4 (R870, R875, R880, R885)</p>
              <p className="leading-relaxed">- Tặng gói BH mở rộng Samsung Care+ (KH không cần thêm gói BH vào giỏ hàng). Sau khi nhận sản phẩm mới, liên hệ 1800 588 855 (nhấn phím 3) để kiểm tra dịch vụ</p>
              <p className="leading-relaxed">- Tặng Voucher giảm 50% mua Watch4 (R870, R875, R880, R885)</p>
              <div className="flex mt-6 pb-5 mb-5">
                <span className="mr-3 w-[100px] items-center flex">Quantity</span>
                <div className="title-font font-medium text-2xl text-gray-900">
                  <div className="flex justify-center ">
                    <svg onClick={() => downQuantity()} id="down-quantity" className="fill-current text-gray-600 w-3" viewBox="0 0 448 512"><path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" /></svg>
                    <input value={count} id="quantity" className="mx-2 border text-center w-8" type="text" defaultValue={1} />
                    <svg onClick={() => upQuantity()} id="up-quantity" className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
                      <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="flex mt-6 pb-5 mb-5">
                <span className="mr-3 w-[100px] flex items-center">Price</span>
                <span className="title-font font-medium text-2xl text-gray-900 pr-10 pl-3">${product?.price * count}</span>
              </div>
              <button onClick={() => addCartProduct()} className="flex mt-10 text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded">Add cart</button>
            </div>
          </div>
        </div>
      </section>
    </div>)
}

export default ProductPage