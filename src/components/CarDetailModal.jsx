import React from 'react'
import { X, Calendar, Fuel, Gauge, Users, Cog } from 'lucide-react'

const CarDetailModal = ({ isOpen, onClose, car }) => {
  if (!isOpen || !car) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-xl w-full max-w-4xl mx-4 my-8 overflow-hidden">
        <div className="relative">
          <img src={car.image} alt={car.model} className="w-full h-64 md:h-96 object-cover" />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <span className="absolute top-4 left-4 bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold">
            {car.category}
          </span>
        </div>

        <div className="p-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{car.brand}</h2>
              <p className="text-xl text-gray-600">{car.model}</p>
            </div>
            <div className="mt-4 md:mt-0">
              <p className="text-3xl font-bold text-primary">{car.price}</p>
            </div>
          </div>

          {car.description && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Описание</h3>
              <p className="text-gray-600 leading-relaxed">{car.description}</p>
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {car.year && (
              <div className="bg-gray-50 rounded-lg p-4">
                <Calendar className="w-6 h-6 text-primary mb-2" />
                <p className="text-sm text-gray-600">Год</p>
                <p className="font-semibold text-gray-900">{car.year}</p>
              </div>
            )}
            {car.transmission && (
              <div className="bg-gray-50 rounded-lg p-4">
                <Cog className="w-6 h-6 text-primary mb-2" />
                <p className="text-sm text-gray-600">КПП</p>
                <p className="font-semibold text-gray-900">{car.transmission}</p>
              </div>
            )}
            {car.fuel && (
              <div className="bg-gray-50 rounded-lg p-4">
                <Fuel className="w-6 h-6 text-primary mb-2" />
                <p className="text-sm text-gray-600">Топливо</p>
                <p className="font-semibold text-gray-900">{car.fuel}</p>
              </div>
            )}
            {car.seats && (
              <div className="bg-gray-50 rounded-lg p-4">
                <Users className="w-6 h-6 text-primary mb-2" />
                <p className="text-sm text-gray-600">Мест</p>
                <p className="font-semibold text-gray-900">{car.seats}</p>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex-1 bg-primary text-white py-4 rounded-lg font-semibold hover:bg-primary-dark transition-colors">
              Забронировать
            </button>
            <button 
              onClick={onClose}
              className="flex-1 bg-gray-100 text-gray-900 py-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CarDetailModal
