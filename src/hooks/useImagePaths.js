import { useState, useEffect } from 'react'

const defaultImagePaths = {
  menuImage: '/images/13.jpg',
  homeImage1: '/images/8.jpg',
  homeImage2: '/images/7.jpg',
  homeImage3: '/images/9.jpg',
  homeImage4: '/images/10.jpg',
  homeImage5: '/images/11.jpg',
  heroImage1: '/images/1.jpg',
  heroImage2: '/images/2.jpg',
  heroImage3: '/images/3.jpg',
  heroImage4: '/images/4.jpg'
}

export const useImagePaths = () => {
  const [imagePaths, setImagePaths] = useState(defaultImagePaths)

  useEffect(() => {
    fetch('http://localhost:3002/api/site-images')
      .then(res => res.json())
      .then(data => {
        setImagePaths(data)
      })
      .catch(err => {
        console.error('Error loading image paths:', err)
      })
  }, [])

  return imagePaths
}
