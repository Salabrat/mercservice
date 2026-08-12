import React from 'react'
import { Link } from 'react-router-dom'

const CatalogPage = ({ brands }) => {
  return (
    <div className="min-h-screen bg-custom-gray py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Каталог</h2>
          <p className="text-gray-600 text-lg">Выберите бренд для просмотра автомобилей</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {brands.map((brand, index) => (
            <Link 
              key={brand.id || index} 
              to={`/catalog/${brand.name.toLowerCase()}`} 
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center justify-center"
            >
              <img src={brand.logo} alt={brand.name} className="h-24 w-auto object-contain mb-4" />
              <span className="text-lg font-semibold text-gray-900">{brand.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CatalogPage
