import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Calendar, Phone } from 'lucide-react'

const HomePage = ({ brands }) => {
  const [currentImage, setCurrentImage] = useState(0)
  const [brandScroll, setBrandScroll] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  
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

  const scrollBrands = (direction) => {
    const container = document.getElementById('brands-container')
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

  useEffect(() => {
    const interval = setInterval(nextImage, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const container = document.getElementById('brands-container')
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

  return (
    <div className="min-h-screen bg-custom-gray">
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
              <div className="absolute inset-0 bg-gray-900/40"></div>
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
          <div className="absolute inset-0 bg-gray-900/40"></div>
          <div className="absolute inset-0 flex items-center">
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

      {/* Wide Selection Section */}
      <section className="py-20 bg-custom-gray">
        <div className="pl-5 pr-5 flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-1 flex flex-col sm:flex-row gap-4">
            <img src="/images/7.jpg" alt="Luxury car collection" className="w-full sm:w-1/2 h-auto object-cover rounded-lg shadow-lg" />
            <img src="/images/8.jpg" alt="Luxury car exterior" className="w-full sm:w-1/2 h-auto object-cover rounded-lg shadow-lg" />
          </div>
          <div className="flex-1 text-right">
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-6">
              САМЫЙ ШИРОКИЙ И АКТУАЛЬНЫЙ ВЫБОР ЛУЧШИХ АВТОМОБИЛЕЙ В НАЛИЧИИ В РОССИИ ДЛЯ ПОПОЛНЕНИЯ ВАШЕЙ КОЛЛЕКЦИИ
            </h2>
            <Link to="/catalog" className="inline-flex items-center bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors mb-6">
              Галерея автомобилей
            </Link>
            <p className="text-gray-600 max-w-md ml-auto">
              Не привязаны к конкретному бренду — поможем подобрать наиболее подходящий для вас автомобиль.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Brands Section */}
      <section className="py-24 bg-custom-gray">
        <div className="relative pl-5 pr-5">
          <div
            id="brands-container"
            className="flex gap-12 overflow-x-auto scrollbar-hide scroll-smooth pr-72"
          >
            {brands.map((brand, index) => (
              <Link key={brand.id || index} to={`/catalog/${brand.name.toLowerCase()}`} className="flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity">
                <img src={brand.logo} alt={brand.name} className="h-32 w-auto object-contain" />
              </Link>
            ))}
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 flex gap-2 bg-custom-gray pl-4 pr-4 py-4 z-10 w-72">
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
      </section>

      {/* Services Section */}
      <section className="flex flex-col md:flex-row items-stretch py-[30px] bg-custom-gray gap-5">
        <div className="md:w-1/2 flex flex-col justify-center pl-5">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-8 leading-relaxed">
            ВОЗЬМЕМ ВСЕ ЗАБОТЫ ОБ АВТОМОБИЛЕ НА СЕБЯ ВО ВРЕМЯ ПОКУПКИ И ДАЖЕ ПОСЛЕ
          </h2>
          <Link
            to="/services"
            className="inline-flex items-center justify-center bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg w-fit"
          >
            Услуги
          </Link>
        </div>
        <div className="md:w-1/2 py-[30px] pr-5">
          <img 
            src="/images/9.jpg" 
            alt="Car dealership with luxury cars" 
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Pre-order Section */}
      <section className="flex flex-col md:flex-row items-stretch py-[70px] bg-custom-gray">
        <div className="md:w-1/3 p-4 pl-5">
          <img 
            src="/images/11.jpg" 
            alt="Ferrari car" 
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
        <div className="md:w-2/3 flex flex-col md:flex-row items-stretch gap-5">
          <div className="md:w-1/2 p-4 pl-5">
            <img 
              src="/images/10.jpg" 
              alt="Car wheel" 
              className="w-full max-h-[400px] object-cover rounded-lg"
            />
          </div>
          <div className="md:w-1/2 flex flex-col justify-center text-right pr-5">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-900 mb-8 leading-relaxed">
              НАЙДЕМ ЛЮБОЙ АВТОМОБИЛЬ ДЛЯ ВАШЕЙ КОЛЛЕКЦИИ — ОТ РЕДКИХ ВИНТАЖНЫХ ЛОТОВ ДО НОВЕЙШИХ МОДЕЛЕЙ В ОСОБЕННОЙ КОМПЛЕКТАЦИИ
            </h2>
            <button className="inline-flex items-center justify-center bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg w-fit ml-auto">
              Предзаказ
            </button>
          </div>
        </div>
      </section>

      {/* GREATS Section */}
      <section className="relative py-20 px-5">
        <div className="relative">
          <img 
            src="/images/12.jpg" 
            alt="GREATS" 
            className="w-full h-auto object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-gray-900/40"></div>
          <div className="absolute inset-0 flex items-center justify-end p-10">
            <div className="max-w-md text-left">
              <h2 className="text-lg md:text-xl lg:text-2xl font-light text-white mb-6 leading-tight">
                GREATS — это больше, чем продажа машин,
                мы фанаты автомобилей и всего, что с ними
                связано. Поможем не просто подобрать самое
                лучшее на рынке, но и подарить вам новые
                уникальные эмоции.
              </h2>
              <button className="inline-flex items-center justify-center bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg">
                GREATS blog
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-800 text-white">
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