import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import CatalogPage from './pages/CatalogPage'
import CarDetailPage from './pages/CarDetailPage'

function App() {
  const [cars, setCars] = useState([])

  const handleAddCar = (newCar) => {
    setCars([...cars, newCar])
  }

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen">
          <Header onAddCar={handleAddCar} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage onAddCar={handleAddCar} />} />
            <Route path="/car/:id" element={<CarDetailPage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
