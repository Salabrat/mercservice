import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function ProductPage() {
  const { id } = useParams()
  const [car, setCar] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    // Fetch car data from server
    fetch('http://localhost:3002/api/cars')
      .then(res => res.json())
      .then(data => {
        const foundCar = data.find(c => c.id === parseInt(id))
        setCar(foundCar)
      })
      .catch(err => console.error('Error fetching car:', err))
  }, [id])

  if (!car) {
    return (
      <div className="min-h-screen bg-custom-gray flex items-center justify-center">
        <p className="text-2xl text-gray-500">Загрузка...</p>
      </div>
    )
  }

  const images = car.images && car.images.length > 0 ? car.images : [car.image]

  return (
    <div className="min-h-screen bg-custom-gray pt-20">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
        <div className="max-w-[1510px] mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex-1">
            <Link to="/catalog" className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-2">
                <path d="m12 19-7-7 7-7"></path>
                <path d="M19 12H5"></path>
              </svg>
              Назад в каталог
            </Link>
          </div>
          <div className="flex-1 text-center">
            <Link to="/" className="inline-block">
              <img src="/images/MAINLOGO.png" alt="Main Logo" className="h-12 object-contain mx-auto" />
            </Link>
          </div>
          <div className="flex-1"></div>
        </div>
      </header>

      {/* Product Content */}
      <div className="max-w-[1510px] mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Images */}
          <div>
            <div className="bg-white rounded-xl overflow-hidden mb-4">
              <img
                src={images[currentImageIndex]}
                alt={car.name || car.model}
                className="w-full object-cover"
                style={{ height: 'clamp(400px, 30vw, 600px)' }}
              />
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`bg-white rounded-lg overflow-hidden transition-opacity ${
                      index === currentImageIndex ? 'opacity-100 ring-2 ring-primary' : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${car.name} ${index + 1}`}
                      className="w-full h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="bg-white rounded-xl p-6">
            <h1
              className="font-bold text-gray-900 mb-2"
              style={{ fontSize: 'clamp(1.5rem, 1.3rem + 1vw, 2.5rem)', lineHeight: '1.2' }}
            >
              {car.brand} {car.name || car.model}
            </h1>
            
            <p
              className="text-2xl font-bold text-gray-900 mb-6"
              style={{ fontSize: 'clamp(1.5rem, 1.3rem + 1vw, 2.5rem)' }}
            >
              {car.price}
            </p>

            {car.description && (
              <p className="text-gray-600 mb-6" style={{ fontSize: 'clamp(0.875rem, 0.8rem + 0.4vw, 1.125rem)' }}>
                {car.description}
              </p>
            )}

            {/* Specifications */}
            <div className="space-y-4 mb-6">
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-400" style={{ fontSize: 'clamp(0.875rem, 0.8rem + 0.4vw, 1rem)' }}>
                  Год выпуска
                </span>
                <span className="text-gray-900 font-medium" style={{ fontSize: 'clamp(0.875rem, 0.8rem + 0.4vw, 1rem)' }}>
                  {car.year}
                </span>
              </div>
              
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-400" style={{ fontSize: 'clamp(0.875rem, 0.8rem + 0.4vw, 1rem)' }}>
                  Мощность
                </span>
                <span className="text-gray-900 font-medium" style={{ fontSize: 'clamp(0.875rem, 0.8rem + 0.4vw, 1rem)' }}>
                  {car.power}
                </span>
              </div>

              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-400" style={{ fontSize: 'clamp(0.875rem, 0.8rem + 0.4vw, 1rem)' }}>
                  Объем двигателя
                </span>
                <span className="text-gray-900 font-medium" style={{ fontSize: 'clamp(0.875rem, 0.8rem + 0.4vw, 1rem)' }}>
                  {car.engineVolume}
                </span>
              </div>

              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-400" style={{ fontSize: 'clamp(0.875rem, 0.8rem + 0.4vw, 1rem)' }}>
                  Тип двигателя
                </span>
                <span className="text-gray-900 font-medium" style={{ fontSize: 'clamp(0.875rem, 0.8rem + 0.4vw, 1rem)' }}>
                  {car.engineType}
                </span>
              </div>

              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-400" style={{ fontSize: 'clamp(0.875rem, 0.8rem + 0.4vw, 1rem)' }}>
                  Наличие
                </span>
                <span className="text-gray-900 font-medium" style={{ fontSize: 'clamp(0.875rem, 0.8rem + 0.4vw, 1rem)' }}>
                  {car.availability}
                </span>
              </div>

              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-400" style={{ fontSize: 'clamp(0.875rem, 0.8rem + 0.4vw, 1rem)' }}>
                  Цвет кузова
                </span>
                <span className="text-gray-900 font-medium" style={{ fontSize: 'clamp(0.875rem, 0.8rem + 0.4vw, 1rem)' }}>
                  {car.bodyColor}
                </span>
              </div>

              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-400" style={{ fontSize: 'clamp(0.875rem, 0.8rem + 0.4vw, 1rem)' }}>
                  Страна
                </span>
                <span className="text-gray-900 font-medium" style={{ fontSize: 'clamp(0.875rem, 0.8rem + 0.4vw, 1rem)' }}>
                  {car.country}
                </span>
              </div>

              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-400" style={{ fontSize: 'clamp(0.875rem, 0.8rem + 0.4vw, 1rem)' }}>
                  Цвет салона
                </span>
                <span className="text-gray-900 font-medium" style={{ fontSize: 'clamp(0.875rem, 0.8rem + 0.4vw, 1rem)' }}>
                  {car.interiorColor}
                </span>
              </div>
            </div>

            {/* Contact Button */}
            <button
              className="w-full bg-primary text-white py-4 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              style={{ fontSize: 'clamp(1rem, 0.9rem + 0.5vw, 1.25rem)' }}
            >
              Связаться с нами
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
