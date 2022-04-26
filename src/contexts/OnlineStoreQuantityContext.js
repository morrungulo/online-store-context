import { createContext, useContext, useEffect, useState } from "react";

// the name of the store
const kStore = 'myonlinestore'

// the minimum quantity that this cart supports
const kMinimumQuantity = 1

// ------------------------------- //
// do not modify beyond this point //
// ------------------------------- //
const Context = createContext()

const localStorageKey = [kStore, 'quantity'].join('.')

const OnlineStoreQuantityContext = ({ children }) => {
  const [quantity, setQuantity] = useState(() => {
    const storageData = JSON.parse(localStorage.getItem(localStorageKey))
    return storageData || kMinimumQuantity
  })

  // store to local storage
  useEffect(() => {
    const storageData = JSON.stringify({ quantity })
    localStorage.setItem(localStorageKey, storageData)
  }, [quantity]);

  // increase the quantity
  const incQuantity = () => setQuantity(prev => prev + 1)

  // decrease the quantity (never go below the minimum quantity)
  const decQuantity = () => {
    if (quantity > kMinimumQuantity) {
      setQuantity(prev => prev - 1)
    }
  }

  const value = {
    quantity,
    incQuantity,
    decQuantity,
  }

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}

export default OnlineStoreQuantityContext

export const useOnlineStoreQuantity = () => {
  return useContext(Context)
}