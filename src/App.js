import React from 'react'
import CardProduct from './components/CardProduct'
import Cart from './components/Cart'
import { useOnlineStoreCart } from './contexts/OnlineStoreCartContext'
import { useOnlineStoreProducts } from './contexts/OnlineStoreProductContext'
import OnlineStoreQuantityContext from './contexts/OnlineStoreQuantityContext'

const App = () => {
  const { products } = useOnlineStoreProducts()
  const { showCart, setShowCart } = useOnlineStoreCart()


  return (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:gap-10'>

      {/* product list */}
      <OnlineStoreQuantityContext>
        <div className='w-full'>
          <h1 className='mb-4 text-lg font-semibold text-slate-400'>
            Product List
          </h1>
          {products.length === 0 ?
            <h2>Loading...</h2>
            :
            products.map(item => (<CardProduct key={item.id} product={item} />))
          }
        </div>
      </OnlineStoreQuantityContext>

      {/* cart items */}
      <div className='w-full'>
        <div className='flex justify-start items-center mb-4'>
          <h1 className='text-lg font-semibold text-slate-400 '>
            Cart Items
          </h1>
          <button type='button' className='ml-8 text-sm text-slate-600 font-semibold' onClick={() => setShowCart(prev => !prev)}>Toggle Cart</button>
        </div>
        {showCart ? <Cart /> : null}
      </div>

    </div >
  )
}

export default App