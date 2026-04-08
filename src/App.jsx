import React from 'react'
import Calender from './components/Calender'

const App = () => {
  


  return (
   
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-zinc-300 to-zinc-400 p-10">
      <div className="relative">

        <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex gap-6">
          <div className="w-3 h-3 bg-gray-700 rounded-full"></div>
        </div>

        <div className="bg-white shadow-xl border border-gray-300">

          <div className="h-4 bg-gray-800"></div>

          <Calender />

        </div>
      </div>
    </div>
  )
}

export default App
