import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import CatalogPage from './pages/CatalogPage'
import AdminPage from './pages/AdminPage'
import BrandPage from './pages/BrandPage'

function App() {
  const [brands, setBrands] = useState([])

  // Fetch brands from API on mount
  useEffect(() => {
    fetch('http://localhost:3001/api/brands')
      .then(res => res.json())
      .then(data => setBrands(data))
      .catch(err => console.error('Error fetching brands:', err))
  }, [])

  const handleAddBrand = (newBrand) => {
    fetch('http://localhost:3001/api/brands', {
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
    <AuthProvider>
      <Router>
        <div className="min-h-screen">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage brands={brands} />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/catalog/:brand" element={<BrandPage brands={brands} />} />
            <Route path="/admin" element={<AdminPage onAddBrand={handleAddBrand} />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
