const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3002;
const BRANDS_FILE = path.join(__dirname, 'data', 'brands.json');
const CARS_FILE = path.join(__dirname, 'data', 'cars.json');

// Middleware
app.use(cors());
app.use(express.json({ limit: '100mb' }));

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

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
