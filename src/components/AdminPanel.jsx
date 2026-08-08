import React, { useState } from 'react'
import { X, Plus } from 'lucide-react'

const AdminPanel = ({ isOpen, onClose, onAddCar, onAddBrand }) => {
  const [activeTab, setActiveTab] = useState('car')
  const [formData, setFormData] = useState({
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

  const handleSubmit = (e) => {
    e.preventDefault()
    onAddCar({
      ...formData,
      id: Date.now(),
      price: formData.price + ' ₽/день'
    })
    onClose()
    setFormData({
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
      onClose()
      setBrandData({ name: '', logo: null })
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

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] overflow-y-auto">
      <div className="bg-white rounded-xl p-8 w-full max-w-2xl mx-4 my-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Панель администратора</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('car')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
              activeTab === 'car' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Добавить автомобиль
          </button>
          <button
            onClick={() => setActiveTab('brand')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
              activeTab === 'brand' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Добавить бренд
          </button>
        </div>

        {activeTab === 'car' ? (
          <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Марка</label>
              <input
                type="text"
                value={formData.brand}
                onChange={(e) => setFormData({...formData, brand: e.target.value})}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                placeholder="Mercedes-Benz"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Модель</label>
              <input
                type="text"
                value={formData.model}
                onChange={(e) => setFormData({...formData, model: e.target.value})}
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
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                placeholder="15000"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Категория</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
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
                value={formData.year}
                onChange={(e) => setFormData({...formData, year: e.target.value})}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                placeholder="2024"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">КПП</label>
              <select
                value={formData.transmission}
                onChange={(e) => setFormData({...formData, transmission: e.target.value})}
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
                value={formData.fuel}
                onChange={(e) => setFormData({...formData, fuel: e.target.value})}
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
              value={formData.seats}
              onChange={(e) => setFormData({...formData, seats: e.target.value})}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              placeholder="5"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">URL изображения</label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({...formData, image: e.target.value})}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              placeholder="https://example.com/image.jpg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Описание</label>
            <textarea
              rows="4"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
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
        ) : (
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
        )}
      </div>
    </div>
  )
}

export default AdminPanel
