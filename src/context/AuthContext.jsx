import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const savedUser = localStorage.getItem('adminUser')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const login = (username, password) => {
    if (username === 'admin' && password === 'admin') {
      const userData = { username: 'admin', role: 'admin' }
      setUser(userData)
      localStorage.setItem('adminUser', JSON.stringify(userData))
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('adminUser')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
