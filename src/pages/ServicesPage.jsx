import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import HeroHeader from '../components/HeroHeader'
import { useImagePaths } from '../hooks/useImagePaths'
import { useSiteText } from '../hooks/useSiteText'

const ServicesPage = () => {
  const imagePaths = useImagePaths()
  const textContent = useSiteText()
  const [openService, setOpenService] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const services = [
    {
      id: 1,
      title: 'ДЕТЕЙЛИНГ',
      description: 'Широкий спектр услуг по защите, обновлению и преображению автомобиля. Помогаем поддержать внешний вид автомобиля в идеальном состоянии — безупречный сервис и качество, которые оставляют только приятные эмоции.'
    },
    {
      id: 2,
      title: 'ПОКУПКА АВТОМОБИЛЯ ИЗ ЛЮБОЙ ТОЧКИ МИРА',
      description: 'На сегодняшний день являемся самым крупным импортером премиальных автомобилей в России. Поставляем особенные автомобили со всего земного шара благодаря широкой сети международных партнеров, несмотря на любые ситуации в стране и мире.'
    },
    {
      id: 3,
      title: 'ДОСТАВКА В СЕЙФЕ В ВАШ ГОРОД',
      description: 'Доставим автомобиль до двери в безопасном автомобильном сейфе. Аккуратно поставим на ваш паркинг незаметно для соседей или доставим в торжественной упаковке и праздничной обстановке. Исполняем самые искушенные просьбы и дарим только приятные впечатления.'
    },
    {
      id: 4,
      title: 'СТРАХОВАНИЕ И РАСШИРЕННАЯ ГАРАНТИЯ',
      description: 'Снимаем с вас заботы о документах, предоставляем расширенную гарантию и особые предложения по страховке от лучших компаний в стране.'
    },
    {
      id: 5,
      title: 'ПРЕДЗАКАЗ ЛЮБОГО АВТОМОБИЛЯ',
      description: 'Найдем и доставим до двери любой автомобиль, который вам нравится, — от редких коллекционных лотов до новейших моделей в эксклюзивной комплектации.'
    },
    {
      id: 6,
      title: 'СОПРОВОЖДЕНИЕ АВТОМОБИЛЯ ПОСЛЕ ПОКУПКИ',
      description: 'Приобретая свой первый автомобиль в GREATS, вы навсегда попадаете в эксклюзивный закрытый клуб. Здесь мы помогаем решить все вопросы, связанные с эксплуатацией автомобиля, и заботимся, чтобы ваша коллекция приносила только приятные эмоции.'
    }
  ]

  const toggleService = (id) => {
    setOpenService(openService === id ? null : id)
  }

  return (
    <div className="min-h-screen bg-white">
      <HeroHeader />
      
      {/* Header Image */}
      <div className="w-full">
        <img 
          src={imagePaths.servicesHeaderImage || '/images/vverhonas.jpg'} 
          alt="Услуги" 
          className="w-full h-auto"
        />
      </div>

      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-5 mt-4">
        <Link 
          to="/" 
          className="inline-flex items-center text-[#161718] hover:text-gray-600 transition-colors"
        >
          Назад
        </Link>
      </div>

      {/* Content Section */}
      <div className="max-w-[1510px] mx-auto px-5 py-12 bg-[#F5F5F5]">
        {/* First Half - Title and Description */}
        <div className="flex flex-col md:flex-row gap-[70px] mb-12">
          {/* Left Side - Title */}
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-light text-gray-900">
              Услуги
            </h1>
          </div>

          {/* Right Side - Description */}
          <div className="md:w-1/2">
            <p className="text-gray-700 leading-relaxed text-lg">
              Заботимся о вас и вашей коллекции автомобилей во время покупки и особенно после. Дарим комфорт и решаем возникшие вопросы каждый день, чтобы вы могли получать яркие эмоции от вождения и использования автомобилей.
            </p>
          </div>
        </div>

        {/* Second Half - Services Accordion */}
        <div className="md:w-1/2 md:ml-auto">
          {/* Top divider line */}
          <div className="h-[2px] bg-black mb-[10px]"></div>
          
          <div className="space-y-0">
            {services.map((service, index) => (
              <div key={service.id}>
                <button
                  onClick={() => toggleService(service.id)}
                  className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
                >
                  <span className="text-lg font-medium text-gray-900">
                    {String(service.id).padStart(2, '0')} {service.title}
                  </span>
                  <svg
                    className={`w-5 h-5 transition-transform duration-500 ease-in-out ${
                      openService === service.id ? 'rotate-45' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
                <div 
                  className="px-6 py-5 overflow-hidden transition-all duration-500 ease-in-out"
                  style={{
                    maxHeight: openService === service.id ? '500px' : '0',
                    opacity: openService === service.id ? '1' : '0'
                  }}
                >
                  <p className="text-gray-700 leading-relaxed">
                    {service.description}
                  </p>
                </div>
                <div 
                  className="h-[2px] bg-black transition-all duration-300 ease-in-out mt-[10px]"
                  style={{
                    maxHeight: '2px',
                    opacity: '1'
                  }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServicesPage
