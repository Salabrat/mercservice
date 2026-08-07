import React from 'react'

const brands = [
  { name: 'Mercedes-Benz', logo: '🏎️' },
  { name: 'BMW', logo: '🚗' },
  { name: 'Porsche', logo: '🏁' },
  { name: 'Audi', logo: '⚡' },
  { name: 'Bentley', logo: '👑' },
  { name: 'Ford Mustang', logo: '🐎' },
  { name: 'Lamborghini', logo: '🔥' },
  { name: 'Ferrari', logo: '🎯' },
]

const Brands = () => {
  return (
    <section id="brands" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Популярные марки</h2>
          <p className="text-gray-600 text-lg">Выберите автомобиль вашей мечты</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {brands.map((brand, index) => (
            <div 
              key={index}
              className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-lg transition-shadow cursor-pointer group"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{brand.logo}</div>
              <h3 className="font-semibold text-gray-900">{brand.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Brands
