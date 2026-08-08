import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const BrandPage = ({ cars }) => {
  const { brand } = useParams()
  const brandName = brand.charAt(0).toUpperCase() + brand.slice(1)

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
  // Filter cars by brand (case-insensitive)
  const brandCars = cars.filter(car => 
    car.brand.toLowerCase() === brand.toLowerCase()
  )

  return (
    <div className="min-h-screen bg-custom-gray py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/" className="inline-flex items-center justify-center bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Назад
          </Link>
          <div className="flex items-center text-gray-600 text-sm">
            <span className="text-gray-400">Каталог</span>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{brandName}</span>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-8">{brandName}</h1>
        
        {brandCars.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center">
            <p className="text-2xl text-gray-500">Каталог пуст</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brandCars.map(car => (
              <div key={car.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <img src={car.image} alt={car.model} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{car.brand} {car.model}</h3>
                  <p className="text-gray-600 mb-4">{car.year}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-primary">{car.price}</span>
                    <span className="text-sm text-gray-500">{car.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default BrandPage
