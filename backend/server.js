//server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const packageRoutes = require('./routes/packageRoutes');
require('dotenv').config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

// Configurar body-parser para procesar datos en formato JSON
// app.use(bodyParser.json());

// Configurar body-parser para procesar datos de formularios HTML
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(multer().none())
app.use('/api/auth', authRoutes);
app.use('/api/packages', packageRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));