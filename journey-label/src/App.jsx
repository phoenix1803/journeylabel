import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Preloader from './components/Preloader/Preloader'
import Home from './pages/Home'
import About from './pages/About'
import Enquiry from './pages/Enquiry'
import NewSouthWales from './pages/NewSouthWales'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function App() {
  const [loading, setLoading] = useState(true)

  return (
    <>
      <Preloader onComplete={() => setLoading(false)} />
      <div style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.8s ease' }}>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/enquiry" element={<Enquiry />} />
          <Route path="/destinations/new-south-wales" element={<NewSouthWales />} />
        </Routes>
        <Footer />
      </div>
    </>
  )
}

export default App
