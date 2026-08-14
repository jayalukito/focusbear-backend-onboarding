function Button({ children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        rounded-lg
        bg-blue-600
        px-5
        py-2
        font-medium
        text-white
        transition
        hover:bg-blue-700
        active:scale-95
        active:bg-blue-800
      "
    >
      {children}
    </button>
  )
}

export default Button
