const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const app = express();

// Enable CORS for all routes
app.use(cors());

// Parse requests of content-type - application/json
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/dressStore', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Register the product and category routes
app.use('/api/products', productRoutes);
// Uncomment the next line if you have implemented category routes
// app.use('/api/categories', categoriesRouter);

// Root Endpoint
app.get('/', (req, res) => {
  res.send('Welcome to the Dress Store API!');
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
