import React from 'react'
import { Car, Shield, Clock, Users, CreditCard, Headphones } from 'lucide-react'

const features = [
  { icon: Car, title: 'Большой автопарк', description: 'Более 100 автомобилей премиум-класса' },
  { icon: Shield, title: 'Полная страховка', description: 'Все автомобили застрахованы по КАСКО' },
  { icon: Clock, title: 'Круглосуточно', description: 'Работаем 24/7 без выходных' },
  { icon: Users, title: 'Детские кресла', description: 'Бесплатно предоставляем детские кресла' },
  { icon: CreditCard, title: 'Гибкая оплата', description: 'Наличный и безналичный расчет' },
  { icon: Headphones, title: 'Поддержка 24/7', description: 'Техническая поддержка в любое время' },
]

const Features = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Почему выбирают нас</h2>
          <p className="text-gray-600 text-lg">Преимущества работы с нами</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-primary/10 rounded-lg p-4 w-fit mb-4">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
