import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import CatalogPage from './pages/CatalogPage'
import CarDetailPage from './pages/CarDetailPage'
import AdminPage from './pages/AdminPage'

function App() {
  const [cars, setCars] = useState([])
  const [brands, setBrands] = useState(() => {
    const savedBrands = localStorage.getItem('brands')
    return savedBrands ? JSON.parse(savedBrands) : []
  })

  const handleAddCar = (newCar) => {
    setCars([...cars, newCar])
  }

  const handleAddBrand = (newBrand) => {
    const updatedBrands = [...brands, newBrand]
    setBrands(updatedBrands)
    localStorage.setItem('brands', JSON.stringify(updatedBrands))
  }

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage brands={brands} />} />
            <Route path="/catalog" element={<CatalogPage onAddCar={handleAddCar} />} />
            <Route path="/car/:id" element={<CarDetailPage />} />
            <Route path="/admin" element={<AdminPage onAddCar={handleAddCar} onAddBrand={handleAddBrand} />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
