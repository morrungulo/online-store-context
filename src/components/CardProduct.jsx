import React from 'react'
import { useOnlineStoreCart } from '../contexts/OnlineStoreCartContext'
import Button from './Button'

const CardProduct = ({ product }) => {
  const { addToCart, isInCart } = useOnlineStoreCart()

  return (
    <div className={`w-full rounded overflow-hidden shadow-lg mb-4 bg-opacity-80 hover:bg-opacity-100 ${product.bgColor}`}>
      <div className="px-6 py-4">
        <div className='flex justify-between items-start'>
          <div>
            <div className="font-bold text-xl">
              {product.name}
            </div>
            <div className='font-semibold'>
              by {product.brand}
            </div>
          </div>
          <div className='font-bold text-xl'>
            {product.price}
          </div>
        </div>
        <div className="text-gray-700 text-base pt-4">
          {product.description}
        </div>
        <div className="pt-4">
          {product.tags.map(ii => (
            <span key={ii} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2">#{ii}</span>
          ))}
        </div>
        <div className='pt-6 pb-1 flex justify-center items-end'>
          <Button onClick={() => addToCart(product, 1)}>
            {isInCart(product) ? 'Add once more to Cart' : 'Add to Cart'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CardProduct