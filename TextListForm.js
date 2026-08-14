import { useState } from 'react'

function TextListForm() {
  const [text, setText] = useState('')
  const [items, setItems] = useState([])

  const handleSubmit = (event) => {
    event.preventDefault()

    const trimmedText = text.trim()

    if (!trimmedText) {
      return
    }

    setItems((previousItems) => [
      ...previousItems,
      {
        id: crypto.randomUUID(),
        text: trimmedText,
      },
    ])

    setText('')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <h2 className="mb-5 text-2xl font-bold text-slate-800">
          Text List
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex gap-2"
        >
          <input
            type="text"
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Enter text"
            className="flex-1 rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-500"
          />

          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 active:scale-95 active:bg-blue-800"
          >
            Add
          </button>
        </form>

        <ul className="mt-6 space-y-2">
          {items.map((item) => (
            <li
              key={item.id}
              className="rounded-lg bg-slate-100 px-4 py-3 text-slate-700"
            >
              {item.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default TextListForm
