import React from 'react'
import { Youtube, Instagram, Send, Phone, MapPin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-4 tracking-tight">MERCEDES SERVICE</h3>
            <p className="text-gray-400 mb-6">Уникальный мультибрендовый дилер автомобилей класса люкс и премиум в России и Казахстане.</p>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Send className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Каталог</h4>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Бизнес-класс</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Спорткары</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Премиум</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Внедорожники</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Кабриолеты</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Информация</h4>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Услуги</a></li>
              <li><a href="#" className="hover:text-white transition-colors">О нас</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Блог</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Контакты</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Контакты</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start">
                <Phone className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <a href="tel:+79311050708" className="hover:text-white transition-colors">+7 931 105-07-08</a>
                  <p className="text-sm mt-1">Ежедневно с 9:00 до 21:00</p>
                </div>
              </li>
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p>Москва, ул. Примерная, д. 123</p>
                  <a href="#" className="text-sm hover:text-white transition-colors mt-1 inline-block">Показать на карте</a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p className="text-sm">&copy; 2024 Mercedes Service. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
