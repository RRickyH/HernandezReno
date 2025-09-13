import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from 'src/components/layout/MainLayout'
import Home from './pages/Home'
import About from './pages/About'
import Gallery from './pages/Gallery'

function App() {
  return (
    <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </MainLayout>
    </BrowserRouter>
  )
}

export default App
