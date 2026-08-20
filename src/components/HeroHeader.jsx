import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { X, Phone, Youtube, Instagram, Send } from 'lucide-react'
import { useImagePaths } from '../hooks/useImagePaths'

const HeroHeader = () => {
  const imagePaths = useImagePaths()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isHeaderVisible, setIsHeaderVisible] = useState(false)

  // Block scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      document.documentElement.style.overflow = 'hidden'
      document.documentElement.style.paddingRight = `${scrollbarWidth}px`
    } else {
      document.documentElement.style.overflow = ''
      document.documentElement.style.paddingRight = '0'
    }
    return () => {
      document.documentElement.style.overflow = ''
      document.documentElement.style.paddingRight = '0'
    }
  }, [isMenuOpen])

  // Handle scroll to show/hide header
  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderVisible(window.scrollY > window.innerHeight)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Static Header */}
      <header className="absolute top-0 left-0 right-0 z-30 px-6 py-4 bg-transparent">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 44 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" className="w-12 h-12">
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
          <Link to="/" className="flex items-center">
            <img src="/images/MAINLOGO white.png" alt="MAINLOGO" className="h-12 object-contain" />
          </Link>
          <div className="w-12"></div>
        </div>
      </header>

      {/* Slide-down Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-custom-gray/20 backdrop-blur-md transition-transform duration-1000 ${
          isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 transition-colors"
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
          <Link to="/" className="flex items-center">
            <img src="/images/MAINLOGO.png" alt="MAINLOGO" className="h-12 object-contain" />
          </Link>
          <div className="w-12"></div>
        </div>
      </header>

      {/* Hamburger Menu */}
      {isMenuOpen && (
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
              <img src="/images/MAINLOGO white.png" alt="MAINLOGO" className="h-12 object-contain" />
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
                    to="/about"
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
                    УСЛУГИ
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
                <img src={imagePaths.menuImage} alt="Menu Image" className="w-full h-auto object-contain mb-[30px]" />
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
        </>
      )}
    </>
  )
}

export default HeroHeader
