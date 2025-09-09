const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const calendarRoutes = require('./routes/calendar');

const app = express();
app.use(cors());
app.use(express.json());

// Calendar API
app.use('/api/calendar', calendarRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/dashly';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
