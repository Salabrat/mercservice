import React from 'react'

const CatalogPage = ({ onAddCar }) => {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Каталог</h2>
          <p className="text-gray-600 text-lg">Выберите бренд для просмотра автомобилей</p>
        </div>
      </div>
    </div>
  )
}

export default CatalogPage
