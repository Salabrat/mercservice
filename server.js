const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = 3002;
const BRANDS_FILE = path.join(__dirname, 'data', 'brands.json');
const CARS_FILE = path.join(__dirname, 'data', 'cars.json');
const SITE_IMAGES_FILE = path.join(__dirname, 'data', 'site-images.json');

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, 'public', 'images');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage, limits: { fileSize: 10 * 1024 * 1024 } }); // 10MB limit

// Middleware
app.use(cors());
app.use(express.json({ limit: '100mb' }));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Ensure data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// Initialize brands file if it doesn't exist
if (!fs.existsSync(BRANDS_FILE)) {
  fs.writeFileSync(BRANDS_FILE, JSON.stringify([]));
}

// Initialize cars file if it doesn't exist
if (!fs.existsSync(CARS_FILE)) {
  fs.writeFileSync(CARS_FILE, JSON.stringify([]));
}

// Initialize site images file if it doesn't exist
if (!fs.existsSync(SITE_IMAGES_FILE)) {
  const defaultImages = {
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
  };
  fs.writeFileSync(SITE_IMAGES_FILE, JSON.stringify(defaultImages));
}

// Helper functions to read/write brands
const readBrands = () => {
  try {
    const data = fs.readFileSync(BRANDS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading brands:', error);
    return [];
  }
};

const writeBrands = (brands) => {
  try {
    fs.writeFileSync(BRANDS_FILE, JSON.stringify(brands, null, 2));
  } catch (error) {
    console.error('Error writing brands:', error);
  }
};

// Helper functions to read/write cars
const readCars = () => {
  try {
    const data = fs.readFileSync(CARS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading cars:', error);
    return [];
  }
};

const writeCars = (cars) => {
  try {
    fs.writeFileSync(CARS_FILE, JSON.stringify(cars, null, 2));
  } catch (error) {
    console.error('Error writing cars:', error);
  }
};

// Helper functions to read/write site images
const readSiteImages = () => {
  try {
    const data = fs.readFileSync(SITE_IMAGES_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading site images:', error);
    const defaultImages = {
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
    };
    return defaultImages;
  }
};

const writeSiteImages = (images) => {
  try {
    fs.writeFileSync(SITE_IMAGES_FILE, JSON.stringify(images, null, 2));
  } catch (error) {
    console.error('Error writing site images:', error);
  }
};

// API Routes

// Get all brands
app.get('/api/brands', (req, res) => {
  const brands = readBrands();
  res.json(brands);
});

// Add a brand
app.post('/api/brands', (req, res) => {
  const { name, logo } = req.body;
  
  if (!name || !logo) {
    return res.status(400).json({ error: 'Name and logo are required' });
  }

  const brands = readBrands();
  const newBrand = {
    id: Date.now(),
    name,
    logo
  };

  brands.push(newBrand);
  writeBrands(brands);

  res.json(newBrand);
});

// Delete a brand
app.delete('/api/brands/:id', (req, res) => {
  const { id } = req.params;
  const brands = readBrands();
  const filteredBrands = brands.filter(brand => brand.id !== parseInt(id));
  
  writeBrands(filteredBrands);
  res.json({ success: true });
});

// Get all cars
app.get('/api/cars', (req, res) => {
  const cars = readCars();
  res.json(cars);
});

// Add a car
app.post('/api/cars', (req, res) => {
  try {
    const carData = req.body;
    
    console.log('Received car data:', {
      brand: carData.brand,
      name: carData.name,
      price: carData.price,
      imagesCount: carData.images ? carData.images.length : 0
    });
    
    if (!carData.brand || !carData.name || !carData.price) {
      return res.status(400).json({ error: 'Brand, name and price are required' });
    }

    const cars = readCars();
    const newCar = {
      id: Date.now(),
      ...carData,
      createdAt: new Date().toISOString()
    };

    cars.push(newCar);
    writeCars(cars);

    console.log('Car added successfully:', newCar.id);
    res.json(newCar);
  } catch (error) {
    console.error('Error adding car:', error);
    res.status(500).json({ error: 'Failed to add car', details: error.message });
  }
});

// Delete a car
app.delete('/api/cars/:id', (req, res) => {
  const { id } = req.params;
  const cars = readCars();
  const filteredCars = cars.filter(car => car.id !== parseInt(id));
  
  writeCars(filteredCars);
  res.json({ success: true });
});

// Update a car
app.put('/api/cars/:id', (req, res) => {
  const { id } = req.params;
  const carData = req.body;
  const cars = readCars();
  const carIndex = cars.findIndex(car => car.id === parseInt(id));
  
  if (carIndex === -1) {
    return res.status(404).json({ error: 'Car not found' });
  }

  cars[carIndex] = { ...cars[carIndex], ...carData };
  writeCars(cars);

  res.json(cars[carIndex]);
});

// Get site images
app.get('/api/site-images', (req, res) => {
  const images = readSiteImages();
  res.json(images);
});

// Update site images
app.post('/api/site-images', (req, res) => {
  try {
    const imageData = req.body;
    
    if (!imageData) {
      return res.status(400).json({ error: 'Image data is required' });
    }

    const currentImages = readSiteImages();
    const updatedImages = { ...currentImages, ...imageData };
    writeSiteImages(updatedImages);

    res.json(updatedImages);
  } catch (error) {
    console.error('Error updating site images:', error);
    res.status(500).json({ error: 'Failed to update site images', details: error.message });
  }
});

// Upload site image
app.post('/api/site-images/upload', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const imageUrl = `/images/${req.file.filename}`;
    res.json({ imageUrl });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Failed to upload image', details: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
