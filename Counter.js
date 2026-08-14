import { useState } from 'react'
import Button from './Button'

function Counter() {
  const [count, setCount] = useState(0)

  const handleIncrement = () => {
    setCount(count + 1)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="flex flex-col items-center gap-5 rounded-xl bg-white p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-slate-800">
          Counter
        </h2>

        <p className="text-5xl font-bold text-blue-600">
          {count}
        </p>

        <Button onClick={handleIncrement}>
          Increment
        </Button>
      </div>
    </div>
  )
}

export default Counter
