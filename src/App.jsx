import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Footer from './components/Footer'
import AdminLoginModal from './components/AdminLoginModal'
import HomePage from './pages/HomePage'
import CatalogPage from './pages/CatalogPage'
import ProductPage from './pages/ProductPage'
import AdminPage from './pages/AdminPage'
import BrandPage from './pages/BrandPage'
import AboutPage from './pages/AboutPage'

function AppContent() {
  const [cars, setCars] = useState([])
  const [brands, setBrands] = useState([])
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const { user } = useAuth()

  // Fetch brands from API on mount
  useEffect(() => {
    fetch('http://localhost:3002/api/brands')
      .then(res => res.json())
      .then(data => setBrands(data))
      .catch(err => console.error('Error fetching brands:', err))
  }, [])

  // Fetch cars from API on mount
  useEffect(() => {
    fetch('http://localhost:3002/api/cars')
      .then(res => res.json())
      .then(data => setCars(data))
      .catch(err => console.error('Error fetching cars:', err))
  }, [])

  // Handle Ctrl+Shift+F hotkey for admin login
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'F') {
        e.preventDefault()
        if (user?.role === 'admin') {
          window.location.href = '/admin'
        } else {
          setIsLoginModalOpen(true)
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [user])

  const handleAddCar = (newCar) => {
    setCars([...cars, newCar])
  }

  const handleAddBrand = (newBrand) => {
    fetch('http://localhost:3002/api/brands', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newBrand)
    })
      .then(res => res.json())
      .then(data => {
        setBrands([...brands, data])
      })
      .catch(err => console.error('Error adding brand:', err))
  }

  return (
    <>
      <Router>
        <div className="min-h-screen">
          <Routes>
            <Route path="/" element={<HomePage brands={brands} />} />
            <Route path="/catalog" element={<CatalogPage cars={cars} brands={brands} onAddCar={handleAddCar} />} />
            <Route path="/catalog/:brand" element={<BrandPage cars={cars} brands={brands} />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/admin" element={<AdminPage onAddCar={handleAddCar} onAddBrand={handleAddBrand} />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
      <AdminLoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
