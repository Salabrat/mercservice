import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Header from '../components/Header'

export default function ProductPage() {
  const { id } = useParams()
  const [car, setCar] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isHeaderVisible, setIsHeaderVisible] = useState(false)

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0)

    // Fetch car data from server
    fetch('http://localhost:3002/api/cars')
      .then(res => res.json())
      .then(data => {
        const foundCar = data.find(c => c.id === parseInt(id))
        setCar(foundCar)
      })
      .catch(err => console.error('Error fetching car:', err))
  }, [id])

  // Block scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  // Handle scroll to show/hide header
  useEffect(() => {
    const handleScroll = () => {
      const productTitle = document.querySelector('[data-component-name="ProductPage"] .flex.items-center')
      if (productTitle) {
        const titleTop = productTitle.getBoundingClientRect().top
        setIsHeaderVisible(titleTop <= 80)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
      {/* Fixed Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200/50 shadow-sm transition-transform duration-300 ${
          isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="max-w-[1510px] mx-auto px-4 py-4 flex items-center justify-between">
          {/* Burger Menu */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 44 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" className="w-12 h-12">
              <line
                x1="4"
                x2="23"
                y1="6"
                y2="6"
                strokeWidth="2.5"
                style={{
                  transition: 'all 0.3s ease-in-out',
                  transform: isMenuOpen ? 'translateY(6px) rotate(45deg)' : 'translateY(0) rotate(0deg)',
                  transformOrigin: '4px 6px'
                }}
              />
              <line
                x1="4"
                x2="35"
                y1="12"
                y2="12"
                strokeWidth="1.8"
                style={{
                  transition: 'all 0.2s ease-in-out',
                  transform: isMenuOpen ? 'scaleX(0)' : 'scaleX(1)',
                  transformOrigin: '4px 12px'
                }}
              />
              <line
                x1="4"
                x2="23"
                y1="18"
                y2="18"
                strokeWidth="2.5"
                style={{
                  transition: 'all 0.3s ease-in-out',
                  transform: isMenuOpen ? 'translateY(-6px) rotate(-45deg)' : 'translateY(0) rotate(0deg)',
                  transformOrigin: '4px 18px'
                }}
              />
            </svg>
          </button>

          {/* Logo */}
          <div className="flex-1 text-center">
            <Link to="/" className="inline-block">
              <img src="/images/MAINLOGO.png" alt="Main Logo" className="h-12 object-contain mx-auto" />
            </Link>
          </div>

          {/* Spacer */}
          <div className="w-12"></div>
        </div>
      </header>

      {/* Hamburger Menu */}
      {isMenuOpen && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 bg-[#2C2C2C] z-[100] flex flex-col"
          style={{
            transform: 'translateY(-100%)',
            animation: 'slideDown 0.6s cubic-bezier(0.55, 0.055, 0.675, 0.19) forwards'
          }}
        >
          <style>{`
            @keyframes slideDown {
              0% {
                transform: translateY(-100%);
              }
              100% {
                transform: translateY(0);
              }
            }
          `}</style>

          {/* Close Button */}
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute left-6 top-6 p-2 text-white hover:text-gray-300 transition-colors z-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 44 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" className="w-12 h-12">
              <line
                x1="4"
                x2="23"
                y1="6"
                y2="6"
                strokeWidth="2.5"
                style={{
                  transition: 'all 0.3s ease-in-out',
                  transform: 'translateY(6px) rotate(45deg)',
                  transformOrigin: '4px 6px'
                }}
              />
              <line
                x1="4"
                x2="35"
                y1="12"
                y2="12"
                strokeWidth="1.8"
                style={{
                  transition: 'all 0.2s ease-in-out',
                  transform: 'scaleX(0)',
                  transformOrigin: '4px 12px'
                }}
              />
              <line
                x1="4"
                x2="23"
                y1="18"
                y2="18"
                strokeWidth="2.5"
                style={{
                  transition: 'all 0.3s ease-in-out',
                  transform: 'translateY(-6px) rotate(-45deg)',
                  transformOrigin: '4px 18px'
                }}
              />
            </svg>
          </button>

          {/* Logo at top - centered across full menu */}
          <div className="flex justify-center pt-[18px] pb-8 px-8 max-w-[calc(100%-80px)] mx-auto">
            <img src="/images/MAINLOGO.png" alt="MAINLOGO" className="h-12 object-contain" />
          </div>

          {/* Content area */}
          <div className="flex flex-1">
            {/* Left side - Navigation */}
            <div className="flex flex-col flex-1 pl-8">
              {/* White divider line - top */}
              <div className="mb-6">
                <div className="h-[3px] bg-gray-400 mr-[130px]"></div>
              </div>

              {/* Navigation Items */}
              <div className="flex flex-col items-start space-y-5 mb-6">
                <Link
                  to="/"
                  className="text-4xl font-medium text-white hover:text-gray-300 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  ГЛАВНАЯ
                </Link>
                <Link
                  to="/catalog"
                  className="text-4xl font-medium text-white hover:text-gray-300 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  КАТАЛОГ
                </Link>
                <Link
                  to="/catalog"
                  className="text-4xl font-medium text-white hover:text-gray-300 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  УСЛУГИ
                </Link>
                <Link
                  to="/catalog"
                  className="text-4xl font-medium text-white hover:text-gray-300 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  О НАС
                </Link>
                <Link
                  to="/catalog"
                  className="text-4xl font-medium text-white hover:text-gray-300 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  БЛОГ
                </Link>
                <Link
                  to="/catalog"
                  className="text-4xl font-medium text-white hover:text-gray-300 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  КОНТАКТЫ
                </Link>
              </div>

              {/* White divider line - middle */}
              <div className="mb-6">
                <div className="h-[3px] bg-gray-400 mr-[130px]"></div>
              </div>

              {/* Social Media */}
              <div className="flex items-center space-x-8 mb-6">
                <a href="#" className="text-white hover:text-gray-300 transition-colors flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 mr-2">
                    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path>
                    <path d="m10 15 5-3-5-3z"></path>
                  </svg>
                  <span className="text-sm">YouTube</span>
                </a>
                <a href="#" className="text-white hover:text-gray-300 transition-colors flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 mr-2">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                  <span className="text-sm">Instagram</span>
                </a>
                <a href="#" className="text-white hover:text-gray-300 transition-colors flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 mr-2">
                    <path d="m22 2-7 20-4-9-9-4Z"></path>
                    <path d="M22 2 11 13"></path>
                  </svg>
                  <span className="text-sm">Telegram</span>
                </a>
              </div>

              {/* White divider line - bottom */}
              <div className="mb-6">
                <div className="h-[3px] bg-gray-400 mr-[130px]"></div>
              </div>

              {/* Phone */}
              <a href="tel:+74996817874" className="flex items-center text-white hover:text-gray-300 transition-colors text-lg font-bold">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-3">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                +7 499 681 78 74
              </a>
            </div>

            {/* Right side - Image and SALIKS block */}
            <div className="hidden md:flex flex-col w-1/2 mr-5">
              <img src="/images/13.jpg" alt="Menu Image" className="w-full h-auto object-contain mb-[30px]" />
              {/* SALIKS X BRABUS Block */}
              <div className="flex flex-col items-start space-y-[30px] pl-5">
                <span className="text-white text-lg font-medium">SALIKS X BRABUS</span>
                <button className="px-6 py-2 border border-white text-white text-lg font-medium hover:bg-white hover:text-gray-900 transition-colors">
                  Смотреть
                </button>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Product Content */}
      <div className="max-w-[1510px] mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Images */}
          <div style={{ marginTop: '260px' }}>
            {/* Title with brand logo */}
            <div className="flex items-center" style={{ marginLeft: '15px', marginBottom: '30px' }}>
              <img
                src={car.brandLogo || `/logo/${car.brand.toLowerCase().substring(0, 4)}.png`}
                alt={car.brand}
                className="object-contain"
                style={{ width: '94px', height: '94px', marginRight: '10px' }}
                onError={(e) => {
                  e.target.style.display = 'none'
                }}
              />
              <h1
                className="font-bold text-gray-900"
                style={{ fontSize: 'clamp(1.5rem, 1.3rem + 1vw, 2.5rem)', lineHeight: '1.2' }}
              >
                {car.brand} {car.name || car.model}
              </h1>
            </div>

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
          <div className="p-6" style={{ marginTop: '286px', marginLeft: '5px' }}>
            
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
