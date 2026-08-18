import React, { useState, useEffect } from 'react'
import HeroHeader from '../components/HeroHeader'

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <HeroHeader />
      
      {/* Header Image Section */}
      <section className="relative w-full">
        <img 
          src="/images/vverhonas.jpg" 
          alt="About" 
          className="w-full h-auto object-cover"
        />
        <div className="absolute inset-0 bg-gray-900/40"></div>
      </section>

      {/* Content Section */}
      <section className="px-[30px] py-[clamp(3.125rem,6.25rem,6.25rem)] max-w-[1510px] mx-auto">
        <div className="flex flex-col md:flex-row gap-[70px]">
          {/* Left Column - Title */}
          <div className="about__title md:w-1/4">
            <h1 className="text-[2.5rem] font-light text-[#161718] tracking-tight">
              О проекте
            </h1>
          </div>
          
          {/* Right Column - Content */}
          <div className="about__content md:w-3/4">
            <div className="text-[1.25rem] leading-[1.4] text-[#161718] space-y-[30px]">
              <p>
                GREATS — это больше, чем продажа машин, мы фанаты автомобилей и всего, что с ними связано. 
                Поможем не просто подобрать самое лучшее на рынке, но и подарить вам новые уникальные эмоции.
              </p>
              
              <div className="mt-[clamp(3.125rem,6.25rem,6.25rem)] mb-[clamp(3.125rem,6.25rem,6.25rem)] overflow-hidden">
                <img 
                  src="/images/onas1.jpg" 
                  alt="About us 1" 
                  className="w-full rounded-[5px]"
                />
              </div>
              
              <p>
                Мы верим, что каждый автомобиль — это произведение искусства, заслуживающее особого внимания и заботы.
              </p>
              
              <div className="mt-[clamp(3.125rem,6.25rem,6.25rem)] mb-[clamp(3.125rem,6.25rem,6.25rem)] overflow-hidden">
                <img 
                  src="/images/onas2.jpg" 
                  alt="About us 2" 
                  className="w-full rounded-[5px]"
                />
              </div>
              
              <p>
                Наша миссия — сделать процесс покупки автомобиля максимально комфортным и приятным для каждого клиента.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="px-[30px] py-10 max-w-[1510px] mx-auto">
        <h2 className="text-2xl font-semibold text-[#161718] mb-6">
          Свяжитесь с нами
        </h2>
        
        <div className="space-y-4 text-[1.25rem] text-[#161718]">
          <p>
            Телефон: +7 931 105-07-08
          </p>
          <p>
            Email: info@greats.gallery
          </p>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
