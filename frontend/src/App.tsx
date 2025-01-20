import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Register from './pages/Register'
import Upload from './pages/Upload'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App