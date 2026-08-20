import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import HeroHeader from '../components/HeroHeader'

const ContactPage = () => {
  const [imagePaths, setImagePaths] = useState({
    contactHeaderImage: '/images/vverhkontakty.jpg'
  })
  const [textContent, setTextContent] = useState({
    contactPhone1: '+7 499 877 53 79',
    contactPhone2: '+7 499 229 40 39',
    contactPhone3: '+7 499 229 72 72',
    contactAddress1: 'г. Москва, Бережковская наб., 38, стр. 2',
    contactAddress2: 'Московская область, городской округ Истра, деревня Захарово, Заречная улица, 45А, стр. 11',
    contactAddress3: 'г. Москва, 1-й Красногвардейский пр., 22, стр. 1',
    contactEmail: 'welcome@greats.gallery',
    contactWorkingHours: 'Пн. — вс. 9:00–21:00',
    contactSocialYoutube: '#',
    contactSocialTelegram: '#',
    contactSocialInstagram: '#',
    contactAggregatorAutoRu: '#',
    contactAggregatorAvito: '#'
  })

  useEffect(() => {
    window.scrollTo(0, 0)
    
    // Fetch image paths
    fetch('http://localhost:3002/api/site-images')
      .then(res => res.json())
      .then(data => {
        setImagePaths({
          contactHeaderImage: data.contactHeaderImage || '/images/vverhkontakty.jpg'
        })
      })
      .catch(err => console.error('Error loading images:', err))

    // Fetch text content
    fetch('http://localhost:3002/api/site-text')
      .then(res => res.json())
      .then(data => {
        setTextContent({
          contactPhone1: data.contactPhone1 || '+7 499 877 53 79',
          contactPhone2: data.contactPhone2 || '+7 499 229 40 39',
          contactPhone3: data.contactPhone3 || '+7 499 229 72 72',
          contactAddress1: data.contactAddress1 || 'г. Москва, Бережковская наб., 38, стр. 2',
          contactAddress2: data.contactAddress2 || 'Московская область, городской округ Истра, деревня Захарово, Заречная улица, 45А, стр. 11',
          contactAddress3: data.contactAddress3 || 'г. Москва, 1-й Красногвардейский пр., 22, стр. 1',
          contactEmail: data.contactEmail || 'welcome@greats.gallery',
          contactWorkingHours: data.contactWorkingHours || 'Пн. — вс. 9:00–21:00',
          contactSocialYoutube: data.contactSocialYoutube || '#',
          contactSocialTelegram: data.contactSocialTelegram || '#',
          contactSocialInstagram: data.contactSocialInstagram || '#',
          contactAggregatorAutoRu: data.contactAggregatorAutoRu || '#',
          contactAggregatorAvito: data.contactAggregatorAvito || '#'
        })
      })
      .catch(err => console.error('Error loading text content:', err))
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <HeroHeader />
      
      {/* Header Image Section */}
      <section className="relative w-full">
        <img 
          src={imagePaths.contactHeaderImage} 
          alt="Contacts" 
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
          <div className="contact__title md:w-1/4">
            <h1 className="text-[2.5rem] font-light text-[#161718] tracking-tight">
              Контакты
            </h1>
          </div>
          
          {/* Right Column - Content */}
          <div className="contact__content md:w-3/4">
            <div className="text-[1.25rem] leading-[1.4] text-[#161718] space-y-[30px]">
              {/* Phone Numbers */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Бережковская набережная</h3>
                  <p className="text-gray-700">{textContent.contactPhone1}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Estate Mall (Новая Рига)</h3>
                  <p className="text-gray-700">{textContent.contactPhone2}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Neva Towers (Москва-Сити)</h3>
                  <p className="text-gray-700">{textContent.contactPhone3}</p>
                </div>
              </div>

              {/* Black divider line */}
              <div className="h-[2px] bg-black"></div>

              {/* Addresses */}
              <div>
                <h2 className="text-xl font-semibold mb-4">НАШИ АДРЕСА:</h2>
                <div className="space-y-4">
                  <div className="border-b border-gray-200 pb-4">
                    <p className="text-gray-700">{textContent.contactAddress1}</p>
                  </div>
                  <div className="border-b border-gray-200 pb-4">
                    <p className="text-gray-700">{textContent.contactAddress2}</p>
                  </div>
                  <div className="border-b border-gray-200 pb-4">
                    <p className="text-gray-700">{textContent.contactAddress3}</p>
                  </div>
                </div>
              </div>

              {/* Black divider line */}
              <div className="h-[2px] bg-black"></div>

              {/* Working Hours */}
              <div>
                <h2 className="text-xl font-semibold mb-2">Часы работы</h2>
                <p className="text-gray-700">{textContent.contactWorkingHours}</p>
              </div>

              {/* Email */}
              <div>
                <h2 className="text-xl font-semibold mb-2">E-mail</h2>
                <a href={`mailto:${textContent.contactEmail}`} className="text-[#161718] hover:text-gray-600 transition-colors">
                  {textContent.contactEmail}
                </a>
              </div>

              {/* Social Media */}
              <div>
                <h2 className="text-xl font-semibold mb-2">Социальные сети</h2>
                <div className="flex gap-4">
                  <a href={textContent.contactSocialYoutube} className="text-[#161718] hover:text-gray-600 transition-colors">YouTube</a>
                  <a href={textContent.contactSocialTelegram} className="text-[#161718] hover:text-gray-600 transition-colors">Telegram</a>
                  <a href={textContent.contactSocialInstagram} className="text-[#161718] hover:text-gray-600 transition-colors">Instagram</a>
                </div>
              </div>

              {/* Aggregators */}
              <div>
                <h2 className="text-xl font-semibold mb-2">Агрегаторы</h2>
                <div className="flex gap-4">
                  <a href={textContent.contactAggregatorAutoRu} className="text-[#161718] hover:text-gray-600 transition-colors">Auto.ru</a>
                  <a href={textContent.contactAggregatorAvito} className="text-[#161718] hover:text-gray-600 transition-colors">Avito</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage
