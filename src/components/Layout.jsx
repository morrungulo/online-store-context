import React from 'react'
import Footer from './Footer'
import Header from './Header'

const Layout = ({ children }) => {
  return (
    <>
      <header>
        <Header />
      </header>
      <div className='max-w-[95%] sm:max-w-[87%] lg:max-w-[70%] mx-auto my-6 p-6'>
        {children}
      </div>
      <footer>
        <Footer />
      </footer>
    </>
  )
}

export default Layout