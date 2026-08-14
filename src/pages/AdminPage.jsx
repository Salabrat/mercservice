import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Plus, Image, Type, Car, Settings, Camera, Edit2, Trash2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const AdminPage = ({ onAddCar, onAddBrand }) => {
  const { user } = useAuth()
  const [activeSection, setActiveSection] = useState('appearance')
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
                onClick={() => setActiveSection('appearance')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors mb-2 ${
                  activeSection === 'appearance' ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Camera className="w-5 h-5" />
                ФОТО + ТЕКСТ
              </button>
              <button
                onClick={() => setActiveSection('cars')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors mb-2 ${
                  activeSection === 'cars' ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Car className="w-5 h-5" />
                АВТОМОБИЛИ
              </button>
              <button
                onClick={() => setActiveSection('brands')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors mb-2 ${
                  activeSection === 'brands' ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Image className="w-5 h-5" />
                БРЕНДЫ
              </button>
              <button
                onClick={() => setActiveSection('settings')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                  activeSection === 'settings' ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Settings className="w-5 h-5" />
                НАСТРОЙКИ САЙТА
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            {activeSection === 'appearance' && (
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Изменение внешнего вида сайта</h2>
                <div className="text-center py-12">
                  <Camera className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500">Раздел в разработке...</p>
                  <p className="text-gray-400 text-sm mt-2">Здесь будет возможность изменять фото и текст на сайте</p>
                </div>
              </div>
            )}

            {activeSection === 'cars' && (
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Управление автомобилями</h2>
                <div className="mb-6">
                  <button className="bg-black text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center">
                    <Plus className="w-5 h-5 mr-2" />
                    Добавить автомобиль
                  </button>
                </div>
                <div className="text-center py-12">
                  <Car className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500">Раздел в разработке...</p>
                  <p className="text-gray-400 text-sm mt-2">Здесь будет список автомобилей с возможностью редактирования и удаления</p>
                </div>
              </div>
            )}

            {activeSection === 'brands' && (
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Управление брендами</h2>
                <div className="mb-6">
                  <button className="bg-black text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center">
                    <Plus className="w-5 h-5 mr-2" />
                    Добавить бренд
                  </button>
                </div>
                <div className="text-center py-12">
                  <Image className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500">Раздел в разработке...</p>
                  <p className="text-gray-400 text-sm mt-2">Здесь будет список брендов с возможностью редактирования и удаления</p>
                </div>
              </div>
            )}

            {activeSection === 'settings' && (
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Настройки сайта</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Социальные сети</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">YouTube</label>
                        <input
                          type="url"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                          placeholder="https://youtube.com/channel/..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
                        <input
                          type="url"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                          placeholder="https://instagram.com/..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Telegram</label>
                        <input
                          type="url"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                          placeholder="https://t.me/..."
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Контакты</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Телефон</label>
                        <input
                          type="tel"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                          placeholder="+7 499 681 78 74"
                        />
                      </div>
                    </div>
                  </div>
                  <button className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                    Сохранить настройки
                  </button>
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
