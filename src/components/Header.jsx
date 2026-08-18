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
      <style>{`
        @keyframes slideDown {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(0);
          }
        }
      `}</style>
      <header className={`bg-custom-gray/80 backdrop-blur-sm border-b border-gray-200/50 fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center justify-center flex-1">
              <Link to="/" className="flex items-center">
                <img src="/images/MAINLOGO.png" alt="MAINLOGO" className="h-12 object-contain" />
              </Link>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="absolute left-6 top-1/2 -translate-y-1/2 p-2 transition-colors z-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 44 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" className="w-12 h-12">
            <line
              x1="4"
              x2="23"
              y1="6"
              y2="6"
              strokeWidth="2.5"
              style={{
                transition: 'all 0.3s ease-in-out',
                transform: isMenuOpen ? 'translateY(6px) rotate(45deg)' : 'translateY(0) rotate(0deg)',
                transformOrigin: '4px 6px'
              }}
            />
            <line
              x1="4"
              x2="35"
              y1="12"
              y2="12"
              strokeWidth="1.8"
              style={{
                transition: 'all 0.2s ease-in-out',
                transform: isMenuOpen ? 'scaleX(0)' : 'scaleX(1)',
                transformOrigin: '4px 12px'
              }}
            />
            <line
              x1="4"
              x2="23"
              y1="18"
              y2="18"
              strokeWidth="2.5"
              style={{
                transition: 'all 0.3s ease-in-out',
                transform: isMenuOpen ? 'translateY(-6px) rotate(-45deg)' : 'translateY(0) rotate(0deg)',
                transformOrigin: '4px 18px'
              }}
            />
          </svg>
        </button>
      </header>

      {/* Hamburger Menu */}
      {isMenuOpen && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 bg-[#2C2C2C] z-[100] flex flex-col"
          style={{
            transform: 'translateY(-100%)',
            animation: 'slideDown 0.6s cubic-bezier(0.55, 0.055, 0.675, 0.19) forwards'
          }}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute left-6 top-6 p-2 text-white hover:text-gray-300 transition-colors z-50"
          >
            <X className="w-12 h-12" />
          </button>

          {/* Logo at top - centered across full menu */}
          <div className="flex justify-center pt-[18px] pb-8 px-8 max-w-[calc(100%-80px)] mx-auto">
            <img src="/images/MAINLOGO.png" alt="MAINLOGO" className="h-12 object-contain" />
          </div>

          {/* Content area */}
          <div className="flex flex-1">
            {/* Left side - Navigation */}
            <div className="flex flex-col flex-1 pl-8">
              {/* White divider line - top */}
              <div className="mb-6">
                <div className="h-[3px] bg-gray-400 mr-[130px]"></div>
              </div>

              {/* Navigation Items */}
              <div className="flex flex-col items-start space-y-5 mb-6">
                <Link
                  to="/"
                  className="text-4xl font-medium text-white hover:text-gray-300 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  ГЛАВНАЯ
                </Link>
                <Link
                  to="/catalog"
                  className="text-4xl font-medium text-white hover:text-gray-300 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  КАТАЛОГ
                </Link>
                <Link
                  to="/catalog"
                  className="text-4xl font-medium text-white hover:text-gray-300 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  УСЛУГИ
                </Link>
                <Link
                  to="/catalog"
                  className="text-4xl font-medium text-white hover:text-gray-300 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  О НАС
                </Link>
                <Link
                  to="/catalog"
                  className="text-4xl font-medium text-white hover:text-gray-300 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  БЛОГ
                </Link>
                <Link
                  to="/catalog"
                  className="text-4xl font-medium text-white hover:text-gray-300 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  КОНТАКТЫ
                </Link>
              </div>

              {/* White divider line - middle */}
              <div className="mb-6">
                <div className="h-[3px] bg-gray-400 mr-[130px]"></div>
              </div>

              {/* Social Media */}
              <div className="flex items-center space-x-8 mb-6">
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

              {/* White divider line - bottom */}
              <div className="mb-6">
                <div className="h-[3px] bg-gray-400 mr-[130px]"></div>
              </div>

              {/* Phone */}
              <a href="tel:+74996817874" className="flex items-center text-white hover:text-gray-300 transition-colors text-lg font-bold">
                <Phone className="w-5 h-5 mr-3" />
                +7 499 681 78 74
              </a>
            </div>

            {/* Right side - Image and SALIKS block */}
            <div className="hidden md:flex flex-col w-1/2 mr-5">
              <img src="/images/13.jpg" alt="Menu Image" className="w-full h-auto object-contain mb-[30px]" />
              {/* SALIKS X BRABUS Block */}
              <div className="flex flex-col items-start space-y-[30px] pl-5">
                <span className="text-white text-lg font-medium">SALIKS X BRABUS</span>
                <button className="px-6 py-2 border border-white text-white text-lg font-medium hover:bg-white hover:text-gray-900 transition-colors">
                  Смотреть
                </button>
              </div>
            </div>
          </div>

        </div>
      )}
    </>
  )
}

export default Header