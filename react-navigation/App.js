import { Route, Routes } from 'react-router-dom'
import Home from './react-navigation/Home'
import Profile from './react-navigation/Profile'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  )
}

export default App