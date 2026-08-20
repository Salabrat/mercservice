import React from 'react'
import { Link } from 'react-router-dom'
import HeroHeader from '../components/HeroHeader'

const BlogPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeroHeader />
      
      <div className="max-w-7xl mx-auto px-5 py-20">
        <Link 
          to="/" 
          className="inline-block mb-8 text-[#161718] hover:text-gray-600 transition-colors underline"
        >
          Назад
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-12">
          БЛОГ
        </h1>
        
        <div className="space-y-12">
          <div className="border-b border-gray-200 pb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Добро пожаловать в блог GREATS
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Здесь мы делимся новостями из мира автомобилей, обзорами новинок и интересными фактами о премиальных и люксовых автомобилях.
            </p>
          </div>
          
          <div className="border-b border-gray-200 pb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Ожидайте скоро
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Мы активно работаем над наполнением блога интересным контентом. Скоро здесь появятся статьи о новейших моделях, тест-драйвы и эксклюзивные интервью с экспертами автомобильной индустрии.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogPage
