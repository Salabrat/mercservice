import React from 'react'
import CarCatalog from '../components/CarCatalog'

const CatalogPage = ({ onAddCar }) => {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <CarCatalog onAddCar={onAddCar} />
    </div>
  )
}

export default CatalogPage
