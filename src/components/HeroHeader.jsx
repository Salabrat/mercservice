import React from 'react'
import { Link } from 'react-router-dom'

const HeroHeader = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-20 px-6 py-4">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src="/images/MAINLOGO.png" alt="MAINLOGO" className="h-12 object-contain" />
        </Link>
      </div>
    </header>
  )
}

export default HeroHeader
