import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Plus, Image, Type } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const AdminPage = ({ onAddCar, onAddBrand }) => {
  const { user } = useAuth()
  const [activeSection, setActiveSection] = useState('cars')
  const [carFormData, setCarFormData] = useState({
    brand: '',
    model: '',
    price: '',
    category: 'Премиум',
    image: '',
    description: '',
    year: '',
    transmission: 'Автомат',
    fuel: 'Бензин',
    seats: ''
  })
  const [brandData, setBrandData] = useState({
    name: '',
    logo: null
  })

  const handleCarSubmit = (e) => {
    e.preventDefault()
    onAddCar({
      ...carFormData,
      id: Date.now(),
      price: carFormData.price + ' ₽/день'
    })
    setCarFormData({
      brand: '',
      model: '',
      price: '',
      category: 'Премиум',
      image: '',
      description: '',
      year: '',
      transmission: 'Автомат',
      fuel: 'Бензин',
      seats: ''
    })
    alert('Автомобиль добавлен!')
  }

  const handleBrandSubmit = (e) => {
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = (event) => {
      onAddBrand({
        name: brandData.name,
        logo: event.target.result,
        id: Date.now()
      })
      setBrandData({ name: '', logo: null })
      alert('Бренд добавлен!')
    }
    if (brandData.logo) {
      reader.readAsDataURL(brandData.logo)
    }
  }

  const handleLogoChange = (e) => {
    const file = e.target.files[0]
    if (file && file.type === 'image/png') {
      setBrandData({ ...brandData, logo: file })
    }
  }

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-custom-gray">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Доступ запрещен</h1>
          <Link to="/" className="text-primary hover:underline">Вернуться на главную</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-custom-gray py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-gray-700 hover:text-black mb-4">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Вернуться на главную
          </Link>
          <h1 className="text-4xl font-bold text-gray-900">Панель администратора</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <button
                onClick={() => setActiveSection('cars')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors mb-2 ${
                  activeSection === 'cars' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Plus className="w-5 h-5" />
                Добавить авто
              </button>
              <button
                onClick={() => setActiveSection('brands')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors mb-2 ${
                  activeSection === 'brands' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Image className="w-5 h-5" />
                Добавить бренд
              </button>
              <button
                onClick={() => setActiveSection('content')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                  activeSection === 'content' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Type className="w-5 h-5" />
                Изменить контент
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            {activeSection === 'cars' && (
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Добавить автомобиль</h2>
                <form onSubmit={handleCarSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Марка</label>
                      <input
                        type="text"
                        value={carFormData.brand}
                        onChange={(e) => setCarFormData({...carFormData, brand: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                        placeholder="Mercedes-Benz"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Модель</label>
                      <input
                        type="text"
                        value={carFormData.model}
                        onChange={(e) => setCarFormData({...carFormData, model: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                        placeholder="S-Class"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Цена (₽/день)</label>
                      <input
                        type="number"
                        value={carFormData.price}
                        onChange={(e) => setCarFormData({...carFormData, price: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                        placeholder="15000"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Категория</label>
                      <select
                        value={carFormData.category}
                        onChange={(e) => setCarFormData({...carFormData, category: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                      >
                        <option value="Премиум">Премиум</option>
                        <option value="Спорткар">Спорткар</option>
                        <option value="Внедорожник">Внедорожник</option>
                        <option value="Кабриолет">Кабриолет</option>
                        <option value="Электрокар">Электрокар</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Год</label>
                      <input
                        type="number"
                        value={carFormData.year}
                        onChange={(e) => setCarFormData({...carFormData, year: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                        placeholder="2024"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">КПП</label>
                      <select
                        value={carFormData.transmission}
                        onChange={(e) => setCarFormData({...carFormData, transmission: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                      >
                        <option value="Автомат">Автомат</option>
                        <option value="Ручная">Ручная</option>
                        <option value="Робот">Робот</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Топливо</label>
                      <select
                        value={carFormData.fuel}
                        onChange={(e) => setCarFormData({...carFormData, fuel: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                      >
                        <option value="Бензин">Бензин</option>
                        <option value="Дизель">Дизель</option>
                        <option value="Электричество">Электричество</option>
                        <option value="Гибрид">Гибрид</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Мест</label>
                    <input
                      type="number"
                      value={carFormData.seats}
                      onChange={(e) => setCarFormData({...carFormData, seats: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                      placeholder="5"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">URL изображения</label>
                    <input
                      type="url"
                      value={carFormData.image}
                      onChange={(e) => setCarFormData({...carFormData, image: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                      placeholder="https://example.com/image.jpg"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Описание</label>
                    <textarea
                      rows={4}
                      value={carFormData.description}
                      onChange={(e) => setCarFormData({...carFormData, description: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
                      placeholder="Описание автомобиля..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors flex items-center justify-center"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Добавить автомобиль
                  </button>
                </form>
              </div>
            )}

            {activeSection === 'brands' && (
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Добавить бренд</h2>
                <form onSubmit={handleBrandSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Название бренда</label>
                    <input
                      type="text"
                      value={brandData.name}
                      onChange={(e) => setBrandData({...brandData, name: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                      placeholder="Mercedes-Benz"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Логотип (PNG 500x500)</label>
                    <input
                      type="file"
                      accept="image/png"
                      onChange={handleLogoChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors flex items-center justify-center"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Добавить бренд
                  </button>
                </form>
              </div>
            )}

            {activeSection === 'content' && (
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Изменить контент сайта</h2>
                <div className="text-center py-12">
                  <Type className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500">Раздел в разработке...</p>
                  <p className="text-gray-400 text-sm mt-2">Здесь будет возможность изменять текст и фотографии сайта</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPage
