import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const BrandPage = ({ cars, brands }) => {
  const { brand } = useParams()
  const brandName = brand.charAt(0).toUpperCase() + brand.slice(1)
  const [brandScroll, setBrandScroll] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const scrollBrands = (direction) => {
    const container = document.getElementById('brand-page-brands-container')
    if (container) {
      const logoItems = container.querySelectorAll('.flex-shrink-0')
      if (logoItems.length > 0) {
        const firstLogo = logoItems[0]
        const logoWidth = firstLogo.offsetWidth
        const gap = 48 // gap-12 = 48px
        const scrollAmount = logoWidth + gap
        if (direction === 'left') {
          container.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
        } else {
          container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
        }
      }
    }
  }

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const container = document.getElementById('brand-page-brands-container')
    const checkScroll = () => {
      if (container) {
        setCanScrollLeft(container.scrollLeft > 0)
        setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth)
      }
    }

    if (container) {
      checkScroll()
      container.addEventListener('scroll', checkScroll)
      window.addEventListener('resize', checkScroll)
      return () => {
        container.removeEventListener('scroll', checkScroll)
        window.removeEventListener('resize', checkScroll)
      }
    }
  }, [brands])
  
  // Filter cars by brand (case-insensitive)
  const brandCars = cars.filter(car => 
    car.brand.toLowerCase() === brand.toLowerCase()
  )

  return (
    <div className="min-h-screen bg-custom-gray py-20">
      <div>
        <div className="flex items-center gap-4 mb-8 pl-5">
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

        {/* Brand Carousel */}
        <div className="relative pl-5 pr-5 mb-8">
          <div
            id="brand-page-brands-container"
            className="flex gap-12 overflow-x-auto scrollbar-hide scroll-smooth pr-72"
          >
            {brands.map((brand, index) => (
              <Link key={brand.id || index} to={`/catalog/${brand.name.toLowerCase()}`} className="flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity">
                <img src={brand.logo} alt={brand.name} className="h-28 w-auto object-contain" />
              </Link>
            ))}
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 flex gap-2 bg-custom-gray pl-4 pr-4 py-4 z-10">
            <button
              onClick={() => scrollBrands('left')}
              className="flex items-center justify-center"
              disabled={!canScrollLeft}
            >
              <img
                src="/logo/vlevo.png"
                alt="влево"
                className="w-24 h-16 transition-opacity"
                style={{ opacity: canScrollLeft ? 1 : 0.3 }}
              />
            </button>
            <button
              onClick={() => scrollBrands('right')}
              className="flex items-center justify-center"
              disabled={!canScrollRight}
            >
              <img
                src="/logo/vpravo.png"
                alt="вправо"
                className="w-24 h-16 transition-opacity"
                style={{ opacity: canScrollRight ? 1 : 0.3 }}
              />
            </button>
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 pl-5">Модельный ряд {brandName} в наличии</h1>
        
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
