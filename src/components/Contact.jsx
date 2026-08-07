import React from 'react'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

const Contact = () => {
  return (
    <section id="contact" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Контакты</h2>
          <p className="text-gray-600 text-lg">Свяжитесь с нами любым удобным способом</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 rounded-lg p-3">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Адрес</h3>
                <p className="text-gray-600">Москва, ул. Примерная, д. 123</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 rounded-lg p-3">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Телефон</h3>
                <p className="text-gray-600">+7 931 105-07-08</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 rounded-lg p-3">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                <p className="text-gray-600">info@mercedes-service.ru</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 rounded-lg p-3">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Режим работы</h3>
                <p className="text-gray-600">Круглосуточно, без выходных</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Оставить заявку</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ваше имя</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="Введите имя"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Телефон</label>
                <input 
                  type="tel" 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="+7 (___) ___-__-__"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Сообщение</label>
                <textarea 
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
                  placeholder="Опишите вашу заявку"
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full bg-primary text-white py-4 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
              >
                Отправить заявку
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
