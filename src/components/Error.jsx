import React from 'react'

const Error = ( {children} ) => {
  return (
    <div className="bg-red-800 w-full text-center text-white p-3 uppercase font-bold mb-3 rounded-md">
      {children}
    </div>    
  )
}

export default Error