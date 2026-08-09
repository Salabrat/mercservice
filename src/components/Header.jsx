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

  return (
    <header className={`bg-custom-gray/80 backdrop-blur-sm border-b border-gray-200/50 fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          <div className="flex items-center justify-center flex-1">
            <Link to="/" className="text-2xl font-bold text-black tracking-tight">MAINLOGO</Link>
          </div>

          <div className="flex items-center"></div>
        </div>
      </div>

      {/* Hamburger Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsMenuOpen(false)} />
      )}

      {/* Hamburger Menu */}
      {isMenuOpen && (
        <div className="fixed inset-y-0 left-0 w-full md:w-96 bg-white z-50 transform transition-transform duration-300 ease-in-out">
          <div className="flex flex-col h-full p-8">
            {/* Navigation Items */}
            <nav className="flex-1 space-y-6 mt-12">
              <Link 
                to="/" 
                className="text-2xl font-bold text-gray-900 hover:text-gray-600 transition-colors block"
                onClick={() => setIsMenuOpen(false)}
              >
                ГЛАВНАЯ
              </Link>
              <Link 
                to="/catalog" 
                className="text-2xl font-bold text-gray-900 hover:text-gray-600 transition-colors block"
                onClick={() => setIsMenuOpen(false)}
              >
                КАТАЛОГ
              </Link>
              <Link 
                to="/catalog" 
                className="text-2xl font-bold text-gray-900 hover:text-gray-600 transition-colors block"
                onClick={() => setIsMenuOpen(false)}
              >
                УСЛУГИ
              </Link>
              <Link 
                to="/catalog" 
                className="text-2xl font-bold text-gray-900 hover:text-gray-600 transition-colors block"
                onClick={() => setIsMenuOpen(false)}
              >
                О НАС
              </Link>
              <Link 
                to="/catalog" 
                className="text-2xl font-bold text-gray-900 hover:text-gray-600 transition-colors block"
                onClick={() => setIsMenuOpen(false)}
              >
                БЛОГ
              </Link>
              <Link 
                to="/catalog" 
                className="text-2xl font-bold text-gray-900 hover:text-gray-600 transition-colors block"
                onClick={() => setIsMenuOpen(false)}
              >
                КОНТАКТЫ
              </Link>
            </nav>

            {/* Social Media and Phone */}
            <div className="mt-auto pt-8 border-t border-gray-200">
              <div className="flex items-center space-x-6 mb-6">
                <a href="#" className="text-gray-700 hover:text-black transition-colors flex items-center">
                  <Youtube className="w-5 h-5 mr-2" />
                  <span className="text-sm">YouTube</span>
                </a>
                <a href="#" className="text-gray-700 hover:text-black transition-colors flex items-center">
                  <Instagram className="w-5 h-5 mr-2" />
                  <span className="text-sm">Instagram</span>
                </a>
                <a href="#" className="text-gray-700 hover:text-black transition-colors flex items-center">
                  <Send className="w-5 h-5 mr-2" />
                  <span className="text-sm">Telegram</span>
                </a>
              </div>
              <a href="tel:+79266490693" className="flex items-center text-gray-900 hover:text-black transition-colors text-lg font-bold">
                <Phone className="w-5 h-5 mr-3" />
                +7 926 649 06 93
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
