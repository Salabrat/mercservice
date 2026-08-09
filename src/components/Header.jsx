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
    <header className={`bg-custom-gray/80 backdrop-blur-sm border-b border-gray-200/50 fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center"></div>

          <div className="flex items-center justify-center flex-1">
            <Link to="/" className="text-2xl font-bold text-black tracking-tight">MAINLOGO</Link>
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

      {/* Hamburger Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-[#2C2C2C] z-[100] flex flex-col items-center justify-center">
          {/* Close Button */}
          <button 
            onClick={() => setIsMenuOpen(false)}
            className="fixed top-6 right-6 p-2 text-white hover:text-gray-300 transition-colors z-50"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Navigation Items */}
          <nav className="flex flex-col items-center space-y-8">
            <Link 
              to="/" 
              className="text-3xl font-bold text-white hover:text-gray-300 transition-colors text-center animate-fade-in-up"
              onClick={() => setIsMenuOpen(false)}
              style={{ animationDelay: '0s' }}
            >
              ГЛАВНАЯ
            </Link>
            <Link 
              to="/catalog" 
              className="text-3xl font-bold text-white hover:text-gray-300 transition-colors text-center animate-fade-in-up"
              onClick={() => setIsMenuOpen(false)}
              style={{ animationDelay: '0.05s' }}
            >
              КАТАЛОГ
            </Link>
            <Link 
              to="/catalog" 
              className="text-3xl font-bold text-white hover:text-gray-300 transition-colors text-center animate-fade-in-up"
              onClick={() => setIsMenuOpen(false)}
              style={{ animationDelay: '0.1s' }}
            >
              УСЛУГИ
            </Link>
            <Link 
              to="/catalog" 
              className="text-3xl font-bold text-white hover:text-gray-300 transition-colors text-center animate-fade-in-up"
              onClick={() => setIsMenuOpen(false)}
              style={{ animationDelay: '0.15s' }}
            >
              О НАС
            </Link>
            <Link 
              to="/catalog" 
              className="text-3xl font-bold text-white hover:text-gray-300 transition-colors text-center animate-fade-in-up"
              onClick={() => setIsMenuOpen(false)}
              style={{ animationDelay: '0.2s' }}
            >
              БЛОГ
            </Link>
            <Link 
              to="/catalog" 
              className="text-3xl font-bold text-white hover:text-gray-300 transition-colors text-center animate-fade-in-up"
              onClick={() => setIsMenuOpen(false)}
              style={{ animationDelay: '0.25s' }}
            >
              КОНТАКТЫ
            </Link>
          </nav>

          {/* Social Media and Phone */}
          <div className="absolute bottom-12 flex flex-col items-center space-y-6">
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
            <a href="tel:+79266490693" className="flex items-center text-white hover:text-gray-300 transition-colors text-lg font-bold">
              <Phone className="w-5 h-5 mr-3" />
              +7 926 649 06 93
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
