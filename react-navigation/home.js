import { Link } from 'react-router'

function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-100">
      <div className="rounded-xl bg-white p-8 text-center shadow-lg">
        <h1 className="text-3xl font-bold text-slate-800">
          Home
        </h1>

        <p className="mt-3 text-slate-600">
          Welcome to the Home page.
        </p>

        <Link
          to="/profile"
          className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700 active:scale-95"
        >
          Go to Profile
        </Link>
      </div>
    </div>
  )
}

export default Home