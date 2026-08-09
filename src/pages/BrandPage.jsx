import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ChevronDown, X, SlidersHorizontal } from 'lucide-react'

const BrandPage = ({ cars, brands }) => {
  const { brand } = useParams()
  const brandName = brand.charAt(0).toUpperCase() + brand.slice(1)
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
    fuelType: 'all'
  })

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
    if (filters.fuelType !== 'all' && car.fuelType !== filters.fuelType) return false
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

  const resetFilters = () => {
    setFilters({
      brand: '',
      model: '',
      availability: '',
      fuelType: 'all'
    })
  }

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
              <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg z-50 min-w-[200px] transition-all duration-200 ease-in-out origin-top transform scale-100 opacity-100">
                <button
                  onClick={() => handleSortChange('default')}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 first:rounded-t-lg transition-colors"
                >
                  По умолчанию
                </button>
                <button
                  onClick={() => handleSortChange('newest')}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
                >
                  Сначала новинки
                </button>
                <button
                  onClick={() => handleSortChange('priceDesc')}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
                >
                  По уменьшению цен
                </button>
                <button
                  onClick={() => handleSortChange('priceAsc')}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 last:rounded-b-lg transition-colors"
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
            <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl overflow-y-auto transition-transform duration-300 ease-in-out transform translate-x-0">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Фильтры</h2>
                  <button onClick={() => setFilterOpen(false)}>
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Brand Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Марка</label>
                  <div className="relative">
                    <select
                      value={filters.brand}
                      onChange={(e) => handleFilterChange('brand', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none bg-white"
                    >
                      <option value="">Все марки</option>
                      {brands.map(brand => (
                        <option key={brand.id || brand.name} value={brand.name}>
                          {brand.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
                  </div>
                </div>

                {/* Model Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Модель</label>
                  <div className="relative">
                    <select
                      value={filters.model}
                      onChange={(e) => handleFilterChange('model', e.target.value)}
                      disabled={!filters.brand}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none bg-white disabled:bg-gray-100"
                    >
                      <option value="">Все модели</option>
                      {models.length > 0 ? (
                        models.map(model => (
                          <option key={model} value={model}>
                            {model}
                          </option>
                        ))
                      ) : (
                        <option value="" disabled>Нет доступных моделей</option>
                      )}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
                  </div>
                </div>

                {/* Availability Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Наличие</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="availability"
                        value=""
                        checked={filters.availability === ''}
                        onChange={(e) => handleFilterChange('availability', e.target.value)}
                        className="mr-2"
                      />
                      Все
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="availability"
                        value="in-stock"
                        checked={filters.availability === 'in-stock'}
                        onChange={(e) => handleFilterChange('availability', e.target.value)}
                        className="mr-2"
                      />
                      В наличии
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="availability"
                        value="in-transit"
                        checked={filters.availability === 'in-transit'}
                        onChange={(e) => handleFilterChange('availability', e.target.value)}
                        className="mr-2"
                      />
                      В пути
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="availability"
                        value="sold"
                        checked={filters.availability === 'sold'}
                        onChange={(e) => handleFilterChange('availability', e.target.value)}
                        className="mr-2"
                      />
                      Продан
                    </label>
                  </div>
                </div>

                {/* Fuel Type Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Тип топлива</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="fuelType"
                        value="all"
                        checked={filters.fuelType === 'all'}
                        onChange={(e) => handleFilterChange('fuelType', e.target.value)}
                        className="mr-2"
                      />
                      Все
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="fuelType"
                        value="gasoline"
                        checked={filters.fuelType === 'gasoline'}
                        onChange={(e) => handleFilterChange('fuelType', e.target.value)}
                        className="mr-2"
                      />
                      Бензин
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="fuelType"
                        value="diesel"
                        checked={filters.fuelType === 'diesel'}
                        onChange={(e) => handleFilterChange('fuelType', e.target.value)}
                        className="mr-2"
                      />
                      Дизель
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="fuelType"
                        value="hybrid"
                        checked={filters.fuelType === 'hybrid'}
                        onChange={(e) => handleFilterChange('fuelType', e.target.value)}
                        className="mr-2"
                      />
                      Гибрид
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="fuelType"
                        value="electric"
                        checked={filters.fuelType === 'electric'}
                        onChange={(e) => handleFilterChange('fuelType', e.target.value)}
                        className="mr-2"
                      />
                      Электро
                    </label>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={() => setFilterOpen(false)}
                    className="flex-1 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Применить
                  </button>
                  <button
                    onClick={resetFilters}
                    className="flex-1 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
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
