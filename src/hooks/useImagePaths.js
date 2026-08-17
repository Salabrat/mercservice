import { useState, useEffect } from 'react'

const defaultImagePaths = {
  menuImage: '/images/13.jpg',
  homeImage1: '/images/8.jpg',
  homeImage2: '/images/7.jpg',
  homeImage3: '/images/9.jpg',
  homeImage4: '/images/10.jpg',
  homeImage5: '/images/11.jpg'
}

export const useImagePaths = () => {
  const [imagePaths, setImagePaths] = useState(defaultImagePaths)

  useEffect(() => {
    const savedPaths = localStorage.getItem('siteImagePaths')
    if (savedPaths) {
      try {
        setImagePaths(JSON.parse(savedPaths))
      } catch (e) {
        console.error('Error parsing saved image paths:', e)
      }
    }
  }, [])

  return imagePaths
}
