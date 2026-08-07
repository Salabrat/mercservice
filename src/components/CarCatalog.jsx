import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const initialCars = [
  { id: 1, brand: 'Mercedes-Benz', model: 'S-Class', price: '15 000 ₽/день', image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=250&fit=crop', category: 'Премиум', year: '2024', transmission: 'Автомат', fuel: 'Бензин', seats: '5', description: 'Элегантный седан представительского класса с премиальным отделкой и передовыми технологиями.' },
  { id: 2, brand: 'BMW', model: '7 Series', price: '12 000 ₽/день', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=250&fit=crop', category: 'Премиум', year: '2024', transmission: 'Автомат', fuel: 'Бензин', seats: '5', description: 'Бизнес-седан с динамичным дизайном и инновационными системами безопасности.' },
  { id: 3, brand: 'Porsche', model: '911 Carrera', price: '25 000 ₽/день', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=250&fit=crop', category: 'Спорткар', year: '2024', transmission: 'Робот', fuel: 'Бензин', seats: '2', description: 'Легендарный спорткар с непревзойденными динамическими характеристиками.' },
  { id: 4, brand: 'Audi', model: 'A8', price: '11 000 ₽/день', image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=250&fit=crop', category: 'Премиум', year: '2024', transmission: 'Автомат', fuel: 'Бензин', seats: '5', description: 'Флагманский седан Audi с технологиями будущего и роскошным интерьером.' },
  { id: 5, brand: 'Mercedes-Benz', model: 'G-Class', price: '20 000 ₽/день', image: 'https://images.unsplash.com/photo-1520031441872-265149a9e690?w=400&h=250&fit=crop', category: 'Внедорожник', year: '2024', transmission: 'Автомат', fuel: 'Дизель', seats: '5', description: 'Легендарный внедорожник с исключительными внедорожными возможностями.' },
  { id: 6, brand: 'Bentley', model: 'Flying Spur', price: '35 000 ₽/день', image: 'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=400&h=250&fit=crop', category: 'Премиум', year: '2024', transmission: 'Автомат', fuel: 'Бензин', seats: '5', description: 'Роскошный гран-турер с ручной сборкой и непревзойденным комфортом.' },
]

const CarCatalog = ({ onAddCar }) => {
  const [cars, setCars] = useState(initialCars)

  const handleAddCar = (newCar) => {
    setCars([...cars, newCar])
    if (onAddCar) onAddCar(newCar)
  }
  return (
    <section id="catalog" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Наш автопарк</h2>
          <p className="text-gray-600 text-lg">Свободные автомобили на сегодня</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car) => (
            <div key={car.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative">
                <img src={car.image} alt={car.model} className="w-full h-48 object-cover" />
                <span className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm">
                  {car.category}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{car.brand}</h3>
                <p className="text-gray-600 mb-3">{car.model}</p>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-2xl font-bold text-primary">{car.price}</span>
                </div>
                <div className="flex gap-2">
                  <Link 
                    to={`/car/${car.id}`}
                    className="flex-1 bg-gray-100 text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-center"
                  >
                    Подробнее
                  </Link>
                  <button className="flex-1 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors">
                    Забронировать
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-primary-dark text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary transition-colors">
            Показать все автомобили
          </button>
        </div>
      </div>
    </section>
  )
}

export default CarCatalog
