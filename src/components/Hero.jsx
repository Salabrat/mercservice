import React from 'react'
import { ArrowRight } from 'lucide-react'

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary-dark to-primary text-white py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Премиальный автосалон в Москве
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Аренда и продажа автомобилей премиум-класса
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary-dark px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center">
              Арендовать
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-dark transition-colors">
              Подробнее
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
