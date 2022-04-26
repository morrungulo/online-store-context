import React from 'react'
import { AiOutlineDelete, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { useOnlineStoreCart } from '../contexts/OnlineStoreCartContext'

const CartProduct = ({ cartItem }) => {
  const { updateQuantityOfCartItem, deleteFromCart, cartItemSubTotal } = useOnlineStoreCart()

  return (
    <div className='py-6'>
      <div className='h-20 flex flex-col justify-between'>

        {/* top row */}
        <div className="flex flex-row justify-between items-center">

          {/* name */}
          <p className='text-lg font-bold text-slate-500'>
            {cartItem._item.name}
          </p>

          {/* subtotal */}
          <p className='text-lg font-semibold text-slate-500'>
            {cartItemSubTotal(cartItem).toFormat()}
          </p>

        </div>

        {/* bottom row */}
        <div className="flex flex-row justify-between items-center">

          {/* <div className='inline-flex items-center -space-x-px'> */}
          <div className='inline-flex items-center'>
            {/* <div className='flex flex-row justify-start items-center'> */}
            <span className='ml-0 rounded-l-lg border border-gray-300 py-1 px-2 leading-tight text-gray-500 cursor-pointer hover:text-gray-700' onClick={() => updateQuantityOfCartItem(cartItem, -1)} ><AiOutlineMinus size={18} /></span>
            <span className='border-y border-gray-300 py-1 px-2 text-sm leading-tight text-gray-500'>{cartItem._itemQuantity}</span>
            <span className='rounded-r-lg border border-gray-300 py-1 px-2 leading-tight text-gray-500 cursor-pointer hover:text-gray-700' onClick={() => updateQuantityOfCartItem(cartItem, +1)} ><AiOutlinePlus size={18} /></span>
          </div>

          {/* remove from cart button */}
          <div className='inline-flex items-center'>
            <span className='rounded-lg border border-gray-300 py-1 px-2 leading-tight text-gray-500 cursor-pointer hover:text-red-300' onClick={() => deleteFromCart(cartItem)}>
              <AiOutlineDelete size={24} />
            </span>
          </div>

        </div>

      </div>
    </div>
  )
}

export default CartProduct