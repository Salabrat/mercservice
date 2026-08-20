import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import HeroHeader from '../components/HeroHeader'

const AboutPage = () => {
  const [textContent, setTextContent] = useState({
    aboutParagraph1: 'GREATS — это больше, чем продажа машин, мы фанаты автомобилей и всего, что с ними связано. Поможем не просто подобрать самое лучшее на рынке, но и подарить вам новые уникальные эмоции.',
    aboutParagraph2: 'Мы верим, что каждый автомобиль — это произведение искусства, заслуживающее особого внимания и заботы.',
    aboutParagraph3: 'Наша миссия — сделать процесс покупки автомобиля максимально комфортным и приятным для каждого клиента.'
  })
  const [imagePaths, setImagePaths] = useState({
    aboutHeaderImage: '/images/vverhonas.jpg',
    aboutImage1: '/images/onas1.jpg',
    aboutImage2: '/images/onas2.jpg'
  })

  useEffect(() => {
    window.scrollTo(0, 0)
    
    // Fetch text content
    fetch('http://localhost:3002/api/site-text')
      .then(res => res.json())
      .then(data => {
        setTextContent({
          aboutParagraph1: data.aboutParagraph1 || textContent.aboutParagraph1,
          aboutParagraph2: data.aboutParagraph2 || textContent.aboutParagraph2,
          aboutParagraph3: data.aboutParagraph3 || textContent.aboutParagraph3
        })
      })
      .catch(err => console.error('Error loading text:', err))

    // Fetch image paths
    fetch('http://localhost:3002/api/site-images')
      .then(res => res.json())
      .then(data => {
        setImagePaths({
          aboutHeaderImage: data.aboutHeaderImage || '/images/vverhonas.jpg',
          aboutImage1: data.aboutImage1 || '/images/onas1.jpg',
          aboutImage2: data.aboutImage2 || '/images/onas2.jpg'
        })
      })
      .catch(err => console.error('Error loading images:', err))
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <HeroHeader />
      
      {/* Header Image Section */}
      <section className="relative w-full">
        <img 
          src={imagePaths.aboutHeaderImage} 
          alt="About" 
          className="w-full h-auto object-cover"
        />
        <div className="absolute inset-0 bg-gray-900/40"></div>
      </section>

      {/* Back Button */}
      <div className="px-[30px] mt-[15px]">
        <Link 
          to="/" 
          className="inline-flex items-center text-[#161718] hover:text-gray-600 transition-colors"
        >
          Назад
        </Link>
      </div>

      {/* Content Section */}
      <section className="px-[30px] py-[clamp(3.125rem,6.25rem,6.25rem)] max-w-[1510px] mx-auto bg-gray-50">
        <div className="flex flex-col md:flex-row gap-[70px]">
          {/* Left Column - Title */}
          <div className="about__title md:w-1/4">
            <h1 className="text-[2.5rem] font-light text-[#161718] tracking-tight">
              О нас
            </h1>
          </div>
          
          {/* Right Column - Content */}
          <div className="about__content md:w-3/4">
            <div className="text-[1.25rem] leading-[1.4] text-[#161718] space-y-[30px]">
              <div dangerouslySetInnerHTML={{ __html: textContent.aboutParagraph1 }} />
              
              <div className="mt-[clamp(3.125rem,6.25rem,6.25rem)] mb-[clamp(3.125rem,6.25rem,6.25rem)] overflow-hidden">
                <img 
                  src={imagePaths.aboutImage1} 
                  alt="About us 1" 
                  className="w-full rounded-[5px]"
                />
              </div>
              
              <div dangerouslySetInnerHTML={{ __html: textContent.aboutParagraph2 }} />
              
              <div className="mt-[clamp(3.125rem,6.25rem,6.25rem)] mb-[clamp(3.125rem,6.25rem,6.25rem)] overflow-hidden">
                <img 
                  src={imagePaths.aboutImage2} 
                  alt="About us 2" 
                  className="w-full rounded-[5px]"
                />
              </div>
              
              <div dangerouslySetInnerHTML={{ __html: textContent.aboutParagraph3 }} />
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
