import { createContext, useContext, useEffect, useState } from "react";
import { data } from "../data";

// do not modify beyond this point
const Context = createContext()

const OnlineStoreProductContext = ({ children }) => {
  const [products, setProducts] = useState([])

  // set your initial data (delayed as if loading from some API)
  useEffect(() => {
    setTimeout(() => {
      setProducts(data)
    }, 1000)
  }, [])

  const addProducts = (newProducts) => {
    const uniqueProducts = newProducts.filter(ii => undefined === products.find(jj => jj.id === ii.id))
    setProducts(prev => [...prev, ...uniqueProducts])
  }

  const value = {
    // actions
    addProducts,

    // state
    products,
  }

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}

export default OnlineStoreProductContext

export const useOnlineStoreProducts = () => {
  return useContext(Context)
}