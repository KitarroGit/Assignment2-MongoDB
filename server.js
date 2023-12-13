const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const productsRouter = require('./routes/products');
const categoriesRouter = require('./routes/categories');

const app = express();

// BodyParser Middleware
app.use(bodyParser.json());

app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get('/', (req, res) => {
    res.send('Welcome to the Dress Store API!');
  });