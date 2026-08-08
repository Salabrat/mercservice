import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Phone, LogIn, LogOut, Youtube, Instagram, Send } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import LoginModal from './LoginModal'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const { user, logout } = useAuth()

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
            <Link to="/" className="text-xl font-bold text-black tracking-tight">MERCEDES SERVICE</Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-black transition-colors text-sm font-medium">Главная</Link>
            <Link to="/catalog" className="text-gray-700 hover:text-black transition-colors text-sm font-medium">Каталог</Link>
            <Link to="/catalog" className="text-gray-700 hover:text-black transition-colors text-sm font-medium">Услуги</Link>
            <Link to="/catalog" className="text-gray-700 hover:text-black transition-colors text-sm font-medium">О нас</Link>
            <Link to="/catalog" className="text-gray-700 hover:text-black transition-colors text-sm font-medium">Блог</Link>
            <Link to="/catalog" className="text-gray-700 hover:text-black transition-colors text-sm font-medium">Контакты</Link>
          </nav>

          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <a href="#" className="text-gray-500 hover:text-black transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-black transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-black transition-colors">
                <Send className="w-5 h-5" />
              </a>
            </div>
            <a href="tel:+79311050708" className="flex items-center text-gray-700 hover:text-black transition-colors text-sm font-medium">
              <Phone className="w-4 h-4 mr-2" />
              +7 931 105-07-08
            </a>
            {user ? (
              <div className="flex items-center space-x-2">
                {user.role === 'admin' && (
                  <Link 
                    to="/admin"
                    className="flex items-center bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm"
                  >
                    Админ панель
                  </Link>
                )}
                <button 
                  onClick={logout}
                  className="flex items-center text-gray-700 hover:text-black transition-colors text-sm"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Выйти
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsLoginModalOpen(true)}
                className="flex items-center bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Войти
              </button>
            )}
          </div>

          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-3">
            <Link to="/" className="block text-gray-700 hover:text-black">Главная</Link>
            <Link to="/catalog" className="block text-gray-700 hover:text-black">Каталог</Link>
            <Link to="/catalog" className="block text-gray-700 hover:text-black">Услуги</Link>
            <Link to="/catalog" className="block text-gray-700 hover:text-black">О нас</Link>
            <Link to="/catalog" className="block text-gray-700 hover:text-black">Блог</Link>
            <Link to="/catalog" className="block text-gray-700 hover:text-black">Контакты</Link>
            <div className="flex items-center space-x-3 pt-2">
              <a href="#" className="text-gray-500 hover:text-black">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-black">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-black">
                <Send className="w-5 h-5" />
              </a>
            </div>
            <a href="tel:+79311050708" className="flex items-center text-gray-700 hover:text-black">
              <Phone className="w-4 h-4 mr-2" />
              +7 931 105-07-08
            </a>
            {user ? (
              <>
                {user.role === 'admin' && (
                  <Link 
                    to="/admin"
                    className="flex items-center w-full bg-black text-white px-4 py-2 rounded-lg"
                  >
                    Админ панель
                  </Link>
                )}
                <button 
                  onClick={logout}
                  className="flex items-center text-gray-700"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Выйти
                </button>
              </>
            ) : (
              <button 
                onClick={() => setIsLoginModalOpen(true)}
                className="flex items-center bg-black text-white px-4 py-2 rounded-lg w-full"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Войти
              </button>
            )}
          </div>
        </div>
      )}

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </header>
  )
}

export default Header
