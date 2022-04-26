import React from 'react'
import { useOnlineStoreCart } from '../contexts/OnlineStoreCartContext'
import Button from './Button'

const Product = ({ product }) => {
  const { addToCart, isInCart } = useOnlineStoreCart()

  return (
    <div className='flex flex-col mb-4 border-b-2 border-slate-300 border-solid'>
      <div className='flex flex-row justify-between mb-3'>
        <p className='text-lg font-semibold text-slate-500'>
          {product.name}
        </p>
        <p className='text-lg font-bold text-slate-700'>
          {product.price}
        </p>
      </div>
      <p className='text-md text-slate-400 mb-3'>
        {product.description}
      </p>
      <div className='flex flex-row justify-center mx-auto mb-2'>
        <Button onClick={() => addToCart(product, 1)}>
          {isInCart(product) ? 'Add once more to Cart' : 'Add to Cart'}
        </Button>
      </div>
    </div>
  )
}

export default Product