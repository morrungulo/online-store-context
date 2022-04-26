import React from 'react'

const Button = ({ children, onClick }) => {
  return (
    <button className='bg-transparent hover:bg-slate-200 text-black border py-2 px-4 rounded focus:outline-none focus:shadow-outline' type='button' onClick={onClick}>
      {children}
    </button>
  )
}

export default Button