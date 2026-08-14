import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  const handleIncrement = () => {
    setCount(count + 1)
  }

  return (
    <div className="flex flex-col items-center gap-4 rounded-xl bg-white p-8 shadow-md">
      <h2 className="text-2xl font-bold text-slate-800">Counter</h2>

      <p className="text-4xl font-semibold text-blue-600">{count}</p>

      <button
        type="button"
        onClick={handleIncrement}
        className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700"
      >
        Increment
      </button>
    </div>
  )
}

export default Counter
