import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Calendar, Phone } from 'lucide-react'

const HomePage = () => {
  const [currentImage, setCurrentImage] = useState(0)
  
  const images = [
    '/images/1.jpg',
    '/images/2.jpg',
    '/images/3.jpg',
    '/images/4.jpg'
  ]

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  }

  useEffect(() => {
    const interval = setInterval(nextImage, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center relative pl-5 overflow-hidden">
        <div className="absolute inset-0 z-0">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentImage ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={image}
                alt={`Car ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
          ))}
        </div>

        <div className="relative z-10 text-left max-w-4xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6 tracking-tight">
            Галерея современного
            <br />
            <span className="font-semibold">автомобильного искусства</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-200 mb-12 max-w-2xl">
            Уникальный мультибрендовый дилер автомобилей класса люкс и премиум в России и Казахстане. Большой выбор в наличии и под заказ.
          </p>

          <Link 
            to="/catalog"
            className="inline-flex items-center bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg"
          >
            Перейти в галерею
            <ArrowRight className="ml-3 w-5 h-5" />
          </Link>
        </div>

        {/* Carousel Dots */}
        <div className="absolute bottom-12 right-12 z-10 flex items-center space-x-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImage ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Collaboration Banner */}
      <section className="relative mt-20 px-5">
        <div className="relative">
          <img 
            src="/images/6.jpg" 
            alt="Collaboration" 
            className="w-full h-auto"
          />
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="absolute inset-0 flex items-start pt-8">
            <div className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-6 h-6 text-white" />
                <span className="text-sm text-white font-medium">Коллаборация · до 1 сентября</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-semibold text-white mb-2">
                Mercedes Service и «Времена года» объявляют о партнерстве
              </h1>
              <p className="text-gray-200 mb-4 max-w-xl">
                Эксклюзивные условия для клиентов в рамках сотрудничества
              </p>
              <Link 
                to="/catalog"
                className="inline-flex items-center bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap"
              >
                Подробнее
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Brands Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-16 text-center">
            Эксклюзивные марки
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {['Mercedes-Benz', 'BMW', 'Porsche', 'Bentley', 'Audi', 'Lamborghini', 'Ferrari', 'Rolls-Royce'].map((brand, index) => (
              <div key={index} className="text-center group cursor-pointer">
                <div className="bg-gray-50 rounded-xl p-8 hover:bg-gray-100 transition-colors">
                  <p className="text-lg font-semibold text-gray-900 group-hover:text-black transition-colors">
                    {brand}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-16 text-center">
            Наши услуги
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Аренда</h3>
              <p className="text-gray-600">Краткосрочная и долгосрочная аренда премиальных автомобилей</p>
            </div>
            <div className="bg-white rounded-xl p-8 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Продажа</h3>
              <p className="text-gray-600">Покупка автомобилей с доставкой по всему миру</p>
            </div>
            <div className="bg-white rounded-xl p-8 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">С водителем</h3>
              <p className="text-gray-600">Профессиональные водители для вашего комфорта</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-6">
            Готовы выбрать автомобиль мечты?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Свяжитесь с нами для консультации или бронируйте онлайн
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/catalog"
              className="inline-flex items-center bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Смотреть каталог
            </Link>
            <a 
              href="tel:+79311050708"
              className="inline-flex items-center border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-black transition-colors"
            >
              <Phone className="w-5 h-5 mr-2" />
              +7 931 105-07-08
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
