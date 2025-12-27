import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
      <h1 className="text-3xl font-bold text-blue-900 bg-amber-100 p-4 rounded-lg shadow-lg">
        Tailwind is working 🚀
      </h1>
    </div>
  )
}

export default App
