import React from 'react'
import { useOnlineStoreCart } from '../contexts/OnlineStoreCartContext'
import CartProduct from './CartProduct'

const Cart = () => {
  const { isCartEmpty, cartTotalQuantity, cartTotalPrice, cartItems } = useOnlineStoreCart()

  if (isCartEmpty()) {
    return (
      <div className='w-full'>
        <div className='py-4'>
          <div className="text-base font-bold text-slate-500">Cart is empty</div>
        </div>
      </div>
    )
  }

  return (
    <div className='w-full'>
      <div className='py-4 px-8'>

        {/* number of cart items */}
        <div className="text-base font-bold text-slate-500">Cart has <span className="text-red-400">{cartTotalQuantity()} items</span></div>

        {/* each of the cart items */}
        {cartItems.map(ii => (
          <CartProduct key={ii._id} cartItem={ii} />
        ))}

        {/* subtotal */}
        <div className="flex justify-end text-lg font-bold text-slate-500">Subtotal: {cartTotalPrice().toFormat()}</div>

      </div>
    </div>
  )
}

export default Cart