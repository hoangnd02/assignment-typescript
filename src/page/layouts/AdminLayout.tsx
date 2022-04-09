import { Outlet } from 'react-router-dom'
import NavbarLeft from '../../components/Admin/NavbarLeft'
import NavbarTop from '../../components/Admin/NavbarTop'

type Props = {}

const AdminLayout = (props: Props) => {
  return (
    <div>
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        <NavbarLeft />
        <div className="flex flex-col flex-1 w-full">
          <NavbarTop />
          <main className="h-full py-6 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}

export default AdminLayout