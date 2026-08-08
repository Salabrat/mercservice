const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;
const DATA_FILE = path.join(__dirname, 'data', 'brands.json');

// Middleware
app.use(cors());
app.use(express.json());

// Ensure data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// Initialize brands file if it doesn't exist
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

// Helper functions to read/write brands
const readBrands = () => {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading brands:', error);
    return [];
  }
};

const writeBrands = (brands) => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(brands, null, 2));
  } catch (error) {
    console.error('Error writing brands:', error);
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

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
