import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ChevronDown, X, SlidersHorizontal, Youtube, Instagram, Send, Phone } from 'lucide-react'

const BrandPage = ({ cars, brands }) => {
  const { brand } = useParams()
  const brandName = brand.charAt(0).toUpperCase() + brand.slice(1)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isHeaderVisible, setIsHeaderVisible] = useState(false)
  const [brandScroll, setBrandScroll] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  
  // Sorting state
  const [sortOpen, setSortOpen] = useState(false)
  const [sortBy, setSortBy] = useState('default')
  
  // Filter state
  const [filterOpen, setFilterOpen] = useState(false)
  const [filters, setFilters] = useState({
    brand: '',
    model: '',
    availability: '',
    engine: 'all'
  })
  
  // Dropdown open states
  const [brandDropdownOpen, setBrandDropdownOpen] = useState(false)
  const [modelDropdownOpen, setModelDropdownOpen] = useState(false)
  const [availabilityDropdownOpen, setAvailabilityDropdownOpen] = useState(false)
  const [pulseAnimation, setPulseAnimation] = useState(false)
  const [shakeAnimation, setShakeAnimation] = useState(false)
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [ripplePosition, setRipplePosition] = useState({ x: 0, y: 0 })
  const [showRipple, setShowRipple] = useState(false)
  
  // Custom dropdown states
  const [customBrandOpen, setCustomBrandOpen] = useState(false)
  const [customModelOpen, setCustomModelOpen] = useState(false)
  const [customAvailabilityOpen, setCustomAvailabilityOpen] = useState(false)

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
      setIsHeaderVisible(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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

  // Additional check on mount to ensure scroll buttons work after navigation
  useEffect(() => {
    const container = document.getElementById('brand-page-brands-container')
    if (container) {
      // Use multiple checks with delays to ensure accurate scroll position
      const checkScrollPosition = () => {
        setCanScrollLeft(container.scrollLeft > 0)
        setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth)
      }
      
      // Check immediately
      checkScrollPosition()
      
      // Check again after a short delay to ensure DOM is fully rendered
      const timeout1 = setTimeout(checkScrollPosition, 100)
      const timeout2 = setTimeout(checkScrollPosition, 300)
      
      return () => {
        clearTimeout(timeout1)
        clearTimeout(timeout2)
      }
    }
  }, [])
  
  // Filter cars by brand (case-insensitive)
  const brandCars = cars.filter(car => 
    car.brand.toLowerCase() === brand.toLowerCase()
  )

  // Sort cars
  const sortedCars = [...brandCars].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      case 'priceDesc':
        return parseFloat(b.price.replace(/[^0-9.-]+/g, '')) - parseFloat(a.price.replace(/[^0-9.-]+/g, ''))
      case 'priceAsc':
        return parseFloat(a.price.replace(/[^0-9.-]+/g, '')) - parseFloat(b.price.replace(/[^0-9.-]+/g, ''))
      default:
        return 0
    }
  })

  // Apply additional filters
  const filteredCars = sortedCars.filter(car => {
    if (filters.brand && car.brand !== filters.brand) return false
    if (filters.model && car.model !== filters.model) return false
    if (filters.availability && car.availability !== filters.availability) return false
    if (filters.engine !== 'all' && car.engine !== filters.engine) return false
    return true
  })

  // Get unique models for selected brand
  const models = filters.brand 
    ? [...new Set(brandCars.filter(car => car.brand === filters.brand).map(car => car.model))]
    : []

  const handleSortChange = (value) => {
    setSortBy(value)
    setSortOpen(false)
  }

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleRadioClick = (e, value) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setRipplePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
    setShowRipple(true)
    setTimeout(() => setShowRipple(false), 600)
    handleFilterChange('engine', value)
  }

  const resetFilters = () => {
    setShakeAnimation(true)
    setTimeout(() => setShakeAnimation(false), 300)
    setTimeout(() => {
      setFilters({
        brand: '',
        model: '',
        availability: '',
        engine: 'all'
      })
    }, 150)
  }

  const applyFilters = () => {
    console.log('Applied filters:', filters)
    setPulseAnimation(true)
    setTimeout(() => setPulseAnimation(false), 300)
    setTimeout(() => setFilterOpen(false), 150)
  }


  return (
    <div className="min-h-screen bg-custom-gray">
      {/* Static Header */}
      <header className="bg-custom-gray backdrop-blur-sm shadow-sm">
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

      {/* Slide-down Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm transition-transform duration-700 ${
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
        <>
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
          <div
            className="fixed top-0 left-0 right-0 bottom-0 bg-[#2C2C2C] z-[100] flex flex-col"
            style={{
              transform: 'translateY(-100%)',
              animation: 'slideDown 0.6s cubic-bezier(0.55, 0.055, 0.675, 0.19) forwards'
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute left-6 top-6 p-2 text-white hover:text-gray-300 transition-colors z-50"
            >
              <X className="w-12 h-12" />
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
                    <Youtube className="w-6 h-6 mr-2" />
                    <span className="text-sm">YouTube</span>
                  </a>
                  <a href="#" className="text-white hover:text-gray-300 transition-colors flex items-center">
                    <Instagram className="w-6 h-6 mr-2" />
                    <span className="text-sm">Instagram</span>
                  </a>
                  <a href="#" className="text-white hover:text-gray-300 transition-colors flex items-center">
                    <Send className="w-6 h-6 mr-2" />
                    <span className="text-sm">Telegram</span>
                  </a>
                </div>

                {/* White divider line - bottom */}
                <div className="mb-6">
                  <div className="h-[3px] bg-gray-400 mr-[130px]"></div>
                </div>

                {/* Phone */}
                <a href="tel:+74996817874" className="flex items-center text-white hover:text-gray-300 transition-colors text-lg font-bold">
                  <Phone className="w-5 h-5 mr-3" />
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
        </>
      )}

      <div className="py-[30px]">
        <div className="flex items-center gap-4 mb-8 pl-5">
          <Link to="/catalog" className="inline-flex items-center justify-center bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Назад
          </Link>
          <div className="flex items-center text-gray-600 text-sm">
            <Link to="/catalog" className="text-gray-400 hover:text-gray-600 transition-colors">Каталог</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{brandName}</span>
          </div>
        </div>

        {/* Brand Carousel */}
        <div className="relative pl-5 pr-5 py-[2px]">
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
        
        {/* Sorting and Filter Buttons */}
        <div className="flex gap-4 mb-8 pl-5">
          <div className="relative">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="inline-flex items-center justify-center bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium"
            >
              Сортировка
              <ChevronDown className="w-4 h-4 ml-2" />
            </button>
            {sortOpen && (
              <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg z-50 min-w-[200px] animate-dropdown-open">
                <button
                  onClick={() => handleSortChange('default')}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 hover:scale-102 first:rounded-t-lg transition-all duration-200"
                >
                  По умолчанию
                </button>
                <button
                  onClick={() => handleSortChange('newest')}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 hover:scale-102 transition-all duration-200"
                >
                  Сначала новинки
                </button>
                <button
                  onClick={() => handleSortChange('priceDesc')}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 hover:scale-102 transition-all duration-200"
                >
                  По уменьшению цен
                </button>
                <button
                  onClick={() => handleSortChange('priceAsc')}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 hover:scale-102 last:rounded-b-lg transition-all duration-200"
                >
                  По возрастанию цен
                </button>
              </div>
            )}
          </div>
          
          <button
            onClick={() => setFilterOpen(true)}
            className="inline-flex items-center justify-center bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium"
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Настроить фильтры
          </button>
        </div>

        {/* Filter Panel */}
        {filterOpen && (
          <div className="fixed inset-0 z-50">
            <div className="absolute inset-0 bg-black/50 transition-opacity duration-300" onClick={() => setFilterOpen(false)} />
            <div className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl overflow-y-auto animate-slide-in-right ${pulseAnimation ? 'animate-pulse' : ''} ${shakeAnimation ? 'animate-shake' : ''}`}>
              <div className="p-6">
                <div className="flex justify-between items-center mb-5 animate-fade-in-down">
                  <h2 className="text-xl font-bold text-gray-900">Настроить фильтры</h2>
                  <button onClick={() => setFilterOpen(false)} className="text-gray-500 hover:text-gray-700">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Brand Filter */}
                <div className="mb-4 animate-fade-in-down">
                  <div className="flex justify-between items-center py-3 border-b-2 border-gray-900">
                    <span className="font-semibold text-gray-900 text-sm">Марка</span>
                    <button
                      onClick={() => setCustomBrandOpen(!customBrandOpen)}
                      className="flex items-center gap-2 text-gray-900 text-sm"
                    >
                      <span className={filters.brand ? '' : 'text-gray-500'}>{filters.brand || 'Выбрать'}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${customBrandOpen ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${customBrandOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <div className="py-2 max-h-80 overflow-y-auto">
                      {brands.map((brand) => (
                        <div
                          key={brand.id || brand.name}
                          onClick={() => { handleFilterChange('brand', brand.name); setCustomBrandOpen(false); }}
                          className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm"
                        >
                          {brand.name}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Model Filter */}
                <div className="mb-4 animate-fade-in-down">
                  <div className="flex justify-between items-center py-3 border-b-2 border-gray-900">
                    <span className="font-semibold text-gray-900 text-sm">Модель</span>
                    <button
                      onClick={() => filters.brand && setCustomModelOpen(!customModelOpen)}
                      disabled={!filters.brand}
                      className="flex items-center gap-2 text-gray-900 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className={filters.model ? '' : 'text-gray-500'}>{filters.model || 'Выбрать'}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${customModelOpen ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${customModelOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <div className="py-2">
                      {models.length > 0 ? (
                        models.map((model) => (
                          <div
                            key={model}
                            onClick={() => { handleFilterChange('model', model); setCustomModelOpen(false); }}
                            className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm"
                          >
                            {model}
                          </div>
                        ))
                      ) : (
                        <div className="px-4 py-2 text-gray-400 text-sm">
                          Нет доступных моделей
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Availability Filter */}
                <div className="mb-4 animate-fade-in-down">
                  <div className="flex justify-between items-center py-3 border-b-2 border-gray-900">
                    <span className="font-semibold text-gray-900 text-sm">Наличие</span>
                    <button
                      onClick={() => setCustomAvailabilityOpen(!customAvailabilityOpen)}
                      className="flex items-center gap-2 text-gray-900 text-sm"
                    >
                      <span className={filters.availability ? '' : 'text-gray-500'}>{filters.availability === 'in-stock' ? 'В наличии' : filters.availability === 'pre-order' ? 'Под заказ' : filters.availability === 'expected' ? 'Ожидается' : 'Выбрать'}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${customAvailabilityOpen ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${customAvailabilityOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <div className="py-2">
                      <div
                        onClick={() => { handleFilterChange('availability', 'in-stock'); setCustomAvailabilityOpen(false); }}
                        className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm"
                      >
                        В наличии
                      </div>
                      <div
                        onClick={() => { handleFilterChange('availability', 'pre-order'); setCustomAvailabilityOpen(false); }}
                        className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm"
                      >
                        Под заказ
                      </div>
                      <div
                        onClick={() => { handleFilterChange('availability', 'expected'); setCustomAvailabilityOpen(false); }}
                        className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm"
                      >
                        Ожидается
                      </div>
                    </div>
                  </div>
                </div>

                {/* Engine Filter */}
                <div className="mb-6 animate-fade-in-down" style={{ animationDelay: '0.1s' }}>
                  <div className="py-3 border-b-2 border-gray-900">
                    <span className="font-semibold text-gray-900 text-sm block mb-3">Двигатель</span>
                    <div className="flex gap-6">
                      <button
                        onClick={() => handleFilterChange('engine', 'all')}
                        className={`text-sm ${filters.engine === 'all' ? 'font-bold text-gray-900' : 'text-gray-500'}`}
                      >
                        Все
                      </button>
                      <button
                        onClick={() => handleFilterChange('engine', 'gasoline')}
                        className={`text-sm ${filters.engine === 'gasoline' ? 'font-bold text-gray-900' : 'text-gray-500'}`}
                      >
                        Бензин
                      </button>
                      <button
                        onClick={() => handleFilterChange('engine', 'hybrid')}
                        className={`text-sm ${filters.engine === 'hybrid' ? 'font-bold text-gray-900' : 'text-gray-500'}`}
                      >
                        Гибрид
                      </button>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mt-6 animate-fade-in-down" style={{ animationDelay: '0.2s' }}>
                  <button
                    onClick={applyFilters}
                    className="flex-1 bg-black text-white px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
                  >
                    Применить
                  </button>
                  <button
                    onClick={resetFilters}
                    className="flex-1 text-gray-600 px-4 py-3 hover:text-gray-900 transition-colors font-medium"
                  >
                    Сбросить
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {filteredCars.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center">
            <p className="text-2xl text-gray-500">Каталог пуст</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pl-5 pr-5">
            {filteredCars.map(car => (
              <Link key={car.id} to={`/product/${car.id}`} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow relative flex flex-col text-decoration-none color-inherit">
                <img 
                  src={car.images && car.images[0] ? car.images[0] : car.image} 
                  alt={car.name || car.model} 
                  className="w-full object-cover"
                  style={{ height: 'clamp(17.5rem, 16.4916rem + 5.04202vw, 21.25rem)' }}
                />
                <div style={{ padding: 'clamp(15px, 2vw, 30px)' }}>
                  <h3 
                    className="font-bold text-gray-900 mb-0.5"
                    style={{ fontSize: 'clamp(1.25rem, 1.08193rem + 0.840336vw, 1.875rem)', lineHeight: '1.2' }}
                  >
                    {car.brand}
                  </h3>
                  <p 
                    className="text-gray-700 mb-2"
                    style={{ fontSize: 'clamp(1.25rem, 1.08193rem + 0.840336vw, 1.875rem)', lineHeight: '1.2' }}
                  >
                    {car.name || car.model}
                  </p>
                  <div className="flex justify-between items-start" style={{ marginTop: '20px' }}>
                    <div>
                      <p 
                        className="text-gray-400 mb-0.5"
                        style={{ fontSize: 'clamp(0.875rem, 0.7563rem + 0.59497vw, 1.25rem)' }}
                      >
                        Год выпуска
                      </p>
                      <span 
                        className="text-gray-600"
                        style={{ fontSize: 'clamp(1rem, 0.88135rem + 0.59497vw, 1.5rem)' }}
                      >
                        {car.year}
                      </span>
                    </div>
                    <div className="text-left" style={{ marginRight: '70px' }}>
                      <p 
                        className="text-gray-400 mb-0.5"
                        style={{ fontSize: 'clamp(0.875rem, 0.7563rem + 0.59497vw, 1.25rem)' }}
                      >
                        Цена
                      </p>
                      <span 
                        className="font-bold text-gray-900"
                        style={{ fontSize: 'clamp(1rem, 0.88135rem + 0.59497vw, 1.5rem)' }}
                      >
                        {car.price}
                      </span>
                    </div>
                  </div>
                </div>
                <img 
                  src="/logo/strelka_clickauto.png" 
                  alt="Arrow" 
                  className="absolute bottom-4 right-4 object-contain"
                  style={{ width: 'clamp(1.375rem, 5vw, 1.875rem)', height: 'clamp(1.375rem, 5vw, 1.875rem)' }}
                />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default BrandPage
