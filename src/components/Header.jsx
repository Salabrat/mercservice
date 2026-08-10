import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Phone, Youtube, Instagram, Send } from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.querySelector('section.min-h-screen')
      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom
        setIsVisible(heroBottom <= 0)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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

  return (
    <>
      <header className={`bg-custom-gray/80 backdrop-blur-sm border-b border-gray-200/50 fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center"></div>

            <div className="flex items-center justify-center flex-1">
              <Link to="/" className="flex items-center">
                <img src="/images/MAINLOGO.png" alt="MAINLOGO" className="h-12 object-contain" />
              </Link>
            </div>

            <div className="flex items-center">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hamburger Menu */}
      {isMenuOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-[#2C2C2C] z-[100] flex">
          {/* Close Button */}
          <button 
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-6 right-6 p-2 text-white hover:text-gray-300 transition-colors z-50"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Left side - Navigation */}
          <div className="flex flex-col flex-1">
            {/* Logo at top */}
            <img src="/images/MAINLOGO.png" alt="MAINLOGO" className="h-12 object-contain mx-auto mt-12 mb-8" />

            {/* Navigation Items */}
            <nav className="flex flex-col items-start space-y-5 flex-1 pl-8">
              <Link
                to="/"
                className="text-xl font-medium text-white hover:text-gray-300 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                ГЛАВНАЯ
              </Link>
              <Link
                to="/catalog"
                className="text-xl font-medium text-white hover:text-gray-300 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                КАТАЛОГ
              </Link>
              <Link
                to="/catalog"
                className="text-xl font-medium text-white hover:text-gray-300 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                УСЛУГИ
              </Link>
              <Link
                to="/catalog"
                className="text-xl font-medium text-white hover:text-gray-300 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                О НАС
              </Link>
              <Link
                to="/catalog"
                className="text-xl font-medium text-white hover:text-gray-300 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                БЛОГ
              </Link>
              <Link
                to="/catalog"
                className="text-xl font-medium text-white hover:text-gray-300 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                КОНТАКТЫ
              </Link>
            </nav>

            {/* Social Media and Phone */}
            <div className="pb-12 flex flex-col items-center space-y-6">
              <a href="tel:+74996817874" className="flex items-center text-white hover:text-gray-300 transition-colors text-lg font-bold">
                <Phone className="w-5 h-5 mr-3" />
                +7 499 681 78 74
              </a>
              <div className="flex items-center space-x-8">
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

              {/* SALIKS X BRABUS Block */}
              <div className="flex flex-col items-center space-y-3 mt-4">
                <span className="text-white text-sm font-medium">SALIKS X BRABUS</span>
                <button className="px-6 py-2 border border-white text-white text-sm font-medium hover:bg-white hover:text-gray-900 transition-colors">
                  Смотреть
                </button>
              </div>
            </div>
          </div>

          {/* Right side - Image */}
          <img src="/images/13.jpg" alt="Menu Image" className="hidden md:flex flex-1 items-center justify-center max-w-full max-h-full object-contain" />

        </div>
      )}
    </>
  )
}

export default Header
