import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../../app/rootReducer'
import { useNavigate } from 'react-router-dom';
import { removeUser } from "../../features/user/userSlice"

type Props = {}

type InputSearch = {
  search: string
}

const Header = (props: Props) => {
  const user = useSelector((state: RootState) => state.user)
  const { register, handleSubmit, formState: {errors} } = useForm<InputSearch>()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const productsCart = useSelector((state: RootState) => state.cart.value)
  
  const onSubmit: SubmitHandler<InputSearch> = async (dataInput) => {
    navigate(`/search?q=${dataInput.search}`)
  } 

  const logout = () => {
    localStorage.removeItem("user");
    dispatch(removeUser())
  }

  return (
    <div>
      <header className="relative bg-[#2874f0] z-20">
        <nav aria-label="Top" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="">
            <div className="h-16 flex items-center">
              {/* <!-- Logo --> */}
              <div className="ml-4 flex lg:ml-0">
                <Link to="/">
                  <span className="sr-only">Workflow</span>
                  <img className="h-8 w-auto" src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png" alt=""/>
                </Link>
              </div>
              {/* <!-- Flyout menus --> */}
              <div className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="h-full flex space-x-8">
                  <Link to="/admin" className="flex items-center text-sm font-medium text-white hover:text-white">Admin</Link>
                </div>
              </div>
              <div className="ml-auto flex items-center">
                {/* <!-- Search --> */}
                <form onSubmit={handleSubmit(onSubmit)} className="flex lg:ml-6 mr-20">
                  <input  {...register("search")} className="outline-none px-4 w-[300px]"/>
                  <button id="btn_search" type="submit" className="relative right-[40px] p-2 text-gray-400 hover:text-gray-500">
                    <svg className="w-6 h-6 text-[#2874f0]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </form>
                {user.value ?
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <div id="account-email" className="text-sm font-medium text-white">{user.value?.email}</div>
                  <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  <div onClick={() => logout()} className="text-sm font-medium text-white">Logout</div>
                </div> : 
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <Link to="/signin" className="text-sm font-medium text-white">Sign in</Link>
                  <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  <Link to="/signup" className="text-sm font-medium text-white">Create account</Link>
                </div>}

                {/* <!-- Cart --> */}
                <div className="ml-4 flow-root lg:ml-6">
                  <Link to="/cart" className="group -m-2 p-2 flex items-center">
                    <svg className="text-white flex-shrink-0 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <span className="count-cart ml-2 text-sm font-medium text-white">{productsCart.length}</span>
                    <span className="sr-only">items in cart, view bag</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <div className="bg-white h-[30px] flex px-14" style={{boxShadow: "0 1px 1px 0 rgb(0 0 0 / 16%)", borderBottom: "1px solid #e4e7ed", fontWeight: 500, fontSize: "14px"}}>
        <div data-id="Smart phone" className="nav-product py-1 text-[#212121] pr-8 hover:text-[#2874f0]">Smart phone</div>
        <div data-id="Tablet" className="nav-product py-1 text-[#212121] pr-8 hover:text-[#2874f0]">Tablet</div>
        <div data-id="Watch" className="nav-product py-1 text-[#212121] pr-8 hover:text-[#2874f0]" >Watch</div>
        <div data-id="Accessory" className="nav-product py-1 text-[#212121] pr-8 hover:text-[#2874f0]">Accessory</div>
      </div>
    </div> 
  )
}

export default Header