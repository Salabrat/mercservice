import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'

const initialCars = [
  { 
    id: 1, 
    brand: 'Mercedes-Benz', 
    model: 'S-Class', 
    price: '15 000', 
    image: '/images/car/1.jpg', 
    category: 'Премиум', 
    year: '2024', 
    transmission: 'Автомат', 
    fuel: 'Бензин', 
    seats: '5', 
    description: 'Элегантный седан представительского класса с премиальным отделкой и передовыми технологиями.',
    power: '435 Л.С.',
    engine: '3.0 ЛИТРА',
    acceleration: '4.8 СЕКУНДЫ',
    drive: 'полный',
    images: [
      '/images/car/1.jpg',
      '/images/car/2.jpg',
      '/images/car/3.jpg',
      '/images/car/4.jpg'
    ],
    pricing: {
      day1: '18 000 ₽',
      day3: '16 000 ₽',
      day7: '15 000 ₽',
      day14: 'по согласованию'
    },
    driverPrice: '5 000 ₽/час',
    deposit: '50 000 ₽',
    rules: {
      age: '21+ ЛЕТ',
      experience: '1 ГОД',
      minRental: '3 ЧАСА',
      mileage: '250 КМ'
    }
  },
  { 
    id: 2, 
    brand: 'BMW', 
    model: '7 Series', 
    price: '12 000', 
    image: '/images/car/2.jpg', 
    category: 'Премиум', 
    year: '2024', 
    transmission: 'Автомат', 
    fuel: 'Бензин', 
    seats: '5', 
    description: 'Бизнес-седан с динамичным дизайном и инновационными системами безопасности.',
    power: '381 Л.С.',
    engine: '3.0 ЛИТРА',
    acceleration: '5.4 СЕКУНДЫ',
    drive: 'полный',
    images: [
      '/images/car/2.jpg',
      '/images/car/1.jpg',
      '/images/car/3.jpg'
    ],
    pricing: {
      day1: '15 000 ₽',
      day3: '13 000 ₽',
      day7: '12 000 ₽',
      day14: 'по согласованию'
    },
    driverPrice: '4 500 ₽/час',
    deposit: '45 000 ₽',
    rules: {
      age: '21+ ЛЕТ',
      experience: '1 ГОД',
      minRental: '3 ЧАСА',
      mileage: '250 КМ'
    }
  },
  { 
    id: 3, 
    brand: 'Porsche', 
    model: '911 Carrera', 
    price: '25 000', 
    image: '/images/car/3.jpg', 
    category: 'Спорткар', 
    year: '2024', 
    transmission: 'Робот', 
    fuel: 'Бензин', 
    seats: '2', 
    description: 'Легендарный спорткар с непревзойденными динамическими характеристиками.',
    power: '443 Л.С.',
    engine: '3.0 ЛИТРА',
    acceleration: '3.9 СЕКУНДЫ',
    drive: 'полный',
    images: [
      '/images/car/3.jpg',
      '/images/car/1.jpg',
      '/images/car/2.jpg',
      '/images/car/4.jpg'
    ],
    pricing: {
      day1: '30 000 ₽',
      day3: '27 000 ₽',
      day7: '25 000 ₽',
      day14: 'по согласованию'
    },
    driverPrice: '7 000 ₽/час',
    deposit: '80 000 ₽',
    rules: {
      age: '23+ ЛЕТ',
      experience: '2 ГОДА',
      minRental: '3 ЧАСА',
      mileage: '200 КМ'
    }
  },
  { 
    id: 4, 
    brand: 'Audi', 
    model: 'A8', 
    price: '11 000', 
    image: '/images/car/4.jpg', 
    category: 'Премиум', 
    year: '2024', 
    transmission: 'Автомат', 
    fuel: 'Бензин', 
    seats: '5', 
    description: 'Флагманский седан Audi с технологиями будущего и роскошным интерьером.',
    power: '340 Л.С.',
    engine: '3.0 ЛИТРА',
    acceleration: '5.6 СЕКУНДЫ',
    drive: 'полный',
    images: [
      '/images/car/4.jpg',
      '/images/car/1.jpg',
      '/images/car/2.jpg'
    ],
    pricing: {
      day1: '14 000 ₽',
      day3: '12 000 ₽',
      day7: '11 000 ₽',
      day14: 'по согласованию'
    },
    driverPrice: '4 000 ₽/час',
    deposit: '40 000 ₽',
    rules: {
      age: '21+ ЛЕТ',
      experience: '1 ГОД',
      minRental: '3 ЧАСА',
      mileage: '250 КМ'
    }
  },
  { 
    id: 5, 
    brand: 'Mercedes-Benz', 
    model: 'G-Class', 
    price: '20 000', 
    image: '/images/car/1.jpg', 
    category: 'Внедорожник', 
    year: '2024', 
    transmission: 'Автомат', 
    fuel: 'Дизель', 
    seats: '5', 
    description: 'Легендарный внедорожник с исключительными внедорожными возможностями.',
    power: '422 Л.С.',
    engine: '4.0 ЛИТРА',
    acceleration: '5.9 СЕКУНДЫ',
    drive: 'полный',
    images: [
      '/images/car/1.jpg',
      '/images/car/2.jpg',
      '/images/car/3.jpg',
      '/images/car/4.jpg'
    ],
    pricing: {
      day1: '25 000 ₽',
      day3: '22 000 ₽',
      day7: '20 000 ₽',
      day14: 'по согласованию'
    },
    driverPrice: '6 000 ₽/час',
    deposit: '70 000 ₽',
    rules: {
      age: '23+ ЛЕТ',
      experience: '2 ГОДА',
      minRental: '3 ЧАСА',
      mileage: '200 КМ'
    }
  },
  { 
    id: 6, 
    brand: 'Bentley', 
    model: 'Flying Spur', 
    price: '35 000', 
    image: '/images/car/2.jpg', 
    category: 'Премиум', 
    year: '2024', 
    transmission: 'Автомат', 
    fuel: 'Бензин', 
    seats: '5', 
    description: 'Роскошный гран-турер с ручной сборкой и непревзойденным комфортом.',
    power: '635 Л.С.',
    engine: '6.0 ЛИТРА',
    acceleration: '3.8 СЕКУНДЫ',
    drive: 'полный',
    images: [
      '/images/car/2.jpg',
      '/images/car/1.jpg',
      '/images/car/3.jpg',
      '/images/car/4.jpg'
    ],
    pricing: {
      day1: '40 000 ₽',
      day3: '37 000 ₽',
      day7: '35 000 ₽',
      day14: 'по согласованию'
    },
    driverPrice: '9 000 ₽/час',
    deposit: '100 000 ₽',
    rules: {
      age: '25+ ЛЕТ',
      experience: '3 ГОДА',
      minRental: '3 ЧАСА',
      mileage: '150 КМ'
    }
  },
]

const CarDetailPage = () => {
  const { id } = useParams()
  const [car, setCar] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const foundCar = initialCars.find(c => c.id === parseInt(id))
    setCar(foundCar)
    window.scrollTo(0, 0)
  }, [id])

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Автомобиль не найден</p>
      </div>
    )
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % car.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + car.images.length) % car.images.length)
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/catalog" className="inline-flex items-center text-gray-900 hover:text-gray-700 mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Вернуться в каталог
        </Link>

        {/* Image Gallery */}
        <div className="relative mb-6">
          <div className="relative rounded-lg overflow-hidden bg-gray-100">
            <img 
              src={car.images[currentImageIndex]} 
              alt={`${car.brand} ${car.model}`}
              className="w-full h-[500px] object-cover"
            />
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 rounded-full p-3 shadow-md transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-gray-900" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 rounded-full p-3 shadow-md transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-gray-900" />
            </button>
          </div>
          
          {/* Thumbnail Gallery */}
          <div className="flex gap-3 mt-4">
            {car.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                  currentImageIndex === index ? 'border-black' : 'border-transparent hover:border-gray-300'
                }`}
              >
                <img src={img} alt={`${car.brand} ${car.model} ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Car Title and Price */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {car.brand} {car.model}
          </h1>
          <p className="text-2xl text-gray-600">{car.price} ₽ / сутки</p>
        </div>

        {/* Specifications */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500 mb-1">Класс</p>
            <p className="font-semibold text-gray-900">{car.category}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500 mb-1">Мощность</p>
            <p className="font-semibold text-gray-900">{car.power}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500 mb-1">Объем двигателя</p>
            <p className="font-semibold text-gray-900">{car.engine}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500 mb-1">Разгон 0-100</p>
            <p className="font-semibold text-gray-900">{car.acceleration}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500 mb-1">Привод</p>
            <p className="font-semibold text-gray-900">{car.drive}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500 mb-1">Коробка</p>
            <p className="font-semibold text-gray-900">{car.transmission}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500 mb-1">Топливо</p>
            <p className="font-semibold text-gray-900">{car.fuel}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500 mb-1">Кол-во мест</p>
            <p className="font-semibold text-gray-900">{car.seats}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Description */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Описание</h2>
              <p className="text-gray-600 leading-relaxed">{car.description}</p>
            </div>

            {/* Rental Rules */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Правила аренды</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Минимальный возраст</p>
                  <p className="font-semibold text-gray-900">{car.rules.age}</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Водительский стаж</p>
                  <p className="font-semibold text-gray-900">{car.rules.experience}</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Минимальный срок</p>
                  <p className="font-semibold text-gray-900">{car.rules.minRental}</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Лимит пробега</p>
                  <p className="font-semibold text-gray-900">{car.rules.mileage} в сутки</p>
                </div>
              </div>
            </div>
          </div>

          {/* Price and Booking */}
          <div>
            <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
              <button className="w-full bg-black text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors mb-6">
                Забронировать
              </button>

              <div className="border-t border-gray-200 pt-4">
                <h3 className="font-semibold text-gray-900 mb-4">Цены на аренду</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">1 сутки</span>
                    <span className="font-semibold">{car.pricing.day1}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">от 3 суток</span>
                    <span className="font-semibold">{car.pricing.day3}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">от 7 суток</span>
                    <span className="font-semibold">{car.pricing.day7}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">от 14 суток</span>
                    <span className="font-semibold">{car.pricing.day14}</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Аренда с водителем</span>
                  <span className="font-semibold">{car.driverPrice}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Обеспечительный платеж</span>
                  <span className="font-semibold">{car.deposit}</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  * Пока машина у Вас, залог заморожен на Вашей карте. Мы не храним деньги клиентов на своем счету.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CarDetailPage
