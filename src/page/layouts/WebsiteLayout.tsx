import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../../components/Client/Footer'
import Header from '../../components/Client/Header'

type Props = {}

const WebsiteLayout = (props: Props) => {
  return (
    <div>
        <header>
          <Header />
        </header>
        <main>
          <Outlet />
        </main>
        <footer>
          <Footer />
        </footer>
    </div>
  )
}

export default WebsiteLayout