import Dinero from 'dinero.js';
import { createContext, useContext, useEffect, useState } from "react";

// the number of decimal points
const kDecimalPoints = 2

// the name of the store
const kStore = 'myonlinestore'

// the field in an 'product' object which uniquely identifies it
const kIdKey = 'id'

// calculate price
const kFeatureCalculateTotalPrice = true

// if 'kFeatureCalculateTotalPrice' is set to true, must specify which field to use as the price (e.g. to calculate total price (product.price) set this to 'price')
const kPriceKey = 'price'

// fields from product to store
const kFieldsToStore = ['name']

// ------------------------------- //
// do not modify beyond this point //
// ------------------------------- //
const Context = createContext()

const localStorageKey = [kStore, 'cart'].join('.')

class ItemIdDoesNotExistError extends Error {
  constructor() {
    super('Item does not contain the identifying field: ' + kIdKey)
  }
}

class InvalidQuantityError extends Error {
  constructor() {
    super('Quantity must be greater than 0')
  }
}

const OnlineStoreCartContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false)
  const [cartItems, setCartItems] = useState(() => {
    const storageData = JSON.parse(localStorage.getItem(localStorageKey))
    if (storageData) {
      return storageData.map(ii => {
        ii._itemPrice = Dinero(ii._itemPrice)
        return ii
      })
    }
    return []
  })

  useEffect(() => {
    const storageData = JSON.stringify(cartItems)
    localStorage.setItem(localStorageKey, storageData)
  }, [cartItems])

  // convert 'price' to an object which knows how to handle money
  const _toPrice = (amount, factor = Math.pow(10, kDecimalPoints)) => Dinero({ amount: Math.round(amount * factor) })

  // modify cartItem (as if in place)
  const _updateExistingCartItem = (cartItem, quantity) => {
    // clone the cart items
    const copyCartItems = [...cartItems]
    const copyCartItem = copyCartItems.find(ii => ii._id === cartItem._id)

    // update cartItem
    copyCartItem._itemQuantity += quantity

    // update state
    setCartItems(copyCartItems)
  }

  // add item to cart
  const addToCart = (product, quantity) => {
    if (!product.hasOwnProperty(kIdKey)) {
      throw new ItemIdDoesNotExistError()
    }
    if (quantity < 1) {
      throw new InvalidQuantityError()
    }

    // force quantity as int
    const intQuantity = quantity ^ 0

    // find cartItem in cart - if found, update exiting cartItem
    const foundCartItem = cartItems.find(ii => ii._id === product[kIdKey])
    if (foundCartItem) {
      _updateExistingCartItem(foundCartItem, intQuantity)
    } else {
      // not found - build new cart item
      const newCartItem = {
        _id: product[kIdKey],
        _itemQuantity: intQuantity,
        _itemPrice: kFeatureCalculateTotalPrice ? _toPrice(product[kPriceKey]) : _toPrice(0),
        _item: kFieldsToStore.reduce((prev, curr) => {
          prev[curr] = product[curr]
          return prev
        }, {}),
      }
      setCartItems(prev => [...prev, newCartItem])
    }
  }

  // update quantities of cart item by amount
  const updateQuantityOfCartItem = (cartItem, quantity) => {
    // force quantity as int
    const intQuantity = quantity ^ 0

    // find cartItem in cart - if found, update exiting cartItem
    const foundCartItem = cartItems.find(ii => ii._id === cartItem._id)
    if (foundCartItem && ((foundCartItem._itemQuantity + intQuantity) >= 1)) {
      _updateExistingCartItem(foundCartItem, intQuantity)
    }
  }

  // remove completely from cart
  const deleteFromCart = (cartItem) => setCartItems(prev => prev.filter(ii => ii._id !== cartItem._id))

  // return true if product already exists in cart
  const isInCart = (product) => undefined !== cartItems.find(ii => ii._id === product[kIdKey])

  // return true if cart is empty
  const isCartEmpty = () => cartItems.length === 0

  // return the total quantity of items in the cart
  const cartTotalQuantity = () => cartItems.reduce((prev, curr) => prev + curr._itemQuantity, 0)

  // return the total price of all items in the cart
  const cartTotalPrice = () => cartItems.reduce((prev, curr) => prev.add(cartItemSubTotal(curr)), _toPrice(0))

  // return the cartItem's subtotal
  const cartItemSubTotal = (cartItem) => cartItem._itemPrice.multiply(cartItem._itemQuantity)

  const value = {
    // actions
    setShowCart,
    addToCart,
    updateQuantityOfCartItem,
    deleteFromCart,
    isInCart,
    isCartEmpty,
    cartTotalQuantity,
    cartTotalPrice,
    cartItemSubTotal,
    // state
    showCart,
    cartItems,
  }

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}

export default OnlineStoreCartContext

export const useOnlineStoreCart = () => {
  return useContext(Context)
}